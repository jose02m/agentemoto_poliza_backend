import { useState } from "react";

function RenewModal({ policy, onClose, onSubmit }) {
  const [expirationDate, setExpirationDate] = useState("");

  if (!policy) return null;

  function handleSubmit(event) {
    event.preventDefault();

    if (!expirationDate) {
      return;
    }

    onSubmit(policy.id, expirationDate);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Renovar póliza</h2>

        <p>
          <strong>Cliente:</strong> {policy.client.name}
        </p>

        <p>
          <strong>Póliza:</strong> {policy.policy_type} - {policy.insurer}
        </p>

        <p>
          <strong>Vencimiento actual:</strong> {policy.expiration_date}
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Nueva fecha de vencimiento
            <input
              type="date"
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.target.value)}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit">
              Renovar póliza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RenewModal;