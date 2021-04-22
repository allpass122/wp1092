import React, { Component } from 'react';

class SheetCell extends Component {
    constructor(props) {
        super(props);
        this.state = {readonly: true, text: props.text};
        this.handleFocus = this.handleFocus.bind(this);
    }
    componentDidMount() {
        // console.log(this.props);
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log("prevprops", prevProps.text, "prevstate", prevState.text, "props", this.props.text, "state", this.state.text);
        if(this.props.text !== this.state.text && prevState.text === this.state.text) {
            console.log("fix");
            this.setState({text: this.props.text});
        }
        // if(this.props.relateSelected != this.state.relateSelected) {
        //     this.setState({relateSelected: this.props.relateSelected});
        // }
    }
    handleClick(e) {
        // console.log("one");
        e.target.readOnly = false;
        if(this.state.readonly !== true) {
            return;
        }
        e.target.select();
        e.target.classList.add("selected");
        this.setState({readonly: false});
    }
    handleDoubleClick(e) {
        // console.log("two");
        e.target.classList.remove("selected");
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    }
    handleChange(e) {
        e.target.classList.remove("selected");
        // this.props.onTextChange(this.props.posX, this.props.posY, e.target.value);
        this.setState({text: e.target.value});
    }
    handleBlur(e) {
        e.target.classList.remove("selected");
        e.target.readOnly = true;
        this.props.onTextChange(this.props.posX, this.props.posY, e.target.value);
        this.setState({readonly: true});

    }
    handleFocus() {
        this.props.onSelect(this.props.posX, this.props.posY);
    }
    handleKeyUp(event) {
        if(event.keyCode === 13 && this.props.nextCell !== undefined) {
            console.log("enter");
            console.log(this.props.nextCell.current);
            this.props.nextCell.current.select();
            this.props.nextCell.current.classList.add("selected");
            this.props.nextCell.current.focus();
            this.props.nextCell.current.readOnly = false;
        }
    }

    render() {
        return (
            <input type="text" value={this.state.text} className={`cell ${this.state.relateSelected ? "relateSelected" : ""}`} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} onClick={this.handleClick.bind(this)} onDoubleClick={this.handleDoubleClick.bind(this)} onFocus={this.handleFocus} ref={this.props.self} onKeyUp={(event) => this.handleKeyUp(event)} readOnly={true}/>
        );
    }
}

export default SheetCell;