import { createSlice } from "@reduxjs/toolkit";

const vesselInitialState = {
  data: [],
};

export const vesselSlice = createSlice({
  name: "payload",
  initialState: vesselInitialState,
  reducers: {
    setVesselSlice: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setVesselSlice } = vesselSlice.actions;

export default vesselSlice.reducer;
