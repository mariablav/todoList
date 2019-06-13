import React from "react";
import { render, fireEvent } from "react-testing-library";
import TodoIList from "../TodoList";

//I haven't figured out the tests yet, this is only a draft
test("TodoList should add new item and call addItem", () => {
  const addItem = jest.fn();
  const { getByTestId } = render(<TodoList addItem />);

  let newItem = "Get Milk";
  fireEvent.change(getByTestId("newItemField"), { target: { text: newItem } });
  getByTestId("addBtn").click();

  expect(addItem).toBeCalledWith({ newItemValue: newItem });
  expect(addItem).toHaveBeenCalledTimes(1);
});
