import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import AddGameRecord from './AddGameRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle);
const placeholderImgSrc =
  'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/374px-WPVG_icon_2016.svg.png';
export default class Game extends Component {
  handleCreateGameRecord = () => {};
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
    return (
      <div className='center-me col-lg-4'>
        <Card style={{ width: '30rem' }} className='card-space'>
          <Card.Title style={{ paddingTop: '2%', fontSize: '1.5rem' }}>
            {currentGame.title}
          </Card.Title>
          <Card.Img
            className='mx-auto'
            variant='top'
            style={{}}
            src={currentGame.imgSrc ? currentGame.imgSrc : placeholderImgSrc}
          />
          <Card.Body>
            <Card.Text>{currentGame.about}</Card.Text>
            <AddGameRecord game={currentGame} />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
