import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
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
      </Routes>
    </div>
  );
};

export default App;
