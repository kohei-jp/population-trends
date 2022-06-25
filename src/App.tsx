import { FC } from 'react';
import Header from 'components/pages/Header';
import PrefectureChoices from 'containers/pages/PrefectureChoices';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';

const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <PrefectureChoices />
      </div>
    </QueryClientProvider>
  );
};

export default App;
