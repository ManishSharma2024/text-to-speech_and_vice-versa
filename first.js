
// VOICE TO TEXT SCRIPT

document.addEventListener('DOMContentLoaded', function () {
    const outputTextarea = document.getElementById('output');
    const startBtn = document.getElementById('startBtn');
    const languageSelect = document.getElementById('language');

    let selectedLanguage = languageSelect.value;

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = selectedLanguage;

    const synth = window.speechSynthesis;

    languageSelect.addEventListener('change', function () {
        selectedLanguage = languageSelect.value;
        recognition.lang = selectedLanguage;
    });

    recognition.onstart = function () {
        startBtn.textContent = 'Recording...';
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        outputTextarea.value = transcript;
        speakText(transcript, selectedLanguage);
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function () {
        startBtn.textContent = 'Start Recording';
    };

    startBtn.addEventListener('click', function () {
        recognition.start();
    });

    function speakText(text, lang) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        synth.speak(utterance);
    }
});


// TEXT TO VOICE SCRIPT

document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('inputText');
    const speakBtn = document.getElementById('speakBtn');

    const synth = window.speechSynthesis;

    speakBtn.addEventListener('click', function () {
        const textToSpeak = inputText.value.trim();

        if (textToSpeak !== '') {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            synth.speak(utterance);
        }
    });
});