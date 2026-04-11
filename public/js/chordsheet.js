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

function isChord(word) {
    const firstChar = word[0];

    if (
        firstChar === 'A' ||
        firstChar === 'B' ||
        firstChar === 'C' ||
        firstChar === 'D' ||
        firstChar === 'E' ||
        firstChar === 'F' ||
        firstChar === 'G'
    ) {
        const base = getBaseChord(word);
        const index = getChordIndex(base);
        if (index !== -1) {
            return true;
        }
    }
    return false;
}

document.getElementById('input-box').addEventListener('submit', function(e) {
    e.preventDefault();

    const file = document.getElementById('txtInput').files[0];
    const startKey = document.getElementById('startKey').value.trim();
    const targetKey = document.getElementById('targetKey').value.trim();

    if (file === undefined || startKey === '' || targetKey === '') {
        alert("Please fill in all fields");
        return;
    }

    const startIndex = getChordIndex(startKey);
    const targetIndex = getChordIndex(targetKey);

    if (startIndex === -1 || targetIndex === -1) {
        alert("Invalid key entered");
        return;
    }

    const delta = getDeltaKey(startKey, targetKey);
    const reader = new FileReader();

    reader.onload = function(event) {

        const text = event.target.result;
        const lines = text.split('\n');
        const transposedLines = [];

        for (let i = 0; i < lines.length; i++) {

            const line = lines[i];
            const words = line.split(' ');
            const newWords = [];

            for (let j = 0; j < words.length; j++) {

                const word = words[j];
                if (isChord(word) === true) {
                    const newChord = transposeChord(word, delta);
                    newWords.push(newChord);

                } else {
                    newWords.push(word);
                }
            }
            const newLine = newWords.join(' ');
            transposedLines.push(newLine);
        }
        const finalText = transposedLines.join('\n');
        document.getElementById('output').textContent = finalText;
    };
    reader.readAsText(file);
});