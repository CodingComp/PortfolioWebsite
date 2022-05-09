import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from "aos";
import "aos/dist/aos.css";

import './css/main.css';
import arrow from './imgs/indexPage/arrow.png';
import aImg from './imgs/indexPage/amPH.png';
import sImg from './imgs/indexPage/skillsPH.png';
import ttimg from './imgs/wallpaper.jpg';
import BgCanvas from './scripts/BgCanvas';

const MainPage = () => {

    useEffect(() => {
        Aos.init({duration: 2000});
    }, []);

    return(
        <div>
            <BgCanvas/>
            {/* #example will move the view to said area but will load the page again, another way? Code?*/}
            <div class="stickyNavBar">
                <a href='#welcome'>Home</a>
                <a href='#aboutMe'>About Me</a>
                <a href='#recentProjects'>Recent Projects</a>
                <a href=''>More Projects</a>
                <a href=''>Contact Me</a>
            </div>

            <div className="topContent" id="welcomeArea"> 
                <div className="mainText">
                    <h1 className="t1">Hi, Im Josh</h1>
                    <h2 className="t2">This is my programming portfolio</h2>
                </div>

                <div className="arrowDiv">
                    <div className="grid">
                        <p>Scroll</p>
                        <img src={arrow} alt="" width="40" height="40"/>
                    </div>
                </div>
            </div>

            <div className="mainContent">
                <div className="aboutMe" data-aos="fade-up" id="aboutMe">
                    <h2 >A Little About Me</h2>
                    <div className="grid">
                        <div data-aos="fade-right">
                            <h3 style={{float: 'left'}}>About Me</h3>
                            <p style={{textAlign: 'left', float: 'left'}}>Hi there, first I want to thank you for taking the time to look at my website, I really appriciate it. 
                                I'm a college student currently attending the University Of Utah majoring in Computer Science. 
                                For the longest time I have always been interested with technology, I loved messing aroudn with computers when I was younger.
                                I got the idea to start programming around six years ago. The first two years of programming adventure were self taught, consisting of small projects.
                                From there I have taken many different computer programming courses in school as well as self teaching myself. One of my more recent interests has been machine learning,
                                currently I am watching a free course given by google on the basics of machine learning.</p>
                        </div>
                        <img src={aImg} width="300px" data-aos="fade-left"/>
                        <img src={sImg} width="600px" data-aos="fade-right"/>
                        <div data-aos="fade-left">
                            <h3 style={{float: 'right'}}>Programming Knowledge</h3>
                            <p style={{textAlign: 'right', float: 'right'}}>My current skills in programming include Object Orientated Programming, web design, algorithms, some mobile development. Some of my favorite languages I know are Java, C#, JS, and more. </p>
                        </div>
                    </div>
                </div>
                
                <div id="recentProjects">
                    <h2 data-aos="fade-up">Recent Projects</h2> <br/><br/>
                    <div className="recentProjectEntry" data-aos="fade-right">
                        <img src={ttimg} class='imgLeft'/>
                        <div>
                            <h2>Portfolio Website</h2>
                            <p>This project is the website you are currently viewing! I have worked on websites in my past from personal projects to schooling, 
                                this is one of my best websites I have made. This is also the first time I have used ReactJS before, using this framework has made
                                web development a lot easier and closer to object orientated programming I am accustomed to.</p>
                            <a href="http://github.com" target="_blank">GitGub</a>
                        </div>
                    </div>
                    <br/>
                    <div className="recentProjectEntry" data-aos="fade-left">
                        <div>
                            <h2>Sorting Algorithms Visualizer</h2>
                            <p>This project is demonstrating the different sorting algorithms using in the world of computer programming.
                                There are four to pick from and you can see the visual representation of what is being sorted. This project is 
                                built into this website, you can click the link below to view the page.
                            </p>
                            <a href="http://github.com" target="_blank">GitGub</a>
                            <a href="/SortingPage" style={{left: "100px"}}>Sorting Page</a>
                        </div>
                        <img src={ttimg} class='imgRight'/>
                    </div>
                    <br/>
                    <div className="recentProjectEntry"data-aos="fade-right">
                        <img src={ttimg} class='imgLeft'/>
                        <div>
                            <h2>3D Unity Game</h2>
                            <p>A 3D Game</p>
                            <a href="http://github.com" target="_blank">GitGub</a>
                            <a href="http://github.com" target="_blank" style={{left: "700px"}}>Link To Game</a>
                        </div>
                    </div>
                    <br/>
                    <div className="recentProjectEntry" data-aos="fade-left">
                        <div>
                            <h2>Crypto Traker</h2>
                            <p>A Crypto Currency tracker using Nomics API built using C++</p>
                            <a href="http://github.com" target="_blank">GitGub</a>
                        </div>
                        <img src={ttimg} class='imgRight'/>
                    </div>

                    <div>
                        <p>For more of my personal projects click</p>
                        <Link to="ProjectsPage">Here</Link>
                    </div>

                </div>
            </div>
            <div className="contactArea">
           </div>
        </div>
        
    );

}

export default MainPage;
//LINKS
