import Typography from "@mui/material/Typography"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { NoteView } from "../views/NoteView"
import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias saepe rem esse deleniti fuga quis perferendis, unde officia! Sunt aliquam quos cum dolorum autem, totam ipsum officia hic nostrum vel?</Typography> */}

      <NothingSelectedView />
      {/* <NoteView /> */}


      <IconButton
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
    </JournalLayout>
  )
}
