import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import './css/SortPage.css';

import BarSizeSlider from './sorting-elements/sliders/BarSizeSlider';
import AnimationSpeedSlider from './sorting-elements/sliders/AnimationSpeedSlider';

export const changeBarSize = (size) => {
    console.log("BAR SIZE:  " + size); 
}

export const changeAnimationSpeed = (speed) => {
    console.log("ANIMATION SPEED:  " + speed);
}

const algorithmIndex = "Selection Sort"
const algorithmInformation = ["Selection Sort information will go here", 
                            "Merge Sort information will go here",
                            "Quick Sort information will go here",
                            "Heap Sort information will go here"]
;    

export default class SortingPage extends React.Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();

        this.state = {
            array: [],
            value: 5,
            isExit: false
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        //SETS THE BASE ARRAY TO 5 ELEMENTS
        const array = [];
        for(var i = 0; i < 5; i++) {
            array.push(randomInt(5, 1000));
        }
        this.setState({array});
    }

    handleClick() {
        console.log("CLICKED");
    }

    handleSliderChange = (e) => {
        //Add a check to see what slider is being changed
        const { value } = e.target;
        
        if(value > this.state.value) {
            this.add((value - this.state.value));
        } else {
            this.remove((this.state.value - value));
        }

        this.setState({value});
    }
    
    //A little buggy fix later
    add(amount) {
        // for(var i = 0; i < amount; i++) {
        //     this.state.array.push(randomInt(5, 1000));
        // }
        this.state.array.push(randomInt(5, 1000));
        console.log("ADDED TO ARRAY");
    }
    remove(amount) {
        // if(amount == 1) {
        //     const arrayBars = document.getElementsByClassName('arrBar')[(this.state.value)-1].style.animation ="shutter-down-top";
            
        //     //array not being popped and stays leading to a error
        //     this.state.array.pop();
        // }
        // for(var i = 0; i < amount; i++) {
        //     //Way to change the style of a elemnt
        //     //const arrayBars = document.getElementsByClassName('arrBar')[(this.state.value)-1].style.animation ="shutter-down-top";
            
        //     //array not being popped and stays leading to a error
        //     this.state.array.pop();
        // }
        this.state.array.pop();
    }

    render() {
        var {array} = this.state;

        return(
            
            //Header for nav bar, change for real website
            <body>
                <div>
                    <h2>Sorting Page - Make it :)</h2>
                    <Link to="/">Sorting Page</Link>
                </div>
    
                <div class="sideMenu">
                    <h2 className="text-center underline font-bold">Sorting Algorithms</h2>
                    {/*SideMenu Sorting Options*/}
                    <table className="m-auto">
                        <tr>
                            <td><a >Selection Sort</a></td>
                            <td><a href="">Merge Sort</a></td>
                        </tr>
                        <tr>
                            <td><a href="">Quick Sort</a></td>
                            <td><a href="">Heap Sort</a></td>
                        </tr>
                    </table>
                    <hr/>
                    <div class="informationDiv">
                        {/*Information About Algorithms Go Here*/}
                        
                    </div>
                    {/*Sort Button*/}
                    <button type="button" onClick={this.handleClick} class="sortBtn">Sort!</button>
                </div>
    
                <div class="mainWindow">
                    <div class="barElementArea">
                    <>
                        {
                         array.map((value, idx) => (
                            <div class="arrBar"ref={this.divRef} key={idx} style={{height: `${value}px`}}>
                                {value}
                            </div>
                        ))   
                        }
                    </>
                    </div>
                    <hr/>
                    <div class="settingPanel">
                        <div class="sliderDiv">
                            <h6>Array Size</h6>
                            <div>
                                {/* Array Size Slider */}
                                <input type="range" min={5} max={37} value={this.state.value} id="arraySizeSlider" onChange={this.handleSliderChange} className="slider"/>
                                <div className="value">{this.state.value}</div>
                            </div>
                            <hr class="settingsLine"/>
                        </div>

                        
                    </div>
                </div>
            </body>
            
        );
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}