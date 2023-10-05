import { useState, useEffect } from "react";
import { axiosInstance } from "../database/axiosInstance";

export interface Score {
  _id: string;
  userName: string;
  score: number;
  createdAt: string;
}

const openIndexedDB = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("scores", { keyPath: "_id" });
    };

    request.onsuccess = () => resolve(request.result);

    // Manejar el error utilizando la función 'reject'
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

const saveScoresToIndexedDB = async (scores: Score[]) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(["scores"], "readwrite");
    const objectStore = transaction.objectStore("scores");

    scores.forEach((score) => {
      objectStore.add(score);
    });

    return new Promise<void>((resolve) => {
      transaction.oncomplete = () => resolve();
    });
  } catch (error: any) {
    throw new Error("There was an error saving scores: " + error.message);
  }
};

const getScoresFromIndexedDB = async () => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(["scores"]);
    const objectStore = transaction.objectStore("scores");
    const getRequest = objectStore.getAll();

    return new Promise<Score[]>((resolve) => {
      getRequest.onsuccess = () => resolve(getRequest.result);
    });
  } catch (error: any) {
    throw new Error("There was an error fetching scores: " + error.message);
  }
};

export const useScores = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axiosInstance.get("/score");
        setScores(response.data);

        // Se guarda en IndexedDB
        await saveScoresToIndexedDB(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          console.error("Error 404: Not found. Endpoint does not exist.");
        } else {
          console.error("An error occurred:", error);
        }
      }
    };

    const fetchFromIndexedDB = async () => {
      try {
        const offlineScores = await getScoresFromIndexedDB();
        setScores(offlineScores);
      } catch (error) {
        console.error(
          "An error occurred while fetching from IndexedDB:",
          error
        );
      }
    };

    if (isOnline) {
      fetchScores();
    } else {
      fetchFromIndexedDB();
    }
  }, [isOnline]);

  return scores;
};
