import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import './styles.css';

interface Props {
  todo: Todo,
  todos: Todo[],
  index: number,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    )
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    )
    setEdit(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form 
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos__single--text' ref={inputRef} />
          ) : (
            todo.isDone ? (
              <s className='todos__single--text'>{todo.todo}</s>
            ) : (
              <span className='todos__single--text'>{todo.todo}</span>
            )
          )}
          
          <div>
            <span className="icon" onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit)
              }
            }
            }>
              <AiFillEdit /></span>
            <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
            <span className="icon" onClick={() => handleTodo(todo.id)}><MdDone /></span>
          </div>

        </form>
      )}
    </Draggable>

  )
}

export default TodoItem
