import React, {useEffect, useRef, useState, useMemo, memo} from 'react';
import type {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  clearTranslatedText,
  swapTranslateLanguage,
} from '../../store/reducers/TranslateReducer';
import {translateEvent} from '../../store/thunk/TranslateThunk';
import MicrophoneButton from './components/MicrophoneIconComponent';
import {setSourceText} from '../../store/reducers/TranslateReducer';

const Body = styled.View`
  width: 100%;
  display: flex;
  justify-self: center;
  align-content: center;
`;
const ChangeIcon = styled(Icon)`
  margin-left: 5%;
  margin-right: 5%;
`;
const SelectLanguageBody = styled.View`
  display: flex;
  flex-direction: row;
  width: 85%;
  height: 35px;
  margin-bottom: 5%;
  align-self: center;
`;
const SelectLanguage = styled.TouchableOpacity`
  background: #222831;
  width: 40%;
  height: 100%;
  border-radius: 5px;
  justify-content: center;
`;
const SelectLanguageText = styled.Text`
  text-align: center;
  color: white;
`;

interface itemType {
  id: Number;
  title: String;
  code: String;
}

function Footer() {
  const dispatch = useDispatch<any>();
  var languages = useSelector((state: any) => {
    return {
      targetLanguage: state.translate.translateValues.find(
        (item: itemType) => item.code == state.translate.translateTarget,
      ),
      sourceLanguage: state.translate.translateValues.find(
        (item: itemType) => item.code == state.translate.translateSource,
      ),
    };
  }, shallowEqual);

  const translatedText = useSelector(
    (state: any) => state.translate.translatedText,
  );

  var swapLanguage = () => {
    dispatch(swapTranslateLanguage());
    if (translatedText) {
      sendTranslateEvent(translatedText);
      dispatch(clearTranslatedText())
    }
  };
  var sendTranslateEvent = (text: string) => {
    dispatch(
      translateEvent({
        text: text,
      }),
    );
    dispatch(setSourceText(text));
  };
  return (
    <Body>
      <SelectLanguageBody>
        <SelectLanguage disabled>
          <SelectLanguageText>
            {languages.sourceLanguage.title}
          </SelectLanguageText>
        </SelectLanguage>
        <ChangeIcon
          name="swap-horizontal"
          size={35}
          color="white"
          onPress={() => swapLanguage()}
        />
        <SelectLanguage disabled>
          <SelectLanguageText>
            {languages.targetLanguage.title}
          </SelectLanguageText>
        </SelectLanguage>
      </SelectLanguageBody>
      <MicrophoneButton
        stopRecognizing={(val: string) =>
          sendTranslateEvent(val)
        }></MicrophoneButton>
        
    </Body>
  );
}

export default memo(Footer);
