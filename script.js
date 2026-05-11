(function () {
  'use strict';

  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav__link');

  function setActiveLink(targetHref) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === targetHref);
    });
  }

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Highlight active nav link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentHash = window.location.hash;

  if (currentHash) {
    setActiveLink(currentHash);
  } else {
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  const sections = document.querySelectorAll('section[id]');

  if (sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        setActiveLink(href);
      }
    });
  });

})();
