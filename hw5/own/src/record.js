import React, { Component } from "react";

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <p>{this.props.content}</p>
      </>
    );
  }
}

export default Record;
