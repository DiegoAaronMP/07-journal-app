import { useMemo, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import { Alert } from '@mui/material'


const formData = {
  email: '',
  password: '',
  displayName: ''
}

// Validaciones
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 caracteres'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // console.log(formState);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    // Utilizamos el layout
    <AuthLayout title='Register'>
      <form onSubmit={onSubmit}>
        <Grid container>
          {/* Campo para el correo */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type="text"
              placeholder="Poncho Herrera"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          {/* Campo para el correo */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          {/* Campo para la contraseña */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type="password"
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

            

          {/* Espacio para los botones */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            {/* Mensaje de alerta */}
            <Grid display={!!errorMessage ? '' : 'none'} item xs={12}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button disabled={isCheckingAuthentication} type='submit' variant="contained" fullWidth>
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
