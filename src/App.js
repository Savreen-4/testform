import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Setup from './pages/Setup';
import Welcome from './pages/Welcome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Setup/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
