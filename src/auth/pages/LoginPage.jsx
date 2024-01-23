// import { Button, Grid, TextField, Typography } from "@mui/material"
// le ponemos un alias a Link para evitar conflictos
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import Google from "@mui/icons-material/Google"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { Alert } from '@mui/material'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  // Obtener el status del usuario para ver si esta autenticado o no
  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    // console.log({ email, password });
    dispatch(startLoginWithEmailPassword({email, password}));
  }


  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (
    // Utilizamos el layout
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} aria-label='submit-form'>
        <Grid container>
          {/* Campo para el correo */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          {/* Campo para la contraseña */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              // * Para testing
              inputProps={{
                'data-testid': 'password'
              }}
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          {/* Espacio para los botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            {/* Mensaje de alerta */}
            <Grid display={!!errorMessage ? '' : 'none'} item xs={12}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button aria-label='google-btn' disabled={isAuthenticating} onClick={onGoogleSignIn} variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>


          {/* Enlace de crear una cuenta */}
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>



  )
}
