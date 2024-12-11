"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchIncomeTaxCode = async () => {
  const { data } = await axios.get("https://itaxeasy.com/api/downloads/gold-silver-rate");
  console.log(data); // Inspect the API response
  return data.data; // Return only the 'data' array
};

const IncomeTaxCodeComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["incomeTaxCode"],
    queryFn: fetchIncomeTaxCode,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <p>Assessment Year: {item.assessmentYear}</p>
          <p>Gold Rate (24C/10g): {item.stGoldRate24CPer10Grams}</p>
          <p>Silver Rate (1kg): {item.stSilverRateFor1Kg}</p>
        </li>
      ))}
    </ul>
  );
};

export default IncomeTaxCodeComponent;
