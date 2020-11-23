import React, { Component } from 'react';
import { updateGameRecord,getUserRecords } from '../../utils/api';
import {Redirect} from 'react-router-dom'
export default class GameStatusSelector extends Component {
  state = {
    gameStatus: 'currently playing',
    redirect:false
  };

  componentDidMount(){
      this.setState({
          gameStatus:this.props.defaultValue
      })
      //console.log(this.props)
  }
  handleChange = async(e) => {
    e.preventDefault();
    const { gameRecordID, token,email } = this.props;
    //console.log(token)
    //console.log('new status:', e.target.value,'id:', gameRecordID); 
    
    this.setState({
      gameStatus: e.target.value,
    });
    await updateGameRecord(gameRecordID,e.target.value,email,token)


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
