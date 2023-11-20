import { Link as RouterLink } from 'react-router-dom'
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { AuthLayout } from '../layout/AuthLayout'


export const RegisterPage = () => {
  return (
    // Utilizamos el layout
    <AuthLayout title='Register'>
      <form>
        <Grid container>
          {/* Campo para el correo */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type="text"
              placeholder="Poncho Herrera"
              fullWidth
            />
          </Grid>

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
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>

            {/* Enlace de iniciar sesion*/}
            <Grid container direction='row' justifyContent='end' sx={{ mt: 2 }}>
              <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                ingresar
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
