// Function to send Google Analytics event
function sendGAEvent(eventName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': 'engagement',
            'event_label': 'app_store_button_click'
        });
    } else if (typeof ga !== 'undefined') {
        ga('send', 'event', 'engagement', eventName, 'app_store_button_click');
    }
    // Log to console for debugging
    console.log('GA Event:', eventName);
}

document.addEventListener("DOMContentLoaded", function() {
    const appStore = document.getElementById("appStore");
    const googlePlay = document.getElementById("googlePlay");
    const telegram = document.getElementById("telegram");
  
    const platform = getMobileOperatingSystem();
    
    // Default links (regular web links)
    let appStoreLink = "https://apps.apple.com/app/apple-store/id6744176430";
    let googlePlayLink = "https://play.google.com/store/apps/details?id=com.TheoreticalStudio.PhoneFlip";
    let telegramLink = "https://t.me/flutter_accelerometer_test_bot";
    
    // Update links based on platform
    if (platform === "iOS") {
        // For iOS devices
        appStoreLink = "itms-apps://apps.apple.com/app/id6744176430";
        // Keep other links as default (regular web links)
    } else if (platform === "Android") {
        // For Android devices
        googlePlayLink = "market://details?id=com.TheoreticalStudio.PhoneFlip";
        telegramLink = "tg://resolve?domain=flutter_accelerometer_test_bot";
    } else if (platform === "unknown") {
        // For desktops or unknown devices
        telegramLink = "tg://resolve?domain=flutter_accelerometer_test_bot";
    }
    
    // Apply the links and add click handlers
    if (appStore) {
        appStore.href = appStoreLink;
        appStore.addEventListener('click', function() {
            sendGAEvent('ios_button_click');
        });
    }
    if (googlePlay) {
        googlePlay.href = googlePlayLink;
        googlePlay.addEventListener('click', function() {
            sendGAEvent('android_button_click');
        });
    }
    if (telegram) {
        telegram.href = telegramLink;
        telegram.addEventListener('click', function() {
            sendGAEvent('tg_button_click');
        });
    }
    
    // Show both buttons on all devices
    if (appStore) {
        appStore.classList.add("on");
        appStore.classList.remove("off");
    }
    if (googlePlay) {
        googlePlay.classList.add("on");
        googlePlay.classList.remove("off");
    }
});
  
  
  /**
   * Determine the mobile operating system.
   * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
   *
   * @returns {String}
   */
  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }
  
    if (/android/i.test(userAgent)) {
      return "Android";
    }
  
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }
  
    return "unknown";
  }
  