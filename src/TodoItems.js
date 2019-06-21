/** @jsx jsx */
import { Component } from "react";
import { jsx } from "@emotion/core";
import withProps from "recompose/withProps";
import styled from "@emotion/styled";

const RoundCheckBox = withProps({ type: "checkbox" })(styled("input")`
  width: 1.6em;
  height: 1.6em;
  background-color: ${props => (props.done ? "#32CD32" : "white")};
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #ddd;
  appearance: none;
  outline: none;
  cursor: pointer;
  
  &:before {
    content:  ${props => (props.done ? "'✔'" : "")};
    color: #ffffff;
    position: absolute;
    margin-left: 3px;
    margin-top: 1px;
  }
}
`);
class TodoItems extends Component {
  constructor(props) {
    super(props);
  }

  delete(key) {
    this.props.delete(key);
  }

  toggleDone(key) {
    this.props.toggleDone(key);
  }

  render() {
    var todoEntries = this.props.entries;

    return (
      <ul className="todoList">
        {todoEntries.map(item => (
          <li className="todoItem" key={item.key} aria-label="todoItem">
            <label
              aria-label="label"
              style={{ textDecoration: item.done ? "line-through" : "inherit" }}
            >
              <RoundCheckBox
                aria-label="checkbox"
                done={item.done}
                onClick={this.props.toggleDone.bind(this, item.key)}
              />
              {item.text}
            </label>
            <button onClick={() => this.delete(item.key)} type="button">
              -
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default TodoItems;
