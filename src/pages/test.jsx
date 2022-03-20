import React from 'react';
import { Link } from 'react-router-dom';

import TopBar from './TopBar';

const TestingPage = () => {

    return(
        <div>
            <div>
                <TopBar/>
            </div>
            
            <div class="">
                <h2>Testing to see if this works</h2>
            </div>

            <h2>Testing Page</h2>
            <p>Top</p>
            
        </div>
    );

}

export default TestingPage;