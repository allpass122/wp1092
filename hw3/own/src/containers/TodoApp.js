import React, { Component } from "react";
import Header from "../components/Header";
import AppList from "../components/AppList";

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputDefaultValue: "",
      taskCounter: 0,
      items: [],
      printSelectMode: "ALL",
    };
  }
  update = (e) => {
    this.setState({ inputDefaultValue: e.target.value });
  };
  getInput = (e) => {
    {
      if (e.key === "Enter") {
        this.setState((previousState) => {
          return {
            inputDefaultValue: "",
            items: [
              ...previousState.items,
              {
                data: e.target.value,
                ID: previousState.taskCounter,
                status: "TODO",
              },
            ],
            taskCounter: previousState.taskCounter + 1,
          };
        });
        // Add AppItem
      }
    }
  };
  cleanCompleted = (e) => {
    this.setState((previousState) => {
      return {
        items: [
          ...previousState.items.filter((item) => item.status === "TODO"),
        ],
      };
    });
  };
  changeStatus = (ID) => () => {
    //console.log(ID);
    this.setState((previousState) => {
      return {
        items: [
          ...previousState.items.filter((item) => item.ID !== ID),
          {
            data: previousState.items.filter((item) => item.ID === ID)[0].data,
            ID: previousState.items.filter((item) => item.ID === ID)[0].ID,
            status:
              previousState.items.filter((item) => item.ID === ID)[0].status ===
              "TODO"
                ? "COMPLETED"
                : "TODO",
          },
        ].sort((a, b) => {
          return a.ID - b.ID;
        }),
      };
    });
  };
  removeItem = (ID) => () => {
    this.setState((previousState) => {
      return {
        items: [...previousState.items.filter((item) => item.ID !== ID)],
      };
    });
  };
  render() {
    console.log(this.state);
    return (
      <>
        <Header text="todos" />
        <section className="todo-app__main">
          <input
            className="todo-app__input"
            value={this.state.inputDefaultValue}
            placeholder="What needs to be done?"
            onChange={this.update}
            onKeyDown={this.getInput}
          />
          <AppList
            items={this.state.items}
            changeStatus={this.changeStatus}
            removeItem={this.removeItem}
            printSelectMode={this.state.printSelectMode}
          />
        </section>
        <footer
          className={
            this.state.items.length !== 0
              ? "todo-app__footer"
              : "todo-app__footer_displayNone"
          }
          id="todo-footer"
        >
          <div className="todo-app__total">
            {this.state.items.filter((item) => item.status === "TODO").length}{" "}
            left
          </div>
          <ul className="todo-app__view-buttons">
            <button
              onClick={() => {
                this.setState({ printSelectMode: "ALL" });
              }}
            >
              All
            </button>
            <button
              onClick={() => {
                this.setState({ printSelectMode: "TODO" });
              }}
            >
              Todo
            </button>
            <button
              onClick={() => {
                this.setState({ printSelectMode: "COMPLETED" });
              }}
            >
              Completed
            </button>
          </ul>
          <div className="todo-app__clean">
            <button onClick={this.cleanCompleted}>Clear Completed</button>
          </div>
        </footer>
      </>
    );
  }
}

TodoApp.defaultProps = {};
export default TodoApp;
