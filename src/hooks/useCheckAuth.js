import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
    // Verificamos si ya esta verificado, vamos a mostrar el circulo de carga
    const { status} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    // Ver el estado del usuario, si esta autenticado o no
    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {
            // Si no hay un usuario, se cierra la sesion
            if (!user) {
                return dispatch(logout());
            }


            // En caso que si haya un usuario
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
            dispatch(startLoadingNotes());
        });
    }, []);

    return {
        status
    }
}
