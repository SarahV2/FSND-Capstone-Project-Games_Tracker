import React, { Component } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
const currentGame = {
  id: 70,
  title: 'Some game title',
  imgSrc: 'link',
  about: 'some plot',
  releaseYear: '2021',
  genres: ['Adventure', 'Action', 'RPG'],
  platform: ['PS5', 'PC'],
};
export default class EditGameForm extends Component {
  state = {
    title: '',
    imgSrc: '',
    about: '',
    releaseYear: '',
    genres: [],
    platform: [],
    showAlerts: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.setState({
      title: currentGame.title,
      imgSrc: currentGame.imgSrc,
      about: currentGame.imgSrc,
      releaseYear: currentGame.releaseYear,
      genres:currentGame.genres,
      platform:currentGame.platform
    });
    // const {currentGameID}=this.props.location.state
    // console.log(currentGameID)
  }

  handleChange = (e) => {
    const currentFormField = e.target.name;
    if (currentFormField == 'genres' || currentFormField == 'platform') {
      let value = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      if (currentFormField == 'genres') {
        this.setState({ genres: value });
      } else {
        this.setState({ platform: value });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, imgSrc, about, releaseYear, genres, platform } = this.state;
    if (
      title == '' ||
      imgSrc == '' ||
      about == '' ||
      releaseYear == '' ||
      genres == [] ||
      platform == []
    ) {
      this.setState({
        showAlerts: true,
        errorMessage: 'Please fill out all fields',
      });
    }
    const newGame = { title, imgSrc, about, releaseYear, genres, platform };
    console.log(newGame);
  };

  render() {
    let { showAlerts, errorMessage } = this.state;
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
                name='platform'
                as='select'
                multiple
                value={this.state.platform}
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
  }
}
