import React, { Component } from "react";
import SheetCell from "../components/SheetCell";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {tableComponent: [], tableContent: [], selectedCell: [], prevCell: [], rowIndex: [], columnIndex: [], modify: this.props.modify}
        this.computeIndex = this.computeIndex.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleAC = this.handleAC.bind(this);
        this.handleDC = this.handleDC.bind(this);
        this.handleAR = this.handleAR.bind(this);
        this.handleDR = this.handleDR.bind(this);
    }

    componentDidMount() {
        var component = [];
        var content = [];
        for(let i=0; i<26; i++) {
            let tmp = [];
            let tmpContent = [];
            for(let j=0; j<100; j++) {
                var obj = {onSelect: this.handleSelect, text: "", posX: i, posY: j, onTextChange: this.handleTextChange};
                if(j > 0) {
                    var reference = React.createRef();
                    tmp[j - 1].nextCell = reference;
                    obj.ref = reference;
                }
                tmp.push(obj);
                tmpContent.push("");
            }
            component.push(tmp);
            content.push(tmpContent);
        }
        this.setState({tableComponent: component, tableContent: content}, function() {
            this.computeIndex();
        });
    }

    componentDidUpdate() {
        if(this.props.modify !== this.state.modify) {
            if(this.props.modify === "default") {
                this.setState({modify: "default"});
            }
            else {
                console.log(this.props.modify);
                this.setState({modify: this.props.modify}, function() {
                    this.handleModify();
                });
            }
        }
    }

    computeIndex() {
        var n = this.state.tableComponent.length;
        var m = this.state.tableComponent[0].length;
        var ci = [];
        var ri = [];
        for(let i=0; i<m; i++) {
            ri.push(i + 1);
        }
        for(let i=0; i<n; i++) {
            let index = i + 1;
            let base = "A".charCodeAt();
            let char = "";
            while(index > 0) {
                let num = (index - 1) % 26;
                index = Math.round((index - num) / 26);
                char = String.fromCharCode(base + num) + char;
            }
            ci.push(char)
        }
        this.setState({rowIndex: ri, columnIndex: ci});
    }

    recomputePos() {
        var component = this.state.tableComponent;
        for(let i=0; i<component.length; i++) {
            for(let j=0; j<component[i].length; j++){
                component[i][j].posX = i;
                component[i][j].posY = j;
            }
        }
        this.setState({tableComponent: component});
    }

    changeIndexColor() {
        if(this.state.selectedCell[0] !== -1) {
            var ri = document.getElementsByClassName("ri");
            for(let i=0; i<ri.length; i++) {
                if(i - 1 === this.state.selectedCell[1]) {
                    ri[i].classList.add("indexSelect");
                }
                else {
                    ri[i].classList.remove("indexSelect");
                }
            }
            var ci = document.getElementsByClassName("ci");
            for(let i=0; i<ci.length; i++) {
                if(i === this.state.selectedCell[0]) {
                    ci[i].classList.add("indexSelect");
                }
                else {
                    ci[i].classList.remove("indexSelect");
                }
            }
        }
    }

    handleTextChange(x, y, text) {
        var content = [...this.state.tableContent];
        var component = [...this.state.tableComponent];
        content[x][y] = text;
        component[x][y].text = text;
        var tmp = [-1, -1];
        this.setState({tableContent: content, tableComponent: component, prevCell: tmp}, function() {
            if(this.state.prevCell[0] !== x && this.state.prevCell[1] !== y) {
                setTimeout(() => this.setState({prevCell: [x, y]}), 200);
            }
        });
    }
    
    handleSelect(x, y) {
        console.log(x, y);
        var tmp = [x, y];
        this.setState({selectedCell: tmp}, function() {
            this.changeIndexColor();
        });
        // cell.classList.add("selected");
    }

    handleModify() {
        var x = this.state.selectedCell[0], y = this.state.selectedCell[1];
        var prev_x = this.state.prevCell[0], prev_y = this.state.prevCell[1];
        var pos;
        if(prev_x === x && prev_y === y) {
            pos = [-1, -1];
            console.log("end");
        }
        else {
            var cell = document.getElementsByClassName("tableColumn")[x].childNodes[y];
            cell.select();
            cell.classList.add("selected");
            cell.focus();
            cell.readOnly = false;
            pos = [x, y];
            console.log("insert");
        }
        if(this.state.modify === "AC") {
            this.handleAC(pos);
        }
        if(this.state.modify === "DC") {
            this.handleDC(pos);
        }
        if(this.state.modify === "AR") {
            this.handleAR(pos);
        }
        if(this.state.modify === "DR") {
            this.handleDR(pos);
        }
        this.props.finishModify();
    }
    handleAC(pos) {
        var component = this.state.tableComponent;
        var content = this.state.tableContent;
        var tmp = [];
        var tmpContent = [];
        for(let i=0; i<this.state.tableComponent[0].length; i++) {
            let obj = {onSelect: this.handleSelect, text: "", posX: i, posY: i, onTextChange: this.handleTextChange};
            if(i > 0) {
                let reference = React.createRef();
                tmp[i - 1].nextCell = reference;
                obj.ref = reference;
            }
            tmp.push(obj);
            tmpContent.push("");
        }
        if(pos[0] === -1) {
            component.push(tmp);
            content.push(tmpContent);
        }
        else {
            component.splice(pos[0], 0, tmp);
            content.splice(pos[0], 0, tmpContent);
        }
        this.setState({tableComponent: component, tableContent: content}, function() {
            this.computeIndex();
            this.recomputePos();
            if(pos[0] !== -1) {
                var new_cell = document.getElementsByClassName("tableColumn")[pos[0]].childNodes[pos[1]];
                setTimeout(() => new_cell.blur(), 500);
                var cell = document.getElementsByClassName("tableColumn")[pos[0] + 1].childNodes[pos[1]];
                setTimeout(() => {
                    cell.select();
                    cell.classList.add("selected");
                    cell.focus();
                    cell.readOnly = false;
                })
            }
        })
    }
    handleDC(pos) {
        if(pos[0] !== -1 && this.state.tableComponent.length > 1) {
            var component = this.state.tableComponent;
            var content = this.state.tableContent;
            component.splice(pos[0], 1);
            content.splice(pos[0], 1);
            this.setState({tableComponent: component, tableContent: content}, function() {
                this.computeIndex();
                this.recomputePos();
            })
        }
    }
    handleAR(pos) {
        var component = this.state.tableComponent;
        var content = this.state.tableContent;
        if(pos[0] === -1) {
            for(let i=0; i<component.length; i++) {
                let obj = {onSelect: this.handleSelect, text: "", posX: i, posY: i, onTextChange: this.handleTextChange};
                component[i].push(obj);
                content.push("");
            }
        }
        else {
            for(let i=0; i<component.length; i++) {
                let obj = {onSelect: this.handleSelect, text: "", posX: i, posY: i, onTextChange: this.handleTextChange};
                component[i].splice(pos[1], 0, obj);
                content[i].splice(pos[1], 0, "");
            }
        }
        console.log("before update");
        this.setState({tableComponent: component, tableContent: content}, function() {
            this.computeIndex();
            this.recomputePos();
            if(pos[0] !== -1) {
                var new_cell = document.getElementsByClassName("tableColumn")[pos[0]].childNodes[pos[1]];
                setTimeout(() => new_cell.blur(), 500);
                var cell = document.getElementsByClassName("tableColumn")[pos[0]].childNodes[pos[1] + 1];
                setTimeout(() => {
                    cell.select();
                    cell.classList.add("selected");
                    cell.focus();
                    cell.readOnly = false;
                })
            }
        })
    }
    handleDR(pos) {
        if(pos[0] !== -1 && this.state.tableComponent[0].length > 1) {
            var component = this.state.tableComponent;
            var content = this.state.tableContent;
            for(let i=0; i<component.length; i++) {
                component[i].splice(pos[1], 1);
                content[i].splice(pos[1], 1);
            }
            this.setState({tableComponent: component, tableContent: content}, function() {
                this.computeIndex();
                this.recomputePos();
            })
        }
    }

    render() {
        return (
            <div className="tableContainer">
                <div>
                    <div className="cell ri"></div>
                    {this.state.rowIndex.map((item, index) => {
                        return (
                            <div className="cell ri">
                                {item}
                            </div>
                        )
                    })}
                </div>
                {this.state.tableComponent.map((item, index) => {
                    return (
                        <div>
                            <div className="cell ci">
                                {this.state.columnIndex[index]}
                            </div>
                            <div className="tableColumn">{item.map((innerItem, innerIndex) => {
                                // console.log(innerItem);
                                return (
                                    <SheetCell onSelect={innerItem.onSelect} text={innerItem.text} posX={innerItem.posX} posY={innerItem.posY} onTextChange={innerItem.onTextChange} nextCell={innerItem.nextCell} self={innerItem.ref}/>
                                )
                            })}</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Table;