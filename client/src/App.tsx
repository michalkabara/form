import "./App.css";
import { Form } from "./components/Form";
import { UsersTable } from "./components/UsersTable";

function App() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <Form />
      <UsersTable />
    </div>
  );
}

export default App;
