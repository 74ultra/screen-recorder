import React, { useState } from 'react'
import {
    Link
} from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { screenRecorder } from '../../ScreenRecorder.js';

const Recorder = () => {

    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async () => {
        const status = await screenRecorder.start()
        status === 'recording' ? setIsRecording(true) : setIsRecording(false)
    }

    const stopRecording = () => {
        setIsRecording(false)
        screenRecorder.stop()
    }

    const handleClick = () => {
        if (isRecording) {
            stopRecording()
        } else if (!isRecording) {
            startRecording()
        }
    }

    return (
        <div>
            <h2>This is the recorder component</h2>
            <div>
                <Button
                    negative={isRecording}
                    positive={!isRecording}
                    onClick={handleClick}>{isRecording ? 'Stop recording' : 'Start recording'}
                </Button>

            </div>
            <div>
                <Link to='/'><Button>Home</Button></Link>
            </div>

        </div>
    )
}

export default Recorder
