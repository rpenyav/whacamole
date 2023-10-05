import { useMutation } from "react-query";
import { axiosInstance } from "../database/axiosInstance";

export interface ScoreData {
  userName: string;
  score: number;
}

export const useManageScore = () => {
  const updateScoreMutation = useMutation((newData: ScoreData) => {
    console.log("Contenido de newData:", newData); // Agrega esta línea para imprimir newData
    return axiosInstance.post("/score", newData);
  });

  return {
    updateScoreMutation,
  };
};
