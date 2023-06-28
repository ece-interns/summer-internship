import "./App.css";
import { Routes, Route } from "react-router-dom";

// pages
import Home from "../src/page/Home/Home";
import About from "../src/page/About/About";
import Contact from "../src/page/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import UserLogin from "./page/UserLogin/UserLogin";
import RestaurantLogin from "./page/RestaurantLogin/RestaurantLogin";
import UserResister from "./page/UserResister/UserResister";
import RestaurantResister from "./page/RestaurantResister/RestaurantResister";

function App() {
  return (
    <div className="App">
      <Header page="home" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserResister />} />
        <Route path="/restaurant/login" element={<RestaurantLogin />} />
        <Route path="/restaurant/resister" element={<RestaurantResister />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
