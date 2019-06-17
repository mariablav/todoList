import "jest-dom/extend-expect";

import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import TodoItems from "./TodoItems";

class MyCheckbox extends React.Component {
  state = {
    done: false
  };
  toggle = () => {
    this.setState(({ done }) => ({ done: !done }));
  };

  render() {
    return (
      <div>
        <input type="checkbox" data-testid="checkbox" onClick={this.toggle} />
        <span
          data-testid="span"
          style={{
            textDecoration: this.state.done ? "line-through" : "inherit"
          }}
        >
          {"Some todo item"}
        </span>
      </div>
    );
  }
}

afterEach(cleanup);

test("changes style of span as checkbox is checked/unchecked", () => {
  const { getByTestId } = render(<MyCheckbox />);
  const checkbox = getByTestId("checkbox");
  const span = getByTestId("span");
  expect(span.style.textDecoration).toEqual("inherit");
  fireEvent.click(checkbox);
  expect(span.style.textDecoration).toEqual("line-through");
  fireEvent.click(checkbox);
  expect(span.style.textDecoration).toEqual("inherit");
});

test("render items in TodoItems.js", () => {
  const deleteItem = jest.fn();
  const toggleDone = jest.fn();
  const items = [
    { key: 3, text: "Fill Gas", done: false },
    { key: 4, text: "Cook dinner", done: false }
  ];
  const { getAllByTestId } = render(
    <TodoItems entries={items} delete={deleteItem} toggleDone={toggleDone} />
  );
  const createdTasks = getAllByTestId("todoItem").map(li => li.textContent);
  const originalTasks = items.map(c => c.text + "-");
  expect(createdTasks).toEqual(originalTasks);
});
