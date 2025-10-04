import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { addTodo } from "@/features/todos/todoSlice";

function AddTodo() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!todo.trim()) return; // Prevent empty todos
    dispatch(addTodo(todo));
    setTodo("");
  };

  return (
    <>
    <h1 className="text-6xl font-bold mt-8 p-8">Taskify</h1>
    <p className="text-xl font-mono">Turn plans into progress.</p>
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Taskify ✨</h1> */}
        <form onSubmit={addTodoHandler} className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={todo}
              className="flex-1 px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onChange={(e) => setTodo(e.target.value)}
            />
            <Button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
              disabled={!todo.trim()}
            >
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTodo;
