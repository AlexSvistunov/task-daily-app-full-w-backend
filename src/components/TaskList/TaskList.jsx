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

  const { email, token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const response = dispatch(getTodos(token));
    console.log(response)
  }, [dispatch, token]);


  return <div></div>;
};

export default TaskList;

// только со второго раза изменяет на done, так как useState =)

// сделать отдельный элемент =) todoItem
