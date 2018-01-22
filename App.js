import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

import { Score, Controls, GameWindow } from './app/components';
import { colors } from './app/resources';


export default class App extends Component {
  constructor() {
    super();
    const { height, width } = Dimensions.get('window');
    const smallDimension = height > width ? width : height;

    this.state = {
      height,
      width,
      direction: 'left',
      smallDimension,
      score: 0,
    }
  }

  handleLayout = () => {
    // This function handles app layout changes
    const { height, width } = Dimensions.get('window');
    this.setState({ height, width });
  }

  render() {
    const { score, height, width, smallDimension, direction } = this.state;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: colors.midDarkGrey,
        }}
      >
        <StatusBar barStyle='light-content' />
        <View
          style={{
            marginBottom: 6,
            height: Platform.OS == 'ios' ? 16 : 24,
            width,
            backgroundColor: Platform.OS == 'ios' ? colors.midDarkGrey : colors.lightGrey,
          }}
        />
        <GameWindow
          height={height * 0.7}
          width={width - 4}
          direction={direction}
          eat={() => this.setState({ score: score + 10})}
          lose={() => {}}
        />
        <View
          style={{
            flex: 1,
            width,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Score
            value={score}
            style={{
              fontSize: smallDimension * 0.09,
              color: colors.lightGrey,
            }}
          />
          <Controls
            moveUp={() => this.setState({ direction: 'up' })}
            moveDown={() => this.setState({ direction: 'down' })}
            moveLeft={() => this.setState({ direction: 'left' })}
            moveRight={() => this.setState({ direction: 'right' })}
            size={smallDimension * 0.3}
            colors={{ background: colors.midGrey, foreground: colors.lightGrey }}
          />
        </View>
      </View>
    );
  }
}