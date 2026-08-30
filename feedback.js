// feedback.js
export function createFeedbackSection() {
    const feedbackSection = document.createElement('div');
    feedbackSection.style.color = '#fff';
    feedbackSection.style.marginBottom = '20px';
    
    const feedbackTitle = document.createElement('h2');
    feedbackTitle.textContent = 'Feedback';
    feedbackSection.appendChild(feedbackTitle);
    
    const feedbackInput = document.createElement('textarea');
    feedbackInput.placeholder = 'Your feedback here...';
    feedbackInput.style.width = '300px';
    feedbackInput.style.height = '100px';
    feedbackInput.style.marginBottom = '10px';
    feedbackSection.appendChild(feedbackInput);

    const submitFeedbackBtn = document.createElement('button');
    submitFeedbackBtn.textContent = 'Submit Feedback';
    submitFeedbackBtn.onclick = () => {
        alert('Feedback submitted: ' + feedbackInput.value);
        feedbackInput.value = ''; // Clear the input
    };
    feedbackSection.appendChild(submitFeedbackBtn);

    return feedbackSection;
}
