import { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";

import "./Aside.css";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";

const Aside = ({ currentDay, changeDay }) => {
  const todos = useSelector((state) => state.todos.todoList)
  return (
    <aside className="aside">
      <div className="aside__inner">
        <Link className="logo aside__logo" to={ROUTES.LANDINGPAGE}></Link>
        <Calendar
          className="aside__calendar"
          value={currentDay}
          onChange={changeDay}
        />

        <ul className="tasks">
          <h3 className="tasks__title">Tasks</h3>
          <li className="task">
            <span className="task__name">For this day</span>
            <span className="task__amount">
              {todos.length}
            </span>
          </li>
          
         
        </ul>

      </div>
    </aside>
  );
};

export default Aside;
