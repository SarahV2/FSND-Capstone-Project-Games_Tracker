import React, { Component } from 'react';
import { Table, Container } from 'react-bootstrap';
import GameDetails from './GameDetails';
import { getAllGames } from '../../utils/api';


export default class FullGameList extends Component {
  state = {
    currentList: [],
    page: 1,
    totalGames: 0,
  };

  componentDidMount() {
    const { page } = this.state;
    getAllGames(page).then((data) => {
      if (data.games.length > 0) {
        this.setState({
          currentList: data.games,
          totalGames: data.total_games,
        });
      }
    });
  }

  getGames() {
    getAllGames(this.state.page).then((data) => {
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
      <Container>
        <div style={{ marginBottom: '5%', height: '50px' }}>{''}</div>
        <h3 className='text-center'>Manage Games</h3>
        <div className='centered'>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Poster</th>
                <th>Game Title</th>
                <th>Release Year</th>
                <th>Genre(s)</th>
                <th>Platform(s)</th>
                <th>Edit Info</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </Table>
        </div>
        <div className='pagination-menu'>{this.createPagination()}</div>
        <div style={{ marginTop: '5%', height: '50px' }}>{''}</div>

      </Container>
    );
  }
}
