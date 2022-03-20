import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {

    return(
        <div>
            <h2>Error 404 - Not Found</h2>
            <Link to="/">Bring Me Back!</Link>

        </div>
    );

}

export default NotFoundPage;