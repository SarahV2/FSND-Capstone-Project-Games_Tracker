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
    const { currentGame } = this.state;
    return (
      <Card style={{ width: '18rem' }}>
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
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <AddGameRecord game={currentGame} />
        </Card.Body>
      </Card>
    );
  }
}