import useSWR from "swr";
import logo from "./logo.svg";
import "./App.css";

function useConfig() {
  const fetchUrl = "config/config.json";
  const { data, error } = useSWR(fetchUrl, async () => {
    const response = await fetch(fetchUrl);
    return response.json();
  });

  return {
    config: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function App() {
  const { config, isError } = useConfig();
  const { environment, shouldShowSpinner } = config || {};

  if (isError) return <div>Issue getting appconfig</div>;

  return (
    <div className="App">
      <header className="App-header">
        {shouldShowSpinner && (
          <img src={logo} className="App-logo" alt="logo" />
        )}
        <p>We are on {environment}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
