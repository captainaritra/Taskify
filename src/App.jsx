import AddTodo from "./components/myComponents/AddTodo";
import Todos from "./components/myComponents/Todos";

function App() {
  return (
    <>
      <div className="text-center max-w-2xl m-auto">
        {/* <h1 className="text-center text-9xl mb-10">Taskify</h1> */}
        <AddTodo />
        <Todos />
      </div>
    </>
  );
}

export default App;
  