import React from 'react';
import {
    Link
} from 'react-router-dom';
import { Button } from 'semantic-ui-react'

const Home = () => {
    return (
        <div>
            <h2>This is the home component</h2>
            <div>
                <Link to='/recorder'><Button>Recorder</Button></Link>
            </div>
        </div>
    )
}

export default Home
