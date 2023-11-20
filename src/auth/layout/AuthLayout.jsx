import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

export const AuthLayout = ({ children, title = '' }) => {
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
                sx={{
                    // Definir que en pantallas medianas el ancho sea de 450px 
                    width: { md: 450 },
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2
                }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>

                {/* Children */}
                {children}
            </Grid>
        </Grid>
    )
}
