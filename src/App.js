import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSync, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import ItemRow from './ItemRow';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
    this.updateRow = this.updateRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.init = this.init.bind(this);
    this.getMaxPrice = this.getMaxPrice.bind(this);
  }
  componentDidMount(){
    this.init();    
  }
  init(){
    fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Init')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.items,
        });
      });      
  }
  updateRow(id, name, cost){
    console.log(id + ": " + name + ": " + cost);
    if(id > 0){      
      fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Update?id=' + id + '&name=' + name + '&cost=' + cost)
      .then(res => res.json())
      .then(json => {});    
    }
    else{
      fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Add?id=' + '&name=' + name + '&cost=' + cost)
      .then(res => res.json())
      .then(json => {}); 
    }
    this.init();
  }
  deleteRow(id){
    console.log(id);
    fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Delete?id=' + id)
      .then(res => res.json())
      .then(json => {});
    this.init();      
  }
  addRow(){    
    var rows = this.state.items;
    rows.push({name: "", cost: 0});
    this.setState({items: rows});
  }
  getMaxPrice(event){
    event.preventDefault();
    console.log(this.searchInput.value);
    if(this.searchInput.value.length > 1){
    fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/GetMaxPriceByName?name=' + this.searchInput.value)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.items,
        });
      });   
    }
    else{
      fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/GetMaxPrice')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.items,
        });
      });       
    }
  }
  render(){
    var {isLoaded, items} = this.state; 
       
    if(!isLoaded){
      return <div></div>;
    }
    else{    
      return (
        <div className="container">
          <form className="form-group" onSubmit={this.getMaxPrice}>
            <input placeholder="Item Name" type={String} ref={searchInput => this.searchInput = searchInput} style={{display: "inline-block", paddingBottom:"4px"}} />
            <button className="btn btn-sm btn-info">Get Max Price</button>            
          </form>
          <table className="table table-striped" style={{tableLayout: "fixed"}}>
            <thead>
            <tr>
              <th width="7.5%"><button className="btn btn-sm btn-success" title="Add" onClick={this.addRow}><FontAwesomeIcon icon={faPlus} title="Add"/></button></th>              
              <th wdith="10%">Id</th>
              <th width="55%">Name</th>
              <th width="25%">Cost</th>
              <th width="7.5%"><button className="btn btn-sm btn-primary" title="Add" onClick={this.init}><FontAwesomeIcon icon={faSync} title="Add"/></button></th>
            </tr>
            </thead>
            <tbody>
            {
              items.map(item => {
                return(
                  <ItemRow
                    key={item.id}
                    {...item}
                    deleteRow={this.deleteRow}
                    updateRow={this.updateRow}
                  />
                );
              })
            }
            </tbody>
          </table>
        </div>
      );
    }
  }

}

export default App;
