import React, { Component } from 'react';
import GameStatusSelector from '../games/GameStatusSelector';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTrash,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faTrash, faMinusCircle);
const placeholderImgSrc =
  'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png';
  
export default class GameRecord extends Component {
  render() {
      console.log('key',this.props.index)
      let {currentGame}=this.props
    return (
      <tr>
        <td style={{ paddingTop: '100px' }}>{this.props.index}</td>
        <td style={{ width: '200px' }}>
          <img
            style={{ width: '200px', height: '250px' }}
            src={placeholderImgSrc}
          />
        </td>
        <td style={{ paddingTop: '100px' }}>{currentGame.title}</td>
        <td style={{ paddingTop: '100px' }}>{currentGame.releaseYear}</td>
        <td style={{ paddingTop: '100px' }}>{currentGame.genres.join(' ,')}</td>
        <td style={{ paddingTop: '100px' }}>{currentGame.platforms.join(' ,')}</td>
        <td style={{ paddingTop: '100px' }}>
          <GameStatusSelector defaultValue={currentGame.status} />
        </td>
        <td style={{ paddingTop: '100px' }}>
          {' '}
          <FontAwesomeIcon icon='trash' />
        </td>
      </tr>
    );
  }
}
