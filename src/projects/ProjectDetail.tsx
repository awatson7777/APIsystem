import React from 'react';
import { Project } from './Project';
import './index.css';
import { Link, NavLink } from 'react-router-dom';

interface ProjectDetailProps {
  project: Project;
}
export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          <img
            className="rounded"
            alt={project.name}
          />
          <section className="section dark">
            <h3 className="strong">
              <strong>{project.name}</strong>
            </h3>
            <p>{project.description}</p>
            <p>Budget : {project.budget}</p>

            <p>Signed: {project.contractSignedOn.toLocaleDateString()}</p>
            <p>
              <mark className="active">
                {' '}
                {project.isActive ? 'active' : 'inactive'}
              </mark>
            </p>
            <NavLink to="/projects" className="button rounded">
          Back
        </NavLink>
          </section>
        </div>
      </div>
    </div>
  );
}