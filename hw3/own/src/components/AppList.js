import React, { Component } from "react";
import AppItem from "../components/AppItem";

class AppList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <ul className="todo-app__list" id="todo-list">
          {console.log(this.props.printSelectMode)}
          {this.props.items
            .filter(
              this.props.printSelectMode === "ALL"
                ? (item) => item.status === "TODO" || "COMPLETED"
                : this.props.printSelectMode === "TODO"
                ? (item) => item.status === "TODO"
                : (item) => item.status === "COMPLETED"
            )
            .map((item) => (
              <AppItem
                data={item.data}
                status={item.status}
                ID={item.ID}
                removeItem={this.props.removeItem}
                changeStatus={this.props.changeStatus}
              />
            ))}
        </ul>
      </>
    );
  }
}

export default AppList;
