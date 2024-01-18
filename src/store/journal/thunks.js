import {collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';


export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());

        // uid del usuario para grabar en firebase
        const {uid} = getState().auth;

        // Nota que se va a insertar
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
  
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        // insertar la nueva nota
        await setDoc(newDoc, newNote);

        // Colocar id a la nota
        newNote.id = newDoc.id;

        //! dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        // El uid es del usuario, se obtiene del state
        const { uid } = getState().auth;
        
        if ( !uid ) throw new Error('El uid del usuario no existe'); 
        
        // Llamamos el helper loadNotes
        const notes = await loadNotes(uid);

        // Establecer las notas
        dispatch(setNotes(notes));
    }
}

export const startSavingNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        
        // Nota a guardar
        const noteToFireStore = {...note};

        // Eliminamos el id
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch(updateNote(note));
    }
}

// Subir archivos a cloudinary
export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);

        // Crear un arreglo de promesas para subir todo simultaneamente
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        // Disparar las promesas
        const photosUrls = await Promise.all(fileUploadPromises);
        // console.log(photosUrls);

        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        // Ruta de la nota a eliminar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        // Quitar la nota activa y del arreglo
        dispatch(deleteNoteById(note.id));
    }
}


