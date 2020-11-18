import React, { Component } from 'react';
import { updateGameRecord } from '../../utils/api';
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
  }
  handleChange = async(e) => {
    e.preventDefault();
    const { gameRecordID, token } = this.props;
    console.log(token)
    console.log('new status:', e.target.value,'id:', gameRecordID); // TODO: modify it to the corresponding ajax request
    
    this.setState({
      gameStatus: e.target.value,
    });
    await updateGameRecord(gameRecordID,e.target.value,token)
    this.props.refreshParent();
  //   this.setState({
  //     redirect:true
  // })

  };
  render() {
    if(this.state.redirect){
       //return <Redirect to='/games/mygames'/>
       console.log('helloooo')

    }
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
