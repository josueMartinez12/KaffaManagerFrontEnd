import { useEffect, useState } from "react";
import { 
    Container, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Box, TextField, InputAdornment 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as invoiceService from "../../services/invoiceService";

function InvoiceListPage() {
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => { loadInvoices(); }, []);

    const loadInvoices = async () => {
        try {
            const data = await invoiceService.getInvoices();
            setInvoices(data);
        } catch (error) { console.error(error); }
    };

    // Lógica de búsqueda local (filtra sobre lo que ya cargó)
    const filteredInvoices = invoices.filter(inv => 
        inv.numeroFactura.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.cliente?.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold">Facturación</Typography>
                
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

            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#3d2b1f' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>N° Factura</TableCell>
                            <TableCell sx={{ color: 'white' }}>Cliente</TableCell>
                            <TableCell sx={{ color: 'white' }} align="right">Total</TableCell>
                            <TableCell sx={{ color: 'white' }} align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredInvoices.map((inv) => (
                            <TableRow key={inv._id}>
                                <TableCell>{inv.numeroFactura}</TableCell>
                                <TableCell>{inv.cliente?.nombre || "C/F"}</TableCell>
                                <TableCell align="right">${inv.total.toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary"><VisibilityIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default InvoiceListPage;