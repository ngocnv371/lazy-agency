import { useAppSelector } from "../../app/hooks";
import { selectLogs } from "./SyncSlice";

export function Logs() {
  const logs = useAppSelector(selectLogs);

  return (
    <>
      {logs.map((l) => (
        <p>{l}</p>
      ))}
    </>
  );
}
