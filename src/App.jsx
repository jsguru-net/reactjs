import { useState } from "react";
import BookmarkManager from "./apps/bookmark-manager/BookmarkManager";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>App</h1>
      
      <BookmarkManager></BookmarkManager>
    </>
  );
}

export default App;
