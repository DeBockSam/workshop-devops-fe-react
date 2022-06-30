import useSWR from "swr";

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

const Whatever = () => {
  const { config, isError } = useConfig();
  const { environment } = config || {};
  if (isError) return <div>Issue getting appconfig</div>;
  return <p>We are on {environment}</p>;
};

export default Whatever;
