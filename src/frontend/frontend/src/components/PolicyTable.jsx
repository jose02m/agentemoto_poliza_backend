import { useMemo, useState } from "react";

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.max(1, Math.ceil(policies.length / pageSize));

  const paginatedPolicies = useMemo(() => {
    const start = (page - 1) * pageSize;
    return policies.slice(start, start + pageSize);
  }, [policies, page, pageSize]);

  function handlePageSizeChange(event) {
    setPageSize(Number(event.target.value));
    setPage(1);
  }

  return (
    <section className="table-card">
      <div className="table-header">
        <div>
          <span className="eyebrow">Trabajo pendiente</span>
          <h2>Pólizas</h2>
        </div>

        <div className="table-controls">
          <label>
            Mostrar
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>
          </label>

          <span>
            {paginatedPolicies.length} de {policies.length} pólizas
          </span>
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
            {paginatedPolicies.map((policy) => (
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
                      <span>💬</span>
                      Gestionar
                    </button>

                    <button className="btn-primary" onClick={() => onRenew(policy)}>
                      <span>🔄</span>
                      Renovar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}

export default PolicyTable;