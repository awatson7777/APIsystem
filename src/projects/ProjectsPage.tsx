import React, { Fragment, useEffect, useState } from 'react';
import ProjectList from './ProjectList';
import './ProjectsPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../state';
import { loadProjects } from './state/projectActions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ProjectState } from './state/projectTypes';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { logout, auth, db } from '../login/firebase';
import { query, collection, getDocs, where } from "firebase/firestore";


function ProjectsPage() {

  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

    const loading = useSelector(
        (appState: AppState) => appState.projectState.loading
      );
      const projects = useSelector(
        (appState: AppState) => appState.projectState.projects
      );
      const error = useSelector(
       (appState: AppState) => appState.projectState.error
      );
      const currentPage = useSelector(
        (appState: AppState) => appState.projectState.page
      );

  const handleMoreClick = () => {
    dispatch(loadProjects(currentPage + 1));
      };

  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();
  useEffect(() => {
        dispatch(loadProjects(1));
      }, [dispatch])

      
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
    if (loadingAuth) return;
    if (!user) return navigate("/login");

    fetchUserName();
  }, [user, loadingAuth]);
  
  
return (
  <Fragment>
     <h1>Typescript Project</h1>

     <header className="sticky">

        <NavLink to="/home"  className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>

        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>

        <button className="logout__btn" onClick={logout}>
            Logout
          </button>

      </header>



     {errorAuth && (
        <div className="row">
          <div className="card large error">
          </div>
        </div>
      )}
      <ProjectList projects={projects} />
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More
              <NavLink to="/logout"></NavLink>
              </button>
            </div>
          </div>
        </div>
      )}
{loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
  </Fragment>
);
  }

export default ProjectsPage;