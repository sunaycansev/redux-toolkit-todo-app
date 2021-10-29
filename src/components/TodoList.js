import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "./Loading";

import {
  removeTodo,
  selectFilteredTodos,
  getTodosAsync,
  toggleTodoAsync,
} from "../redux/todos/todosSlice";
import Error from "./Error";

export default function TodoList() {
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  function handleDestroy(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure!")) {
      dispatch(removeTodo(id));
    }
  }
  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <Loading />}
      </div>

      <ul className="todo-list">
        {filteredTodos.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                checked={item.completed}
                type="checkbox"
                onChange={() => dispatch(toggle({ id: item.id }))}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => handleDestroy(item.id)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
