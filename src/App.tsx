import AddToDo from './components/AddToDo'
import TodoList from './components/TodoList'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <main>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <NavBar/>
      <AddToDo/>
      <TodoList/>
    </main>
  )
}

export default App