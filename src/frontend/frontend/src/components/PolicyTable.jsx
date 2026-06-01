function getStatusLabel(classification) {
  const labels = {
    renewable: "Renovable",
    upcoming: "Próxima a vencer",
    expired: "Fuera de ventana",
    active: "Activa",
  };

  return labels[classification] || classification;
}

function PolicyTable({ policies }) {
  return (
    <section className="table-card">
      <h2>Trabajo pendiente</h2>

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
              <td>{policy.client.name}</td>
              <td>{policy.client.phone}</td>
              <td>{policy.policy_type}</td>
              <td>{policy.insurer}</td>
              <td>{policy.expiration_date}</td>
              <td>
                <span className={`badge ${policy.classification}`}>
                  {getStatusLabel(policy.classification)}
                </span>
              </td>
              <td>{policy.interactions_count}</td>
              <td>
                {policy.last_interaction
                  ? policy.last_interaction.note
                  : "Sin gestión"}
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => console.log(policy.id)}>
                  Gestionar
                </button>
                <button className="btn btn-success" onClick={() => console.log(policy.id)}>
                  Renovar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default PolicyTable;
