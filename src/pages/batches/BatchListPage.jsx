import { useEffect, useState } from "react";
import { 
    Container, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Button, TextField, 
    Box, Chip, Grid, MenuItem, IconButton, Tooltip 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import * as batchService from "../../services/batchService";

function BatchListPage() {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Estado para el formulario
    const [formData, setFormData] = useState({
        codigo: '',
        granoOrigen: '',
        tempInicial: '',
        tempFinal: '',
        tiempoMin: '',
        nivelTueste: 'Medio'
    });

    useEffect(() => {
        loadBatches();
    }, []);

    const loadBatches = async () => {
        setLoading(true);
        try {
            const data = await batchService.getAllBatches();
            setBatches(data);
        } catch (error) {
            console.error("Error al cargar lotes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await batchService.createBatch(formData);
            loadBatches(); // Recargar la tabla
            setFormData({ // Limpiar formulario
                codigo: '', granoOrigen: '', tempInicial: '', 
                tempFinal: '', tiempoMin: '', nivelTueste: 'Medio' 
            });
        } catch (error) {
            alert("Error al registrar: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este lote?")) {
            try {
                await batchService.deleteBatch(id);
                loadBatches();
            } catch (error) {
                alert("No tienes permisos para eliminar o hubo un error.");
            }
        }
    };

    // Función para dar color al nivel de tueste
    const getTuesteColor = (nivel) => {
        switch(nivel) {
            case 'Claro': return '#f5deb3';
            case 'Medio': return '#8b4513';
            case 'Oscuro': return '#3d2b1f';
            default: return '#777';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold" color="#3d2b1f">
                    Lotes de Tueste (Batches)
                </Typography>
                <Button 
                    startIcon={<RefreshIcon />} 
                    onClick={loadBatches} 
                    disabled={loading}
                >
                    Actualizar
                </Button>
            </Box>

            {/* FORMULARIO DE REGISTRO */}
            <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 2 }}>
                <Typography variant="h6" mb={2} color="textSecondary">Registrar Nuevo Tueste</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth name="codigo" label="Código (Ej: TOST-001)" value={formData.codigo} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth name="granoOrigen" label="Grano/Origen" value={formData.granoOrigen} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField select fullWidth name="nivelTueste" label="Nivel de Tueste" value={formData.nivelTueste} onChange={handleChange}>
                                <MenuItem value="Claro">Claro</MenuItem>
                                <MenuItem value="Medio">Medio</MenuItem>
                                <MenuItem value="Oscuro">Oscuro</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <TextField fullWidth type="number" name="tempInicial" label="Temp Inic. °C" value={formData.tempInicial} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <TextField fullWidth type="number" name="tempFinal" label="Temp Final °C" value={formData.tempFinal} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                            <TextField fullWidth type="number" name="tiempoMin" label="Tiempo (Min)" value={formData.tiempoMin} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                fullWidth 
                                type="submit" 
                                variant="contained" 
                                startIcon={<AddIcon />}
                                sx={{ height: '56px', bgcolor: '#3d2b1f', "&:hover": { bgcolor: '#5d4037' } }}
                            >
                                Registrar Lote
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* TABLA DE LOTES */}
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#3d2b1f' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Código</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Origen</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Tueste</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Temp (Inic/Fin)</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Tiempo</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {batches.length === 0 ? (
                            <TableRow><TableCell colSpan={6} align="center">No hay lotes registrados.</TableCell></TableRow>
                        ) : (
                            batches.map((lote) => (
                                <TableRow key={lote._id} hover>
                                    <TableCell><strong>{lote.codigo}</strong></TableCell>
                                    <TableCell>{lote.granoOrigen}</TableCell>
                                    <TableCell align="center">
                                        <Chip 
                                            label={lote.nivelTueste} 
                                            sx={{ bgcolor: getTuesteColor(lote.nivelTueste), color: lote.nivelTueste === 'Claro' ? 'black' : 'white', fontWeight: 'bold' }} 
                                        />
                                    </TableCell>
                                    <TableCell align="center">{lote.tempInicial || '--'}°C / {lote.tempFinal || '--'}°C</TableCell>
                                    <TableCell align="center">{lote.tiempoMin || '--'} min</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Eliminar">
                                            <IconButton color="error" onClick={() => handleDelete(lote._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default BatchListPage;