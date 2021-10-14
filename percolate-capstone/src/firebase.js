// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//store the api key and other protected info into the environment
//add this file to git ignore
export const firebaseApp = initializeApp({
  apiKey: process.env.KEY,
  authDomain: "percolate-1cebe.firebaseapp.com",
  projectId: "percolate-1cebe",
});

const db = getFirestore(firebaseApp);

export default db;
