import React, { useState, useEffect } from 'react'
import { screenRecorder } from '../../ScreenRecorder.js';

const Recorder = () => {

    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        window.onbeforeunload = () => {
            screenRecorder.stop()
            window.opener.setRecordingState(false)
            return
        }
    })

    const startRecording = async () => {
        const status = await screenRecorder.start()
        status === 'recording' ? setIsRecording(true) : setIsRecording(false)
        window.opener.setRecordingState(true)
    }

    const stopRecording = () => {
        setIsRecording(false)
        screenRecorder.stop()
        window.opener.setRecordingState(false)
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
                <button
                    onClick={handleClick}>{isRecording ? 'Stop recording' : 'Start recording'}
                </button>
            </div>
        </div>
    )
}

export default Recorder
