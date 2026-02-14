import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, MenuItem, Select, Chip, Container, Button 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as orderService from "../../services/orderService";

function OrderListPage() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { loadOrders(); }, []);

    const loadOrders = async () => {
        try {
            const data = await orderService.getOrders();
            setOrders(data);
        } catch (error) { console.error("Error al cargar órdenes:", error); }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await orderService.updateOrderStatus(id, newStatus);
            loadOrders(); // Recarga la lista para ver el cambio
        } catch (error) { alert("Error al actualizar el estado"); }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pendiente': return 'warning';
            case 'Pagado': return 'info';
            case 'Enviado': return 'primary';
            case 'Entregado': return 'success';
            default: return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="#3d2b1f">
                    Gestión de Órdenes
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/orders/create")}
                    sx={{ bgcolor: '#6f4e37', '&:hover': { bgcolor: '#3d2b1f' }, borderRadius: 2 }}
                >
                    Nueva Orden
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#fdfaf6' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">Total</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Estado Actual</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Acciones / Cambiar Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id} hover>
                                <TableCell>{order.cliente}</TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                    ${order.total.toFixed(2)}
                                </TableCell>
                                <TableCell align="center">
                                    <Chip 
                                        label={order.estado} 
                                        color={getStatusColor(order.estado)} 
                                        size="small" 
                                        sx={{ fontWeight: 'bold' }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Select
                                        size="small"
                                        value={order.estado}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        sx={{ minWidth: 120, borderRadius: 2 }}
                                    >
                                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                                        <MenuItem value="Pagado">Pagado</MenuItem>
                                        <MenuItem value="Enviado">Enviado</MenuItem>
                                        <MenuItem value="Entregado">Entregado</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default OrderListPage;