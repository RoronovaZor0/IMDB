import './App.css';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favourites from './Components/Favourites';
import PageNotFound from './Components/PageNotFound';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './Components/Login';
import Register from './Components/Register';
import MovieCard from './Components/MovieCard';

function App() {
  return (
    <div>
      
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          
          <Route path='/home' element={
            <div>
              <Navbar />
              <Banner />
              <Movies />
            </div>
          }></Route>
          <Route path='/fav' element={<div><Navbar/><Favourites/></div>}></Route>
          <Route path='/movie/:id' element={<MovieCard/>}/>
          <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;