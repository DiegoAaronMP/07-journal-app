import Typography from "@mui/material/Typography"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { NoteView } from "../views/NoteView"
import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector(state => state.journal);


  const onClickNewNote = () => {
    dispatch(startNewNote());
  }
  return (
    <JournalLayout>
      

      {
        // !! convierte el objeto en booleano
        (!!active)
          ? <NoteView /> // Si esta activa se muestra esto
          : <NothingSelectedView /> // caso contrario
      }


      <IconButton
        onClick={onClickNewNote}
        size="large"
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
