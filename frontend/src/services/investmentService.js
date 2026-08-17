import axios from "axios";

const API_URL = "http://16.16.34.145:3002/api/investments";

export const createInvestment = async (loanId, amountFunded) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/${loanId}`,
    {
      amount_funded: amountFunded,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};