import { useState } from "react";

function InteractionModal({ policy, onClose, onSubmit }) {
  const [result, setResult] = useState("contacted");
  const [note, setNote] = useState("");

  if (!policy) return null;

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(policy.id, {
      result,
      note,
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Registrar gestión</h2>

        <p>
          <strong>Cliente:</strong> {policy.client.name}
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Resultado
            <select
              value={result}
              onChange={(event) => setResult(event.target.value)}
            >
              <option value="contacted">Contactado</option>
              <option value="no_answer">No contestó</option>
              <option value="interested">Interesado</option>
              <option value="renewed">Renovó</option>
              <option value="not_interested">No interesado</option>
            </select>
          </label>

          <label>
            Nota
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ej: Cliente solicita nueva cotización."
            />
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit">
              Guardar gestión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InteractionModal;