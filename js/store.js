document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    const votingComplete = document.querySelector('.voting-complete');
    
    // Function to send events to Google Analytics
    function trackGoogleAnalytics(eventName, eventParams) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventParams);
        } else {
            console.log(`GA Event ${eventName} params:`, eventParams);
        }
    }
    
    // Initialize voting state in localStorage if it doesn't exist
    if (!localStorage.getItem('global-vote')) {
        localStorage.setItem('global-vote', JSON.stringify({}));
    }
    
    // Get the current voting state
    const votingState = JSON.parse(localStorage.getItem('global-vote') || '{}');
    
    // Check if all products have been voted on
    function checkAllVoted() {
        const allVoted = Array.from(productCards).every(card => {
            const productId = card.dataset.productId;
            return votingState[productId] && votingState[productId].voted;
        });
        
        if (allVoted) {
            votingComplete.style.display = 'block';
            votingComplete.scrollIntoView({ behavior: 'smooth' });
            trackGoogleAnalytics('voting_completed');
        }
        
        return allVoted;
    }
    
    // Initialize the voting state for each product
    productCards.forEach(card => {
        const productId = card.dataset.productId;
        const productName = card.querySelector(`.like-btn`)?.dataset.productName || `Product ${productId}`;
        
        // Initialize product in voting state if it doesn't exist
        if (!votingState[productId]) {
            votingState[productId] = {
                name: productName,
                vote: null,
                voted: false
            };
        }
        
        // If already voted, update the UI
        if (votingState[productId].voted) {
            card.classList.add('voted');
            card.querySelector('.product-voted').style.display = 'block';
            card.querySelector('.product-actions').style.display = 'none';
        }
    });
    
    // Save the updated voting state
    localStorage.setItem('global-vote', JSON.stringify(votingState));
    
    // Check if all products have been voted on
    checkAllVoted();
    
    // Vote handler
    function handleVote(card, action) {
        const productId = card.dataset.productId;
        const productName = card.querySelector(`.like-btn`)?.dataset.productName || `Product ${productId}`;
        
        // Skip if already voted for this product
        if (votingState[productId]?.voted) return;
        
        // Update voting state
        votingState[productId] = {
            name: productName,
            vote: action,
            voted: true
        };
        
        // Save to localStorage
        localStorage.setItem('global-vote', JSON.stringify(votingState));
        
        // Track the vote in Google Analytics
        trackGoogleAnalytics(action, {
            item_id: productId,
            item_name: productName,
            value: action === 'like' ? 1 : 0
        });
        
        // Update UI
        card.classList.add('voted');
        card.querySelector('.product-voted').style.display = 'block';
        
        // Check if all products have been voted on
        checkAllVoted();
    }
    
    // Add event listeners for voting buttons
    productCards.forEach(card => {
        const likeButton = card.querySelector('.like-btn');
        const dislikeButton = card.querySelector('.dislike-btn');

        likeButton?.addEventListener('click', () => {
            handleVote(card, 'like');
        });

        dislikeButton?.addEventListener('click', () => {
            handleVote(card, 'dislike');
        });
    });

    // Add reset button functionality
    const resetButton = document.getElementById('resetVoting');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // Clear the voting state from localStorage
            localStorage.removeItem('global-vote');
            
            // Reset the UI for all product cards
            productCards.forEach(card => {
                const productId = card.dataset.productId;
                
                // Reset the card UI
                card.classList.remove('voted');
                
                // Show voting buttons
                const actions = card.querySelector('.product-actions');
                if (actions) {
                    actions.style.display = 'flex'; // or whatever the original display was
                }
                
                // Hide voted message
                const votedMessage = card.querySelector('.product-voted');
                if (votedMessage) {
                    votedMessage.style.display = 'none';
                }
            });
            
            // Hide the voting complete message
            if (votingComplete) {
                votingComplete.style.display = 'none';
            }
            
            // Track the reset event in analytics
            trackGoogleAnalytics('voting_reset');
            
            // Reload the page to ensure a clean state
            window.location.reload();
        });
    }
});