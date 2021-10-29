import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
import { Loading } from "./Loading";

export default function Form() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const loading = useSelector((state) => state.todos.addTodoLoading);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        autoFocus
        placeholder="What needs to be done?"
        className="new-todo"
      />

      {loading && <Loading />}
    </form>
  );
}
