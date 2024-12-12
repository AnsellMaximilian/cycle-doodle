import axios from "axios";
import Grid from "./Grid";
import { Audience } from "@/types";

export default async function PlayPage() {
  const audienceRes = await axios.get("http://localhost:3000/api/audiences");

  const audiences: Audience[] = audienceRes.data as Audience[];

  return (
    <div>
      <Grid audiences={audiences} />
    </div>
  );
}
