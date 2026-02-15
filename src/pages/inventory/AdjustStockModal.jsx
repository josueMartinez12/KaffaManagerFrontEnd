import { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Stack } from "@mui/material";
import * as inventoryService from "../../services/inventoryService";

const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 24, p: 4,
};

function AdjustStockModal({ open, handleClose, product, type, refresh }) {
    const [cantidad, setCantidad] = useState(1);

    const handleSave = async () => {
        try {
            await inventoryService.adjustStock({
                productoId: product._id,
                cantidad: parseInt(cantidad),
                tipo: type
            });
            refresh();
            handleClose();
        } catch (error) {
            alert("Error al actualizar stock");
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Registrar {type} de Inventario
                </Typography>
                <Typography variant="body1" mb={2}>
                    Producto: <strong>{product.nombre}</strong>
                </Typography>
                <TextField
                    fullWidth type="number" label="Cantidad"
                    value={cantidad} onChange={(e) => setCantidad(e.target.value)}
                    sx={{ mb: 3 }}
                />
                <Stack direction="row" spacing={2}>
                    <Button fullWidth variant="outlined" onClick={handleClose}>Cancelar</Button>
                    <Button 
                        fullWidth variant="contained" 
                        color={type === "Entrada" ? "success" : "error"}
                        onClick={handleSave}
                    >
                        Confirmar {type}
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default AdjustStockModal;