(function () {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* ---------- Adham-style wipe hero ---------- */
        var wipe = document.getElementById('wipe');
        var hero = document.getElementById('heroSec');
        var sideL = document.getElementById('sideSolver');
        var sideR = document.getElementById('sideBuilder');

        /* ---------- Adham-style wipe ---------- */
        /* Two registered portraits stacked: photo underneath, artwork
           on top. Mouse x over the hero gives p (0 = far left, 1 = far
           right, 0.5 = centre/rest). Top layer shows (1-p) of its width,
           so far left = 100% artwork, far right = 100% photo, centre =
           exact 50/50 split. Headings cross-fade the same way: the side
           the mouse is on stays full, the opposite fades to 0 at the
           far edge. Direct mousemove update, no tween. Mouseleave
           resets to the 50/50 resting state. */
        function setSplit(p) {
          p = Math.max(0, Math.min(1, p));
          wipe.style.clipPath = 'inset(0 ' + (p * 100) + '% 0 0)';
          sideL.style.opacity = p <= 0.5 ? 1 : 1 - (p - 0.5) / 0.5;
          sideR.style.opacity = p >= 0.5 ? 1 : p / 0.5;
        }
        setSplit(0.5);
        hero.addEventListener('mousemove', function (e) {
          var r = hero.getBoundingClientRect();
          setSplit((e.clientX - r.left) / r.width);
        });
        hero.addEventListener('mouseleave', function () {
          setSplit(0.5);
        });
        /* Touch and click: tapping a side shows that side fully. */
        sideL.addEventListener('click', function () { setSplit(0); });
        sideR.addEventListener('click', function () { setSplit(1); });

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