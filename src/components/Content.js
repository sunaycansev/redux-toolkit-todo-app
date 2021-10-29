import TodoList from "./TodoList";
import ContentFooter from "./ContentFooter";

export default function Content() {
  return (
    <>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>
      <ContentFooter />
    </>
  );
}
