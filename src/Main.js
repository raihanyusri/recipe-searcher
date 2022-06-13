import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Signup from './Signup';

const Main = () => {
  return (
    <Routes>
      <div>
        <Route path='/' component={Home}></Route>
        <Route path='/signup' component={Signup}></Route>
      </div>
    </Routes>
  );
}

export default Main;