import { IPayload } from "../models/interface";
import { databases, ID } from "../utils";

const dbID: string = import.meta.env.VITE_APPWRITE_DB_ID;
const collectionID: string = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const createDocument = async (payload: IPayload) => {
  console.log("payload", payload);
  const res = await databases.createDocument(dbID, collectionID, ID.unique(), {
    ...payload,
  });

  console.log("res", res);
  return res;
};

const readDocuments = async () => {
  const res = await databases.listDocuments(dbID, collectionID);

  return res;
};

const updateDocument = async (payload: IPayload, id: string) => {
  const res = await databases.updateDocument(dbID, collectionID, id, {
    ...payload,
  });

  return res;
};
const deleteDocument = async (id: string) => {
  const res = await databases.deleteDocument(dbID, collectionID, id);

  return res;
};

export { createDocument, deleteDocument, readDocuments, updateDocument };
