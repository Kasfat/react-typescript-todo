import { UseTodos } from "../store/Todos";
import { useSearchParams } from "react-router-dom";

const TodoList = () => {
  const { todos, toggleTodoAsComplete, handleDelete } = UseTodos();

  const [searchParams] =useSearchParams();
  const todosData = searchParams.get("todos");

  let filterData = todos;

  if(todosData === "active"){
    filterData = filterData.filter((task)=> !task.completed)
  }
  if(todosData === "completed"){
    filterData = filterData.filter((task)=> task.completed)
  }

  return (
    <>
      <ul className="main-task">
        {filterData.map((value) => {
          return (
            <li key={value.id}>
              <input
                type="checkbox"
                id={`todo-${value.id}`}
                checked={value.completed}
                onChange={() => toggleTodoAsComplete(value.id)}
              />
              <label htmlFor={`todo-${value.id}`}>{value.task}</label>
              {value.completed && (<button type="button" onClick={()=>handleDelete(value.id)}>Delete</button>)}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
