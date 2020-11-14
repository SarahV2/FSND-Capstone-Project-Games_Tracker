import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import {
  faEdit,
  faTrash,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faTrash, faMinusCircle);
const placeholderImgSrc =
  'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png';

export default class GameDetails extends Component {
    handleDeleteGame = (e) => {
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
        <td>{currentGame.about}</td>
        <td>{currentGame.release_year}</td>
        <td>{currentGame.genres.join(' , ')}</td>
        <td>{currentGame.platforms.join(' , ')}</td>
        <td>
          <Link
            to={{
              pathname: `/games/edit/${currentGame.id}`,
              state: {
                currentGameID: currentGame.id,
              },
            }}
          >
              {/* <div> */}
              
            <FontAwesomeIcon
            //   onClick={(e) => this.handleEditGameInfo(e)}
              icon='edit'
            />
            {/* </div> */}
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
