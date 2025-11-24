import './CounterPage.css';
import Counter from '@/widgets/Counter/Counter';

export default function CounterPage() {
  return (
    <div className="app-container">
      <Counter counterName={'Биба'} />
      <Counter initialValue={10} />
    </div>
  );
}
