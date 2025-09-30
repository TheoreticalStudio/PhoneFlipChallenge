document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    const votingComplete = document.querySelector('.voting-complete');
    let hasVoted = false;

    // Функция для отправки событий в Google Analytics
    function trackGoogleAnalytics(eventName, eventParams) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventParams);
        } else {
            console.log(`GA Event ${eventName} params: ${eventParams}`);
        }
    }

    // Обработчик голосования
    function handleVote(card, action) {
        if (hasVoted) return; // Предотвращаем повторное голосование
        
        const productId = card.dataset.productId;
        const productName = card.querySelector(`.like-btn`)?.dataset.productName || `Product ${productId}`;
        
        // Отправляем событие о голосовании за товар
        trackGoogleAnalytics(action, {
            item_id: productName,
            item_name: productName,
        });
        
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
                trackGoogleAnalytics('voting_completed');
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