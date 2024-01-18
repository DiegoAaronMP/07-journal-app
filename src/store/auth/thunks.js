import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}


export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        // Si no se loguea
        if (!result.ok) {
            return dispatch(logout(result.errorMessage));
        }

        // login si sale bien
        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        // Si sale mal, cerrar sesion
        if (!ok) {
            return dispatch(logout({errorMessage}));
        }

        // si sale bien, loguear
        dispatch(login({uid, displayName, email, photoURL}));
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, displayName, errorMessage} = await loginWithEmailPassword({email, password});
        
        // Si sale mal, cerrar sesion
        if (!ok) {
            return dispatch(logout({errorMessage}));
        }

        // si sale bien, loguear
        dispatch(login({uid, displayName, email, photoURL}));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        // Limpiar notas al cerras sesion
        dispatch(clearNotesLogout());

        dispatch(logout({}));
    }
}

