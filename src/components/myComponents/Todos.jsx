import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { removeTodo, updateTodo, setTodos, toggleTodo } from "@/features/todos/todoSlice";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

function Todos() {
  const [editId, setEditId] = useState();
  const [editedText, setEditedText] = useState();

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditedText(todo.todoTitle);
  };

  const handleUpdate = (id) => {
    if (!editedText.trim()) return;
    dispatch(updateTodo({ id, todoTitle: editedText }));
    setEditId(null);
  };

  const handleToggle = (todoId, e) => {
    // Prevent toggle if clicking on buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    dispatch(toggleTodo(todoId));
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      dispatch(setTodos(savedTodos));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Tasks ✨
      </h2>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
          >
            <div  className="flex items-center justify-between gap-4 cursor-pointer"
            onClick={(e) => editId !== todo.id && handleToggle(todo.id, e)}
            >
              {editId === todo.id ? (
                <div className="flex-1 mr-4">
                  <Input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full px-3 py-2 text-lg text-gray-700 bg-white border rounded-md focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
              ) : (
                  <div className="flex-1 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed || false}
                    onChange={() => {}}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span 
                    className={`text-lg ${
                      todo.completed 
                        ? 'line-through text-gray-400' 
                        : 'text-gray-700'
                    }`}
                  >
                    {todo.todoTitle}
                  </span>
                </div>
              )}
              <div className="space-x-2">
                {editId === todo.id ? (
                  <Button
                    onClick={() => handleUpdate(todo.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Save 💾
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleEdit(todo)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit ✏️
                  </Button>
                )}

                <Button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Remove 🗑️
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No tasks yet. Add some! 🚀
        </p>
      )}
    </div>
  );
}

export default Todos;
