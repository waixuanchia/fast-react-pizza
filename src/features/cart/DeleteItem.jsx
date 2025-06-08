import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      delete
    </Button>
  );
};

export default DeleteItem;
