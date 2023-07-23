import * as React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {footerActivity} from '../../store/reducers/NavigationReducer';

const HeaderBody = styled.View`
  width: 100%;
  height: 50px;
  background: #222831;
  display: flex;
  align-self: center;
  display: flex;
  flex-direction: row;
  position: relative;
`;
const HeaderText = styled.Text`
  color: white;
  text-align: center;
  font-family: Roboto;
  font-size: 18px;
  margin-top: 2%;
`;
const TranslateIcon = styled(Icon)`
  margin-right: 3%;
  margin-left: 3%;
  margin-top: 3%;
`;
const HistoryIcon = styled(Icon)`
  margin-left: 3%;
  margin-top: 2%;
  position: absolute;
  right: 2%;
  background: #00adb5;
  text-align: center;
  border-radius: 50px;
  padding-top: 4px;
  padding-right: 2px;
`;
export default function Header() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const activeFooter = useSelector(
    (state: any) => state.navigation.activeFooter,
  );
  function goHistory() {
    dispatch(footerActivity(false));
    navigation.navigate('History');
  }
  return (
    <HeaderBody>
      <TranslateIcon name="translate" size={25} color="white" />
      <HeaderText>Translate App</HeaderText>
      {activeFooter ? (
        <HistoryIcon
          name="history"
          size={25}
          color="white"
          onPress={() => goHistory()}
          testID='historyButton'
        />
      ) : (
        <></>
      )}
    </HeaderBody>
  );
}
