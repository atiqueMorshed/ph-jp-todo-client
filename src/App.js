import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Title from './components/Title';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
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
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
