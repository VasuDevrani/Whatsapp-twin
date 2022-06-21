import React from "react";
import { auth, provider } from "../firebase";
import './Login.css'
import { actionTypes } from "./reducer";
import { useStateVAlue } from "./StateProvider";

export default function Login() {

    const [{user}, dispatch] = useStateVAlue();

    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then (result => (
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        ))
        .catch((err) => (console.log(err.message)));
    }

    console.log(user);

  return (

    <div className="login">
      <div className="login-cont">
        <img
          src="https://cdn.iconscout.com/icon/free/png-128/whatsapp-42-189793.png"
          alt="whatsappBRO"
        />
      </div>
      <div className="login-text">
        <h1>Sign in to whatsappBRO</h1>
      </div>
      <button className = "signin-btn" onClick={signIn} type="submit">Sign In With Google</button>
    </div>
  );
}
