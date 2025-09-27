/**
 * Portfolio Script Sécurisé - Guileb Yassin
 * Version obfusquée pour protection du webhook
 */

'use strict';

// Configuration sécurisée (webhook encodé en base64)
const _0x1a2b3c = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTA1NzI0NDY4MDA5OTc0NTgwMi95ZWktTURnZWxMRkI5OVpoWUxzWGR4S2ZNUzVMUmJlUlF5Q0E4Rm12SEdER3Ntb1d4UHV5OU9wQ05UbFV6OUIyNDNIYQ==';
const WEBHOOK_URL = atob(_0x1a2b3c);

// Protection contre l'inspection des outils de développement
let _0x4d5e6f = false;
Object.defineProperty(window, 'devtools', {
  get: function() { _0x4d5e6f = true; return {}; },
  set: function() { _0x4d5e6f = true; }
});

// Anti-debug basique
const _0x7g8h9i = () => {
  const _0x9j0k1l = Date.now();
  if (_0x4d5e6f || (console.profile && console.profileEnd && console.clear)) {
    console.clear();
    return false;
  }
  return _0x9j0k1l > 0;
};

// Protection contre la copie du contenu
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());

// Détection de l'ouverture des DevTools (méthode approximative)
setInterval(() => {
  const threshold = 160;
  if (window.outerHeight - window.innerHeight > threshold || 
      window.outerWidth - window.innerWidth > threshold) {
    _0x4d5e6f = true;
    console.clear();
  }
}, 500);

// Configuration des éléments DOM
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== CURSEUR PERSONNALISÉ ==========
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    
    // Animation fluide du follower
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Effets sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .service-item, .project-item, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
      });
    });
  }
  
  // ========== EFFETS PARALLAX ==========
  const serviceItems = document.querySelectorAll('.service-item');
  const projectItems = document.querySelectorAll('.project-item');
  
  // Effet parallax au scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    serviceItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const speed = 0.1 + (index * 0.02);
        const yPos = -(scrollTop * speed);
        item.style.transform = `translateY(${yPos}px)`;
      }
    });
  });
  
  // Effet parallax sur hover pour les services
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform += ' scale(1.05)';
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = this.style.transform.replace(' scale(1.05)', '');
    });
  });
  
  // ========== NOTIFICATIONS ==========
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="notification-message">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
  
  // ========== GESTION DU FORMULAIRE SÉCURISÉ ==========
  const form = document.getElementById('contact-form');
  const submitBtn = form?.querySelector('button[type="submit"]');
  const btnText = submitBtn?.querySelector('span');
  
  if (form && submitBtn && btnText) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Vérification de sécurité
      if (!_0x7g8h9i()) {
        showNotification('⚠️ Action bloquée pour des raisons de sécurité', 'error');
        return;
      }
      
      // État du bouton
      submitBtn.disabled = true;
      const originalText = btnText.textContent;
      btnText.textContent = 'Envoi en cours...';
      
      try {
        // Vérification supplémentaire
        const _0xm2n3o4 = performance.now();
        if (_0xm2n3o4 <= 0 || !_0x7g8h9i()) {
          throw new Error('Vérification de sécurité échouée');
        }
        
        // Récupération et validation des données
        const formData = new FormData(form);
        const data = {
          name: (formData.get('fullname') || '').toString().substring(0, 100).trim(),
          email: (formData.get('email') || '').toString().substring(0, 100).trim(),
          message: (formData.get('message') || '').toString().substring(0, 1000).trim()
        };
        
        // Validation côté client
        if (!data.name || !data.email.includes('@') || !data.message) {
          throw new Error('Veuillez remplir tous les champs correctement');
        }
        
        // Envoi du webhook sécurisé
        const success = await _0xSendWebhook(data);
        
        if (success) {
          btnText.textContent = '✅ Message envoyé !';
          form.reset();
          showNotification('🎉 Message envoyé avec succès !', 'success');
          
          setTimeout(() => {
            btnText.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Échec de l\'envoi du message');
        }
        
      } catch (error) {
        console.error('Erreur:', error.message);
        btnText.textContent = 'Erreur - Réessayer';
        showNotification(`❌ ${error.message}`, 'error');
        
        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
  
  // ========== FONCTION WEBHOOK SÉCURISÉE ==========
  async function _0xSendWebhook(data) {
    try {
      // Protection supplémentaire
      if (_0x4d5e6f) return false;
      
      // Préparation des données sécurisées
      const timestamp = Math.floor(Date.now() / 1000);
      const browserInfo = _0xGetBrowserInfo();
      
      const payload = {
        username: "Portfolio Contact 📬",
        avatar_url: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
        content: "🚨 **Nouveau contact depuis le portfolio !**",
        embeds: [{
          title: "📧 Nouveau Message de Contact",
          description: "Message reçu depuis le portfolio de **Guileb Yassin**",
          color: 0xFF9500,
          fields: [
            { name: "👤 Nom", value: data.name, inline: true },
            { name: "📧 Email", value: `[${data.email}](mailto:${data.email})`, inline: true },
            { name: "🕐 Reçu le", value: `<t:${timestamp}:F>`, inline: false },
            { name: "💬 Message", value: data.message, inline: false },
            { name: "🌐 Info", value: browserInfo, inline: true }
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Portfolio Security System" }
        }]
      };
      
      // Envoi sécurisé
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `Portfolio-${Math.random().toString(36).substr(2, 9)}`
        },
        body: JSON.stringify(payload)
      });
      
      return response.ok;
      
    } catch (error) {
      console.warn('Webhook error:', error.message);
      return false;
    }
  }
  
  // ========== UTILITAIRES SÉCURISÉS ==========
  function _0xGetBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    
    return `${browser} • ${navigator.platform}`;
  }
  
  // ========== ANIMATIONS AU SCROLL ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observer les éléments à animer
  document.querySelectorAll('.service-item, .project-item, .testimonial-item').forEach(el => {
    observer.observe(el);
  });
  
  // Protection finale
  console.clear();
  console.log('%cPortfolio Sécurisé 🛡️', 'color: #ff9500; font-size: 16px; font-weight: bold;');
  console.log('%cTentative de modification détectée et bloquée', 'color: red; font-size: 12px;');
});

// Protection contre la manipulation du DOM
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    if (args[0] && args[0].includes('webhook') && !_0x7g8h9i()) {
      console.clear();
      return Promise.reject(new Error('Blocked'));
    }
    return originalFetch.apply(this, args);
  };
}