function SummaryCards({ summary }) {
  return (
    <section className="summary-grid">
      <article className="summary-card priority">
        <span>Renovables</span>
        <strong>{summary.renewable}</strong>
      </article>

      <article className="summary-card warning">
        <span>Próximas a vencer</span>
        <strong>{summary.upcoming}</strong>
      </article>

      <article className="summary-card danger">
        <span>Fuera de ventana</span>
        <strong>{summary.expired}</strong>
      </article>

      <article className="summary-card">
        <span>Total</span>
        <strong>{summary.total}</strong>
      </article>
    </section>
  );
}

export default SummaryCards;