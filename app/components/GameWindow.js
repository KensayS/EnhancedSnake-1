import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { Block } from '.';
import { colors } from '../resources';

const blockSize = 23;

export default class GameWindow extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    eat: PropTypes.func.isRequired,
    lose: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { height, width } = this.props;

    // Create a variable for the update interval
    this.updateInterval = null;

    // Starting snake length + 1
    this.snakeSize = 4;

    // Calculate the number of blocks that will fit in the window
    const verticalBlocks = Math.floor(height / blockSize);
    const horizontalBlocks = Math.floor(width / blockSize);
    const numBlocks = verticalBlocks * horizontalBlocks;

    // Calculate the starting snake position
    this.headPosition = Math.floor((verticalBlocks * horizontalBlocks) / 2);

    // Create an array of blocks and put the snake in the center
    let blocks = Array(numBlocks).fill({ type: 'empty', decay: 0 });
    blocks[this.headPosition] = { type: 'snake', decay: this.snakeSize };

    // Place down first food
    let placed = false;
    while(!placed)
    {
      // Pick a random location on the board
      let location = Math.floor(Math.random() * blocks.length);
      if (blocks[location].type === 'empty')
      {
        blocks[location] = { type: 'food', decay: 0 };
        placed = true;
      }
    }

    // Store these since we will need them later
    this.state = {
      height: (verticalBlocks * blockSize) + 1,
      width: (horizontalBlocks * blockSize) + 1,
      blocks,
      verticalBlocks,
      horizontalBlocks,
    }
  }

  // Called before the component first renders
  componentDidMount() {
    this.updateInterval = setInterval(this.update, 100);
  }

  // Called when the component is no longer rendered
  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  update = () => {
    const { direction } = this.props;

    let blocks;

    // Call the proper function to move the snake
    switch (direction) {
      case 'left':
        blocks = this.moveLeft();
        break;
      case 'right':
        blocks = this.moveRight();
        break;
      case 'up':
        blocks = this.moveUp();
        break;
      case 'down':
        blocks = this.moveDown();
        break;
    }

    // Since none of the movement functions are implemented yet, blocks will
    // be undefined at this point. We need to define it for now.
    // **REMOVE THIS LINE BEFORE TESTING**
    blocks = this.state.blocks.slice();

    // Decay the blocks based on their decay values. This is what prevents the
    // snake from getting longer on each movement. If a food decays, we place
    // a wall down and place a new food as well.
    for (let block of blocks) {
      if (block.decay !== 0) {
        block.decay = block.decay - 1;
        if (block.decay === 0) {
          if (block.type === 'food')
            blocks = this.placeWall(this.placeFood(blocks));
          block.type = 'empty';
        }
      }
    }

    this.setState({ blocks });
  }

  moveLeft = () => {
    // What do we have to do to move left? Are there any edge cases to account
    // for? The function checkAndMove() defined below will automatically do the
    // movement to the array index it is given, and it will return a modified
    // block array for you.
  }

  moveRight = () => {
    // TODO move right
  }

  moveUp = () => {
    // TODO move up
  }

  moveDown = () => {
    // TODO move down
  }

  checkAndMove = (location) => {
    const { lose, eat } = this.props;

    // Get a copy of the current array of blocks
    let blocks = this.state.blocks.slice();

    // Check what's at the location the function is passed
    switch (blocks[location].type) {
      case 'snake':
      case 'wall':
        // These are the game's lose conditions, so call the lose prop
        lose();
        return blocks;
      case 'food':
        // Call the eat prop then replace the food with a snake block
        eat();
        blocks[location] = { type: 'snake', decay: this.snakeSize };
        this.snakeSize += 2;
        this.headPosition = location;

        // First place a new food, then place a new wall
        return this.placeWall(this.placeFood(blocks));
      default:
        // If the block is not any of the above, we assume that it's empty and
        // replace it with a snake block.
        blocks[location] = { type: 'snake', decay: this.snakeSize };
        this.headPosition = location;
        return blocks;
    }
  }

  placeFood = (blocks) => {
    // Place the food
    let placed = false;
    while(!placed) {
      // Pick a random location on the board
      let location = Math.floor(Math.random() * blocks.length);

      // Check to make sure the block is empty before placement
      if (blocks[location].type === 'empty')
      {
        blocks[location] = { type: 'food', decay: 150 };
        placed = true;
      }
    }

    return blocks;
  }

  placeWall = (blocks) => {
    // Place the wall
    placed = false;
    while(!placed) {
      // Pick a random location on the board
      let location = Math.floor(Math.random() * blocks.length);

      // Check to make sure the block is empty before placement
      if (blocks[location].type === 'empty')
      {
        blocks[location] = { type: 'wall', decay: 0 };
        placed = true;
      }
    }

    return blocks;
  }

  render() {
    const { blocks, height, width } = this.state;

    // Map our array of blocks to renderable Block elements
    const renderedBlocks = blocks.map((block, index) => {
      return <Block type={block.type} size={blockSize} decay={block.decay} key={index}/>;
    });

    return (
      <View
        style={{
          flexWrap: 'wrap',
          height,
          width,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.midGrey,
        }}
      >
        {renderedBlocks}
      </View>
    );
  }
}