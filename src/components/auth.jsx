import { useState } from "react";
import {auth} from "../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created:", userCredential.user);
        } catch (err) {
          console.error("Error signing in:", err.message);
          alert(err.message); // Optional: show to user
        }
      };      
    return (
        <div>
            <input placeholder="Email..." onChange={(e)=> setEmail(e.target.value)}/>
            <input placeholder="Password..." type="password" onChange={(e)=> setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button>
        </div>
    );
}