import React, { Component } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { getGame, updateGame } from '../../utils/api';
import Spinner from '../../utils/loading.gif';

class EditGameForm extends Component {
  state = {
    gameID: '',
    title: '',
    imgSrc: '',
    about: '',
    releaseYear: '',
    genres: [],
    platforms: [],
    showAlerts: false,
    errorMessage: '',
    loading: true,
    notFound: true,
  };

  componentDidMount() {
    const authResult = new URLSearchParams(window.location.search);
    const gameID = authResult.get('game');
    getGame(gameID).then((data) => {
      if (data.game) {
        const currentGame = data.game;
        this.setState({
          gameID: currentGame.id,
          title: currentGame.title,
          imgSrc: currentGame.imgSrc,
          about: currentGame.about,
          releaseYear: currentGame.release_year,
          genres: currentGame.genres,
          platforms: currentGame.platforms,
          notFound: false,
          loading: false,
        });
      } else {
        if (!data.success) {
          this.setState({ notFound: true, loading: false });
        }
      }
    });
  }

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

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, imgSrc, about, releaseYear, genres, platforms } = this.state;
    if (
      title == '' ||
      imgSrc == '' ||
      about == '' ||
      releaseYear == '' ||
      genres.length === 0 ||
      platforms.length === 0
    ) {
      this.setState({
        showAlerts: true,
        errorMessage: 'Please fill out all fields',
      });
    }
    const updatedGameInfo = {
      title,
      imgSrc,
      about,
      releaseYear,
      genres,
      platforms,
    };
    console.log(updatedGameInfo);
    const { gameID } = this.state;
    this.setState({ showAlerts: false });
    updateGame(gameID, updatedGameInfo, this.props.token);
  };

  render() {
    let { showAlerts, errorMessage } = this.state;
    if (this.state.loading) {
      return <img src={Spinner} />;
    }
    if (!this.state.notFound) {
      return (
        <Row className='justify-content-md-center'>
          <Col xs={12} sm={4} md={4} lg={6}>
            <Form className='border'>
              <h4>Edit Game Details</h4>
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
                  <option>Battle Royal</option>
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
                  multiple
                  value={this.state.platforms}
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
          </Col>
        </Row>
      );
    } else {
      return <p>The requested page cannot be found</p>;
    }
  }
}
export default EditGameForm;
