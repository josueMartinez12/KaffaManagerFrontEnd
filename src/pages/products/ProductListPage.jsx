import { useEffect, useState } from "react";
import { 
  Box, Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Button, Chip, TextField, 
  InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// Importamos el servicio (asegúrate de que las funciones existan en productService.js)
import * as productService from "../../services/productService";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- ESTADOS PARA EL MODAL ---
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "Grano",
    precio: 0,
    stockActual: 0,
    unidad: "Unidades",
    descripcion: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  // Abrir para crear
  const handleOpenCreate = () => {
    setEditMode(false);
    setFormData({ nombre: "", categoria: "Grano", precio: 0, stockActual: 0, unidad: "Unidades", descripcion: "" });
    setOpen(true);
  };

  // Abrir para editar
  const handleOpenEdit = (product) => {
    setEditMode(true);
    setSelectedId(product._id);
    setFormData({ ...product });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await productService.updateProduct(selectedId, formData);
      } else {
        await productService.createProduct(formData);
      }
      loadProducts(); // Recargar la tabla
      handleClose();  // Cerrar ventana
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await productService.deleteProduct(id);
        loadProducts();
      } catch (error) {
        alert("No se pudo eliminar");
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="#3d2b1f">Inventario</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenCreate}
          sx={{ bgcolor: '#6f4e37' }}
        >
          Nuevo Producto
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar producto..."
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow key={p._id} hover>
                <TableCell>
                    <Typography fontWeight="bold">{p.nombre}</Typography>
                    <Typography variant="caption">{p.unidad}</Typography>
                </TableCell>
                <TableCell><Chip label={p.categoria} size="small" /></TableCell>
                <TableCell align="right">${p.precio}</TableCell>
                <TableCell align="center">
                  <Chip label={p.stockActual} color={p.stockActual < 10 ? "error" : "success"} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpenEdit(p)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(p._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- EL MODAL (DIALOG) --- */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {editMode ? "Editar Producto" : "Agregar Nuevo Producto"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} margin="dense" />
          <TextField fullWidth select label="Categoría" name="categoria" value={formData.categoria} onChange={handleChange} margin="dense">
            <MenuItem value="Grano">Grano</MenuItem>
            <MenuItem value="Accesorios">Accesorios</MenuItem>
            <MenuItem value="Método">Método</MenuItem>
          </TextField>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField fullWidth label="Precio" name="precio" type="number" value={formData.precio} onChange={handleChange} margin="dense" />
            <TextField fullWidth label="Stock" name="stockActual" type="number" value={formData.stockActual} onChange={handleChange} margin="dense" />
          </Box>
          <TextField fullWidth label="Unidad (Bolsa 340g, etc.)" name="unidad" value={formData.unidad} onChange={handleChange} margin="dense" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#6f4e37' }}>
            {editMode ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProductListPage;