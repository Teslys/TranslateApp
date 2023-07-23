import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface translateFunctionInterfaces {
  text: string;
}
export const translateEvent = createAsyncThunk(
  'translateAction/translate',
  async ({text}: translateFunctionInterfaces) => {
    let target = await AsyncStorage.getItem('translate/target');
    let source = await AsyncStorage.getItem('translate/source');
    const res = await fetch('https://translate.argosopentech.com/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: source,
        target: target,
        format: 'text',
      }),
      headers: {'Content-Type': 'application/json'},
    });
    let data = await res.json();
    let history = await AsyncStorage.getItem('translate/history');
    if (!history) {
      let historyData = [
        {
          target: target,
          targetValue: data.translatedText,
          source: source,
          sourceValue: text,
          created: new Date().toISOString(),
        },
      ];
      AsyncStorage.setItem('translate/history', JSON.stringify(historyData));
    } else {
      let historyParsedData = JSON.parse(history);
      historyParsedData.push({
        target: target,
        targetValue: data.translatedText,
        source: source,
        sourceValue: text,
        created: new Date().toISOString(),
      });
      AsyncStorage.setItem(
        'translate/history',
        JSON.stringify(historyParsedData),
      );
    }

    return data;
  },
);
export const getHistoryEvent = createAsyncThunk(
  'translateAction/history',
  async () => {
    let history = await AsyncStorage.getItem('translate/history');

    
    if(!history) return []
    let historyParsedData = JSON.parse(history);

    return historyParsedData;
  },
);
