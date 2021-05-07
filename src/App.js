import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Home from './components/home/Home.jsx';
import Recorder from './components/recorder/Recorder.jsx';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/recorder" component={Recorder} />
    </Switch>
  );
}

export default App;
