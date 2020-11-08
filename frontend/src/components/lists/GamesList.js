import React, { Component } from 'react';
import Game from '../games/Game';
import { CardDeck } from 'react-bootstrap';
let tempList = [
  {
    title: 'MedEvil',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms: ['PS2', 'PS4'],
  },
  {
    title: '2nd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
  },
  {
    title: '3rd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
  },
];
export default class GamesList extends Component {
  state = {
    gamesList: [],
  };
  componentDidMount() {
    this.setState({
      gamesList: tempList,
    });
  }
  render() {
    const { gamesList } = this.state;
    const displayList = gamesList.map((game,index) => <Game key={index} game={game} />);
    return <CardDeck>{displayList}</CardDeck>;
  }
}
