import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule, setModules } from "./modulesReducer";
import * as client from "./client";

function ModuleList() {
  const { courseId } = useParams();

  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const dispatch = useDispatch();
  useEffect(() => {
    findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);  
  const handleAddModule = () => {
    createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };
  const handleDeleteModule = (moduleId) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  return (
    <ul className="list-group">
        <input
          className="form-control"
          value={module.name}
          onChange={(e) =>
            dispatch(setModule({ ...module, name: e.target.value }))
          }/>
        <textarea
          className="form-control"
          value={module.description}
          onChange={(e) =>
            dispatch(setModule({ ...module, description: e.target.value }))
          }/>
        <li className="list-group-item">
        <button 
          className = "btn btn-outline-danger"
          onClick={handleAddModule}>
          Add
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={handleUpdateModule}>
          Update
        </button>
      </li>
      <div className='wd-modules'>
          {modules
            .filter((module) => module.course === courseId)
            .map((module, index) => (
              <li key={index} className="list-group-item">
                
                <i className="fa-solid fa-grip-vertical"></i>
                <i className='fas fa-circle-check'></i>
                <h3>{module.name}</h3>
                <p>{module.description}</p>
                <i className="fa-solid fa-square-pen fa-lg"
                  onClick={() => dispatch(setModule(module))}>
                </i>
                <i className="fa-solid fa-trash fa-lg"
                  onClick={() => handleDeleteModule(module._id)}>
                </i>
              </li>
          ))
          }
        </div>
    </ul>
  );
}
export default ModuleList;