// import { Button, Grid, TextField, Typography } from "@mui/material"
// le ponemos un alias a Link para evitar conflictos
import {Link as RouterLink} from 'react-router-dom'
import Google from "@mui/icons-material/Google"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"


export const LoginPage = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      // Style eXtender
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >

      {/* Ventana central */}
      <Grid item
        className="box-shadow"
        xs={3}
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Login
        </Typography>

        <form>
          <Grid container>
            {/* Campo para el correo */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label='Correo'
                type="email"
                placeholder="correo@google.com"
                fullWidth
              />
            </Grid>

            {/* Campo para la contraseña */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label='Contraseña'
                type="password"
                placeholder="Contraseña"
                fullWidth
              />
            </Grid>

            {/* Espacio para los botones */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>



            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>

      </Grid>

    </Grid>
  )
}
