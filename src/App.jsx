import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

// vistas
import Home from './views/Home'
import ProductType from './views/ProductsType'
import Login from './views/Login'
import Purchases from './views/Purchases'
import Ups from './views/Ups'

// componentes
import NavApp from './components/NavApp'
import Loader from './components/Loader'
import Protected from './components/Protected'

function App() {

  const loading = useSelector(state => state.loading)

  return (
    <>
    <HashRouter>

      {loading && <Loader />}
      <NavApp/>

      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product/:id' element={<ProductType/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/error' element={<Ups/>} />

        <Route element={<Protected />}>
          <Route path='/purchases' element={<Purchases/>} />
        </Route>

      </Routes>
    </HashRouter>
    </>
  )
}

export default App
