
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 
               'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getNoteIndex(note) {
    return notes.indexOf(note);
}

function getRoot(chord) {
    if (chord.length > 1 && chord[1] === '#') {
        return chord.slice(0, 2);
    }
    return chord[0];
}

function transposeChord(chord, shift) {
    const root = getRoot(chord);
    const index = getNoteIndex(root);
    if (index === -1) return chord;

    let newIndex = (index + shift) % 12;
    if (newIndex < 0) newIndex += 12;

    const newRoot = notes[newIndex];
    return chord.replace(root, newRoot);
}

document.querySelector('.input-box').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const targetKey = document.getElementById('targetKey').value.trim();
    const chordInput = document.getElementById('chordsInput').value.trim();

    if (!targetKey || !chordInput) return;

    const originalKey = 'C';
    const shift = getNoteIndex(targetKey) - getNoteIndex(originalKey);

    const chords = chordInput.split(/\s+/);
    const transposed = chords.map(chord => transposeChord(chord, shift));

    const outputBox = document.getElementById('outputBox');
    outputBox.innerHTML = ''; // clear previous output

    const keyDiv = document.createElement('div');
    keyDiv.className = 'target-key-output';
    keyDiv.textContent = `Target Key: ${targetKey}`;
    outputBox.appendChild(keyDiv);

    transposed.forEach((chord, i) => {
        const chordDiv = document.createElement('div');
        chordDiv.className = `chord-output chord-output-${i+1}`;
        chordDiv.textContent = chord;
        outputBox.appendChild(chordDiv);
    });
});