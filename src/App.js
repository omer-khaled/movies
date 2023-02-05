import './App.css';
import ContextApi from './Component/ContextApi';
import Home from './Component/Home';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Routes,Route } from 'react-router-dom';
import MovieShown from './Component/MovieShown';
function App() {
  return (
    <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
      <ContextApi>
        <div className="App container-fluid">
          <Routes>
            <Route path="/movies/" element={<Home />} />
            <Route path="/movies/:id" element={<MovieShown />} />
          </Routes>
        </div>
      </ContextApi>
    </SkeletonTheme>
  );
}

export default App;
