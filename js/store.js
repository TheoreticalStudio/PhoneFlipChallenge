document.addEventListener('DOMContentLoaded', function() {
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    const votingComplete = document.querySelector('.voting-complete');
    let votedCount = 0;
    const totalProducts = productCards.length;

    // Function to send event to Google Analytics
    function trackGoogleAnalytics(eventCategory, eventAction, eventLabel = '') {
        if (typeof gtag !== 'undefined') {
            // If Google Analytics is loaded (gtag.js)
            gtag('event', eventAction, {
                'event_category': eventCategory,
                'event_label': eventLabel
            });
        } else if (typeof ga !== 'undefined') {
            // If Universal Analytics is loaded (analytics.js)
            ga('send', 'event', eventCategory, eventAction, eventLabel);
        } else {
            // Fallback to console if GA is not loaded
            console.log(`GA Event - Category: ${eventCategory}, Action: ${eventAction}, Label: ${eventLabel}`);
        }
    }

    // Function to handle vote
    function handleVote(card, action) {
        const productId = card.dataset.productId;
        const productName = card.querySelector(`#like-${productId}`)?.dataset.productName || `Product ${productId}`;
        
        // Mark as voted
        card.classList.add('voted');
        
        // Show voted message
        const votedMessage = card.querySelector('.product-voted');
        if (votedMessage) {
            votedMessage.style.display = 'block';
        }
        
        // Hide action buttons
        const actions = card.querySelector('.product-actions');
        if (actions) {
            actions.style.display = 'none';
        }
        
        // Increment voted count
        votedCount++;
        
        // Check if all products have been voted on
        if (votedCount === totalProducts) {
            // Show thank you message after a short delay
            setTimeout(() => {
                if (votingComplete) {
                    votingComplete.style.display = 'block';
                    votingComplete.scrollIntoView({ behavior: 'smooth' });
                    
                    // Track when all products have been voted on
                    trackGoogleAnalytics('Voting', 'All Products Voted', `Total Products: ${totalProducts}`);
                }
            }, 500);
        }
        
        // Track the vote in Google Analytics
        const eventAction = action === 'like' ? 'Product Liked' : 'Product Disliked';
        trackGoogleAnalytics('Voting', eventAction, `Product: ${productName} (ID: ${productId})`);
        
        // Log to console for debugging
        console.log(`Voted ${action} on product ${productName} (ID: ${productId})`);
        
        // Send to your server if needed
        sendVoteToServer(productId, action, productName);
    }
    
    // Add click event listeners to all like/dislike buttons
    productCards.forEach(card => {
        const likeBtn = card.querySelector('.like-btn');
        const dislikeBtn = card.querySelector('.dislike-btn');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', () => handleVote(card, 'like'));
        }
        
        if (dislikeBtn) {
            dislikeBtn.addEventListener('click', () => handleVote(card, 'dislike'));
        }
    });
    
    // Function to send vote to server (example implementation)
    function sendVoteToServer(productId, action, productName) {
        // Replace with your actual API endpoint
        const apiUrl = '/api/vote'; // Update this to your actual API endpoint
        
        // Create the request body
        const requestBody = {
            productId: productId,
            productName: productName,
            action: action,
            timestamp: new Date().toISOString(),
            // Add any additional data you want to send to your server
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language
        };
        
        // Log the request for debugging
        console.log('Sending vote to server:', requestBody);
        
        // Send the request
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed (e.g., authentication)
                // 'Authorization': 'Bearer your-token-here'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Vote recorded successfully:', data);
            // You can add additional success handling here if needed
        })
        .catch(error => {
            console.error('Error recording vote:', error);
            // You can add additional error handling here if needed
            // For example, show an error message to the user
            // or retry the request
        });
    }
});
