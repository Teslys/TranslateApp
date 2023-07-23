import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import NavigationActions from '../actions/NavigationActions';
import NavigationStates from '../states/NavigationStates';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: NavigationStates,
  reducers: NavigationActions,
});

export const {footerActivity} = navigationSlice.actions;

export default navigationSlice.reducer;
