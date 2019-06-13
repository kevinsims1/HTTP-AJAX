import React from 'react';
import axios from 'axios';

class FriendForm extends React.Component {
  state = {
    friend: this.props.activeFriend || {
        name: '',
        age: '',
        email: ''
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.activeFriend &&
      prevProps.activeFriend !== this.props.activeFriend
    ) {
      this.setState({
        friend: this.props.activeFriend
      });
    }
  }

  changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'age') {
      value = parseInt(value, 10);
    }

    this.setState(prevState => ({
      friend: {
        ...prevState.Friend,
        [ev.target.name]: value
      }
    }));
  };

  handleSubmit = e => {
    if (this.props.activeFriend) {
      this.props.updateFriend(e, this.state.friend);
    } else {
      this.props.addFriend(e, this.state.friend);
    }
    this.setState({
      friend: {
        name: '',
        age: '',
        email: ''
      }
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

  render() {
    return (
      <div>
        <h2>Update Friend</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.changeHandler}
            placeholder="Name"
            value={this.state.friend.name}
          />
          <div className="baseline" />

          <input
            type="number"
            name="age"
            onChange={this.changeHandler}
            placeholder="Age"
            value={this.state.friend.age}
          />
          <div className="baseline" />

          <input
            type="text"
            name="email"
            onChange={this.changeHandler}
            placeholder="Email"
            value={this.state.friend.email}
          />
          <div className="baseline" />

          <button className="md-button form-button">Update Friend</button>
        </form>
      </div>
    );
  }
}

export default FriendForm;
