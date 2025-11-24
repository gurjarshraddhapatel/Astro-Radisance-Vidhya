import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import './App.css'
import Home from './component/pages/Home'
import CartProvider from './context/CartContext'
import Navbar from './component/layout/Navbar'
import Footer from './component/layout/Footer'


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes without Navbar/Footer */}
          <Route path="/" element={<Home />} />
         
          
          {/* Public Routes with Navbar/Footer */}
          
      </Routes>
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App
