import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../resources';

export default class Block extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    decay: PropTypes.number,
  }

  render() {
    const { type, size, decay } = this.props;

    let snakeColor = colors.green1;
    if (decay) {
      if (decay > 4)
        snakeColor = colors.green2;
      if (decay > 8)
        snakeColor = colors.green3;
      if (decay > 16)
        snakeColor = colors.green4;
    }

    switch (type) {
      case 'food':
        return (
          <View
            style={{
              height: size,
              width: size,
              borderWidth: size / 4,
              borderColor: colors.darkGrey,
              backgroundColor: colors.red,
            }}
          />
        );
      case 'snake':
        return (
          <View
            style={{
              height: size,
              width: size,
              backgroundColor: snakeColor,
            }}
          />
        );
      case 'wall':
        return (
          <View
            style={{
              height: size,
              width: size,
              borderWidth: 1,
              borderColor: colors.darkGrey,
              backgroundColor: colors.lightGrey,
            }}
          />
        );
      default:
        return (
          <View
            style={{
              height: size,
              width: size,
              backgroundColor: colors.darkGrey,
            }}
          />
        );
    }
  }
}