import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
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
export default class CustomizedList extends Component {
    state={
        gameStatus:'finished'
    }
  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
        gameStatus:e.target.value
    })
  };
  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Poster</th>
              <th>Game Title</th>
              <th>Release Year</th>
              <th>Genre(s)</th>
              <th>Platform(s)</th>
              <th>
                <FontAwesomeIcon icon='edit' />
              </th>
              <th>
                <FontAwesomeIcon icon='minus-circle' />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ paddingTop: '100px' }}>1</td>
              <td style={{ width: '200px' }}>
                <img
                  style={{ width: '200px', height: '250px' }}
                  src={placeholderImgSrc}
                />
              </td>
              <td style={{ paddingTop: '100px' }}>Name</td>
              <td style={{ paddingTop: '100px' }}>2002</td>
              <td style={{ paddingTop: '100px' }}>Adventure</td>
              <td style={{ paddingTop: '100px' }}>PS2</td>
              <td style={{ paddingTop: '100px' }}>
                <select
                  style={{
                    textAlignLast: 'center',
                    height: '50px',
                    width: '200px',
                  }}
                  value={this.state.gameStatus}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                >
                  <option value='want to play'>Want to Play</option>
                  <option value='currently playing'>Currently Playing</option>
                  <option className='text-center' value='finished'>
                    Finished
                  </option>
                  <option value='on hold'>On Hold</option>
                  <option value='dropped'>Dropped</option>
                </select>
              </td>
              <td style={{ paddingTop: '100px' }}>
                {' '}
                <FontAwesomeIcon icon='trash' />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
