import React from 'react'
import List from './List'
import Edit from './Edit';
import Create from './Create';
import Show from './Show';
import {BrowserRouter,Switch, Route} from 'react-router-dom'

const Main = () => (
  <main>
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={List} />
    <Route path="/edit/:id" component={Edit} />
    <Route path="/create" component={Create} />
    <Route path="/show/:id" component={Show} />
  </Switch>
  </BrowserRouter>
</main>
);

export default Main
