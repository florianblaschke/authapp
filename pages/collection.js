import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Collection() {
  const { data, isLoading, error } = useSWR("api/restricted", fetcher);

  console.log(data);
  return (
    <>
      <p>{data.error}</p>
    </>
  );
}
