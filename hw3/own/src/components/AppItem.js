import React, { Component } from "react";

class AppItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <li className="todo-app__item">
          <div className="todo-app__checkbox">
            <input
              type="checkbox"
              checked={this.props.status === "COMPLETED"}
              id={this.props.ID}
              onClick={this.props.changeStatus(this.props.ID)}
            />
            <label for={this.props.ID}></label>
          </div>
          <h1
            className={
              this.props.status === "TODO"
                ? "todo-app__item-detail"
                : "todo-app__item-detail_crossout"
            }
          >
            {this.props.data}
          </h1>
          <img
            src="./img/x.png"
            className="todo-app__item-x"
            onClick={this.props.removeItem(this.props.ID)}
          />
        </li>
      </>
    );
  }
}

export default AppItem;
