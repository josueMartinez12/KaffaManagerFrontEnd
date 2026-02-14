import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import * as supplierService from "../../services/supplierService";

function EditSupplierPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ nombreFinca: "", ubicacion: "", contacto: "", altitud: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      const data = await supplierService.getSupplierById(id);
      setFormData(data);
    };
    fetchSupplier();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supplierService.updateSupplier(id, formData);
    navigate("/home");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" mb={3} fontWeight="bold">Editar Finca</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField fullWidth label="Nombre" value={formData.nombreFinca} onChange={(e) => setFormData({...formData, nombreFinca: e.target.value})} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Ubicación" value={formData.ubicacion} onChange={(e) => setFormData({...formData, ubicacion: e.target.value})} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Contacto" value={formData.contacto} onChange={(e) => setFormData({...formData, contacto: e.target.value})} /></Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#1b5e20' }}>Actualizar Datos</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default EditSupplierPage;