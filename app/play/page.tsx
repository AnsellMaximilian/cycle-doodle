import PlayArea from "./PlayArea";
import PlayContextProvider from "./PlayContextProvider";

export default async function PlayPage() {
  return (
    <div>
      <PlayContextProvider>
        <PlayArea />
      </PlayContextProvider>
    </div>
  );
}
