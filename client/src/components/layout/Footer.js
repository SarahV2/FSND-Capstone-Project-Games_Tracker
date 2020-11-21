import React, { Component } from 'react';
import '../../Footer.css';

export default class Footer extends Component {
  render() {
    return (
       <footer className='site-footer'>
        <div className=' footer-m'>
          <div className='col-md-12 col-sm-12 col-xs-12 '>
            <p className='footer-text'>
           Made with <span style={{fontSize:"150%",color:"red",paddingTop:'50%' }}>&hearts;</span> by <a className='github-link' href='https://github.com/SarahV2'> Sarah Alahmadi </a>

            </p>
          </div>
        </div>
      </footer>
    );
  }
}