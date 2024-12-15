import PromptList from "../play/PromptList";
import Gallery from "./Gallery";

export default async function GalleryPage() {
  return (
    <div>
      <Gallery>
        <PromptList />
      </Gallery>
    </div>
  );
}
