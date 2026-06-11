import { useState, useEffect } from 'react';
import './App.css';
import ToDoForm from "./AddTask";
import ToDo from "./Task";
import axios from 'axios';

const GLASS_STORE = 'glass-app-data';

function App() {
  const [quote, setQuote] = useState('Ожидание данных...');
  const [author, setAuthor] = useState('');
  const [coffeePic, setCoffeePic] = useState('');
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem(GLASS_STORE);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    async function fetchInfo() {
      try {
        const quoteRes = await axios.get('https://dummyjson.com/quotes/random');
        setQuote(quoteRes.data?.quote || 'Нет данных');
        setAuthor(quoteRes.data?.author || '');
      } catch (e) {
        setQuote('Ошибка загрузки цитаты');
      }

      try {
        const coffeeRes = await axios.get('https://api.sampleapis.com/coffee/hot');
        if (coffeeRes.data && coffeeRes.data.length > 0) {
          const randomCoffee = coffeeRes.data[Math.floor(Math.random() * coffeeRes.data.length)];
          setCoffeePic(randomCoffee.image || '');
        }
      } catch (e) {
        setCoffeePic('');
      }
    }
    fetchInfo();
  }, []);

  useEffect(() => {
    localStorage.setItem(GLASS_STORE, JSON.stringify(todos));
  }, [todos]);

  const addTask = (text) => {
    if (text.trim()) {
      const obj = { id: Date.now().toString(), task: text, complete: false };
      setTodos([obj, ...todos]);
    }
  };

  const removeTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, complete: !t.complete } : t
      )
    );
  };

  return (
    <div className="glass-layout">
      <div className="glass-panel main-panel">
        <header className="glass-header">
          <h1>Мои Задачи</h1>
          <span className="task-count">Осталось: {todos.filter(t => !t.complete).length}</span>
        </header>
        
        <ToDoForm addTask={addTask} />
        
        <div className="glass-list">
          {todos.map((t) => (
            <ToDo
              todo={t}
              key={t.id}
              toggleTask={handleToggle}
              removeTask={removeTask}
            />
          ))}
        </div>
      </div>

      <div className="glass-sidebar">
        <div className="glass-widget">
          <h3>Мысль дня</h3>
          <p className="quote-text">«{quote}»</p>
          {author && <p className="quote-author">— {author}</p>}
        </div>
        
        {coffeePic && (
          <div className="glass-widget">
            <h3>Время для перерыва</h3>
            <div className="coffee-img-wrap">
              <img src={coffeePic} alt="Кофе" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;