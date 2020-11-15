import React, { Component } from 'react';
import GameStatusSelector from '../games/GameStatusSelector';
import '../../styles/Games.css';
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
  handleDeleteGameRecord = (e) => {
    e.preventDefault();
    const { currentGame } = this.props;
    console.log('deleted', currentGame.id); // TODO: modify it to the corresponding ajax request
  };
  render() {
    console.log('key', this.props.index);
    let { currentGame } = this.props;
    return (
      <tr>
        <td>{this.props.index}</td>
        <td className='poster' style={{ width: '200px' }}>
          <img
            style={{ width: '200px', height: '250px' }}
            src={placeholderImgSrc}
          />
        </td>
        <td>{currentGame.title}</td>
        <td>{currentGame.releaseYear}</td>
        <td>{currentGame.genres.join(' , ')}</td>
        <td>{currentGame.platforms.join(' , ')}</td>
        <td>
          <GameStatusSelector defaultValue={currentGame.status} gameRecordID={currentGame.id}/>
        </td>
        <td>
          {' '}
          <FontAwesomeIcon
            onClick={(e) => this.handleDeleteGameRecord(e)}
            icon='trash'
          />
        </td>
      </tr>
    );
  }
}