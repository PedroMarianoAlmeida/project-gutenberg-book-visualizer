import { doc, getDoc } from "firebase/firestore";
import { database } from "@/config/databaseConfig";

import { asyncWrapper } from "@/utils/asyncWrapper";

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
