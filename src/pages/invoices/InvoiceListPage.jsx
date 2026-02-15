import { useEffect, useState } from "react";
import { 
    Container, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Box, TextField, 
    InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import * as invoiceService from "../../services/invoiceService";

// --- IMPORTACIONES PARA PDF CORREGIDAS ---
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 

function InvoiceListPage() {
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => { loadInvoices(); }, []);

    const loadInvoices = async () => {
        try {
            const data = await invoiceService.getInvoices();
            setInvoices(data);
        } catch (error) { 
            console.error("Error al cargar facturas:", error); 
        }
    };

    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setOpenModal(true);
    };

    // --- FUNCIÓN PARA GENERAR EL PDF (CON SINTAXIS COMPATIBLE) ---
    const downloadPDF = (invoice) => {
        if (!invoice) return;

        const doc = new jsPDF();
        const primaryColor = [61, 43, 31]; // Café oscuro #3d2b1f

        // Encabezado
        doc.setFontSize(18);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("KAFFA MANAGER", 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("Comprobante de Venta", 105, 28, { align: 'center' });

        // Datos de la Factura
        doc.setTextColor(0);
        doc.setFontSize(10);
        doc.text(`Número: ${invoice.numeroFactura || 'S/N'}`, 14, 45);
        doc.text(`Fecha: ${invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : 'N/A'}`, 14, 52);
        doc.text(`Cliente: ${invoice.cliente?.nombre || "Consumidor Final"}`, 14, 59);

        // Tabla de ítems
        const tableColumn = ["Producto", "Cantidad", "Precio Unit.", "Subtotal"];
        const tableRows = [];

        if (invoice.items && Array.isArray(invoice.items)) {
            invoice.items.forEach(item => {
                const precio = item.precio || 0;
                const cantidad = item.cantidad || 0;
                const subtotal = precio * cantidad;

                const rowData = [
                    item.nombre || "Sin nombre",
                    cantidad,
                    `$${precio.toFixed(2)}`,
                    `$${subtotal.toFixed(2)}`
                ];
                tableRows.push(rowData);
            });
        }

        // --- SE LLAMA COMO FUNCIÓN INDEPENDIENTE PARA EVITAR EL ERROR ---
        autoTable(doc, {
            startY: 70,
            head: [tableColumn],
            body: tableRows,
            headStyles: { fillColor: primaryColor },
            theme: 'striped',
        });

        // Total (Se calcula en base a donde terminó la tabla anterior)
        const finalY = doc.lastAutoTable.finalY + 10;
        const totalFactura = invoice.total || 0;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`TOTAL A PAGAR: $${totalFactura.toFixed(2)}`, 196, finalY, { align: 'right' });

        // Pie de página
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(150);
        doc.text("Este documento es un comprobante de operación interna.", 105, 285, { align: 'center' });

        // Descarga
        doc.save(`Factura_${invoice.numeroFactura || 'Descarga'}.pdf`);
    };

    const filteredInvoices = invoices.filter(inv => 
        (inv.numeroFactura || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inv.cliente?.nombre || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="#3d2b1f">Facturación</Typography>
                
                <TextField 
                    size="small"
                    placeholder="Buscar por N° o Cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: 300, bgcolor: 'white' }}
                />
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#3d2b1f' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>N° Factura</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cliente</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Total</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredInvoices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No se encontraron facturas.</TableCell>
                            </TableRow>
                        ) : (
                            filteredInvoices.map((inv) => (
                                <TableRow key={inv._id} hover>
                                    <TableCell>{inv.numeroFactura}</TableCell>
                                    <TableCell>{inv.cliente?.nombre || "C/F"}</TableCell>
                                    <TableCell align="right">${(inv.total || 0).toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleViewInvoice(inv)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* MODAL DETALLE */}
            <Dialog 
                open={openModal} 
                onClose={() => setOpenModal(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <DialogTitle sx={{ bgcolor: '#3d2b1f', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Detalle de Factura
                    <IconButton onClick={() => setOpenModal(false)} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                
                <DialogContent dividers>
                    {selectedInvoice && (
                        <Box sx={{ p: 1 }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography><strong>N°:</strong> {selectedInvoice.numeroFactura}</Typography>
                                <Typography><strong>Fecha:</strong> {new Date(selectedInvoice.createdAt).toLocaleDateString()}</Typography>
                            </Box>
                            <Typography sx={{ mb: 2 }}><strong>Cliente:</strong> {selectedInvoice.cliente?.nombre || "Consumidor Final"}</Typography>
                            
                            <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
                            
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Productos</Typography>
                            {selectedInvoice.items?.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">{item.nombre} (x{item.cantidad})</Typography>
                                    <Typography variant="body2">${((item.precio || 0) * (item.cantidad || 0)).toFixed(2)}</Typography>
                                </Box>
                            ))}
                            
                            <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6" color="primary" fontWeight="bold">
                                    ${(selectedInvoice.total || 0).toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenModal(false)} variant="outlined" color="inherit">
                        Cerrar
                    </Button>
                    <Button 
                        variant="contained" 
                        sx={{ bgcolor: '#6f4e37', '&:hover': { bgcolor: '#3d2b1f' } }}
                        onClick={() => downloadPDF(selectedInvoice)}
                    >
                        Descargar PDF
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default InvoiceListPage;