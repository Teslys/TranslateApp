import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import TranslateActions from '../actions/TranslateActions';
import TranslateStates from '../states/TranslateStates';
import {translateEvent,getHistoryEvent} from '../thunk/TranslateThunk';

export const translateSlice = createSlice({
  name: 'translate',
  initialState: TranslateStates,
  reducers: TranslateActions,
  extraReducers: builder => {
    builder.addCase(translateEvent.fulfilled, (state, action) => {
      state.translatedText = action.payload.translatedText;
    });
    builder.addCase(getHistoryEvent.fulfilled, (state, action) => {
      state.history = action.payload;
    });
  },
});

export const {
  swapTranslateLanguage,
  setSourceText,
  clearTranslatedText,
} = translateSlice.actions;

export default translateSlice.reducer;
