import React, { Component } from 'react';
import Game from '../games/Game';
import { CardDeck } from 'react-bootstrap';
import { getAllGames } from '../../utils/api';

export default class GamesList extends Component {
  state = {
    gamesList: [],
    page: 1,
    totalGames: 0,
  };
  componentDidMount() {
    this.getGames();
  }

  getGames() {
    getAllGames(this.state.page).then((data) => {
      // console.log(data.games);
      if (data.games) {
        this.setState({
          gamesList: data.games,
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
    let maxPage = Math.ceil(this.state.totalGames / 9);
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
    let { isAuthenticated, isGamer,isAdmin } = this.props;
    if (isAuthenticated) {
      if (!isGamer&&!isAdmin) {
         window.location.reload();
      }
    }

    const displayList = this.state.gamesList.map((game, index) => {
      return (
        <Game
          userRecords={this.props.userRecords}
          key={index}
          game={game}
          token={this.props.token}
        />
      );
    });
    return (
      <div>
        <div style={{ marginBottom: '5%', height: '50px' }}>{''}</div>
        <h3 className='text-center'>Games</h3>

        <CardDeck>{displayList}</CardDeck>
        <div className='pagination-menu'>{this.createPagination()}</div>
        <div style={{ marginTop: '5%', height: '50px' }}>{''}</div>
      </div>
    );
  }
}
