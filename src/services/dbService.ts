import { doc, getDoc } from "firebase/firestore";
import { database } from "@/config/databaseConfig";

// https://firebase.google.com/docs/firestore/query-data/get-data
export const test = async () => {
  const docRef = doc(database, "test", "first");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
