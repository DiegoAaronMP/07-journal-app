import Box from "@mui/material/Box"
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Toolbar } from "@mui/material";


const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box className='animate__animated animate__fadeIn animate__faster' sx={{display: 'flex'}}>
        {/* Navbar drawerWidth*/}
        <Navbar drawerWidth={drawerWidth}/>
        {/* Sidebar drawerWidth*/}
        <Sidebar drawerWidth={drawerWidth}/>

        {/* Main */}
        <Box 
            component='main'
            sx={{flexGrow: 1, p: 1}}
        >
            <Toolbar />

            {children}

        </Box>
    </Box>
  )
}
