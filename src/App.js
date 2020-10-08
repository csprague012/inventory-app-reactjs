import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
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
    headers.append('Access-Control-Allow-Origin', '');
    fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Init')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.items,
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
        <div className="container">
          <table className="table table-striped" style={{tableLayout: "fixed"}}>
            <thead>
            <tr>
              <th width="15%"><button className="btn btn-sm btn-success"><FontAwesomeIcon icon={faPlus}/></button></th>
              <th wdith="10%">Id</th>
              <th width="55%">Name</th>
              <th width="25%">Cost</th>
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td><button className="btn btn-sm btn-info"><FontAwesomeIcon icon={faPencilAlt}/></button></td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.cost}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

}

export default App;
