import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`
    );
    return response.data;
  }
);
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,
      data
    );
    debugger;
    return response.data;
  }
);
export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,
      data
    );
    return res.data;
  }
);
export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`
    );
    return res.data;
  }
);
