import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Cambiamos el nombre del import usando "as"
import { createProduct as createProductService } from "../../services/productService";

function CreateProductPage() {
  const navigate = useNavigate();
  
  // ... resto del código ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí usas el nuevo nombre que le diste en el import
      await createProductService(product);
      navigate("/products"); 
    } catch (err) {
      console.error(err);
    }
  };

  // ... resto del componente ...
}

export default CreateProductPage;