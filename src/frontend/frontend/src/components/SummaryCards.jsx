function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Renovables",
      value: summary.renewable,
      description: "Prioridad alta",
      className: "orange",
      icon: "⏱",
    },
    {
      title: "Próximas a vencer",
      value: summary.upcoming,
      description: "Dentro de 30 días",
      className: "yellow",
      icon: "📅",
    },
    {
      title: "Fuera de ventana",
      value: summary.expired,
      description: "Requiere atención",
      className: "red",
      icon: "⚠",
    },
    {
      title: "Total pólizas",
      value: summary.total,
      description: "Cartera visible",
      className: "purple",
      icon: "👥",
    },
  ];

  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <article key={card.title} className={`metric-card ${card.className}`}>
          <div className="metric-icon">{card.icon}</div>

          <div>
            <span>{card.title}</span>
            <strong>{card.value}</strong>
            <p>{card.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;