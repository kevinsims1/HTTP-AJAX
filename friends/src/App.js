import React from 'react';
import './App.css';
import FriendsList from './components/friendsList'


class App extends React.Component {
  render(){
  return (
    <div className="App">
      <FriendsList />
    </div>
  );
}
}

export default App;
