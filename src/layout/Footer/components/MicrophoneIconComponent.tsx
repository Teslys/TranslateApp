import React, {useEffect} from 'react';

import Voice from '@react-native-voice/voice';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MicrophoneIcon = styled(Icon)`
  display: flex;
  align-self: center;
  margin-top: 10%;
`;
const SpeechButton = styled.TouchableOpacity`
  align-self: center;
  padding: 10px;
  background: #00adb5;
  width: 75px;
  height: 75px;
  margin-bottom: 5%;
  border-radius: 50px;
  align-content: center;
`;

interface props {
  stopRecognizing: Function;
}
function MicrophoneButton(props: props) {
  const speechResultsHandler = (e: any) => {
    const text = e.value[0];
    setTimeout(() => {
      props.stopRecognizing(text);
    }, 300);
  };

  useEffect(() => {
    Voice.onSpeechResults = speechResultsHandler;
  
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const _startRecognizing = async () => {
    try {
      await Voice.start('tr-TR');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SpeechButton
      onPressIn={() => _startRecognizing()}
      onPressOut={() => _stopRecognizing()}>
      <MicrophoneIcon name="microphone" size={45} color="white" />
    </SpeechButton>
  );
}

export default MicrophoneButton;
