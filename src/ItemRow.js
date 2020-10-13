import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

class ItemRow extends Component {
    constructor(props) {
        super(props);
        
        this.updateRow = this.updateRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    updateRow(){        
        const {id} = this.props;
        this.props.updateRow(id, this.nameInput.value, this.costInput.value);       
    }
    deleteRow() {
        const {id} = this.props;
        this.props.deleteRow(id);
        console.log("deleted: " + id);
    }

    render() {
        var {id, name, cost } = this.props;
        return (
            <tr key={id}>
                <td><button title="Save" className="btn btn-sm btn-default" onClick={this.updateRow} style={{border: "1px solid black"}}><FontAwesomeIcon icon={faSave} /></button></td>
                <td style={{textAlign="center"}}>{id}</td>
                <td><input className="form-control" defaultValue={name} ref={nameInput => this.nameInput = nameInput} type={String}></input></td>
                <td><input className="form-control" defaultValue={cost} ref={costInput => this.costInput = costInput} type={Number}></input></td>
                <td><button title="Remove" className="btn btn-sm btn-danger" onClick={this.deleteRow}><FontAwesomeIcon icon={faTrash} /></button></td>
            </tr>
        );
    }
}

export default ItemRow;
