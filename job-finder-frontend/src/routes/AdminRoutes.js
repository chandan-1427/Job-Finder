// src/routes/AdminRoutes.jsx
import { Route } from "react-router-dom";
import Layout from "../components/Layout";
import RequireAdmin from "../components/RequireAdmin";
import AdminPanel from "../pages/AdminPanel";

const AdminRoutes = () => (
  <Route
    path="/admin"
    element={
      <RequireAdmin>
        <Layout>
          <AdminPanel />
        </Layout>
      </RequireAdmin>
    }
  />
);

export default AdminRoutes;
