
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import { useAppContext } from './context/AppContext'
import AddHotel from './pages/AddHotel'

function App() {
  const {isLogin} = useAppContext();
  return (
   <BrowserRouter>
     <Routes>
      <Route 
        path="/" 
        element={
          <Layout>
            Home Page
          </Layout>
        } 
      />

      <Route
        path='/search'
        element={
          <Layout>
            Search
          </Layout>
        }
      />

      <Route
       path='/register'
       element={
        <Layout>

          {isLogin ? <Register/> : <Register/>}
        </Layout>
       }
      />

      <Route
       path='/sign-in'
       element={
          <Layout>
            <Login/>
          </Layout>
       }
      />

      <Route
       path='/add-hotel'
       element={
        <Layout>
          <AddHotel/>
        </Layout>
       }
      />

      <Route path="*" element={<Navigate to={'/'}/>}/>

     </Routes>
   </BrowserRouter>
  )
}

export default App
