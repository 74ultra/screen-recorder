export class ScreenRecorder {
    url = null;
    blob = null
    recorder = null
    voiceStream = null
    desktopStream = null

    mergeAudioStreams(desktopStream, voiceStream) {
        const context = new AudioContext();
        const destination = context.createMediaStreamDestination();
        let hasDesktop = false;
        let hasVoice = false;

        if (desktopStream && desktopStream.getAudioTracks().length > 0) {
            const source1 = context.createMediaStreamSource(desktopStream);
            const desktopGain = context.createGain();
            desktopGain.gain.value = 0.7;
            source1.connect(desktopGain).connect(destination);
            hasDesktop = true;
        }

        if (voiceStream && voiceStream.getAudioTracks().length > 0) {
            const source2 = context.createMediaStreamSource(voiceStream);
            const voiceGain = context.createGain();
            voiceGain.gain.value = 0.7;
            source2.connect(voiceGain).connect(destination);
            hasVoice = true;
        }

        return hasDesktop || hasVoice ? destination.stream.getAudioTracks() : [];
    }

    async start() {
        try {
            this.desktopStream = await navigator.mediaDevices.getDisplayMedia(
                {
                    video: true,
                    audio: true
                }
            )
            this.voiceStream = await navigator.mediaDevices.getUserMedia(
                {
                    video: false,
                    audio: true
                }
            )

            const tracks = [
                ...this.desktopStream.getVideoTracks(),
                ...this.mergeAudioStreams(this.desktopStream, this.voiceStream)
            ];

            this.stream = new MediaStream(tracks);
            this.blobs = [];
            this.recorder = new MediaRecorder(this.stream, {
                mimeType: "video/webm; codecs=vp8,opus"
            });
            this.recorder.start();
            this.recorder.ondataavailable = e => {
                if (!this.blobs) {
                    return
                }
                this.blobs.push(e.data);
            };
            this.recorder.onstop = async () => {
                if (!this.stream || !this.blobs) {
                    return
                }
                this.stream.getTracks().forEach(track => track.stop())
                this.blob = new Blob(this.blobs, { type: "video/webm" });
                this.url = URL.createObjectURL(this.blob);
                this.download()
            }

            return this.recorder.state;

        } catch {
            alert(`You must share your screen and and microphone to record`);
            return
        }
    }

    stop() {
        if (!this.recorder) {
            return;
        }
        this.recorder.stop();
    }

    getUrl() {
        return this.url;
    }

    download() {
        if (!this.url) {
            return
        }
        const invisiAnchor = document.createElement("a");
        invisiAnchor.setAttribute("download", "screenRecording.webm");
        invisiAnchor.setAttribute("href", this.url);
        invisiAnchor.style.display = "none";
        invisiAnchor.click();
    }
}

export const screenRecorder = new ScreenRecorder();