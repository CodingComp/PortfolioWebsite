import React, { Component } from 'react';
import styled from 'styled-components';

import { changeBarSize } from '../../SortingPage';

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

class BarSizeSlider extends React.Component {

    state = {
        value: 5
    }

    handleOnChange = (e) => {
        const { value } = e.target;
        this.setState({value});
        
        changeBarSize(value);
    }

    render() {
        return (
            <Styles>
                <div>
                    {/* Array Size Slider */}
                    <input type="range" min={1} max={10} value={this.state.value} id="arraySizeSlider" onChange={this.handleOnChange} className="slider"/>
                    <div className="value">{this.state.value}</div>
                </div>
                <hr class="settingsLine"/>
            </Styles>
        )
    }
}

export default BarSizeSlider;