import React, { Component } from 'react';
import { Card, } from 'react-bootstrap';
const placeholderImgSrc =
    'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/374px-WPVG_icon_2016.svg.png';
export default class HoveringInfo extends Component {
    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: false,
            showImage: true
        };
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
            showImage: !state.showImage
        };
    }

    render() {
        let { currentGame } = this.props
        let showImage = !this.state.isHovering
        //console.log('image', showImage)
        return (
            <div style={{ height: '30rem', backgroundImage:`url(${currentGame.imgSrc})`,  backgroundSize: 'cover',  backgroundRepeat: 'no-repeat',backgroundPosition: 'center', }}>

                <div style={{backgroundColor:'rgba(255,255,255,0.8)'}}
                    onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseHover}
                >

                    {this.state.isHovering ?
                        <div style={{ height: '30rem', padding:'2%'}} >
                            {currentGame.about}
                        </div> : <Card.Img
                            className='mx-auto'
                            variant='top'
                            style={{}}
                            src={currentGame.imgSrc ? currentGame.imgSrc : placeholderImgSrc}
                            style={{ height: '30rem' }}
                        />
                    }

                </div>

            </div>
        );
    }
}
