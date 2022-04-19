import { useEffect } from 'react';
// import BookmarkManager from './apps/bookmark-manager/BookmarkManager';

import ReactHookSample from './apps/react-hook-samples/ReactHookSample';
function App() {
  useEffect(() => {
    console.log('app mounted/updated');
  });

  return (
    <>
      <h1>App</h1>
      
      <ReactHookSample text={'heiyo'}>
        <h3>Tada</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque alias culpa quod, amet quo architecto pariatur, temporibus ab, repudiandae veniam accusamus atque officiis voluptas labore nobis magni laboriosam optio tenetur!</p>
      </ReactHookSample>
      {/* <BookmarkManager></BookmarkManager> */}
    </>
  );
}

export default App;
