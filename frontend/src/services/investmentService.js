import axios from "axios";

const API_URL = "http://localhost:3003/api/investments";

export const createInvestment = async (loanId, amountFunded) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    {
      loan_id: loanId,
      investor_id: user.id,
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