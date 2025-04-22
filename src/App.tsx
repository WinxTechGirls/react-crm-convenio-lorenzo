import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'

import './App.css'
import Cadastro from './pages/cadastro/Cadastro'

function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
            <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App