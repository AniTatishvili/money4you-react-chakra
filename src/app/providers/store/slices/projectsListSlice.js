import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	list: [],
	loaded: true,
}

export const projectsListSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setProjects: (state, action) => {
			state.list = action.payload;
			state.loaded = false;
		},
	},
});

export const { setProjects } = projectsListSlice.actions;
export default projectsListSlice.reducer;
