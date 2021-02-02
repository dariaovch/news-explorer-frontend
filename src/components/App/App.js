import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
// import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';

function App() {
  return (
    <div className="page">
      <div className="page__container">
    
        {/* <Header /> */}

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
        
          <Route path="/saved-news">
            <SavedNews />
          </Route>
        </Switch>

        <Footer />

      </div>
    </div>
  );
}

export default App;
