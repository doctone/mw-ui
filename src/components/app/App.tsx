import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../header/Header';
import Task2 from '../task2/Task2';

import styles from './App.module.scss';

/*
 * Available endpoints
 * http://localhost:8000/api/tags - to return all tags in
 * http://localhost:8000/api/tags?tag=fe - to return matching tags
 * http://localhost:8000/api/cars - to return all cars
 * http://localhost:8000/api/cars?tag=ferrari - to return matching cars
 */
const client = new QueryClient();

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={client}>
        <Header />
        <main className={styles.main}>
          <Task2 />
        </main>
      </QueryClientProvider>
    </>
  );
};

export default App;
