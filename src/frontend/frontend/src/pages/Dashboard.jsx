import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";
import SummaryCards from "../components/SummaryCards";
import PolicyTable from "../components/PolicyTable";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      setError("No se pudo cargar el dashboard.");
    }
  }

  if (error) return <p>{error}</p>;
  if (!dashboard) return <p>Cargando...</p>;

  const policies = [
    ...dashboard.renewable,
    ...dashboard.upcoming,
    ...dashboard.expired,
    ...dashboard.active,
  ];

  return (
    <main className="container">
      <header className="page-header">
        <h1>Gestión de renovaciones</h1>
        <p>
          Pólizas clasificadas según la ventana crítica de renovación de 30 días.
        </p>
      </header>

      <SummaryCards summary={dashboard.summary} />

      <PolicyTable policies={policies} />
    </main>
  );
}

export default Dashboard;