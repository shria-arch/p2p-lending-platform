import axios from "axios";

const API_URL = "http://localhost:3002/api/loans";

export const createLoan = async (amount, interestRate) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    {
      borrower_id: user.id,
      amount,
      interest_rate: interestRate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getLoans = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};