import React, { Component } from 'react';
import Game from '../games/Game';
import { CardDeck } from 'react-bootstrap';

let tempList = [
  {
    id:1,
    title: 'MedEvil',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'currently playing',
  },
  {
    id:45,
    title: 'MedEvil',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'currently playing',
  },
  {
    id:2,
    title: '2nd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'finished',
  },
  {
    id:3,
    title: '3rd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'want to play',
  },
  {
    id:3,
    title: '3rd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'want to play',
  },
  {
    id:3,
    title: '3rd Game',
    imgSrc: '',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms:['PS2','PS5'],
    status: 'want to play',
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
