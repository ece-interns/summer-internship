import './App.css';
import {Routes,Route} from 'react-router-dom';

// pages
import Home from '../src/page/Home/Home';
import About from '../src/page/About/About';
import Contact from '../src/page/Contact/Contact';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header page='home'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
