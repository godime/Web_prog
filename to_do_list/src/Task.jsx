const ToDo = ({ todo, toggleTask, removeTask }) => {
  return (
    <div className={`glass-task ${todo.complete ? 'glass-done' : ''}`}>
      <span className="glass-text" onClick={() => toggleTask(todo.id)}>
        {todo.task}
      </span>
      <button className="glass-btn-delete" onClick={() => removeTask(todo.id)}>
        ✕
      </button>
    </div>
  );
};

export default ToDo;