import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, TextField, Button, Typography, Paper, Container, Grid, IconButton 
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AgricultureIcon from '@mui/icons-material/Agriculture'; // Icono de Finca
import { createSupplier } from "../../services/supplierService";

function CreateSupplierPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreFinca: "",
    ubicacion: "",
    contacto: "",
    altitud: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSupplier(formData);
      navigate("/home"); // Regresa al dashboard donde está la lista
    } catch (error) {
      alert("Error al registrar la finca: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Botón de volver igual al de productos */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} 
        sx={{ mb: 2, color: '#6f4e37', fontWeight: 'bold' }}
      >
        Volver
      </Button>

      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AgricultureIcon sx={{ fontSize: 35, color: '#6f4e37', mr: 2 }} />
          <Typography variant="h5" fontWeight="bold" color="#3d2b1f">
            Nueva Finca Proveedora
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Nombre de la Finca" 
                name="nombreFinca" 
                variant="outlined"
                onChange={handleChange} 
                required 
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Ubicación (Región/Ciudad)" 
                name="ubicacion" 
                variant="outlined"
                onChange={handleChange} 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Productor (Nombre de Contacto)" 
                name="contacto" 
                variant="outlined"
                onChange={handleChange} 
              />
            </Grid>

            <Grid item xs={6}>
              <TextField 
                fullWidth 
                label="Altitud" 
                name="altitud" 
                placeholder="Ej: 1450 msnm"
                variant="outlined"
                onChange={handleChange} 
              />
            </Grid>

            <Grid item xs={6}>
              <TextField 
                fullWidth 
                label="Email" 
                name="email" 
                type="email"
                variant="outlined"
                onChange={handleChange} 
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ 
                  bgcolor: '#6f4e37', 
                  py: 1.8, 
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#3d2b1f' } 
                }}
              >
                Registrar Finca
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateSupplierPage;