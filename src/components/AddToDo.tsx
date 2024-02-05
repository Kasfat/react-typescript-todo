import React, {useState } from 'react'
import { UseTodos } from '../store/Todos';

const AddToDo = () => {
    const [todo, setTodo] = useState("");
    const {handleAddToDO} = UseTodos();

    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        handleAddToDO(todo)
        setTodo("")
    }

  return (
    <form onSubmit={handleFormSubmit}>
        <input type='text' value={todo} onChange={(e)=> setTodo(e.target.value)}/>
        <button type='submit'> Add </button>
    </form>
  )
}

export default AddToDo