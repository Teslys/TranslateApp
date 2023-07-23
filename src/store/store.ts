import {
  configureStore,
} from '@reduxjs/toolkit';
import TranslateReducer from './reducers/TranslateReducer';
import NavigationReducer from './reducers/NavigationReducer';


export default configureStore({
  reducer: {
    translate: TranslateReducer,
    navigation: NavigationReducer
  },
});
