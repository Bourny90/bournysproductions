function acceptCookies() {
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }

  localStorage.setItem('cookieChoice', 'accepted');

  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
  }
}

function declineCookies() {
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      analytics_storage: 'denied'
    });
  }

  localStorage.setItem('cookieChoice', 'declined');

  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const choice = localStorage.getItem('cookieChoice');

  if (choice === 'accepted') {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
    banner.style.display = 'none';
  } else if (choice === 'declined') {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
    banner.style.display = 'none';
  } else {
    banner.style.display = 'block';
  }
});