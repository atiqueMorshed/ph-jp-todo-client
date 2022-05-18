import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Title from './components/Title';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
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
    </div>
  );
};

export default App;
