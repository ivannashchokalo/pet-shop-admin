import { useCheckAuthQuery } from "../../services/authApi";

export default function Home() {
  const { data } = useCheckAuthQuery();
  return (
    <div>
      <p>home</p>
      {data && <p>authenticated</p>}
    </div>
  );
}
