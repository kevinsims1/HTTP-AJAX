import React from 'react';

function Home(props) {
  // ({ match, history, location })
  function navigateToShop(e) {
    e.preventDefault();
    props.history.push('/friend-list');
  }

  return (
    <div className="home-wrapper">
      <img
        className="home-image"
        src="https://www.uncommongoods.com/images/category/fun-fullwidth.jpg"
        alt=""
      />
    </div>
  );
}

export default Home;