import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    searchMessage: "",
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload.result;
      state.searchMessage = action.payload.message;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
