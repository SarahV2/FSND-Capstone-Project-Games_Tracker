import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import {deleteGame} from '../../utils/api'

import {
  faEdit,
  faTrash,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faTrash, faMinusCircle);
const placeholderImgSrc =
  'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png';

export default class GameDetails extends Component {
    handleDeleteGame = async(e) => {
        e.preventDefault();
        const { currentGame } = this.props;
        await deleteGame(currentGame.id,this.props.token)
      };
  render() {
    let { currentGame } = this.props;
    return (
      <tr>
        <td className='poster' style={{ width: '200px' }}>
          <img
            style={{ width: '200px', height: '250px' }}
            src={currentGame.imgSrc}
          />
        </td>
        <td>{currentGame.title}</td>
        <td>{currentGame.release_year}</td>
        <td>{currentGame.genres.join(' , ')}</td>
        <td>{currentGame.platforms.join(' , ')}</td>
        <td>
          <Link
            to={{
              pathname: `/games/edit/info?game=${currentGame.id}`,
              state: {
                currentGameID: currentGame.id,
              },
            }}
          >              
            <FontAwesomeIcon
              icon='edit'
            />
          </Link>
        </td>
        <td>
          {' '}
          <FontAwesomeIcon
            onClick={(e) => this.handleDeleteGame(e)}
            icon='trash'
          />
        </td>
      </tr>
    );
  }
}
