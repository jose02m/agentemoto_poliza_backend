import { useEffect, useState } from "react";
import {
  getDashboard,
  createInteraction,
  renewPolicy,
} from "../api/dashboardApi";
import SummaryCards from "../components/SummaryCards";
import PolicyTable from "../components/PolicyTable";
import InteractionModal from "../components/InteractionModal";
import RenewModal from "../components/RenewModal";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedRenewPolicy, setSelectedRenewPolicy] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch {
      setError("No se pudo cargar el dashboard.");
    }
  }

  async function handleCreateInteraction(policyId, payload) {
    await createInteraction(policyId, payload);
    setSelectedPolicy(null);
    await loadDashboard();
  }

  async function handleRenewPolicy(policyId, expirationDate) {
    await renewPolicy(policyId, expirationDate);
    setSelectedRenewPolicy(null);
    await loadDashboard();
  }

  if (error) return <p className="error-message">{error}</p>;
  if (!dashboard) return <p className="loading-message">Cargando...</p>;

const policies = [
  ...dashboard.renewable,
  ...dashboard.upcoming,
  ...dashboard.expired,
  ...dashboard.active,
].sort((a, b) => {
  const priority = {
    renewable: 1,
    upcoming: 2,
    expired: 3,
    active: 4,
  };

  if (priority[a.classification] !== priority[b.classification]) {
    return priority[a.classification] - priority[b.classification];
  }

  return new Date(a.expiration_date) - new Date(b.expiration_date);
});

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Agentemotor · Gestión de pólizas</span>
          <h1>Hola, María 👋</h1>
          <p>
            Visualiza, prioriza y gestiona renovaciones dentro de la ventana
            crítica de 30 días.
          </p>
        </div>

        <div className="hero-pill">
          <span>Hoy</span>
          <strong>{new Date().toLocaleDateString("es-CO")}</strong>
        </div>
      </section>

      <SummaryCards summary={dashboard.summary} />

      <PolicyTable
        policies={policies}
        onManage={setSelectedPolicy}
        onRenew={setSelectedRenewPolicy}
      />

      <InteractionModal
        policy={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        onSubmit={handleCreateInteraction}
      />

      <RenewModal
        policy={selectedRenewPolicy}
        onClose={() => setSelectedRenewPolicy(null)}
        onSubmit={handleRenewPolicy}
      />
    </main>
  );
}

export default Dashboard;