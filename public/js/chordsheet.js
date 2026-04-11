const baseChords = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];


function getChordIndex(chord){
    return baseChords.indexOf(chord);
}


function getBaseChord(chord){
    if (chord.length >= 2 && chord[1] === '#') {
        return chord.slice(0, 2);
    }
    return chord[0];
}


function getDeltaKey(startKey, targetKey){
    return getChordIndex(targetKey) - getChordIndex(startKey);
}


function transposeChord(chord, deltaKey){
    const base = getBaseChord(chord);
    const index = getChordIndex(base);

    let newIndex = index + deltaKey;

    while (newIndex > 11) {
        newIndex -= 12;
    }
    while (newIndex < 0) {
        newIndex += 12;
    }

    const newBase = baseChords[newIndex];


    return newBase + chord.slice(base.length);
}



document.getElementById('fileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const file = document.getElementById('fileInput').files[0];
    const startKey = document.getElementById('startKey').value.trim();
    const targetKey = document.getElementById('targetKey').value.trim();

    if (!file || !startKey || !targetKey) return;

    const delta = getDeltaKey(startKey, targetKey);

    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        const lines = text.split('\n');

        const transposedLines = lines.map(line => {
            return line.split(/\s+/).map(word => {
                if (getChordIndex(getBaseChord(word)) !== -1) {
                    return transposeChord(word, delta);
                }
                return word;
            }).join(' ');
        });

        document.getElementById('output').textContent = transposedLines.join('\n');
    };

    reader.readAsText(file);
});