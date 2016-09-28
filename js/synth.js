var keyboard = new QwertyHancock({ id: 'keyboard', width: 600, height: 150});

// Fix up for prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var context = new AudioContext();

/* VCO */
var vco = context.createOscillator();
vco.type = 'sawtooth';
vco.frequency.value = 220;
vco.start(0);

/* VCA */
var vca = context.createGain();
vca.gain.value = 0;

/* Connections */
vco.connect(vca);
vca.connect(context.destination);

var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
}

depressed_keys = {}

keyboard.keyDown = function (note, frequency) {
    vco.frequency.value = frequency;
    vca.gain.value = 1;
    depressed_keys[note] = true;
};

keyboard.keyUp = function (note, frequency) {
    delete depressed_keys[note];
    if (isEmpty(depressed_keys)) {
        vca.gain.value = 0;
    }
};
