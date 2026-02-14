import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Button, Chip, Tooltip 
} from "@mui/material";
import { 
  Add as AddIcon, 
  Block as BlockIcon, 
  Delete as DeleteIcon, 
  ReceiptLong as ReceiptIcon 
} from "@mui/icons-material";
import * as saleService from "../../services/saleService";

function SaleListPage() {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const data = await saleService.getSales();
      setSales(data);
    } catch (error) {
      console.error("Error cargando ventas", error);
    }
  };

  const handleCancelSale = async (id) => {
    if (window.confirm("¿Estás seguro de anular esta venta? El stock se devolverá al inventario.")) {
      try {
        await saleService.cancelSale(id);
        loadSales(); // Recargar la lista
      } catch (error) {
        alert("No se pudo cancelar la venta");
      }
    }
  };

  const handleDeleteRecord = async (id) => {
    if (window.confirm("¿Eliminar registro de la base de datos? (Acción irreversible)")) {
      try {
        await saleService.deleteSale(id);
        loadSales();
      } catch (error) {
        alert("Error al eliminar el registro");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="#3d2b1f">
          Historial de Ventas
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => navigate("/sales/checkout")}
          sx={{ bgcolor: '#6f4e37', borderRadius: 2 }}
        >
          Nueva Venta (POS)
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Factura #</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Monto Total</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale._id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ReceiptIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    {sale.invoice?.numeroFactura || "S/N"}
                  </Box>
                </TableCell>
                <TableCell>{sale.invoice?.cliente || "Cliente General"}</TableCell>
                <TableCell>{new Date(sale.fecha).toLocaleDateString()}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  ${sale.montoTotal.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={sale.invoice?.estado || "Completado"} 
                    color={sale.invoice?.estado === 'Cancelado' ? "error" : "success"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {sale.invoice?.estado !== 'Cancelado' && (
                    <Tooltip title="Anular Venta">
                      <IconButton color="warning" onClick={() => handleCancelSale(sale.invoice?._id)}>
                        <BlockIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Eliminar Registro">
                    <IconButton color="error" onClick={() => handleDeleteRecord(sale.invoice?._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default SaleListPage;