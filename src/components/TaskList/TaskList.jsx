import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "../../store/slices/todoSlice";
import { useAuth } from "../../hooks/use-auth";
import TaskModal from "../TaskModal/TaskModal";
import { useState } from "react";
import { get } from "firebase/database";
import { ref } from "firebase/database";
import { getDatabase } from "firebase/database";
import { child } from "firebase/database";
import { HashLoader } from "react-spinners";

import { update } from "firebase/database";

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

  const { email, token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos(token));
  }, []);

  const todos = useSelector((state) => state.todos.todoList);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const todosForDate =
    todos &&
    todos
      .filter((el) => el["day"] === currentDate.toLocaleDateString())
      .sort((a, b) => new Date(a.date) - new Date(b.date));

  const todosTagsArray = [];
  const todosSortTags = [];

  todosForDate.forEach((todo) => {
    if (!todosTagsArray.includes(todo.tag)) {
      todosTagsArray.push(todo.tag);
    } else {
      return;
    }
  });

  todosTagsArray.forEach((tag) => {
    const items = todosForDate.filter((todo) => todo.tag === tag);
    todosSortTags.push({
      [tag]: items,
    });
  });

  console.log(todosSortTags);

  async function updateIsDone(index, isDone) {
    const db = getDatabase();

    const updates = {};

    updates[`users/${token}/${index}/done`] = !isDone;

    update(ref(db), updates)
      .then(() => {
        dispatch(getTodos(token));
        console.log("success");
      })
      .catch((error) => console.log(error.message));
  }

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

  console.log(todosSortTags);

  // console.log(todosSortTags[0]['Daily Routine'][0]);
  todosSortTags?.forEach((tagObject) => {
    tagObject[Object.keys(tagObject)].forEach((el) => console.log(el));
  });
  // {tagObject[Object.keys(tagObject)]}

  if (isSortedByTags && todosForDate.length) {
    return (
      <>
        <div className="sort-list">
          {todosSortTags?.length &&
            todosSortTags?.map((tagObject, index) => (
              <div key={index} className="sort-item">
                <h3 className="sort-item__title">{Object.keys(tagObject)}</h3>
                <div className="sort-item__todo-inner">
                  {tagObject[Object.keys(tagObject)].map((el) => (
                    <TaskItem
                      key={el.title}
                      color={el.color}
                      setModalIsOpen={setModalIsOpen}
                      setDataModal={setDataModal}
                      dataModal={dataModal}
                      el={el}
                      updateIsDone={updateIsDone}
                      index={el.currentIndex}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }

  return (
    <section className="task-list">
      <ul className="tasks-list">
        {todosForDate.length ? (
          todosForDate
            .filter((element) => !element.done)
            .map((el) => (
              <TaskItem
                key={el.title}
                color={el.color}
                setModalIsOpen={setModalIsOpen}
                setDataModal={setDataModal}
                dataModal={dataModal}
                el={el}
                updateIsDone={updateIsDone}
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

      {todosForDate.length ? (
        <div className="task-list__done">
          <h3 className="task-list__done-title">Done</h3>
          <ul className="tasks-list__done">
            {todosForDate.length ? (
              todosForDate
                .filter((element) => element.done)
                .map((el) => (
                  <TaskItem
                    key={el.title}
                    color={el.color}
                    setModalIsOpen={setModalIsOpen}
                    setDataModal={setDataModal}
                    dataModal={dataModal}
                    el={el}
                    updateIsDone={updateIsDone}
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
  );
};

export default TaskList;

// только со второго раза изменяет на done, так как useState =)

// сделать отдельный элемент =) todoItem
