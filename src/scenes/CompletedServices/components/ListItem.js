import React from 'react';
import { Alert, Dimensions, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors, textStyles } from '../../../style';

export default ListItem = (props) => {
  const { width } = Dimensions.get('window');

  const toEvaluate = () => props.navigation.navigate('Evaluation', { scheduling: props.item });

  const RenderIcon = () => {
    if (props.item.evaluation === 5)
    {
      return (
        <Icon
          name="star"
          size={40}
          color={colors.yellow}
          style={{ borderWidth: 2, borderColor: colors.yellow, borderRadius: 25, backgroundColor: '#ee7600', paddingTop: 2, paddingLeft: 2 }}
        />
      )
    } else if (props.item.evaluation > 0) {
      return (
        <Icon
          name="star-half"
          size={40}
          color={colors.yellow}
          style={{ borderWidth: 2, borderColor: colors.yellow, borderRadius: 25, backgroundColor: '#ee7600', paddingTop: 2, paddingLeft: 2 }}
        />
      )
    }
    return (
      <Icon
        name="star-border"
        size={40}
        color={'#777'}
        style={{ borderWidth: 2, borderColor: '#777', borderRadius: 25, paddingTop: 2, paddingLeft: 2 }}
      />
    )
  }

  return (
    <View style={{ height: 80, width: width-10, backgroundColor: '#fafafa', margin: 5, flexDirection: 'row' }}>
      <View style={{ flex: 5 }}>
        <Text style={{ margin: 5, ...textStyles.default }}>Serviço: {props.item.description}</Text>
        <Text style={{ margin: 5, ...textStyles.default }}>Data agendada: {props.item.schedulingDate}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          onPress={toEvaluate}
          underlayColor="#fafafa"
        >
          <RenderIcon />
        </TouchableHighlight>
      </View>
    </View>
  );
};
