import { useState } from 'react';
import './Counter.css';

type CounterProps = {
  counterName?: string;
  initialValue?: number;
};

export default function Counter({ counterName, initialValue }: CounterProps) {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount((current) => current - 1);
  };

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <>
      <h2>{counterName ? counterName + '-счётчик' : ''}</h2>
      <div className="counter-container">
        <div className="counter">{count}</div>
        <div className="counter-controls">
          <button className="increment" onClick={increment}>
            +
          </button>
          <button className="decrement" onClick={decrement}>
            -
          </button>
        </div>
        <button className="reset" onClick={resetCounter}>
          reset
        </button>
      </div>
    </>
  );
}
