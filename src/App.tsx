
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import './App.css'
import ListaConvenios from './components/convenios/listaconvenios/ListaConvenios'
import ListaTipos from './components/tipos/listatipos/ListaTipos'
import FormTipo from './components/tipos/formtipo/FormTipo'
import DeletarTipo from './components/tipos/deletartipo/DeletarTipo'
import FormConvenio from './components/convenios/formconvenios/FormConvenio'
import DeletarConvenio from './components/convenios/deletarconvenios/DeletarConvenio'
import Cadastro from './pages/cadastro/Cadastro'
import ListaUsuarios from './components/usuarios/listausuarios/ListaUsuarios'


function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/tipos" element={<ListaTipos />} />
              <Route path="/cadastrartipo" element={<FormTipo />} />
              <Route path="/editartipo/:id" element={<FormTipo />} />
              <Route path="/deletartipo/:id" element={<DeletarTipo />} />
              <Route path="/convenios" element={<ListaConvenios />} />
              <Route path="/cadastrarconvenio" element={<FormConvenio />} />
              <Route path="/editarconvenio/:id" element={<FormConvenio />} />
              <Route path="/deletarconvenio/:id" element={<DeletarConvenio />} />
              <Route path="/usuarios" element={<ListaUsuarios />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App