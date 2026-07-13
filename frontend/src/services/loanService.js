import axios from "axios";

const API_URL = "http://localhost:3002/api/loans";

export const createLoan = async (amount, interestRate, document) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("amount", amount);
  formData.append("interest_rate", interestRate);

  if (document) {
    formData.append("document", document);
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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