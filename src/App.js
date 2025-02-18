import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import SearchFunctionality from './components/SearchFunctionality'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/users/:userId" component={UserProfile} />
      <Route exact path="/my-profile" component={MyProfile} />
      <Route exact path="/posts" component={SearchFunctionality} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
