'use strict';

// Utilitaire: active/desactive une classe
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// Sidebar
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Ouverture/fermeture sur mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// Testimonials + modal
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// Fermeture de la modal
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);


// Filtres des projets
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

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

// Affiche tous les projets au chargement
window.addEventListener("DOMContentLoaded", function () {
  filterFunc("all");
});

// Version desktop: boutons de filtre
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


// Validation formulaire
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


// Navigation entre sections
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

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


// Animation d'apparition des cartes au scroll
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.service-item, .content-card, .project-item');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
});


// Curseur personnalise (desktop)
document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (window.matchMedia("(hover: hover)").matches) {

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

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


// Soumission du formulaire
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-btn');
  const btnText = submitBtn.querySelector('span');
  const recaptchaElement = form.querySelector('.g-recaptcha');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (recaptchaElement) {
      const siteKey = recaptchaElement.getAttribute('data-sitekey');
      if (!siteKey || siteKey === 'YOUR_RECAPTCHA_SITE_KEY') {
        showNotification('Ajoutez votre clé site reCAPTCHA dans le formulaire.', 'error');
        return;
      }

      const token = typeof grecaptcha !== 'undefined' ? grecaptcha.getResponse() : '';
      if (!token) {
        showNotification('Veuillez valider le reCAPTCHA avant d\'envoyer.', 'error');
        return;
      }
    }

    submitBtn.disabled = true;
    const originalText = btnText.textContent;
    btnText.textContent = 'Envoi en cours...';

    const formData = new FormData(form);
    const data = {
      name: formData.get('fullname'),
      email: formData.get('email'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
      source: 'Portfolio Contact Form'
    };

    try {
      const formspreeResponse = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (formspreeResponse.ok) {
        btnText.textContent = 'Message envoyé !';
        form.reset();
        if (recaptchaElement && typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
        }

        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);

      } else {
        throw new Error('Envoi Formspree échoué');
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

  // Notification visuelle locale
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

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

    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }
});