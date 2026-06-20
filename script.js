/* ==========================================================================
   Pugal — Portfolio Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  const loaderText = document.getElementById('loaderText');
  const loaderPhrase = 'loading portfolio...';
  let li = 0;
  const loaderInterval = setInterval(() => {
    loaderText.textContent += loaderPhrase[li];
    li++;
    if (li >= loaderPhrase.length) clearInterval(loaderInterval);
  }, 35);

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 500);
  });
  // Fallback in case load already fired
  setTimeout(() => loader.classList.add('loaded'), 2200);

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('pugal-theme');
  if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeIcon.className = 'fa-solid fa-sun';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      themeIcon.className = 'fa-solid fa-moon';
      localStorage.setItem('pugal-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      themeIcon.className = 'fa-solid fa-sun';
      localStorage.setItem('pugal-theme', 'light');
    }
  });

  /* ---------- Sticky navbar ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    backToTop.classList.toggle('visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(sec => navObserver.observe(sec));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Typing animation (hero role) ---------- */
  const typedRoleEl = document.getElementById('typedRole');
  const roles = ['Python Developer', 'AI Enthusiast', 'B.Tech IT Student'];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      typedRoleEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typedRoleEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let count = 0;
        const step = Math.max(1, target / 30);
        const tick = () => {
          count += step;
          if (count >= target) {
            el.textContent = target;
          } else {
            el.textContent = Math.floor(count);
            requestAnimationFrame(tick);
          }
        };
        tick();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Cursor glow ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Contact form (demo submission) ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitText = document.getElementById('submitText');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitText.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.classList.remove('success');

    setTimeout(() => {
      submitText.textContent = 'Send Message';
      formStatus.textContent = 'Thanks for reaching out — I\'ll get back to you soon.';
      formStatus.classList.add('success');
      form.reset();
    }, 900);
  });

});
