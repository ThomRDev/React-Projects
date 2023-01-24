// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// para la authenticacion
import { getAuth } from "firebase/auth"

// para la base de datos cloudStore
import { getFirestore } from "firebase/firestore/lite"
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBjJeqhuan_HOkKmjEimMTV9kNTqRQnjKs",
//   authDomain: "journal-app-by-thom.firebaseapp.com",
//   projectId: "journal-app-by-thom",
//   storageBucket: "journal-app-by-thom.appspot.com",
//   messagingSenderId: "663165030452",
//   appId: "1:663165030452:web:175b120315e0367b7aba61"
// };
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCsPJiFRIr_tb0IU0-4ibIvsxifAw6UwwU",
//   authDomain: "firechat-e3d55.firebaseapp.com",
//   databaseURL: "https://firechat-e3d55.firebaseio.com",
//   projectId: "firechat-e3d55",
//   storageBucket: "firechat-e3d55.appspot.com",
//   messagingSenderId: "118142173057",
//   appId: "1:118142173057:web:4f748b393acb6217dff280",
//   measurementId: "G-C4MDTPQL3H"
// };

console.log(firebaseConfig)

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
// export const CloudFirestore = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )

// https://softauthor.com/firebase-firestore-add-document-data-using-adddoc/