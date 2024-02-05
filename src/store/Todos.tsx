import { ReactNode, createContext, useContext, useState } from "react";


 type TodosProviderProps = {
    children: ReactNode
 }
type Todo = {
    id:string;
    task: string;
    completed: boolean;
    createAt : Date;
}
 type TodosContext = {
    todos:Todo[];
    handleAddToDO:(task:string) => void; // call signature
    toggleTodoAsComplete:(id:string) => void;
    handleDelete:(id:string) => void;
 }

const TodosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({children}:TodosProviderProps)=>{

    const [todos,setTodos] = useState<Todo[]>(()=>{
        try {
            const newTodos = localStorage.getItem("todos") || "[]" ;
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return [];
        }
    })

const handleAddToDO = (task:string) =>{
    setTodos((prev)=>{
        const newTodos:Todo[] = [
            {
                id:Math.random().toString(),
                task: task,
                completed: false,
                createAt: new Date()
            },
            ...prev
        ]
        // console.log("my prevData" + prev);
        
        // console.log(newTodos)
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos;
    })
}

//select list item

const toggleTodoAsComplete = (id:string)=>{
    setTodos((prev)=>{
        const newTodos = prev.map((value)=>{
            if(value.id === id){
                return{...value, completed:!value.completed}
            }
            return value;
        })
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos
    })
}

// delete list item

const handleDelete = (id:string) =>{
    setTodos((prev)=>{
        const newTodos = prev.filter((value)=> value.id !==id)
        localStorage.setItem("todos", JSON.stringify(newTodos))
        return newTodos;
    })
}

    return (
        <TodosContext.Provider value={{todos,handleAddToDO, toggleTodoAsComplete, handleDelete}}>
            {children}
        </TodosContext.Provider>
    )
}

//consumer

export const UseTodos = () =>{
    const todosConsumer = useContext(TodosContext)
    if(!todosConsumer){
        throw new Error("UseTodos used outside of Provider")
    }
    return todosConsumer;
}