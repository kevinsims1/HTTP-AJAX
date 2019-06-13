import React from 'react';
import axios from 'axios';
import {  Route, NavLink } from 'react-router-dom'
import FriendForm from './friendsform'

import './friendsList.css';

class FriendsList extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      name: '',
      age: '',
      email: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.deleteFriend = this.deleteFriend.bind(this);
      this.setUpdateForm = this.setUpdateForm.bind(this);
    }
  
    componentDidMount() {
      axios.get('http://localhost:5000/friends')
        .then(response => {
          console.log(response)
            this.setState({ friends: response.data });
        })
        .catch( err => {
          console.log(err)
        })     
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.addFriend()
    }
  
    addFriend = (e) => {
      e.preventDefault();
      // immutability in react/javascript
      const newFriend = {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email
          
      };

      axios.post('http://localhost:5000/friends', newFriend)
      .then(response => {
        console.log(response)
          this.setState({ friends: response.data });
      })
      .catch( err => {
        console.log(err)
      })     
    };

    deleteFriend = (e, id) => {
      e.preventDefault();
      axios
        .delete(`http://localhost:5000/friends/${id}`)
        .then(response => {
          this.setState({
            friends: response.data
          });
    
        })
        .catch(err => {
          console.log(err);
        });
    };

    setUpdateForm = (e, friend) => {
      e.preventDefault();
      this.setState({
        activefriend: friend
      });
      this.props.history.push('/friend-form');
    };
  
   
    updateFriend = (e, friend) => {
      e.preventDefault();
      axios
        .put(`http://localhost:3333/friends/${friend.id}`, friend)
        .then(res => {
          this.setState({
            activefriend: null,
            friends: res.data
          });
          this.props.history.push('/friend-form');
        })
        .catch(err => {
          console.log(err);
        });
    };

  render(){
  
  return (
    <div className="friends-list-wrapper">
      {this.state.friends.map(friend => (
        <div
          className="friend-card"
          key={friend.id}
        >
         
          <p>{friend.name}</p>
          <p>{friend.age}</p>
          <p>{friend.email}</p>
          <NavLink to="/friend-form">Update Friend</NavLink>
          <button onClick={e => this.deleteFriend(e, friend.id)} className="md-button">
        Delete friend
      </button>
        </div>
      ))}

      <form onSubmit={this.addFriend} className="form">
          <label>
            Name:
            <input type="text" value={this.state.name} name='name' onChange={this.handleChange} />
          </label>
          <label>
            Age:
            <input type="text" value={this.state.age} name='age' onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input type="text" value={this.state.email} name='email' onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          
      </form>
     <Route 
      exact path="/"
      component={FriendsList}
     />


      <Route
          path="/friend-form"
          render={props => (
            <FriendForm
              {...props}
              activefriend={this.state.activefriend}
              addfriend={this.addfriend}
              updatefriend={this.updatefriend}
            />
          )}
        />
    </div>
  );
}
}

export default FriendsList;