import React, { Component } from 'react';
import styled from 'styled-components';

import { changeAnimationSpeed } from '../../SortingPage';

const Styles = styled.div`
    align-items: center;
    color: white;
    margin-bottom: 2rem;

    .value {
        top: -100px;
        font-size: 1rem;
    }

    .slider {
        flex: 6;
        width: 400px;
        height: 10px;
        border-radius: 5px;
        background: #efefef;
        outline: none;
    }
    
    .settingsLine {
        width: 5%;
    }

`;

class AnimationSpeedSlider extends React.Component {

    state = {
        value: 5
    }

    handleOnChange = (e) => {
        const { value } = e.target;
        this.setState({value});
        
        changeAnimationSpeed(value);
    }

    render() {
        return (
            <Styles>
                <div>
                    {/* Array Size Slider */}
                    <input type="range" min={1} max={10} value={this.state.value} id="arraySizeSlider" onChange={this.handleOnChange} className="slider"/>
                    <div className="value">{this.state.value + "x"}</div>
                </div>
                <hr class="settingsLine"/>
            </Styles>
        )
    }
}

export default AnimationSpeedSlider;