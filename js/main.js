(function () {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* ---------- Full portrait ---------- */
        /* The portrait is one complete image and is never split,
           stretched or cropped by interaction. Moving the cursor
           across the hero only highlights the side it is on (a soft
           overlay on that half of the portrait, plus the other
           headline fading) — the full face stays visible at all
           times, wherever the cursor is. */
        var portrait = document.getElementById('portrait');
        var hero = document.getElementById('heroSec');

        hero.addEventListener('mousemove', function (e) {
          var r = portrait.getBoundingClientRect();
          hero.setAttribute('data-active', e.clientX < r.left + r.width / 2 ? 'left' : 'right');
        });
        hero.addEventListener('mouseleave', function () {
          hero.removeAttribute('data-active');
        });
        /* Touch and click: tapping a side highlights that side. */
        document.getElementById('sideSolver').addEventListener('click', function () { hero.setAttribute('data-active', 'left'); });
        document.getElementById('sideBuilder').addEventListener('click', function () { hero.setAttribute('data-active', 'right'); });

        /* ---------- "See how it works" panels ---------- */
        /* Technical details exist on the page only inside these
           panels, which stay hidden until the visitor opens one. */
        var toggles = document.querySelectorAll('.how-btn');
        toggles.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var panel = btn.parentElement.querySelector('.how-panel');
            var open = panel.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.firstChild.textContent = open ? 'Hide how it works ' : 'See how it works ';
          });
        });

        /* ---------- Reveal on scroll ---------- */
        var revealEls = document.querySelectorAll('.reveal');
        if (reduceMotion || !('IntersectionObserver' in window)) {
          for (var j = 0; j < revealEls.length; j++) revealEls[j].classList.add('in');
        } else {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
            });
          }, { threshold: 0.12 });
          revealEls.forEach(function (el) { io.observe(el); });
        }

        document.getElementById('toTop').addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
        document.getElementById('year').textContent = new Date().getFullYear();
      })();