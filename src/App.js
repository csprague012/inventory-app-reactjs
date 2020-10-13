import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons'
import ItemRow from './ItemRow';
import $ from 'jquery';
import 'bootstrap';

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
    this.getAllMaxPrice = this.getAllMaxPrice.bind(this);
    this.loadMessage = this.loadMessage.bind(this);
  }
  componentDidMount(){
    this.init();    
  }
  loadMessage(message){
   $('.toast-header').empty();
   $('.toast-header').html(message);
   $('#toast-success').toast('show');
  }
  init(){
    fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Init')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.items,
        });
        this.loadMessage("Success");
      });      
  }
  
  updateRow(id, name, cost){
    console.log(id + ": " + name + ": " + cost);
    if(id > 0){      
      fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Update?id=' + id + '&name=' + name + '&cost=' + cost)
      .then(res => res.json())
      .then(json => {
        this.loadMessage("Updated item: " + id);
        this.init();
      });    
    }
    else{
      fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Add?id=' + '&name=' + name + '&cost=' + cost)
      .then(res => res.json())
      .then(json => {
        this.loadMessage("Added item: " + name);
        this.init();
      }); 
    }    
  }
  deleteRow(id){
    console.log(id);
    fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/Delete?id=' + id)
      .then(res => res.json())
      .then(json => {
        this.loadMessage("Deleted item: " + id);
        this.init();
      });          
  }
  addRow(){    
    var rows = this.state.items;
    rows.push({name: "", cost: 0});
    this.setState({items: rows});
  }
  getAllMaxPrice(event){
    event.preventDefault();
    fetch('https://inventoryappdemo.herokuapp.com/Controllers/HomeController/GetMaxPrice')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.items,
        });
        this.loadMessage("Calculated all max costs");
      });
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
          if(json.items.length > 0){
            this.loadMessage("Calculated max cost for item: " + this.searchInput.value);
          }
          else{
            this.loadMessage("Not able to find item: " + this.searchInput.value);
          }
          
        });   
    }
    else{
      this.getAllMaxPrice(event);   
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
          <form className="form-group">
            <input placeholder="Item Name" type={String} ref={searchInput => this.searchInput = searchInput} style={{display: "inline-block", paddingBottom:"4px"}} />
            <button className="btn btn-sm btn-info" onClick={this.getMaxPrice}>Get Max Cost</button>
            <button className="btn btn-sm btn-default" style={{border: "1px solid black", float: "right"}} onClick={this.getAllMaxPrice}>All Max Costs</button>            
          </form>
            <table className="table table-striped" style={{tableLayout: "fixed"}}>
              <thead>
              <tr>
                <th style={{width: "5%"}}><button className="btn btn-sm btn-success" title="Add" onClick={this.addRow}><FontAwesomeIcon icon={faPlus} title="Add"/></button></th>              
                <th style={{width: "5%"}}>Id</th>
                <th style={{width: "45%"}}>Name</th>
                <th style={{width: "40%"}}>Cost</th>
                <th style={{width: "5%"}}><button className="btn btn-sm btn-primary" title="Refresh" onClick={this.init}><FontAwesomeIcon icon={faSync} title="Refresh"/></button></th>
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
