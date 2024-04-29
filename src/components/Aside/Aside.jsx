import { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";

import "./Aside.css";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";

const Aside = ({ currentDay, changeDay }) => {
  const todos = useSelector((state) => state.todos.todoList)
  // const todosForDate = todos && todos.filter((el) => el['day'] === currentDay.toLocaleDateString()).length
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

              {/* {todosForDate && todosForDate.length} */}
            </span>
          </li>
          {/* {todosForDate > 0 && (
            <li className="task">
            <span className="task__name">Done</span>
            <span className="task__amount">
            {todos && todos.filter((el) => el['day'] === currentDay.toLocaleDateString() && el['done']).length}
            </span>
          </li>
          )}  */}
         
        </ul>

        {/* <ul className="lists">
          <h3 className="lists__title">Lists</h3>
          <li className="list">
            <span className="list__title">Daily Routine</span>
            <span className="list__amount">2</span>
          </li>

          <li className="list">
            <span className="list__title">Study</span>
            <span className="list__amount">0</span>
          </li>
        </ul> */}
      </div>
    </aside>
  );
};

export default Aside;
