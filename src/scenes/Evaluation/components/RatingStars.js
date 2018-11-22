import React, { Component } from 'react';
import { View, Text, Button, TextInput, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { colors, textStyles } from '../../../style';
import { setEvaluation } from '../actions/evaluationActions';
import { listScheduleingCompleted } from '../../CompletedServices/actions/completedServiceActions';
import Star from './Star';

class RatingStars extends Component {
  constructor(props) {
    super(props);
    this.state = { evaluation: props.scheduling.evaluation };
  }
  render() {
    const { scheduling } = this.props;
    let { evaluation } = this.state;
    let evaluated = [];
    let notEvaluated = [];

    if (!evaluation) evaluation = 0;

    let i = 0;
    while (i !== evaluation) {
      i+=1;
      evaluated.push(
        <Star
          number={i}
          name="star"
          color={colors.warning}
          key={i}
          schedulingKey={scheduling.key}
          onPress={
            ({ key, numberEvaluation }) => this.props.setEvaluation(
              { key, evaluation: numberEvaluation },
              () => {
                this.setState({ evaluation: numberEvaluation });
                this.props.listScheduleingCompleted();
              },
            )
          }
          update={number => this.setState({ evaluation: number })}
        />
      );
    }

    let j = 0;
    while (j !== 5 - evaluation) {
      j += 1;
      notEvaluated.push(
        <Star
          number={i + j}
          name="star"
          color="#999"
          key={j}
          schedulingKey={scheduling.key}
          onPress={
            ({ key, numberEvaluation }) => this.props.setEvaluation(
              { key, evaluation: numberEvaluation },
              () => {
                this.setState({ evaluation: numberEvaluation });
                this.props.listScheduleingCompleted();
              },
            )
          }
          update={number => this.setState({ evaluation: number })}
          reload={this.forceUpdate}
        />
      );
    }

    return (
      <View style={{  flexDirection: 'row', marginVertical: 30, marginHorizontal: 10 }}>
        <Star
          number={0}
          reload={this.forceUpdate}
          key={0}
          schedulingKey={scheduling.key}
          onPress={({ key }) => this.props.setEvaluation(
            { key, evaluation: 0 },
            () => {
              this.setState({ evaluation: 0 });
              this.props.listScheduleingCompleted();
            },
          )}
        />
        {evaluated}
        {notEvaluated}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setEvaluation, listScheduleingCompleted }, dispatch);

export default connect(null, mapDispatchToProps)(RatingStars);
