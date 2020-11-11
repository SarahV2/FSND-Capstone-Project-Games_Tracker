import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

export default class NewGameForm extends Component {
  state = {
    title: '',
    imgSrc: '',
    about: '',
    releaeYear: '',
    genres: '',
    platform: '',
  };

  handleChange = (e) => {
    const currentFormField=e.target.name
    if (currentFormField == 'genres' || currentFormField == 'platform') {
      let value = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      if(currentFormField=='genres'){
      this.setState({ genres: value });
      }
      else{
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
    const { title, imgSrc, about, releaeYear, genres, platform } = this.state;
    const newGame = { title, imgSrc, about, releaeYear, genres, platform };
    console.log(newGame);
  };

  render() {
    return (
      <Row className='justify-content-md-center'>
        <Col xs={12} sm={4} md={4} lg={6}>
          <Form className='border'>
            <h4>Add a New Game</h4>
            <Form.Group className='text-left'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder="Games's title"
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
                required
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Form.Group className='text-left'>
              <Form.Label>About</Form.Label>
              <Form.Control
                // type='text'
                name='about'
                placeholder='More Info about the game'
                as='textarea'
                rows={3}
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
