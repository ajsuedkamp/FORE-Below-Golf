import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <h1>Technologies Used</h1>
      <div>
       <ul>
        <li style={{fontSize: 'x-large'}}>React</li>
        <li style={{fontSize: 'x-large'}}>Redux</li>
        <li style={{fontSize: 'x-large'}}>Sagas</li>
        <li style={{fontSize: 'x-large'}}>Node.js</li>
        <li style={{fontSize: 'x-large'}}>Express</li>
        <li style={{fontSize: 'x-large'}}>Material UI</li>
       </ul>
      </div>
    </div>
  );
}

export default AboutPage;
