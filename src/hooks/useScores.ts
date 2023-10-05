import { useState, useEffect } from "react";
import { axiosInstance } from "../database/axiosInstance";

/**
 *
 *  este hook permite usar indexedDB para los datos fuera de conexion
 *
 *
 */

export interface Score {
  _id: string;
  userName: string;
  score: number;
  createdAt: string;
}

const saveScoresToIndexedDB = async (scores: any[]) => {
  const request = indexedDB.open("myDatabase", 1);

  request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = (event.target as IDBOpenDBRequest).result;
    db.createObjectStore("scores", { keyPath: "_id" });
  };

  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("There was an error");
  });

  const transaction = db.transaction(["scores"], "readwrite");
  const objectStore = transaction.objectStore("scores");

  scores.forEach((score: any) => {
    objectStore.add(score);
  });

  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject("There was an error saving scores");
  });
};

// Get scores from IndexedDB
const getScoresFromIndexedDB = async () => {
  const request = indexedDB.open("myDatabase", 1);

  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("There was an error");
  });

  const transaction = db.transaction(["scores"]);
  const objectStore = transaction.objectStore("scores");
  const getRequest = objectStore.getAll();

  return new Promise<any[]>((resolve, reject) => {
    getRequest.onsuccess = () => resolve(getRequest.result);
    getRequest.onerror = () => reject("There was an error fetching scores");
  });
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

        //se guard en indexDB
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
      const offlineScores = await getScoresFromIndexedDB();
      setScores(offlineScores);
    };

    if (isOnline) {
      fetchScores();
    } else {
      fetchFromIndexedDB();
    }
  }, [isOnline]);

  return scores;
};
