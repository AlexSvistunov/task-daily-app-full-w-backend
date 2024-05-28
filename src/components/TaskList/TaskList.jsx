import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "../../store/slices/todoSlice";
import { useAuth } from "../../hooks/use-auth";
import TaskModal from "../TaskModal/TaskModal";
import { useState } from "react";
import { HashLoader } from "react-spinners";

import "./TaskList.css";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({
  showListHandler,
  currentDate,
  index,
  setIndex,
  arrayListInfo,
  setArrayListInfo,
  isSortedByTags,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  console.log(currentDate)

  const { token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequest = async () => {
      await dispatch(getTodos({ token, currentDate }));
    };

    fetchRequest();
  }, [dispatch, token, currentDate]);


  const todos = useSelector((state) => state.todos.todoList)
  const sortedTodos = useSelector(state => state.todos.sortedList)
  console.log(sortedTodos)
  const isLoading = useSelector((state) => state.todos.isLoading);


  if (isLoading) {
    return (
      <section
        className="task-list"
        style={{
          margin: "200px auto",
          height: "200px",
          width: "200px",
        }}
      >
        <HashLoader color="#CA87F4" size={150} />
      </section>
    );
  }

  if(isSortedByTags) {
    return <div>
     {sortedTodos.map((sortedTodo, index) => (
      <div key={index}>
        <h2>{Object.keys(sortedTodo)}</h2>
        <div className="tasks-list">{Object.values(sortedTodo).map(sortedTodoObject => (
          sortedTodoObject.map(el => (
            <TaskItem key={el.id}
            color={el.color_code}
            setModalIsOpen={setModalIsOpen}
            setDataModal={setDataModal}
            dataModal={dataModal}
            el={el}
            index={el.currentIndex}/>
          ))
        ))}</div>
      </div>
     ))}
    </div>
  }

  return (
    <>
      <section className="task-list">
        <ul className="tasks-list">
          {todos.length ? (
            todos
              .filter((element) => element.completed === false)
              .map((el) => (
                <TaskItem
                  key={el.id}
                  color={el.color_code}
                  setModalIsOpen={setModalIsOpen}
                  setDataModal={setDataModal}
                  dataModal={dataModal}
                  el={el}
                  index={el.currentIndex}
                />
              ))
          ) : (
            <img
              src="/nothing-here.png"
              style={{ display: "block", margin: "200px auto" }}
            ></img>
          )}
        </ul>

        {todos.length ? (
          <div className="task-list__done">
            <h3 className="task-list__done-title">Done</h3>
            <ul className="tasks-list__done">
              {todos.length ? (
                todos
                  .filter((element) => element.completed === true)
                  .map((el) => (
                    <TaskItem
                      key={el.id}
                      color={el.color_code}
                      setModalIsOpen={setModalIsOpen}
                      setDataModal={setDataModal}
                      dataModal={dataModal}
                      el={el}
                      index={el.currentIndex}
                    />
                  ))
              ) : (
                <img
                  src="/nothing-here.png"
                  style={{ display: "block", margin: "200px auto" }}
                ></img>
              )}
            </ul>
          </div>
        ) : null}
        <button className="task-list__btn" onClick={showListHandler}>
          <span className="material-symbols-outlined">add_task</span>
        </button>

        {modalIsOpen && (
          <TaskModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            dataModal={dataModal}
            setDataModal={setDataModal}
            index={index}
            setIndex={setIndex}
          />
        )}
      </section>
    </>
  );
};

export default TaskList;
