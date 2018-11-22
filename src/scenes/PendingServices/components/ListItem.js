import React from 'react';
import { Alert, Dimensions, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors, textStyles } from '../../../style';

export default ListItem = (props) => {
  const { width } = Dimensions.get('window');

  const confirmRemove = () => Alert.alert(
    'Deseja remove o agendamento?',
    'Não será possível retornar após confirmar a remoção',
    [
      {text: 'Cancelar', onPress: () => false, style: 'cancel'},
      { text: 'Confirmar', onPress: () => {
        props.remove(props.item.key, props.listScheduleing);
      } },
    ],
    { cancelable: true },
  );

  return (
    <View style={{ height: 80, width: width-10, backgroundColor: '#fafafa', margin: 5, flexDirection: 'row' }}>
      <View style={{ flex: 5 }}>
        <Text style={{ margin: 5, ...textStyles.default }}>Serviço: {props.item.description}</Text>
        <Text style={{ margin: 5, ...textStyles.default }}>Data agendada: {props.item.schedulingDate}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          onPress={confirmRemove}
          underlayColor="#fafafa"
        >
          <Icon name="delete" size={40} color={colors.danger} />
        </TouchableHighlight>
      </View>
    </View>
  );
};
