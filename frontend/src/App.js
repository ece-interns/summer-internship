import './App.css';
import {Routes,Route} from 'react-router-dom';

// pages
import Home from '../src/page/Home/Home';
import About from '../src/page/About/About';
import Contact from '../src/page/Contact/Contact';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  );
}

export default App;
