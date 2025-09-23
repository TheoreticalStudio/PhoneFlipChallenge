document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    const votingComplete = document.querySelector('.voting-complete');
    let hasVoted = false;

    // Функция для отправки событий в Google Analytics
    function trackGoogleAnalytics(eventCategory, eventAction, eventLabel = '') {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventAction, {
                'event_category': eventCategory,
                'event_label': eventLabel
            });
        } else {
            console.log(`GA Event - Category: ${eventCategory}, Action: ${eventAction}, Label: ${eventLabel}`);
        }
    }

    // Обработчик голосования
    function handleVote(card, action) {
        if (hasVoted) return; // Предотвращаем повторное голосование
        
        const productId = card.dataset.productId;
        const productName = card.querySelector(`.like-btn`)?.dataset.productName || `Product ${productId}`;
        
        // Отправляем событие о голосовании за товар
        trackGoogleAnalytics('Product_Vote', action, productName);
        
        // Отмечаем карточку как проголосованную
        card.classList.add('voted');
        
        // Показываем сообщение о голосовании
        const votedMessage = card.querySelector('.product-voted');
        if (votedMessage) {
            votedMessage.style.display = 'block';
        }
        
        // Скрываем кнопки голосования
        const actions = card.querySelector('.product-actions');
        if (actions) {
            actions.style.display = 'none';
        }

        // Отмечаем, что пользователь проголосовал
        hasVoted = true;
        
        // Прокручиваем к блоку с благодарностью
        if (votingComplete) {
            votingComplete.style.display = 'block';
            setTimeout(() => {
                votingComplete.scrollIntoView({ behavior: 'smooth' });
                // Отправляем событие о завершении голосования
                trackGoogleAnalytics('Voting', 'Completed', 'User completed voting');
            }, 300);
        }
    }

    // Добавляем обработчики событий для кнопок голосования
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
});