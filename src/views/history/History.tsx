import React, {useEffect} from 'react';
import styled from 'styled-components/native';
// import {useSelector, useDispatch} from 'react-redux';
import {Text, FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getHistoryEvent} from '../../store/thunk/TranslateThunk';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {footerActivity} from '../../store/reducers/NavigationReducer';

const Card = styled.ScrollView`
  width: 90%;
  margin: 0 auto;
  min-height: 200px;
  background: #222831;
  padding: 25px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`;
const CardItemView = styled.View`
  height: 150px;
  width: 100%;
  background: #393e46;
  margin-bottom: 3%;
  border-radius: 5px;
`;
const CardItemViewTitle = styled.Text`
  text-align: center;
  margin-top: 2%;
  color: white;
`;
const CustomFlatList = styled.FlatList`
  margin-top: 2%;
  margin-bottom: 8%;
`;
const TranslateInput = styled.TextInput`
  padding: 5px;
  font-size: 11px;
  z-index: 1;
  color: white;
`;
const DateText = styled.Text`
  font-size: 11px;
  color: white;
  text-align: center;
`;
const GoBackIcon = styled(Icon)`
  margin-left: 5%;
  margin-right: 5%;
`;
const HistoryTitleView = styled.View`
  width: 100%;
  background: #222831;
  display: flex;
  flex-direction: row;
`;
const HistoryTitleViewText = styled.Text`
  font-size: 15px;
  color: white;
  margin-top: 1%;
`;

function HistoryCard(item: any, languages: any) {
  let formatedDate = item.created.split('T')[0].split('-').reverse().join('-');
  let formatedTime = item.created.split('T')[1].split('.')[0];
  let findedSource = languages.find((res: any) => res.code == item.source);
  let findedTarget = languages.find((res: any) => res.code == item.target);
  return (
    <Card>
      <CardItemView>
        <CardItemViewTitle>{findedSource.title}</CardItemViewTitle>
        <TranslateInput
          editable={false}
          autoFocus={false}
          multiline
          numberOfLines={4}
          value={item.sourceValue}
        />
      </CardItemView>
      <CardItemView>
        <CardItemViewTitle>{findedTarget.title}</CardItemViewTitle>
        <TranslateInput
          editable={false}
          autoFocus={false}
          multiline
          numberOfLines={4}
          value={item.targetValue}
        />
      </CardItemView>
      <DateText>
        {formatedDate} {formatedTime}
      </DateText>
    </Card>
  );
}

function History({navigation}: any) {
  let dispatch = useDispatch<any>();
  let history = useSelector((state: any) => state.translate.history);
  let languages = useSelector((state: any) => state.translate.translateValues);
  useEffect(() => {
    dispatch(getHistoryEvent());
  }, []);
  function goHome() {
    dispatch(footerActivity(true));
    navigation.navigate('Home');
  }
  return (
    <View>
      <HistoryTitleView>
        <GoBackIcon
          name="arrow-left"
          size={35}
          color="white"
          onPress={() => goHome()}
        />
        <HistoryTitleViewText>History</HistoryTitleViewText>
      </HistoryTitleView>
      <CustomFlatList
        data={history}
        renderItem={data => HistoryCard(data.item, languages)}
        keyExtractor={(item: any) => item.created}
      />
    </View>
  );
}

export default History;
