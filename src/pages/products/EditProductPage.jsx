import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, MenuItem, Container, Grid, CircularProgress } from "@mui/material";
import { updateProduct, getProductById } from "../../services/productService";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        navigate("/home");
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, formData);
      navigate("/home");
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>Editar: {formData.nombre}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre || ''} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth select label="Categoría" name="categoria" value={formData.categoria || 'Grano'} onChange={handleChange}>
                <MenuItem value="Grano">Grano</MenuItem>
                <MenuItem value="Accesorios">Accesorios</MenuItem>
                <MenuItem value="Método">Método</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Precio" name="precio" type="number" value={formData.precio || 0} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#3d2b1f' }}>
                Actualizar Cambios
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default EditProductPage;