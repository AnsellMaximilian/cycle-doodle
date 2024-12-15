import PlayContextProvider from "../play/PlayContextProvider";
import PromptList from "../play/PromptList";

export default async function GalleryPage() {
  return (
    <div>
      <PlayContextProvider>
        <PromptList />
      </PlayContextProvider>
    </div>
  );
}
