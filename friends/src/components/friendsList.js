import React from 'react';
import axios from 'axios';

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
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    addStudent = () => {
      // immutability in react/javascript
      const newStudent = {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email
          
      };
      this.setState({
        friendsList: [...this.state.friendsList, newStudent] //newArray with an added student
      });
    };

  render(){
  
  return (
    <div className="items-list-wrapper">
      {this.state.friends.map(friend => (
        <div
          className="friend-card"
          key={friend.id}
        >
         
          <p>{friend.name}</p>
          <p>{friend.age}</p>
          <p>{friend.email}</p>
        </div>
      ))}

      <form onSubmit={this.handleSubmit}>
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
    </div>
  );
}
}

export default FriendsList;