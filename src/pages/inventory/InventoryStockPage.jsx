import { useEffect, useState } from "react";
import { 
    Container, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Button, Box, Chip, Alert 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as inventoryService from "../../services/inventoryService";
import AdjustStockModal from "./AdjustStockModal";

function InventoryStockPage() {
    const [products, setProducts] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [adjustType, setAdjustType] = useState("Entrada");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const stockData = await inventoryService.getCurrentStock();
            const alertData = await inventoryService.getLowStockAlerts();
            
            // LOG DE DEPURACIÓN: Abre la consola (F12) para ver esto
            console.log("Productos cargados:", stockData);
            
            setProducts(stockData);
            setAlerts(alertData.alertas || []);
        } catch (error) {
            console.error("Error al cargar inventario", error);
        }
    };

    const handleOpenAdjust = (product, type) => {
        setSelectedProduct(product);
        setAdjustType(type);
        setOpenModal(true);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" mb={3} color="#3d2b1f">
                Control de Inventario
            </Typography>

            {alerts.length > 0 && (
                <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
                    ¡Atención! Hay {alerts.length} productos con stock bajo (menos de 10 unidades).
                </Alert>
            )}

            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#3d2b1f' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Producto</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="center">Stock Actual</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="right">Precio Unit.</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="center">Acciones de Ajuste</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((prod) => (
                            <TableRow key={prod._id} hover>
                                <TableCell sx={{ fontWeight: 'bold' }}>{prod.nombre}</TableCell>
                                <TableCell align="center">
                                    <Chip 
                                        // Muestra el stock real o 0 si no existe el campo
                                        label={prod.stock !== undefined ? prod.stock : 0} 
                                        color={prod.stock < 10 ? "error" : "success"}
                                        variant="filled"
                                        sx={{ 
                                            fontWeight: 'bold', 
                                            fontSize: '1rem',
                                            minWidth: '60px',
                                            color: 'white',
                                            bgcolor: prod.stock < 10 ? '#d32f2f' : '#2e7d32' 
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    ${prod.precio ? prod.precio.toFixed(2) : "0.00"}
                                </TableCell>
                                <TableCell align="center">
                                    <Button 
                                        startIcon={<AddIcon />} 
                                        color="success" 
                                        onClick={() => handleOpenAdjust(prod, "Entrada")}
                                        sx={{ mr: 1 }}
                                    >
                                        Entrada
                                    </Button>
                                    <Button 
                                        startIcon={<RemoveIcon />} 
                                        color="error"
                                        onClick={() => handleOpenAdjust(prod, "Salida")}
                                        // Deshabilitar salida si no hay nada que sacar
                                        disabled={prod.stock <= 0}
                                    >
                                        Salida
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedProduct && (
                <AdjustStockModal 
                    open={openModal} 
                    handleClose={() => setOpenModal(false)} 
                    product={selectedProduct}
                    type={adjustType}
                    refresh={loadData}
                />
            )}
        </Container>
    );
}

export default InventoryStockPage;