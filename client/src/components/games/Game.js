import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import AddGameRecord from './AddGameRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { organizePlatforms } from '../../utils/helpers'
import HoveringInfo from './HoveringInfo';

library.add(faPlusCircle);

export default class Game extends Component {
  handleCreateGameRecord = () => { };
  state = {
    currentGame: '',
  };
  componentDidMount() {
    this.setState({
      currentGame: this.props.game,
    });
  }
  render() {
    const currentGame = this.props.game;
    const platforms = currentGame.platforms
    const genres = currentGame.genres
    const gameGenres = genres.map((genre) => <span><span className='genres'>{genre}</span>{' '}</span>)
    const gamePlatforms = organizePlatforms(platforms)
    console.log('in game', this.props)
    return (
      <div className='center-me col-lg-4'>
        <Card style={{ width: '30rem', height: '52rem' }} className='card-space'>
          <Card.Title style={{ paddingTop: '2%', fontSize: '1.5rem' }}>
            {currentGame.title}
          </Card.Title>
          <Card.Text><small>({currentGame.release_year})</small> </Card.Text>
          <HoveringInfo currentGame={currentGame} />
          <br />

          <Card.Body>
            <Card.Text>{gameGenres}</Card.Text>
            <Card.Text>{gamePlatforms}</Card.Text>
            <Card.Text><hr /></Card.Text>
            {Array.isArray(this.props.userRecords) ? <AddGameRecord userRecords={this.props.userRecords} token={this.props.token} game={currentGame} /> : ''}

          </Card.Body>
        </Card>
      </div>
    );
  }
}
