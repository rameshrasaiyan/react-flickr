import React, { Component } from 'react';
import axios from 'axios';
import Flickr from './components/flickr/Flickr';
import './App.css';

axios.defaults.baseURL = 'https://api.flickr.com/services/rest';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Flickr />
      </div>
    );
  }
}

export default App;
