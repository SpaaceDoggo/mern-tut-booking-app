import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppContext } from "./context/AppContext";
import AddHotel from "./pages/AddHotel";
import { useEffect } from "react";
import MyHotel from "./pages/MyHotel";
import EditHotel from "./pages/EditHotel";

function App() {
  const { isLogin, isAuthLoading } = useAppContext();

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>Home Page</Layout>} />

        <Route path="/search" element={<Layout>Search</Layout>} />

        <Route
          path="/register"
          element={<Layout>{isLogin ? <Register /> : <Register />}</Layout>}
        />

        <Route
          path="/sign-in"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/add-hotel"
          element={
            isLogin ? (
              <Layout>
                <AddHotel />
              </Layout>
            ) : (
              <Navigate to={'/'}/>
            )
          }
        />

        <Route
          path="/my-hotels"
          element={
            isLogin ? (
              <Layout>
                <MyHotel />
              </Layout>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />

        <Route
          path="/edit-hotel/:id"
          element={
            isLogin ? (
              <Layout>
                <EditHotel />
              </Layout>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
