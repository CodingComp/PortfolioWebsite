import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { TransitionGroup , CSSTransition, Transition } from 'react-transition-group';

import './css/SortPage.css';

import styled from "styled-components";

import * as sortingAlgorithms from "./scripts/SortingAlgorithms.js"

const algorithmIndex = "Selection Sort"
const algorithmInformation = ["Selection Sort information will go here", 
                            "Merge Sort information will go here",
                            "Quick Sort information will go here",
                            "Heap Sort information will go here"]
;    

export default class SortingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortingArray: [],
            animationsLength: 0,
            sortingAlgorithm: "selection",
            animationSpeed: 1,
            value: 5,
            timeoutIndex: 0,
            isExit: false
        };
    }

    componentDidMount() {
        this.setupArray();
    }

    setupArray() {
        const array = [];
        for(var i = 0; i < 5; i++) {
            while(true) {
                var newNum = this.randomNum(20, 1000);
                if(array.indexOf(newNum) == -1) {
                    array.push(newNum);
                    break;
                }
            }
        }
        this.setState({value: 5});
        this.setState({sortingArray: array});
    }

    resetArray = () => {
        //SETS THE BASE ARRAY TO 5 ELEMENTS
        this.setupArray();
        console.log(document.getElementById("arraySizeSlider"));
    }

    arrayAlreadySorted() {
        var compareArray = this.state.sortingArray.slice(0).sort((a,b) => a - b);

        for (var i = 0; i < compareArray.length; i++) {
            if(this.state.sortingArray[i] != compareArray[i]) {
                return false;
            }
        }

        return true;
    }

    //Toggles the inputs when a animation is playing, so the user cant edit the settings breaking the animation
    toggleSettingsInputs(disabled) {
        document.getElementById("arraySizeSlider").disabled = disabled;
        document.getElementById("animationSpeedSlider").disabled = disabled;
        document.getElementById("generateButton").disabled = disabled;
        document.getElementById("resetButton").disabled = disabled;
    }

    //Change into different functions, make it look better / easier to read
    setAlgorithm = (e) => {
        this.setState({sortingAlgorithm: e.target.value});
    }

    /* SORTING ALGORITHM METHODS - USED TO START THE SORT AND ANIMATE THE BARS */
    selectionSort() {

        const test = [1,2,3,4,5,5,6];
        console.log(test.indexOf(5));

        const arrayBars = document.getElementsByClassName("arrBar");
        const sortedArray = sortingAlgorithms.selectionSort(this.state.sortingArray, arrayBars, this.state);
        //Disables the setting, disallowing the user to use said settings
        this.toggleSettingsInputs(true);
        setTimeout(() => {
            this.setState({sortingArray: sortedArray});
            //Allows user to use the settings again
            this.toggleSettingsInputs(false);
        }, (this.state.animationsLength * (50 / this.state.animationSpeed)) + 200);
    }

    bubbleSort() {
        const arrayBars = document.getElementsByClassName("arrBar");
        const sortedArray = sortingAlgorithms.bubbleSort(this.state.sortingArray, arrayBars, this.state);        
        //Disables the setting, disallowing the user to use said settings
        this.toggleSettingsInputs(true);
        setTimeout(() => {
            this.setState({sortingArray: sortedArray});
            //Allows user to use the settings again
            this.toggleSettingsInputs(false);
        }, (this.state.animationsLength * (50 / this.state.animationSpeed)) + 200);
        
        
    }

    insertionSort() {
        const arrayBars = document.getElementsByClassName("arrBar");
        const sortedArray = sortingAlgorithms.insertionSort(this.state.sortingArray, arrayBars, this.state);        
        //Disables the setting, disallowing the user to use said settings
        this.toggleSettingsInputs(true);
        setTimeout(() => {
            this.setState({sortingArray: sortedArray});
            //Allows user to use the settings again
            this.toggleSettingsInputs(false);
        }, (this.state.animationsLength * (50 / this.state.animationSpeed)) + 200);
    }

    mergeSort() {
        const arrayBars = document.getElementsByClassName("arrBar");
        const sortedArray = sortingAlgorithms.mergeSort(this.state.sortingArray, arrayBars, this.state);       
        // //Disables the setting, disallowing the user to use said settings
        // this.toggleSettingsInputs(true);
        // setTimeout(() => {
        //     this.setState({sortingArray: sortedArray});
        //     //Allows user to use the settings again
        //     this.toggleSettingsInputs(false);
        // }, (this.state.animationsLength * (50 / this.state.animationSpeed)) + 200);
    }

    callSort = () => {
        console.log(this.state.sortingAlgorithm);
        if(!this.arrayAlreadySorted()) {
            switch (this.state.sortingAlgorithm) {
                case "selection":
                    this.selectionSort();
                    break;
                case "bubble":
                    this.bubbleSort();
                    break;
                case "insertion":
                    this.insertionSort();
                    break;
                case "merge":
                    this.mergeSort();
                    break;
            }
        } else {
            alert("Numbers are already sorted.");
        }
    }

    generateNewNums = (e) => {
        const arrayBars = document.getElementsByClassName("arrBar");

        for (let i = 0; i < this.state.sortingArray.length; i++) {
            while(true) {
                var newNum = this.randomNum(20, 1000);
                if(this.state.sortingArray.indexOf(newNum) == -1) {
                    break;
                }
            }
            //var newNum = this.randomNum(20, 1000);
            ///Little hacky but u know
            if (!arrayBars[i].className.includes("animateBar")) {
                arrayBars[i].className += " animateBar";
            }

            arrayBars[i].style.setProperty("--prevHeight", arrayBars[i].style.height);
            arrayBars[i].style.setProperty("--newHeight", `${newNum}px`);
            
            arrayBars[i].style.height = newNum + "px";
            arrayBars[i].style.backgroundColor = "#21b5ff";
            arrayBars[i].children[0].textContent = newNum;

            setTimeout(() => {
                arrayBars[i].className = "arrBar arrBarTransition-enter-done";
            }, 500)

            this.state.sortingArray[i] = newNum;
        }
    }

    //Responsible for adding or removing a element to the sortingArray
    arraySizeSlider = (e) => {
        const difference = (e.target.value - this.state.value);
        if (difference < -1 || difference > 1) return; //USED TO DEAL WITH REMOVING TOO MANY OR ADDING TOO MANY

        if (difference > 0) {
            while(true) {
                var newNum = this.randomNum(20, 1000);
                if(this.state.sortingArray.indexOf(newNum) == -1) {
                    this.state.sortingArray.push(newNum);
                    break;
                }
            }
        } else if (difference < 0) {
            this.state.sortingArray.pop();
        }

        this.setState({value: e.target.value});
    }

    //Responsible for adding or removing a element to the sortingArray
    animationSpeedSlider = (e) => {
        console.log(e.target.value);
        this.setState({animationSpeed: e.target.value});
    }

    //Gets a random number from the range given
    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    render() {
        return(
            //Header for nav bar, change for real website
            <body>
                <div>
                    <h2>Sorting Page - Make it :)</h2>
                    <div className='testing' id='testingBox'></div>
                    <Link to="/">Sorting Page</Link>
                </div>
    
                <div className="sideMenu">
                    <h2 className="text-center underline font-bold">Sorting Algorithms</h2>
                    {/*SideMenu Sorting Options*/}
                    <table className="m-auto">
                        <tr>
                            <td><button onClick={this.setAlgorithm} value="selection">Selection Sort</button></td>
                            <td><button onClick={this.setAlgorithm} value="bubble">Bubble Sort</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={this.setAlgorithm} value="insertion">Insertion Sort</button></td>
                            <td><button onClick={this.setAlgorithm} value="merge">Merge Sort</button></td>
                        </tr>
                    </table>
                    <hr/>
                    <div className="informationDiv">
                        {/*Information About Algorithms Go Here*/}
                        
                    </div>
                    {/*Sort Button*/}
                    <button onClick={this.callSort} className="sortBtn" value="sort">Sort!</button>
                </div>
    
                <div className="mainWindow">
                    <div className="barElementArea">
                        <TransitionGroup component={"div"} id="barHolder">
                        {
                            this.state.sortingArray.map((value, idx) => (
                                <CSSTransition classNames="arrBarTransition" timeout={500} key={idx}>
                                    <div className="arrBar" ref={this.divRef} key={idx} style={{height: `${value}px`}}>
                                        <p>{value}</p>
                                    </div>
                                </CSSTransition>
                            ))
                        }
                        </TransitionGroup>
                    </div>
                    <hr/>
                    <div className="settingPanel">

                        {/* --Sorting Settings Sliders-- */}

                        <div className="settingDiv">
                            <h6>Array Size</h6>
                            <div>
                                {/* Array Size Slider  -- The max value is temp*/}
                                <input type="range" min={5} max={55} value={this.state.value} id="arraySizeSlider" onChange={this.arraySizeSlider} className="slider"/>
                                <div className="value">{this.state.value}</div>
                            </div>
                            <hr className="settingsLine"/>
                        </div>

                        <div className="settingDiv">
                            <h6>Animation Speed</h6>
                            <div>
                                {/* This Slider Is Placeholder For The Moment -- Will Change the speed of the animation */}
                                <input type="range" min={1} max={5} value={this.state.animationSpeed} id="animationSpeedSlider" onChange={this.animationSpeedSlider} className="slider"/>
                                <div className="value">{this.state.animationSpeed}x</div>
                            </div>
                            <hr className="settingsLine"/>
                        </div>

                        {/* --Sorting Settings Buttons-- */}

                        <div className="settingDiv">
                            <h6>Generate New Numbers</h6>
                            <div>
                                {/* Generates New Numbers For The Array */}
                                <button className='algorithmSettingButton' id="generateButton" onClick={this.generateNewNums}>Generate</button>
                            </div>
                        </div>
                        
                        <div className="settingDiv">
                            <h6>Reset Array</h6>
                            <div>
                                {/* Resets The Whole Array */}
                                <button className='algorithmSettingButton' id="resetButton" onClick={this.resetArray}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        );
    }
}