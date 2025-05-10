import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { toast } from "react-toastify";
import { message } from "antd";
import { useNavigate } from "react-router";

const firebaseConfig = {
  apiKey: "AIzaSyBlfyk7uKyb8oMyfi50nBAz3DQtWvKE1QM",
  authDomain: "app-pet-vital.firebaseapp.com",
  projectId: "app-pet-vital",
  storageBucket: "app-pet-vital.firebasestorage.app",
  messagingSenderId: "803600005563",
  appId: "1:803600005563:web:bf152b55ab7a20c1a8ac9e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// const navigate = useNavigate();

//sign in with username and pwd using firebase
export const logInWithEmailAndPassword = async (
  email,
  password,
  navigate,
  setError
) => {
  console.log({ email, password });

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log({ res });
    navigate("/"); // Redirect user after successful login
    message.success("Login successfully!");
  } catch (err) {
    console.error(err);
    setError(err);
    // alert(err.message);
    message.error(err.code.split("/")[1]);
  }
};

//sign out
export const logout = () => {
  signOut(auth);

  toast.success("Logged out successfully!", {
    position: "bottom-right",
  });
};
