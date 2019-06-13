import React from 'react';
import './App.css';
import FriendsList from './components/friendsList'
import {Route, NavLink} from 'react-router-dom'
import Home from './components/home'
import FriendForm from './components/friendsform'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeFriend: null,
      friends: [],
      error: ''
    };
  }
  render(){
  return (
    <div className="App">
        <nav>
          <h1 className="store-header">Kevs Trinkets</h1>
          <div className="nav-links">
            
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/friend-list">Friends</NavLink>
          </div>
        </nav>
   

      <Route exact path="/" component={Home} />

        <Route
          path="/friend-list"
          exact
          render={
            props => <FriendsList {...props} friends={this.state.friends} />
          }
        />

      
        <Route
          path="/friend-form"
          render={props => (
            <FriendForm
              {...props}
              activefriend={this.state.activeFriend}
              addfriend={this.addFriend}
              updatefriend={this.updateFriend}
            />
          )}
        />
    </div>
  );
}
}

export default App;
