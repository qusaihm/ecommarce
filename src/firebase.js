import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUq4fbysZzIIxatNNSGRnB_u6nO54ye8I",
  authDomain: "ecommerce-app-8e4fa.firebaseapp.com",
  projectId: "ecommerce-app-8e4fa",
  storageBucket: "ecommerce-app-8e4fa.firebasestorage.app",
  messagingSenderId: "393498524966",
  appId: "1:393498524966:web:5ad44c03a9705abd9bd5e7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;