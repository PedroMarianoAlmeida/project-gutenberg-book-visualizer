import { doc, getDoc, setDoc } from "firebase/firestore";

import { database } from "@/config/databaseConfig";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { GraphData, graphAiSchema } from "@/services/aiService";

// https://firebase.google.com/docs/firestore/query-data/get-data

export const getBookIdsAlreadyRegistered = () => {
  return asyncWrapper(async () => {
    const docRef = doc(database, "project-meta", "books-registered");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists) throw new Error("Document not founded");
    const data = docSnap.data();

    if (!data || !Array.isArray(data.ids)) {
      throw new Error(
        "Invalid document format: 'ids' is missing or not an array"
      );
    }

    const ids = data.ids.filter((id): id is string => typeof id === "string");

    return { ids };
  });
};

export const getGraphFromDatabase = (bookId: number) => {
  return asyncWrapper(async () => {
    const docRef = doc(database, "graphs", String(bookId));
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists) throw new Error("Document not founded");

    const data = docSnap.data();
    const bokGraphData: GraphData = graphAiSchema.parse(data);
    return { bokGraphData };
  });
};

interface SaveGraphFromDatabase {
  bookId: number;
  bookGraph: GraphData;
}
export const saveGraphFromDatabase = ({
  bookId,
  bookGraph,
}: SaveGraphFromDatabase) => {
  return asyncWrapper(async () => {
    const docRef = doc(database, "graphs", String(bookId));
    setDoc(docRef, bookGraph);
  });
};
