import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';


export default class Score extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    style: PropTypes.object,
  }

  render() {
    return (
      <View>
        <Text style={{ ...this.props.style }}>
          Score:
                </Text>
        <Text style={{ textAlign: 'right', ...this.props.style }}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}