import { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as invoiceService from "../../services/invoiceService";

function CreateInvoicePage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        nit: "",
        total: "",
        metodoPago: "Efectivo"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const invoiceData = {
                cliente: { nombre: form.nombre, nit: form.nit },
                total: parseFloat(form.total),
                metodoPago: form.metodoPago,
                items: [] // Factura manual simple
            };
            await invoiceService.createInvoice(invoiceData);
            alert("Factura creada");
            navigate("/home");
        } catch (error) { alert("Error al crear factura"); }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h5" mb={3} fontWeight="bold">Crear Factura Manual</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Nombre Cliente" required
                                onChange={(e) => setForm({...form, nombre: e.target.value})} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="NIT / Documento" 
                                onChange={(e) => setForm({...form, nit: e.target.value})} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Monto Total" type="number" required
                                onChange={(e) => setForm({...form, total: e.target.value})} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: '#6f4e37' }}>
                                Guardar Factura
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default CreateInvoicePage;