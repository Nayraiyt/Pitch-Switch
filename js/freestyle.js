const baseChords = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

function getChordIndex(chord) {
    return baseChords.indexOf(chord);
}

function getBaseChord(chord) {
    if (chord.length >= 2 && chord[1] === '#') {
        return chord[0] + chord[1];
    } else {
        return chord[0];
    }
}

function getDeltaKey(startKey, targetKey) {
    const startIndex = getChordIndex(startKey);
    const targetIndex = getChordIndex(targetKey);

    const delta = targetIndex - startIndex;
    return delta;
}

function transposeChord(chord, deltaKey) {

    const base = getBaseChord(chord);

    const index = getChordIndex(base);

    if (index === -1) {
        return chord;
    }

    let newIndex = index + deltaKey;

    while (newIndex > 11) {
        newIndex = newIndex - 12;
    }

    while (newIndex < 0) {
        newIndex = newIndex + 12;
    }

    const newBase = baseChords[newIndex];
    const restOfChord = chord.slice(base.length);
    const newChord = newBase + restOfChord;
    
    return newChord;
}


document.querySelector('.input-box').addEventListener('submit', function(e) {
    e.preventDefault();

    const targetKey = document.getElementById('targetKey').value.trim();
    const startKey = document.getElementById('startKey').value.trim();
    const chordInput = document.getElementById('chordsInput').value.trim();


    if (!targetKey || !startKey || !chordInput) return;

    if(getChordIndex(targetKey) == -1 || getChordIndex(startKey) ==-1){
        return;
    }

    const delta = getDeltaKey(startKey, targetKey);


    const chords = chordInput.split(/\s+/);
    const transposed = chords.map(chord => transposeChord(chord, delta));


    const outputBox = document.getElementById('outputBox');
    outputBox.innerHTML = '';


    const keyDiv = document.createElement('div');
    keyDiv.className = 'target-key-output';
    keyDiv.textContent = `Target Key: ${targetKey}`;
    titleBox.innerHTML = '';
    titleBox.appendChild(keyDiv);

    transposed.forEach((chord, i) => {
        const chordDiv = document.createElement('div');
        chordDiv.className = `chord-output chord-output-${i+1}`;
        chordDiv.textContent = chord;
        outputBox.appendChild(chordDiv);
    });
});



