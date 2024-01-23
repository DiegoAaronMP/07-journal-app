import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

// Mock de los thunks
jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password})
    },
}));

// Mock de useDispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Pruebas en <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => {
        render(
            // Se necesita el Provider
            <Provider store={store}>
                {/* MemoryRouter pasa el error de las redirecciones*/}
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('boton de google debe de llamar el startGoogleSignIn', () => {
        // Se necesita el Provider
        render(
            <Provider store={store}>
                {/* MemoryRouter pasa el error de las redirecciones*/}
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // Tomar el boton por el aria-label
        const googleBtn = screen.getByLabelText('google-btn');

        // Para que este evento funcione se debe de tener un estado precargado
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('submit debe de llamar startLoginWithEmailPassword', () => {

        const email = 'a@a.com';
        const password = '123456';

        // Se necesita el Provider
        render(
            <Provider store={store}>
                {/* MemoryRouter pasa el error de las redirecciones*/}
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // inputs de texto
        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });

        // Obtener el input del password por el datatest-id
        const passowordField = screen.getByTestId('password');
        fireEvent.change(passowordField, { target: { name: 'password', value: password } });

        // Submit
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password,
        })
    });
});