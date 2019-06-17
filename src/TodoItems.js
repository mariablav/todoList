/** @jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import withProps from "recompose/withProps";
import styled from "@emotion/styled";

// Here I'm trying to create RoundCheckBox with "emotion". At the moment RoundCheckBox does not change color onClick. The propblem is that I don't know how to provide {item.done} value to the RoundCheckBox
// const RoundCheckBox = withProps({ type: "checkbox" })(styled("input")`
//   width: 1.3em;
//   height: 1.3em;
//   background-color: ${props => (props.true ? "green" : "yellow")};
//   border-radius: 50%;
//   vertical-align: middle;
//   border: 1px solid #ddd;
//   -webkit-appearance: none;
//   outline: none;
//   cursor: pointer;
// `);
class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }
  createTasks(item) {
    return (
      <div className="todoItem">
        {" "}
        <li key={item.key} data-testid="todoItem">
          <input
            type="checkbox"
            onClick={this.props.toggleDone.bind(this, item.key)}
            state
          />
          {/* <RoundCheckBox  {item.done} onClick={this.props.toggleDone.bind(this, item.key)} /> */}
          <span
            style={{ textDecoration: item.done ? "line-through" : "inherit" }}
          >
            {item.text}
          </span>
          <button onClick={() => this.delete(item.key)} type="button">
            {"-"}
          </button>
        </li>
      </div>
    );
  }

  delete(key) {
    this.props.delete(key);
  }

  toggleDone(key) {
    this.props.toggleDone(key);
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return <ul className="todoList">{listItems}</ul>;
  }
}

export default TodoItems;
