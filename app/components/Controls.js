import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const defaultSize = 100;


export default class Controls extends Component {
  static propTypes = {
    moveUp: PropTypes.func.isRequired,
    moveDown: PropTypes.func.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
    size: PropTypes.number,
    colors: PropTypes.object,
  }

  render() {
    const {
          moveUp,
      moveDown,
      moveLeft,
      moveRight,
        } = this.props;

    // Since the size and colors props are not required, we have to default
    // them to a predetermined value if none is given.
    const size = this.props.size ? this.props.size : defaultSize;
    const colors = this.props.colors ? this.props.colors :
      { background: 'black', foreground: 'white' };

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: size,
          width: size,
          borderRadius: size / 2, // Makes a circle
          overflow: 'hidden', // Anything that goes outside of this view is hidden
        }}
      >
        <TouchableOpacity onPress={moveUp}>
          <View
            style={{
              height: size,
              width: size,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              backgroundColor: colors.background,
              borderColor: colors.foreground,
              borderWidth: StyleSheet.hairlineWidth, // Always 1 real pixel
              transform: [
                { rotateZ: '45deg' },
              ],
            }}
          >
            <View
              style={{
                width: 0,
                height: 0,
                margin: (size / 10),
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: size / 8,
                borderRightWidth: size / 8,
                borderBottomWidth: size / 4,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: colors.foreground,
                transform: [
                  { rotateZ: '315deg' },
                ],
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'visible',
          }}
        >
          <TouchableOpacity onPress={moveLeft}>
            <View
              style={{
                height: size,
                width: size,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                marginTop: -(size / 3.25),
                marginBottom: -(size / 3.25),
                backgroundColor: colors.background,
                borderColor: colors.foreground,
                borderWidth: StyleSheet.hairlineWidth, // Always 1 real pixel
                transform: [
                  { rotateZ: '45deg' },
                ],
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  margin: (size / 10),
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: size / 8,
                  borderRightWidth: size / 8,
                  borderBottomWidth: size / 4,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: colors.foreground,
                  transform: [
                    { rotateZ: '225deg' },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: size / 2.6,
            }}
          />
          <TouchableOpacity onPress={moveRight}>
            <View
              style={{
                height: size,
                width: size,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                marginLeft: -0.5,
                marginTop: -(size / 3.25),
                marginBottom: -(size / 3.25),
                backgroundColor: colors.background,
                borderColor: colors.foreground,
                borderWidth: StyleSheet.hairlineWidth, // Always 1 real pixel
                transform: [
                  { rotateZ: '45deg' },
                ],
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  margin: (size / 10),
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: size / 8,
                  borderRightWidth: size / 8,
                  borderBottomWidth: size / 4,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: colors.foreground,
                  transform: [
                    { rotateZ: '45deg' },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={moveDown}>
          <View
            style={{
              height: size,
              width: size,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              backgroundColor: colors.background,
              borderColor: colors.foreground,
              borderWidth: StyleSheet.hairlineWidth, // Always 1 real pixel
              transform: [
                { rotateZ: '45deg' },
              ],
            }}
          >
            <View
              style={{
                width: 0,
                height: 0,
                margin: (size / 10),
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: size / 8,
                borderRightWidth: size / 8,
                borderBottomWidth: size / 4,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: colors.foreground,
                transform: [
                  { rotateZ: '135deg' },
                ],
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}