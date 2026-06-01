import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getDashboard() {
  const response = await axios.get(`${API_BASE_URL}/dashboard`);
  return response.data;
}

export async function createInteraction(policyId, payload) {
  const response = await axios.post(
    `${API_BASE_URL}/policies/${policyId}/interactions`,
    payload
  );

  return response.data;
}

export async function renewPolicy(policyId, expirationDate) {
  const response = await axios.put(
    `${API_BASE_URL}/policies/${policyId}/renew`,
    {
      expiration_date: expirationDate,
    }
  );

  return response.data;
}