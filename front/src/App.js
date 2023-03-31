import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"
import Home from  "./components/Home"
import About from './components/About';
import ProductDetails from './components/product/ProductDetails';
function App() {
  return (
    <Router>
        <Header />
            
             <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/about" element={<About/>} />
                  <Route path="/product/:id" element={<ProductDetails />} />
             </Routes>


        <Footer />
    </Router>
  );
}

export default App;
