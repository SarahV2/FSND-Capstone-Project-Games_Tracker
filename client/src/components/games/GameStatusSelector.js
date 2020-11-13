import React, { Component } from 'react';

export default class GameStatusSelector extends Component {
  state = {
    gameStatus: 'currently playing',
  };

  componentDidMount(){
      this.setState({
          gameStatus:this.props.defaultValue
      })
  }
  handleChange = (e) => {
    e.preventDefault();
    const { gameRecordID } = this.props;
    console.log('new status:', e.target.value,'id:', gameRecordID); // TODO: modify it to the corresponding ajax request
    this.setState({
      gameStatus: e.target.value,
    });
  };
  render() {
    return (
      <select
        style={{
          textAlignLast: 'center',
          height: '50px',
          width: '150px',
          paddingLeft: '0',
          paddingRight: '0',
        }}
        value={this.state.gameStatus}
        onChange={(e) => {
          this.handleChange(e);
        }}
      >
        <option value='want to play'>Want to Play</option>
        <option value='currently playing'>Currently Playing</option>
        <option className='text-center' value='finished'>
          Finished
        </option>
        <option value='on hold'>On Hold</option>
        <option value='dropped'>Dropped</option>
      </select>
    );
  }
}
