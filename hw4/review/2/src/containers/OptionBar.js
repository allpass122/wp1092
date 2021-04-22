import React, { Component } from 'react';

class OptionBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`optionBarContainer ${this.props.layout}`}>
                <button onClick={this.props.handleAdd}>+</button>
                <button onClick={this.props.handleDelete}>-</button>
            </div>
        );
    }
}

export default OptionBar;