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
import { deleteUserRecord } from '../../utils/api';

library.add(faEdit, faTrash, faMinusCircle);
const placeholderImgSrc =
  'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png';

export default class GameRecord extends Component {
  handleDeleteGameRecord = async(e) => {
    e.preventDefault();
    const { currentGame, email, token } = this.props;
    await deleteUserRecord(currentGame.id,token)
    console.log('deleted', currentGame.id, email, token); // TODO: modify it to the corresponding ajax request
    this.props.refreshParent()
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
            src={currentGame.imgSrc?currentGame.imgSrc:placeholderImgSrc}
          />
        </td>
        <td>{currentGame.title}</td>
        <td>{currentGame.releaseYear}</td>
        <td>{currentGame.genres.join(' , ')}</td>
        <td>{currentGame.platforms.join(' , ')}</td>
        <td>
          <GameStatusSelector refreshParent={this.props.refreshParent} defaultValue={currentGame.status} token={this.props.token} gameRecordID={currentGame.id}/>
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
