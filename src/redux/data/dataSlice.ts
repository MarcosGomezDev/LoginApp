import { createSlice } from "@reduxjs/toolkit";
import { Data } from "../../Types/dataType";

const initialState: Data = {
  page: 0,
  per_page: 0,
  total: 0,
  total_pages: 0,
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action) => {
      const { page, per_page, total, total_pages, data } = action.payload;
      state.page = page;
      state.per_page = per_page;
      state.total = total;
      state.total_pages = total_pages;
      state.data = data;
    },
  },
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;
