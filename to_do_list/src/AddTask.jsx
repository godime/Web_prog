import { useState } from "react";

const ToDoForm = ({ addTask }) => {
  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    addTask(input);
    setInput("");
  };

  return (
    <form onSubmit={submitHandler} className="glass-form">
      <input
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Добавить задачу..."
        className="glass-input"
      />
      <button className="glass-btn-add">✚</button>
    </form>
  );
};

export default ToDoForm;
