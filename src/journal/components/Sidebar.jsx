import TurnedInNot from "@mui/icons-material/TurnedInNot"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import Grid from "@mui/material/Grid"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useCheckAuth } from "../../hooks/useCheckAuth"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem"

export const Sidebar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth);
    // Obtener las notes del state
    const {notes} = useSelector(state => state.journal);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary si lo queremos mostrar y ocultar
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note =>
                            <SideBarItem key={note.id} {...note}/>
                        )
                    }
                </List>
            </Drawer>
        </Box>
    )
}
