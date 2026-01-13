'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    const category = filterItems[i].dataset.category;

    if (selectedValue === "all" || selectedValue === "tout") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// Initialize: apply "all" filter on page load to show all projects
window.addEventListener("DOMContentLoaded", function() {
  filterFunc("all");
});

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Parallax effect for cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.service-item, .content-card, .project-item');
  
  // Intersection Observer for card animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Initialize cards with opacity 0 and slight offset
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });

  // Mouse parallax effect
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });

  function updateParallax() {
    cards.forEach((card, index) => {
      const speed = (index % 3 + 1) * 0.5;
      const x = mouseX * speed;
      const y = mouseY * speed;
      
      if (card.style.opacity === '1') {
        card.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
    
    requestAnimationFrame(updateParallax);
  }
  
  updateParallax();
});



// Custom Cursor
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  // Check if device supports hover (desktop)
  if (window.matchMedia("(hover: hover)").matches) {
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Move main cursor instantly
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
      const dx = mouseX - followerX;
      const dy = mouseY - followerY;
      
      followerX += dx * 0.1;
      followerY += dy * 0.1;
      
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .service-item, .content-card, .project-item, [data-nav-link], .info_more-btn, .form-btn'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
      });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
  }
});



// Webhook form handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('.form-btn');
  const btnText = submitBtn.querySelector('span');
  
  // Configuration du webhook - remplacez par votre URL de webhook
  const WEBHOOK_URL = 'https://discord.com/api/webhooks/1057244680099745802/yei-MDgelLFB99ZhYLsXdxKfMS5LRbeRQyCA8FmvHGDGsmoWxPuy9OpCNTlUz9B243Ha'; // À remplacer par votre webhook Discord/Slack/autre
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    const originalText = btnText.textContent;
    btnText.textContent = 'Envoi en cours...';
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const data = {
      name: formData.get('fullname'),
      email: formData.get('email'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
      source: 'Portfolio Contact Form'
    };
    
    try {
      // Variables de suivi
      let formspreeSuccess = false;
      let discordSuccess = false;
      
      // Envoyer vers Formspree (original) - optionnel
      try {
        const formspreeResponse = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        formspreeSuccess = formspreeResponse.ok;
        if (formspreeSuccess) {
          console.log('✅ Message aussi envoyé via Formspree');
        }
      } catch (formspreeError) {
        console.warn('⚠️ Formspree non disponible:', formspreeError.message);
        formspreeSuccess = false;
      }
      
      // Envoyer le webhook Discord si l'URL est configurée
      if (WEBHOOK_URL && WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
        try {
          await sendWebhook(data);
          discordSuccess = true;
        } catch (discordError) {
          console.error('❌ Erreur webhook:', discordError);
          // Continue même si Discord échoue
        }
      }
      
      // Si au moins un service a réussi
      if (formspreeSuccess || discordSuccess) {
        // Succès
        btnText.textContent = 'Message envoyé !';
        form.reset();
        
        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
        
      } else {
        throw new Error('Aucun service de messagerie n\'a réussi');
      }
      
    } catch (error) {
      console.error('Erreur:', error);
      btnText.textContent = 'Erreur - Réessayer';
      
      showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
      
      setTimeout(() => {
        btnText.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
  
  // Fonction pour envoyer le webhook Discord
  async function sendWebhook(data) {
    // Obtenir des informations supplémentaires
    const userAgent = navigator.userAgent;
    const browserInfo = getBrowserInfo(userAgent);
    
    const webhookData = {
      username: "Portfolio Contact 📬",
      content: `🚨 **Nouveau contact depuis le portfolio !**`,
      embeds: [{
        title: "📧 Nouveau Message de Contact",
        description: `Message reçu depuis le portfolio de **Guileb Yassin**`,
        color: 0xFF9500, // Couleur orange du portfolio
        fields: [
          {
            name: "👤 Nom Complet",
            value: `**${data.name}**`,
            inline: true
          },
          {
            name: "📧 Email", 
            value: `[${data.email}](mailto:${data.email})`,
            inline: true
          },
          {
            name: "🕐 Reçu le",
            value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
            inline: true
          },
          {
            name: "💬 Message",
            value: data.message.length > 1000 ? 
              `${data.message.substring(0, 1000)}...` : 
              data.message,
            inline: false
          },
          {
            name: "🌐 Navigateur",
            value: `${browserInfo}`,
            inline: true
          },
          {
            name: "📱 Source",
            value: `Portfolio Web`,
            inline: true
          }
        ],
        timestamp: new Date().toISOString()
      }]
    };
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`webhook failed: ${response.status} - ${errorText}`);
    }
    
    return response;
  }
  
  // Fonction pour obtenir les infos du navigateur
  function getBrowserInfo(userAgent) {
    if (userAgent.includes('Chrome')) return '🟢 Chrome';
    if (userAgent.includes('Firefox')) return '🟠 Firefox'; 
    if (userAgent.includes('Safari')) return '🔵 Safari';
    if (userAgent.includes('Edge')) return '🟣 Edge';
    if (userAgent.includes('Opera')) return '🔴 Opera';
    return '❓ Autre navigateur';
  }
  
  // Fonction de test du webhook Discord (pour vérification)
  window.testDiscordWebhook = async function() {
    const testData = {
      name: "Test Portfolio",
      email: "test@exemple.com", 
      message: "Ceci est un message de test pour vérifier que le webhook fonctionne correctement.",
      timestamp: new Date().toISOString(),
      source: 'Portfolio Test'
    };
    
    try {
      await sendWebhook(testData);
      console.log('✅ Test webhook réussi !');
      showNotification('Test réussi ! 🎯', 'success');
    } catch (error) {
      console.error('❌ Test webhook échoué:', error);
      showNotification('❌ Test échoué. Vérifiez l\'URL du webhook.', 'error');
    }
  };
  
  // Système de notifications
  function showNotification(message, type) {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Ajouter les styles inline au cas où
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 4 secondes
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }
});
