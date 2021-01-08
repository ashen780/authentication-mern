import React from 'react';
import './App.css';
import Auth from './authPage/Auth';
import Header from './header/Header';
import { Provider } from "react-redux";
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Auth />
      </Provider>
    </div>
  );
}

export default App;
