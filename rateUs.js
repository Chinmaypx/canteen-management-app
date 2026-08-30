// rateUs.js
export function createRateUsSection() {
    const rateUsSection = document.createElement('div');
    rateUsSection.style.color = '#fff';
    
    const rateUsTitle = document.createElement('h2');
    rateUsTitle.textContent = 'Rate Us';
    rateUsSection.appendChild(rateUsTitle);
    
    const ratingInput = document.createElement('select');
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} Star${i > 1 ? 's' : ''}`;
        ratingInput.appendChild(option);
    }
    rateUsSection.appendChild(ratingInput);
    
    const submitRatingBtn = document.createElement('button');
    submitRatingBtn.textContent = 'Submit Rating';
    submitRatingBtn.onclick = () => {
        alert('Rating submitted: ' + ratingInput.value + ' stars');
    };
    rateUsSection.appendChild(submitRatingBtn);

    return rateUsSection;
}
