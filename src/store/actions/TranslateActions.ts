import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  swapTranslateLanguage: (state: any): void => {
    [state.translateSource, state.translateTarget] = [
      state.translateTarget,
      state.translateSource,
    ];

    AsyncStorage.setItem('translate/target', state.translateTarget);
    AsyncStorage.setItem('translate/source', state.translateSource);
  },
  setSourceText: (state: any, action: {payload: string}): void => {
    state.translateSourceText = action.payload;
  },

  clearTranslatedText: (state: any): void => {
    state.translatedText = '';
  },
  
};
