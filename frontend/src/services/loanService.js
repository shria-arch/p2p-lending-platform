import axios from "axios";

const API_URL = "http://16.16.34.145:3002/api/loans";

export const createLoan = async (amount, interestRate) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    {
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