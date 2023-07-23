import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {setSourceText} from '../../store/reducers/TranslateReducer';
import {Text} from 'react-native-svg';
import {translateEvent} from '../../store/thunk/TranslateThunk';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Body = styled.View`
  background: #222831;
  height: 95%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 100%;
`;
const TranslateInput = styled.TextInput`
  padding: 10px;
  color: white;
  font-size: 15px;
  z-index: 1;
`;

const Divider = styled.View`
  height: 0.3%;
  width: 50%;
  background: white;
  border-radius: 50px;
  margin: 15% auto;
`;


interface itemType {
  id: Number;
  title: String;
  code: String;
}
function Home() {
  const inputValue = useSelector(
    (state: any) => state.translate.translateSourceText,
  );
  const translatedValue = useSelector(
    (state: any) => state.translate.translatedText,
  );
  const sourceLanguage = useSelector((state: any) =>
    state.translate.translateValues.find(
      (item: itemType) => item.code == state.translate.translateSource,
    ),
  );
  const dispatch = useDispatch<any>();
  function eventTranslate() {
    dispatch(
      translateEvent({
        text: inputValue,
      }),
    );
  }

  return (
    <Body>
      <TranslateInput
        editable
        numberOfLines={4}
        placeholder={
          sourceLanguage.code == 'tr' ? 'Metin Giriniz...' : 'Enter Text...'
        }
        onChangeText={(text: string) => dispatch(setSourceText(text))}
        value={inputValue}
        onSubmitEditing={() => eventTranslate()}
        testID='translateInput'
      />
      <Divider />
      <TranslateInput editable={false} autoFocus={false} multiline numberOfLines={4} value={translatedValue} />
   
    </Body>
  );
}

export default Home;
