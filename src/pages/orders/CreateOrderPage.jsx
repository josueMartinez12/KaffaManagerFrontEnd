import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, Paper, Typography, TextField, Button, 
  MenuItem, Box, Grid, IconButton, Divider, List, ListItem, ListItemText 
} from "@mui/material";
import { Delete as DeleteIcon, AddShoppingCart, ArrowBack } from "@mui/icons-material";
import { getProducts } from "../../services/productService";
import { createOrder } from "../../services/orderService";

function CreateOrderPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cliente, setCliente] = useState("");
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  
  const [selectedProd, setSelectedProd] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const addToCart = () => {
    const prod = products.find(p => p._id === selectedProd);
    if (!prod) return;
    if (prod.stock < quantity) return alert(`Solo quedan ${prod.stock} unidades`);

    const newItem = {
      productoId: prod._id, // Importante: debe coincidir con tu modelo de Mongoose
      nombre: prod.nombre,
      cantidad: parseInt(quantity),
      precio: prod.precio,
      subtotal: prod.precio * quantity
    };
    setCart([...cart, newItem]);
    setSelectedProd("");
    setQuantity(1);
  };

  const handleFinishOrder = async () => {
    if (!cliente || cart.length === 0) return alert("Llena los datos y agrega productos");
    
    const orderData = {
      cliente,
      items: cart.map(item => ({ productoId: item.productoId, cantidad: item.cantidad })),
      total: cart.reduce((acc, item) => acc + item.subtotal, 0),
      metodoPago
    };

    try {
      await createOrder(orderData);
      alert("Orden creada exitosamente y stock actualizado");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Error al crear orden");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2, color: '#6f4e37' }}>Volver</Button>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Agregar al Pedido</Typography>
            <TextField fullWidth select label="Seleccionar Café" value={selectedProd} onChange={(e) => setSelectedProd(e.target.value)} margin="normal">
              {products.map(p => (
                <MenuItem key={p._id} value={p._id}>{p.nombre} (Stock: {p.stock})</MenuItem>
              ))}
            </TextField>
            <TextField fullWidth type="number" label="Cantidad" value={quantity} onChange={(e) => setQuantity(e.target.value)} margin="normal" />
            <Button fullWidth variant="contained" startIcon={<AddShoppingCart />} onClick={addToCart} sx={{ mt: 2, bgcolor: '#6f4e37' }}>
              Añadir Item
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Datos del Cliente</Typography>
            <TextField fullWidth label="Nombre del Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} margin="dense" />
            <TextField fullWidth select label="Método de Pago" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} margin="dense">
              <MenuItem value="Efectivo">Efectivo</MenuItem>
              <MenuItem value="Transferencia">Transferencia</MenuItem>
              <MenuItem value="Tarjeta">Tarjeta</MenuItem>
            </TextField>

            <Divider sx={{ my: 2 }} />
            <List sx={{ maxHeight: 200, overflow: 'auto' }}>
              {cart.map((item, index) => (
                <ListItem key={index} secondaryAction={
                  <IconButton onClick={() => setCart(cart.filter((_, i) => i !== index))}><DeleteIcon /></IconButton>
                }>
                  <ListItemText primary={item.nombre} secondary={`${item.cantidad} x $${item.precio}`} />
                  <Typography fontWeight="bold">${item.subtotal.toFixed(2)}</Typography>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h5" color="green" fontWeight="bold">
                ${cart.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2)}
              </Typography>
            </Box>
            <Button fullWidth variant="contained" size="large" onClick={handleFinishOrder} sx={{ mt: 3, bgcolor: '#3d2b1f', py: 1.5 }}>
              Confirmar Pedido
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateOrderPage;