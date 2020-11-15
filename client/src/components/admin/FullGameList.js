import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import GameDetails from './GameDetails'
import {getAllGames} from '../../utils/api'

const list = [
  {
    id: 1,
    title: 'MedEvil',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms: ['PS2', 'PS5'],
    plot: 'some info',
  },
  {
    id: 2,
    title: 'Some Other Game',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/en/f/fc/MediEvil_Box_art_cropped.png',
    releaseYear: 2002,
    genres: ['wonderful', 'great'],
    platforms: ['PS1', 'PS4'],
    about: 'some info',
  },
];
export default class FullGameList extends Component {
  state = {
    currentList: [],
  };

   componentDidMount() {
    this.setState({currentList:list})
    getAllGames().then((data) => {
      console.log(data.games)
      if(data.games.length>0){
        this.setState({currentList:data.games})

      }
   })        
    // console.log(lll)
    // if(lll.length>0){
    //   this.setState({currentList:lll})

   // }
  }
  render() {
    console.log(this.props)
    const list = this.state.currentList.map((game, index) => {
      return <GameDetails key={index} token={this.props.token} currentGame={game} index={(index+1)} />;
    }); 
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Poster</th>
              <th>Game Title</th>
              <th>about</th>
              <th>Release Year</th>
              <th>Genre(s)</th>
              <th>Platform(s)</th>
              <th>
                Edit Info
              </th>
              <th>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
      </div>
    );
  }
}
