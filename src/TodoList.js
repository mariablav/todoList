import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.entries || [],
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  addItem(e) {
    if (this.state.value !== "") {
      var newItem = {
        text: this.state.value,
        key: Date.now(),
        done: false
      };

      this.setState(prevState => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
    }
    this.setState({ value: "" });

    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function(item) {
      return item.key !== key;
    });

    this.setState({
      items: filteredItems
    });
  }

  toggleDone = key => {
    this.setState({
      items: this.state.items.map(item => {
        if (item.key === key) item.done = !item.done;
        return item;
      })
    });
  };

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="enter task"
            />
            <button type="submit">add</button>
          </form>
        </div>
        <TodoItems
          entries={this.state.items}
          delete={this.deleteItem}
          toggleDone={this.toggleDone}
        />
      </div>
    );
  }
}

export default TodoList;
