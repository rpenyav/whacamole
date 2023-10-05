import { useMutation } from "react-query";
import axios from "axios";

export interface ScoreData {
  userName: string;
  score: number;
}

export const useManageScore = () => {
  const updateScoreMutation = useMutation((newData: ScoreData) =>
    axios.post("/score", newData)
  );

  return {
    updateScoreMutation,
  };
};
