import axios from "axios";

const API_URL = "http://16.16.34.145:3002";

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