import MenuOutlined from "@mui/icons-material/MenuOutlined"
import LogoutOutlined from "@mui/icons-material/LogoutOutlined"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import AppBar from "@mui/material/AppBar"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

export const Navbar = ({ drawerWidth = 240 }) => {
    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'>JournalApp</Typography>

                    <IconButton color='error'>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
