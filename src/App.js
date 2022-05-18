import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './components/shared/Footer';
import Login from './components/account/Login';
import Navbar from './components/shared/Navbar';
import Register from './components/account/Register';
import Title from './components/shared/Title';

import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/shared/NotFound';
import Home from './components/home/Home';
import RequireAuth from './components/shared/RequireAuth';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Title title="Login" />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Title title="Register" />
              <Register />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
