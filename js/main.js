(function () {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* ---------- Adham-style wipe hero (homepage only) ---------- */
        var wipe = document.getElementById('wipe');
        if (wipe && document.getElementById('heroSec') && document.getElementById('sideSolver')
            && document.getElementById('sideBuilder') && document.getElementById('photoLayer')) {
        var hero = document.getElementById('heroSec');
        var sideL = document.getElementById('sideSolver');
        var sideR = document.getElementById('sideBuilder');
        var photo = document.getElementById('photoLayer');

        /* ---------- Adham-style wipe ---------- */
        /* Two registered portraits stacked: photo underneath, artwork
           on top. Mouse x over the hero gives p (0 = far left, 1 = far
           right, 0.5 = centre/rest). Top layer shows (1-p) of its width,
           so far left = 100% artwork, far right = 100% photo, centre =
           exact 50/50 split. Headings cross-fade the same way: the side
           the mouse is on stays full, the opposite fades to 0 at the
           far edge. The wipe eases toward its target (.5s CSS transition).
           Mouseleave resets to the 50/50 resting state. */
        var lastTap = 0;
        function setSplit(p) {
          p = Math.max(0, Math.min(1, p));
          wipe.style.clipPath = 'inset(0 ' + (p * 100) + '% 0 0)';
          sideL.style.opacity = p <= 0.5 ? 1 : 1 - (p - 0.5) / 0.5 * 0.65;
            sideR.style.opacity = p >= 0.5 ? 1 : 0.35 + (p / 0.5) * 0.65;
          /* The portraits never move: both layers stay perfectly
             registered, only the wipe edge (clip-path) moves, so the
             two backgrounds can never merge or show side by side. */
        }
        setSplit(0.5);
        /* The wipe is driven by the mouse anywhere across the full
           window width, not only inside the hero box — so moving to
           the far left / far right edges of the screen still works.
           p is measured against the hero's own box and clamped 0-1.
           When the mouse is above / below the hero (e.g. over the
           header), it returns to the 50/50 resting state. */
        window.addEventListener('mousemove', function (e) {
          if (Date.now() - lastTap < 1500) return;
          var r = hero.getBoundingClientRect();
          if (e.clientY < r.top || e.clientY > r.bottom) { setSplit(0.5); return; }
          setSplit((e.clientX - r.left) / r.width);
        });
        document.addEventListener('mouseleave', function () {
          setSplit(0.5);
        });
        /* Touch and click: tapping a side shows that side fully. */
        sideL.addEventListener('click', function () { lastTap = Date.now(); setSplit(0); });
        sideR.addEventListener('click', function () { lastTap = Date.now(); setSplit(1); });
        }

        /* ---------- Work cards: Adham-style collapsed cards ---------- */
        /* Adham's work cards show only a preview, title, subtitle and a
           chevron; the detail opens on click. Build that from the full
           cards: subtitle + chevron on top, problem/solution/benefit and
           the how-it-works panel wrapped in a hidden .detail. */
        var cardSubs = ['AI system', 'Roadmap', 'Reporting tool', 'Inventory system', 'Accounting', 'Feedback analytics', 'Online store', 'Data automation'];
        document.querySelectorAll('.card').forEach(function (card, i) {
          var meta = card.querySelector('.card-meta');
          var top = card.querySelector('.card-top');
          var sub = document.createElement('p');
          sub.className = 'card-sub';
          sub.textContent = cardSubs[i] || '';
          var chev = document.createElement('span');
          chev.className = 'card-chev';
          chev.setAttribute('aria-hidden', 'true');
          chev.textContent = '\u203a';
          top.appendChild(chev);
          var detail = document.createElement('div');
          detail.className = 'detail';
          Array.from(meta.children).forEach(function (child) {
            if (child !== top) detail.appendChild(child);
          });
          meta.appendChild(sub);
          meta.appendChild(detail);
          card.classList.add('collapsed');
          top.setAttribute('role', 'button');
          top.setAttribute('tabindex', '0');
          top.setAttribute('aria-expanded', 'false');
          var toggleCard = function () {
            var open = card.classList.toggle('open');
            card.classList.toggle('collapsed', !open);
            top.setAttribute('aria-expanded', open ? 'true' : 'false');
          };
          top.addEventListener('click', toggleCard);
          top.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCard(); }
          });
        });

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


        /* ---------- Work carousel: show 3, scroll right for the rest ---------- */
        var strip = document.querySelector('.cards');
        var prevBtn = document.getElementById('workPrev');
        var nextBtn = document.getElementById('workNext');
        if (strip && prevBtn && nextBtn) {
          var GAP = 30;
          function cardStep() {
            var card = strip.querySelector('.card');
            return card ? card.getBoundingClientRect().width + GAP : 400;
          }
          function updateArrows() {
            prevBtn.disabled = strip.scrollLeft <= 4;
            nextBtn.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
          }
          nextBtn.addEventListener('click', function () {
            strip.scrollBy({ left: cardStep(), behavior: reduceMotion ? 'auto' : 'smooth' });
          });
          prevBtn.addEventListener('click', function () {
            strip.scrollBy({ left: -cardStep(), behavior: reduceMotion ? 'auto' : 'smooth' });
          });
          strip.addEventListener('scroll', updateArrows, { passive: true });
          window.addEventListener('resize', updateArrows);
          /* Drag to scroll with the mouse; a real drag must not toggle a card open. */
          var downX = 0, startLeft = 0, dragging = false;
          strip.addEventListener('pointerdown', function (e) {
            if (e.pointerType !== 'mouse') return;
            downX = e.clientX; startLeft = strip.scrollLeft; dragging = false;
          });
          strip.addEventListener('pointermove', function (e) {
            if (downX === 0) return;
            var dx = e.clientX - downX;
            if (Math.abs(dx) > 6) { dragging = true; strip.scrollLeft = startLeft - dx; }
          });
          ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
            strip.addEventListener(ev, function () { downX = 0; });
          });
          strip.addEventListener('click', function (e) {
            if (dragging) { e.preventDefault(); e.stopPropagation(); dragging = false; }
          }, true);
          updateArrows();
        }

        /* ---------- Mobile menu ---------- */
        var menuBtn = document.getElementById('menuBtn');
        var siteHeader = document.querySelector('header.site');
        if (menuBtn && siteHeader) {
          menuBtn.addEventListener('click', function () {
            var open = siteHeader.classList.toggle('nav-open');
            menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
          });
          siteHeader.querySelectorAll('nav.main a').forEach(function (a) {
            a.addEventListener('click', function () {
              siteHeader.classList.remove('nav-open');
              menuBtn.setAttribute('aria-expanded', 'false');
            });
          });
        }
        var toTopBtn = document.getElementById('toTop');
        if (toTopBtn) toTopBtn.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
        var yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      })();