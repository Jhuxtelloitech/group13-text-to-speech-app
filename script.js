// Initialize the speech synthesis
var speech = new SpeechSynthesisUtterance();
speech.rate = 0.75; // Set the speech rate to 0.75x for slower speed
speech.pitch = 1;
speech.volume = 1;

// Set Olivia's voice as the default voice
speech.voice = speechSynthesis.getVoices().find(v => v.name === 'en-GB-Wavenet-D');

// Function to fetch the custom voice ID
async function getCustomVoiceId() {
    // ... (Your existing code)
}

// Call the function to fetch the custom voice ID
getCustomVoiceId();

// Function to handle speaking the input text
function speakInputText() {
    speech.text = document.getElementById("textInput").value;
    speechSynthesis.speak(speech);
}

// Function to pause the speech
function pauseSpeech() {
    if (speechSynthesis.speaking) {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        } else {
            speechSynthesis.pause();
        }
    }
}

// Function to stop the speech
function stopSpeech() {
    speechSynthesis.cancel();
}

// Function to download the entered text as a text file
function downloadVoice() {
    const text = document.getElementById("textInput").value;
    const blob = new Blob([text], { type: 'text/plain' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speech_text.txt';
    a.style.display = 'none';
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Function to update the volume label with the current value
function updateVolumeLabel() {
    const volumeInput = document.getElementById("volumeInput");
    const volumeLabel = document.getElementById("volumeLabel");
    volumeLabel.textContent = volumeInput.value;

    // Update the speech volume
    speech.volume = volumeInput.value;
}
