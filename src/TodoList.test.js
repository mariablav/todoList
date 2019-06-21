import "jest-dom/extend-expect";

import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import TodoItems from "./TodoItems";
import TodoList from "./TodoList";

afterEach(cleanup);

test("changes style of label as checkbox is checked/unchecked", () => {
  const { getByLabelText } = render(
    <TodoList entries={[{ key: 4, text: "Cook dinner", done: false }]} />
  );
  const checkbox = getByLabelText("checkbox");
  const label = getByLabelText("label");
  expect(label.style.textDecoration).toEqual("inherit");
  fireEvent.click(checkbox);
  expect(label.style.textDecoration).toEqual("line-through");
  fireEvent.click(checkbox);
  expect(label.style.textDecoration).toEqual("inherit");
});

test("render items in TodoItems.js", () => {
  const deleteItem = jest.fn();
  const toggleDone = jest.fn();
  const items = [
    { key: 3, text: "Fill Gas", done: false },
    { key: 4, text: "Cook dinner", done: false }
  ];
  const { queryByText, getAllByLabelText } = render(
    <TodoItems entries={items} delete={deleteItem} toggleDone={toggleDone} />
  );
  for (const item of items) {
    expect(queryByText("should be null")).toBeNull();
    expect(queryByText(item.text)).not.toBeNull();
  }

  const createdTasks = getAllByLabelText("todoItem").map(li => li.textContent);
  const originalTasks = items.map(c => c.text + "-");
  expect(createdTasks).toEqual(originalTasks);
});
