import React, { Component } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { addGame } from '../../utils/api';
export default class NewGameForm extends Component {
  state = {
    title: '',
    imgSrc: '',
    about: '',
    releaseYear: '',
    genres: [],
    platforms: [],
    showAlerts: false,
    errorMessage: '',
  };

  handleChange = (e) => {
    const currentFormField = e.target.name;
    if (currentFormField === 'genres' || currentFormField === 'platforms') {
      let value = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      if (currentFormField === 'genres') {
        this.setState({ genres: value });
      } else {
        this.setState({ platforms: value });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  resetFields() {
    this.setState({
      title: '',
      about: '',
      imgSrc: '',
      releaseYear: '',
      genres: [],
      platforms: []
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, imgSrc, about, releaseYear, genres, platforms } = this.state;
    if (
      title === '' ||
      imgSrc === '' ||
      about === '' ||
      releaseYear === '' ||
      genres.length === 0 ||
      platforms.length === 0
    ) {
      this.setState({
        showAlerts: true,
        errorMessage: 'Please fill out all fields',
      });
    } else {
      const newGame = { title, imgSrc, about, releaseYear, genres, platforms };
      console.log(newGame);
      console.log(this.props);
      this.setState({ showAlerts: false });
      addGame(newGame, this.props.token);
      this.resetFields()
    }
  };

  render() {
    let { showAlerts, errorMessage } = this.state;
    return (


      <Row className='justify-content-md-center'>
        <Col xs={12} sm={4} md={4} lg={6}>
          <div style={{ marginBottom: '5%', height: '50px' }}>{''}</div>
          <Form className='border'>
            <h4>Add a New Game</h4>
            {showAlerts ? (
              <div id='alerts-container'>
                {' '}
                <Alert variant='danger'>{errorMessage}</Alert>
              </div>
            ) : (
                ''
              )}
            <Form.Group className='text-left'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder="Games's title"
                value={this.state.title}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>

            <Form.Group className='text-left'>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type='text'
                name='imgSrc'
                placeholder='https://'
                value={this.state.imgSrc}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Form.Group className='text-left'>
              <Form.Label>About</Form.Label>
              <Form.Control
                name='about'
                placeholder='More Info about the game'
                as='textarea'
                rows={3}
                value={this.state.about}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Form.Group className='text-left'>
              <Form.Label>Release Year</Form.Label>
              <Form.Control
                type='number'
                name='releaseYear'
                placeholder='Year'
                value={this.state.releaseYear}
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>

            <Form.Group className='text-left'>
              <Form.Label>
                Genre(s): <small> multiple select (ctrl+left click)</small>
              </Form.Label>
              <Form.Control
                required
                name='genres'
                as='select'
                value={this.state.genres}
                multiple
                onChange={(e) => this.handleChange(e)}
              >
                <option>Action</option>
                <option>Adventure</option>
                <option>RPG</option>
                <option>Sports</option>
                <option>Racing</option>
                <option>Fighting</option>
                <option>Strategy</option>
                <option>Rhythm</option>
                <option>Simulator</option>
                <option>Educational</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className='text-left'>
              <Form.Label>
                Platform(s): <small> multiple select (ctrl+left click)</small>
              </Form.Label>
              <Form.Control
                required
                name='platforms'
                as='select'
                value={this.state.platforms}

                multiple
                onChange={(e) => this.handleChange(e)}
              >
                <option>PC</option>
                <option>Xbox Series X</option>
                <option>PS5</option>
                <option>Nintendo Switch</option>
                <option>Nintendo Switch Lite</option>
                <option>Xbox One X</option>
                <option>Xbox One S</option>
                <option>PS4</option>
                <option>Xbox One</option>
                <option>Nintendo 3DS/2DS</option>
                <option>Xbox 360</option>
                <option>PS3</option>
                <option>Wii U</option>
                <option>Nintendo DS</option>
                <option>PS2</option>
                <option>Wii</option>
                <option>PS1</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <div id='submit-button'>
              <Button
                onClick={(e) => this.handleSubmit(e)}
                variant='light'
                type='submit'
              >
                Submit
              </Button>
            </div>
          </Form>
          <div style={{ marginTop: '5%', height: '50px' }}>{''}</div>
        </Col>
      </Row>
    );
  }
}
