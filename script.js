// This is so that if speech is still playing from previous session, it stops on page load
speechSynthesis.cancel();

// Initialize the speech synthesis
var speech = new SpeechSynthesisUtterance();
speech.rate = 0.75; // Set default speed to 0.5x for all voices
speech.pitch = 1;
speech.volume = 1;

// Load voices and set the first available voice as default
let voicesLoaded = false;
speechSynthesis.onvoiceschanged = function () {
    if (!voicesLoaded) {
        const voices = speechSynthesis.getVoices();
        speech.voice = voices[0];
        voicesLoaded = true;
    }
};

// Function to prompt the user to select a voice before speaking
function promptVoiceSelection() {
    const selectedVoiceIndex = document.getElementById("voiceOptions").value;
    if (selectedVoiceIndex === "default") {
        alert("Please select a voice from the dropdown before speaking.");
    } else {
        changeVoice(selectedVoiceIndex); // Change the voice based on the selected option
        speakInputText();
    }
}

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

// Function to change the speech voice based on the selected option in the voice dropdown
function changeVoice(voiceIndex) {
    const voices = speechSynthesis.getVoices();
    if (voiceIndex >= 0 && voiceIndex < voices.length) {
        speech.voice = voices[voiceIndex];
    }
}
