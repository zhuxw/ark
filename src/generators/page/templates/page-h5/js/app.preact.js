import preact from 'preact';
const {Component, render} = preact;

class App extends Component {
  render(){
    return (
      <div>Hello, World!</div>
    );
  }
}

function init(node){
  render(<App/>, node);
}

export { init };
