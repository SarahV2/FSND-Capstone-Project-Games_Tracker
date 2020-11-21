import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import GameRecord from '../games/GameRecord';


export default class CustomizedList extends Component {
  state = {
    listToDisplay: [],
    list: [],
  };

  componentDidMount() {
    //  if(this.props.currentList){
    console.log('recieved',this.props.currentList)
   
  //    this.setState({ list:this.props.currentList });
  //  }
}
  render() {
    let {token,email}=this.props
    const list = this.props.currentList.map((gameRecord, index) => {
        return <GameRecord refreshParent={this.props.refreshParent()} token={token} email={email} key={index} currentGame={gameRecord} index={(index+1)} />;
      });
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
                Edit
                {/* <FontAwesomeIcon icon='edit' /> */}
              </th>
              <th>
                Delete
                {/* <FontAwesomeIcon icon='minus-circle' /> */}
              </th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
        {list.length==0?<p>You don't have any games set as '{this.props.listName}'</p>:''}
      </div>
    );
  }
}
