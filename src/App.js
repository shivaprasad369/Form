import { useState } from 'react';
import Navbar from './components/Navbar';
import SimpleInput from './components/SimpleInput';
import View from './components/View';

function App() {
  const [viewPage,setViewPage]=useState(false)
  
  return (
    <>
    <ul>
      <li><a class="active" href="#home" onClick={()=>setViewPage(true)} >ADD</a></li>
      <li><a href="#news" onClick={()=>setViewPage(false)}>View</a></li>
      
    </ul>
    <div className="app">
 {!viewPage && <View/>}
 {viewPage &&<SimpleInput/>}
    </div>
    </>
  );
}

export default App;
