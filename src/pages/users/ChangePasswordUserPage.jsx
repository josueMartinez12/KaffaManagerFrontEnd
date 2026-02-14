import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";

function ChangePasswordUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setError("Las nuevas contraseñas no coinciden");
    }

    try {
      // Ajusta este endpoint según tu backend (ej: /users/change-password/:id)
      await api.put(`/users/change-password/${id}`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setSuccess(true);
      setTimeout(() => navigate("/users"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar la contraseña");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow-sm" style={{ maxWidth: "450px" }}>
        <div className="card-body">
          <h4 className="card-title mb-4">Cambiar Contraseña</h4>
          
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">¡Contraseña actualizada con éxito!</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Contraseña Actual</label>
              <input type="password" name="currentPassword" className="form-control" onChange={handleChange} required />
            </div>
            <hr />
            <div className="mb-3">
              <label className="form-label">Nueva Contraseña</label>
              <input type="password" name="newPassword" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Confirmar Nueva Contraseña</label>
              <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-danger">Guardar Cambios</button>
              <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Volver</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordUserPage;