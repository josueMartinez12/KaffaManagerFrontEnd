import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosInstance"; 
import { updateUser } from "../../services/userService";

function EditUserPage() {
  const { id } = useParams(); // Obtiene el ID del usuario de la URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: ""
  });

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUserData({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role
        });
      } catch (err) {
        setError("No se pudo cargar la información del usuario");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, userData);
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar");
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando datos...</p>;

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: "500px" }}>
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0">Editar Usuario</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de Usuario</label>
              <input type="text" name="username" className="form-control" value={userData.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={userData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select name="role" className="form-select" value={userData.role} onChange={handleChange}>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-warning flex-grow-1">Actualizar Datos</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/users")}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUserPage;