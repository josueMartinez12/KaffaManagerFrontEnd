import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import api from "../../api/axiosInstance";
import { 
  Box, Button, TextField, Typography, Paper, Container, 
  InputAdornment, Alert, Divider 
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function LoginUserPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      /** * IMPORTANTE: Ahora llamamos a /users/login 
       * porque movimos la lógica de auth a userRoutes.js
       */
      const response = await api.post("/users/login", credentials);
      
      // Guardamos el token y los datos básicos del usuario
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.rol);
      localStorage.setItem("userName", response.data.nombreCompleto);

      // Redirigimos al Home/Dashboard
      navigate("/home"); 
    } catch (err) {
      console.error("Error en el login:", err.response?.data);
      
      // Manejo de errores específico basado en lo que devuelve tu backend
      if (!err.response) {
        setError("No hay conexión con el servidor (Revisa el puerto 3000)");
      } else {
        setError(err.response.data.message || "Credenciales incorrectas");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle, #fdfaf6 0%, #e8e2d6 100%)', p: 2 
    }}>
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ p: 5, borderRadius: 8, textAlign: 'center', border: '1px solid #d7ccc8' }}>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#3d2b1f', mb: 1 }}>
            Kaffa Manager
          </Typography>
          <Typography variant="body2" sx={{ color: '#8d6e63', mb: 4 }}>
            SISTEMA DE GESTIÓN CAFETERA
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth label="Correo Electrónico" name="email" margin="normal"
              onChange={handleChange} required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#6f4e37' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4 }
              }}
            />
            <TextField
              fullWidth label="Contraseña" name="password" type="password" margin="normal"
              onChange={handleChange} required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#6f4e37' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 4 }
              }}
            />

            <Button
              fullWidth type="submit" variant="contained" size="large"
              disabled={loading}
              sx={{
                mt: 3, py: 1.5, borderRadius: 4, backgroundColor: '#5d4037',
                fontWeight: 'bold', textTransform: 'none',
                '&:hover': { backgroundColor: '#3d2b1f' }
              }}
            >
              {loading ? "Verificando..." : "Ingresar al Panel"}
            </Button>
          </form>

          <Divider sx={{ my: 3, color: '#a1887f' }}>O</Divider>

          <Button
            fullWidth variant="outlined" component={RouterLink} to="/users/create"
            startIcon={<PersonAddIcon />}
            sx={{ py: 1.2, borderRadius: 4, color: '#6f4e37', borderColor: '#6f4e37', textTransform: 'none' }}
          >
            Crear Nueva Cuenta
          </Button>

          <Typography variant="caption" display="block" sx={{ mt: 3, color: '#a1887f' }}>
             Prueba con: admin@kaffamanager.com / admin123
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginUserPage;