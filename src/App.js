import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }
  componentDidMount(){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Init')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });

  }

  render(){
    var {isLoaded, items} = this.state;
    if(!isLoaded){
      return <div>Loading...</div>;
    }
    else{    
      return (
        <div className="App">
          Hello Idiot
        </div>
      );
    }
  }

}

export default App;
