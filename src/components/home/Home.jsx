import React, { useState, useEffect, useRef } from 'react';
import { homeText, RECORDING_WINDOW_PARAMS } from '../../resources/resources.js';

const Home = () => {

    const [isRecording, setIsRecording] = useState(false)

    useEffect(() => {
        window.setRecordingState = (isRecording) => {
            setIsRecording(isRecording)
        }
    })

    const recordingRef = useRef(null)

    const openRecorder = () => {
        if (recordingRef.current && !recordingRef.current.closed) {
            recordingRef.current.focus()
        } else {
            recordingRef.current = window.open(
                '/recorder',
                'screen recorder',
                RECORDING_WINDOW_PARAMS
            )
        }
    }

    return (
        <div>
            <h2>This is the home component</h2>
            <div>
                <button onClick={openRecorder}>{isRecording ? 'Stop Recording' : 'Open Recorder'}</button>
            </div>
            <div>
                <p>{homeText}</p>
            </div>
        </div>
    )
}

export default Home
