import React from 'react';
import { render } from 'react-dom';

var App = React.createClass({
  render(){
    return (
      <div>Hello, World!</div>
    );
  }
});

function init(node){
  render(<App/>, node);
}

export { init };
