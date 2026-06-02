function getStatusLabel(classification) {
  const labels = {
    renewable: "Renovable",
    upcoming: "Próxima a vencer",
    expired: "Fuera de ventana",
    active: "Activa",
  };

  return labels[classification] || classification;
}

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function PolicyTable({ policies, onManage, onRenew }) {
  return (
    <section className="table-card">
      <div className="table-header">
        <div>
          <span className="eyebrow">Trabajo pendiente</span>
          <h2>Pólizas</h2>
        </div>

        <div className="table-tools">
          <span>Mostrando {policies.length} pólizas</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Tipo</th>
              <th>Aseguradora</th>
              <th>Vencimiento</th>
              <th>Estado</th>
              <th>Gestiones</th>
              <th>Última gestión</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>
                  <div className="client-cell">
                    <span className="avatar">{getInitials(policy.client.name)}</span>
                    <strong>{policy.client.name}</strong>
                  </div>
                </td>

                <td>{policy.client.phone}</td>
                <td>{policy.policy_type}</td>
                <td>{policy.insurer}</td>
                <td>{formatDate(policy.expiration_date)}</td>

                <td>
                  <span className={`status-tag ${policy.classification}`}>
                    <span className={`status-dot ${policy.classification}`} />
                    {getStatusLabel(policy.classification)}
                  </span>
                </td>

                <td>
                  <span className="count-pill">{policy.interactions_count}</span>
                </td>

                <td className="last-note">
                  {policy.last_interaction
                    ? policy.last_interaction.note
                    : "Sin gestión"}
                </td>

                <td>
                  <div className="action-buttons">
                    <button className="btn-outline" onClick={() => onManage(policy)}>
                      Gestionar
                    </button>

                    <button className="btn-primary" onClick={() => onRenew(policy)}>
                      Renovar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PolicyTable;