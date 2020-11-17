import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import GameDetails from './GameDetails';
import { getAllGames } from '../../utils/api';

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
    page: 1,
    totalGames: 0,
  };

  componentDidMount() {
    // this.setState({currentList:list})
    const { page } = this.state;
    getAllGames(page).then((data) => {
      console.log(data.games);
      if (data.games.length > 0) {
        this.setState({
          currentList: data.games,
          totalGames: data.total_games,
        });
      }
    });
    // console.log(lll)
    // if(lll.length>0){
    //   this.setState({currentList:lll})

    // }
  }

  getGames() {
    getAllGames(this.state.page).then((data) => {
      console.log(data.games);
      if (data.games.length > 0) {
        this.setState({
          currentList: data.games,
          totalGames: data.total_games,
        });
      }
    });
  }

  selectPage(num) {
    this.setState({ page: num }, () => this.getGames());
  }

  createPagination() {
    let pageNumbers = [];
    let maxPage = Math.ceil(this.state.totalGames / 10);
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`page-num ${i === this.state.page ? 'active' : ''}`}
          onClick={() => {
            this.selectPage(i);
          }}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  }
  render() {
    console.log(this.props);
    const list = this.state.currentList.map((game, index) => {
      return (
        <GameDetails
          key={index}
          token={this.props.token}
          currentGame={game}
          index={index + 1}
        />
      );
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
              <th>Edit Info</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
        <div className='pagination-menu'>{this.createPagination()}</div>
      </div>
    );
  }
}
