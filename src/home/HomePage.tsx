import React, { useEffect, useState } from "react";
import './HomePage.css'
import './Background.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { logout, auth, db } from '../login/firebase';
import { query, collection, getDocs, where } from "firebase/firestore";

function HomePage() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    fetchUserName();
  }, [user, loading]);

  return (
       <><h1>Typescript Project</h1><header className="sticky">
      <NavLink to="/home" className="button rounded">
        <span className="icon-home"></span>
        Home
      </NavLink>
      <NavLink to="/projects" className="button rounded">
        Projects
      </NavLink>
          <button className="logout__btn" onClick={logout}>
            Logout
            {/* <img id="image" src='https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif' style={{ width: 20, visibility: "hidden" }} alt= "loading"/> */}
          </button>
    </header>

    <div className="dashboard">
      <div className="dashboard__container">
        Welcome:
        <div>{name}</div>
        Logged in with:
        <div>{user?.email}</div>
      </div>
    </div>
    </>
  );
  }
export default HomePage;