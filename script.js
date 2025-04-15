document.addEventListener('DOMContentLoaded', function() {
    
    logEvent('view', 'page', 'page');

    function getEventObjectType(element) {
        if (!element) return 'unknown';
        if (element.tagName === 'IMG') return 'image';
        if (element.tagName === 'A') {
            if (element.classList.contains('social-link')) return 'social-link';
            if (element.classList.contains('fancy-btn')) return 'button';
            return 'link';
        }
        if (element.tagName === 'DIV' && element.classList.contains('edu-item')) return 'timeline-item';
        if (element.tagName === 'SPAN' && element.classList.contains('skill-tag')) return 'skill-tag';
        if (element.tagName === 'P' || element.tagName.match(/^H[1-6]$/)) return 'text';
        if (element.tagName === 'NAV') return 'navigation';
        return element.tagName.toLowerCase();
    }

    // Function to log events in the specified format
    function logEvent(eventType, eventObject, element) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, ${eventType}, ${eventObject}`);
    }

    // Capture all click events
    document.addEventListener('click', function(event) {
        const target = event.target;
        const eventObject = getEventObjectType(target);
        logEvent('click', eventObject, target);
    }, true);

    // Q3: Text Analysis
    const analyzeBtn = document.getElementById('analyzeBtn');
    const textInput = document.getElementById('textInput');
    const outputDiv = document.getElementById('analysisOutput');

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const text = textInput.value;
            if (!text.trim()) {
                outputDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
                return;
            }

            // Basic Statistics
            const letters = text.match(/[a-zA-Z]/g)?.length || 0;
            const words = text.match(/\b\w+\b/g)?.length || 0;
            const spaces = text.match(/\s/g)?.length || 0;
            const newlines = text.match(/\n/g)?.length || 0;
            const specialSymbols = text.match(/[^a-zA-Z0-9\s]/g)?.length || 0;

            // Tokenization
            const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

            // Pronouns List
            const pronouns = [
                'i', 'me', 'my', 'mine', 'you', 'your', 'yours', 'he', 'him', 'his',
                'she', 'her', 'hers', 'it', 'its', 'we', 'us', 'our', 'ours', 'they',
                'them', 'their', 'theirs'
            ];
            const pronounCounts = {};
            pronouns.forEach(pronoun => pronounCounts[pronoun] = 0);
            tokens.forEach(token => {
                if (pronouns.includes(token)) {
                    pronounCounts[token]++;
                }
            });

            // Prepositions List
            const prepositions = [
                'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around',
                'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond',
                'by', 'down', 'during', 'except', 'for', 'from', 'in', 'into', 'near', 'of',
                'off', 'on', 'over', 'past', 'through', 'to', 'toward', 'under', 'until', 'up',
                'upon', 'with', 'within', 'without'
            ];
            const prepositionCounts = {};
            prepositions.forEach(prep => prepositionCounts[prep] = 0);
            tokens.forEach(token => {
                if (prepositions.includes(token)) {
                    prepositionCounts[token]++;
                }
            });

            // Indefinite Articles
            const articles = ['a', 'an'];
            const articleCounts = {};
            articles.forEach(article => articleCounts[article] = 0);
            tokens.forEach(token => {
                if (articles.includes(token)) {
                    articleCounts[token]++;
                }
            });

            // Generate Output
            let output = `
                <h3>Text Statistics</h3>
                <p>Letters: ${letters}</p>
                <p>Words: ${words}</p>
                <p>Spaces: ${spaces}</p>
                <p>Newlines: ${newlines}</p>
                <p>Special Symbols: ${specialSymbols}</p>
                <h3>Pronouns Count</h3>
                <ul>
                    ${Object.entries(pronounCounts)
                        .filter(([_, count]) => count > 0)
                        .map(([pronoun, count]) => `<li>${pronoun}: ${count}</li>`)
                        .join('') || '<li>No pronouns found</li>'}
                </ul>
                <h3>Prepositions Count</h3>
                <ul>
                    ${Object.entries(prepositionCounts)
                        .filter(([_, count]) => count > 0)
                        .map(([prep, count]) => `<li>${prep}: ${count}</li>`)
                        .join('') || '<li>No prepositions found</li>'}
                </ul>
                <h3>Indefinite Articles Count</h3>
                <ul>
                    ${Object.entries(articleCounts)
                        .filter(([_, count]) => count > 0)
                        .map(([article, count]) => `<li>${article}: ${count}</li>`)
                        .join('') || '<li>No indefinite articles found</li>'}
                </ul>
            `;
            outputDiv.innerHTML = output;
        });
    }
});