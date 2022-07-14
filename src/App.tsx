import { FC } from 'react';
import Header from 'components/pages/Header';
import PrefectureChoices from 'containers/pages/PrefectureChoices';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';

const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <PrefectureChoices />
        {process.env.NODE_ENV === 'development' && ( //
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
