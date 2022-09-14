import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle, } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import "./Background.css";
import ImageButton from 'react-image-button'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <div className="login">
      <h1>My TypeScript Project</h1>
      <div className="login__container">
        Login With Email
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        Or Login With:
        <button className="login__btn login__google" onClick={signInWithGoogle}>
        <img id="image" src='https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg' style={{ width: 100 }} alt= "loading"/>
        </button>
        {/* <button className="login__btn login__github" onClick={}>
          Login with GitHub
        </button>  */}
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
