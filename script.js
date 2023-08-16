// Import the Compromise library
import nlp from 'compromise';

// Function to perform POS tagging and display results
function analyzePosTags() {
    const inputSentence = document.getElementById('inputSentence').value;
    const resultElement = document.getElementById('result');

    if (inputSentence) {
        const doc = nlp(inputSentence);
        const terms = doc.terms().out('array');

        if (terms.length > 0) {
            let resultHtml = '';
            for (const term of terms) {
                resultHtml += `${term.text}: ${term.tags.join(', ')}<br>`;
            }
            resultElement.innerHTML = resultHtml;
        } else {
            resultElement.innerHTML = 'No terms found.';
        }
    }
}

// Attach event listener to the "Analyze" button
const analyzeButton = document.getElementById('analyzeButton');
analyzeButton.addEventListener('click', analyzePosTags);
