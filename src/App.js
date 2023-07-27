import './App.css';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favourites from './Components/Favourites';
import PageNotFound from './Components/PageNotFound';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div>
      
      <Provider store={store}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={
            <div>
              <Banner />
              <Movies />
            </div>
          }></Route>
          <Route path='/fav' element={<Favourites></Favourites>}></Route>
          <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;