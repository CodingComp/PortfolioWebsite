import React, { Component } from 'react';
import styled from 'styled-components';

const Styles = styled.div`
    align-items: center;
    
    .bar {
        border-radius: 10px 10px 0px 0px;
        border-width: 3px;
        position: absolute;
        opacity: 0;
        top: 89%;

        animation-duration: 1.5s;
        animation-delay: 2s;
        animation-name: shutter-in-bottom;
        animation-fill-mode: forwards;
    }

    @keyframes shutter-in-bottom {
        0%{
            -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
            -webkit-transform-origin: bottom;
            transform-origin: bottom;
        }
        100%{
            -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
            -webkit-transform-origin: bottom;
            transform-origin: bottom;
            opacity: 1;
        }    
    }

    @keyframes shutter-down-top {
        0%{
            -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
            -webkit-transform-origin: top;
            transform-origin: top;
        }
        100%{
            -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
            -webkit-transform-origin: top;
            transform-origin: top;
            opacity: 0;
        }  
    }

`;

class BarElement extends Component {

    value = { num: 10 * 10 };
    width = { w: 50 };
    //Increment by a certain number such as 6 
    left = { l: 1 * 10 };
    
    render() {
        return(
            <Styles>
                <div style={{"width": this.width.w, "height": this.value.num , "left": this.left.l, backgroundColor: '#21b5ff'}} className="bar">
                    <p style={{textAlign: 'center'}} id="barNum">0</p>
                </div>
            </Styles>
        );
    }

}

export default BarElement;