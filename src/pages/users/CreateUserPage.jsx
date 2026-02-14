import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService";
import { Box, Button, TextField, Typography, Paper, Container, MenuItem, Alert, Snackbar } from "@mui/material";

function CreateUserPage() {
  const [userData, setUserData] = useState({
    nombreCompleto: "", // Coincide con tu Schema
    email: "",
    password: "",
    rol: "Cliente" // Valor por defecto del Schema
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(userData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear usuario");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdfaf6' }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4, borderRadius: 6, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" color="#3d2b1f" mb={3}>Crear Cuenta</Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Nombre Completo" name="nombreCompleto" margin="dense" onChange={handleChange} required />
            <TextField fullWidth label="Email" name="email" type="email" margin="dense" onChange={handleChange} required />
            <TextField fullWidth label="Contraseña" name="password" type="password" margin="dense" onChange={handleChange} required />
            
            <TextField fullWidth select label="Rol" name="rol" value={userData.rol} margin="dense" onChange={handleChange}>
              <MenuItem value="Admin">Administrador</MenuItem>
              <MenuItem value="Tostador">Tostador</MenuItem>
              <MenuItem value="Bodeguero">Bodeguero</MenuItem>
              <MenuItem value="Vendedor">Vendedor</MenuItem>
              <MenuItem value="Cliente">Cliente</MenuItem>
            </TextField>

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, bgcolor: '#6f4e37' }}>Registrar</Button>
          </form>
        </Paper>
      </Container>
      <Snackbar open={success} message="¡Usuario creado con éxito!" />
    </Box>
  );
}

export default CreateUserPage;