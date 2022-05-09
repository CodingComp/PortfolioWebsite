import React, { useLayoutEffect, useState, useRef} from "react";
import { useEffect } from "react/cjs/react.production.min";

class Dot {

    constructor(xPos, yPos, ctx, speed, xDirMultiplier, yDirMultiplier, dotsArray) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.ctx = ctx;

        this.radius = 3;
        this.speed = speed;

        this.dotsArray = dotsArray;

        this.dirX = xDirMultiplier * this.speed;
        this.dirY = yDirMultiplier * this.speed;
    }
    //Draws the dot
    drawDot() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#50a1c7";

        this.ctx.lineWidth = 6;
        this.ctx.arc(this.xPos, this.yPos, 3, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    //Checks if there is another dot in the current dots radius, if so it will draw a line
    drawLinesToDots() {
        for(var i = 0; i < this.dotsArray.length; i++) {
            if (this.dotsArray[i] == this) continue;
            
            const distance = Math.sqrt(Math.pow( (this.dotsArray[i].xPos - this.xPos), 2)
                                         + Math.pow((this.dotsArray[i].yPos - this.yPos), 2));
            this.ctx.beginPath();
            this.ctx.moveTo(this.xPos, this.yPos);
            if (distance < (this.radius) * 100) {
                this.ctx.lineTo(this.dotsArray[i].xPos, this.dotsArray[i].yPos);
                this.ctx.lineWidth = (300 - distance) / 100;
                this.ctx.stroke();
            }
            this.ctx.closePath();
        }
    }

    update() {
        if ((this.xPos + this.radius) > window.innerWidth || 
            (this.xPos - this.radius) < 0) {
            this.dirX = -this.dirX;
        }
        if((this.yPos - this.radius) < 0 || 
            (this.yPos + this.radius) > window.innerHeight) {
                this.dirY = -this.dirY;
        }

        this.xPos += this.dirX;
        this.yPos += this.dirY;

        this.drawDot();
        this.drawLinesToDots();
    }
}

const BgCanvas = () => {
    const numOfDots = 60
    const dots = [];
    
    var mouseX = 0;
    var mouseY = 0;

    useLayoutEffect(() => {
        const canvas = document.getElementById("bgCanvas");
        
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        canvas.width = screenWidth;
        canvas.height = screenHeight;

        const ctx = canvas.getContext("2d");

        ctx.scale(devicePixelRatio, devicePixelRatio);

        canvas.style.width = screenWidth + "px";
        canvas.style.height = screenHeight + "px";

        window.addEventListener("mousemove", function(e){
            
            mouseX = e.clientX - canvas.getBoundingClientRect().left;
            mouseY = e.clientY - canvas.getBoundingClientRect().top;
        });

        //For loop to create dots
        for(var i = 0; i < numOfDots; i++) {
            //If its 1 then xMultiplier will make the xDir varable negative, likewise for the yMultiplier
            const xMultiplier = Math.floor(Math.random() * 2) == 0 ? 1 : -1;
            const yMultiplier = Math.floor(Math.random() * 2) == 0 ? 1 : -1;

            let dot = new Dot(Math.floor(Math.random() * window.innerWidth), 
                            Math.floor(Math.random() * window.innerHeight),ctx, .5, 
                            ((Math.floor(Math.random() * 10) + 1)/10) * xMultiplier, 
                            ((Math.floor(Math.random() * 10) + 1)/10) * yMultiplier, dots);
            dots.push(dot);
            dot.drawDot();
        }

        //Checks for dots near the mouse, if there are it will draw a line from the mouse to the dot
        function checkDotsNearMouse() {
            ctx.beginPath();
            ctx.strokeStyle = "#50a1c7";

            ctx.lineWidth = 4;
            ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
            for(var i = 0; i < dots.length; i++) {
                const distance = Math.sqrt(Math.pow( (dots[i].xPos - mouseX), 2)
                                             + Math.pow((dots[i].yPos - mouseY), 2));
                ctx.beginPath();
                ctx.moveTo(mouseX, mouseY);
                if (distance < 300) {
                    ctx.lineTo(dots[i].xPos, dots[i].yPos);
                    ctx.lineWidth = (300 - distance) / 100;
                    ctx.stroke();
                }
                ctx.closePath();
            }
        }

        //Animates the dots / draws the canvas scene
        function animateDots() {
            requestAnimationFrame(animateDots);
            ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
            for(var i = 0; i < numOfDots; i++) {
                dots[i].update();
                checkDotsNearMouse();
            }
        }
        animateDots();
    }); 
    return (
        <canvas class="bgCanvas" id="bgCanvas"></canvas>
    );
}

export default BgCanvas;

