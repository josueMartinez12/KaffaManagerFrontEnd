import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, Typography, Box, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton, TextField 
} from "@mui/material";
import { Add, Edit, Delete, Agriculture } from "@mui/icons-material";
import * as supplierService from "../../services/supplierService";

function SupplierListPage() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { loadSuppliers(); }, []);

  const loadSuppliers = async () => {
    try {
      const data = await supplierService.getSuppliers();
      setSuppliers(data);
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta finca proveedora?")) {
      await supplierService.deleteSupplier(id);
      loadSuppliers();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Fincas Proveedoras</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => navigate("/suppliers/create")}
          sx={{ bgcolor: '#2e7d32' }} // Verde para agricultura
        >
          Nueva Finca
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f1f8e9' }}>
            <TableRow>
              <TableCell>Nombre de Finca</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Altitud</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((s) => (
              <TableRow key={s._id} hover>
                <TableCell sx={{ fontWeight: 'bold' }}>{s.nombreFinca}</TableCell>
                <TableCell>{s.ubicacion}</TableCell>
                <TableCell>{s.contacto}</TableCell>
                <TableCell>{s.altitud}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => navigate(`/suppliers/edit/${s._id}`)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(s._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default SupplierListPage;