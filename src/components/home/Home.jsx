import React, { useState, useEffect, useRef } from 'react';
import { RECORDING_WINDOW_PARAMS } from '../../resources/resources.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { homeStyles } from '../../resources/resources.js';
import VideocamIcon from '@material-ui/icons/Videocam';
import StopIcon from '@material-ui/icons/Stop';
import recorderLogo from '../../resources/images/screen-recorder.png';

const useStyles = makeStyles(
    homeStyles
)

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

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.topCtn}>
                <div className={classes.textCtn}>
                    <Typography variant='h3'>MediaStreamAPI Screen Recorder</Typography>
                    <Typography className={classes.bodyTxt} variant='body1'>Built in React.js, this screen recorder uses the Media Capture and Streams API to capture the action on your screen along with audio tracks from your system and microphone.</Typography>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color={isRecording ? 'secondary' : 'primary'}
                        startIcon={isRecording ? <StopIcon /> : <VideocamIcon />}
                        onClick={openRecorder}>{isRecording ? 'Stop Recording' : 'Open Recorder'}

                    </Button>
                </div>
                <div className={classes.logoCtn}>
                    <img className={classes.logo} src={recorderLogo} alt='Screen recorder logo' />
                </div>
            </div>

        </div>
    )
}

export default Home