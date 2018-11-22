import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TouchableHighlight } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { logout } from '../../actions/VariablesActions';
import { colors } from '../../style';

const Logout = props => (
  <TouchableHighlight
    onPress={() => {
      props.logout();
      props.navigation.navigate('Auth');
      console.log(props);
    }}
    underlayColor="#fff"
    style={{ marginRight: 10 }}
  >
    <FontAwesome name="sign-out" size={25} color={colors.dark} />
  </TouchableHighlight>
);

const mapStateToProps = state => ({ navigation: state.Variables.navigation });
const mapDispatchToProps = dispach => bindActionCreators({ logout }, dispach);

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
