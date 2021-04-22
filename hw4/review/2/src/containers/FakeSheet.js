import React, { Component } from "react";
import Table from "../containers/Table";
import OptionBar from "../containers/OptionBar";

class FakeSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedCell: [-1, -1], modify: "default"};
        this.handleAddCol = this.handleAddCol.bind(this);
        this.handleDeleteCol = this.handleDeleteCol.bind(this);
        this.handleAddRow = this.handleAddRow.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
        this.finishModify = this.finishModify.bind(this);
    }
    handleAddCol() {
        this.setState({modify: "AC"});
    }
    handleDeleteCol() {
        this.setState({modify: "DC"});
    }
    handleAddRow() {
        this.setState({modify: "AR"});
    }
    handleDeleteRow() {
        this.setState({modify: "DR"});
    }
    finishModify() {
        this.setState({modify: "default"});
    }
    
    render() {
        return (
            <>
                <div className="upper">
                    <OptionBar layout="row" handleAdd={this.handleAddCol} handleDelete={this.handleDeleteCol} />
                </div>
                <div className="lower">
                    <OptionBar layout="column" handleAdd={this.handleAddRow} handleDelete={this.handleDeleteRow} />
                    <Table modify={this.state.modify} finishModify={this.finishModify}/>
                </div>
            </>
        );
    }
}

export default FakeSheet;

