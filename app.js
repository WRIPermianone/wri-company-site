// Warrior Race Investments — company site interactions.
// Restrained: scroll reveal, header state, current year. Motion respects prefers-reduced-motion.

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();

(function () {
  var header = document.getElementById('siteHeader');
  if (!header) return;
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
