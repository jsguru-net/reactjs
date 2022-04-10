import { useEffect } from 'react';
import BookmarkManager from './apps/bookmark-manager/BookmarkManager';

function App() {
  useEffect(() => {
    console.log('app mounted/updated');
  });

  return (
    <>
      <h1>App</h1>

      <BookmarkManager></BookmarkManager>
    </>
  );
}

export default App;
