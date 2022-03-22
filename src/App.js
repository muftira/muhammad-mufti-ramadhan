import logo from './logo.svg';
import './App.css';
import Todo from './component/todo';
import Login from './component/login';
import { Routes, Route, Link } from "react-router-dom";
import Register from './component/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
