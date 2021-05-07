import React, { useState, useEffect } from 'react';
import { screenRecorder } from '../../ScreenRecorder.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { recorderStyles } from '../../resources/resources.js';
import VideocamIcon from '@material-ui/icons/Videocam';
import StopIcon from '@material-ui/icons/Stop';


const useStyles = makeStyles(
    recorderStyles
)

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

    const classes = useStyles()

    return (

        <div className={classes.root}>
            <div className={classes.textCtn}>
                <Typography variant='h6' align='center'>{isRecording ? 'Stop recording your screen' : 'Start recording your screen'}</Typography>
                <Typography variant='subtitle1' align='center'>{isRecording ? 'The file will download to your computer' : 'Close this window to cancel recording'}</Typography>
            </div>
            <div className={classes.btnCtn}>
                <Button
                    variant='contained'
                    onClick={handleClick}
                    fullWidth='true'
                    startIcon={isRecording ? <StopIcon /> : <VideocamIcon />}
                >
                    {isRecording ? 'Stop' : 'Start'}
                </Button>
            </div>
        </div>



    )
}

export default Recorder
