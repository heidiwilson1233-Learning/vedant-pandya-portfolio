/* Services page: compact cards + click-to-see animated vector demo.
   No video files, no heavy code — the demos are CSS/SVG animation only.
   Data drives both the card grid and the detail panel. */
(function () {
  var grid = document.getElementById('svcGrid');
  var detail = document.getElementById('svcDetail');
  if (!grid || !detail) return;

  var SERVICES = [
    { id: 'chatbot', cat: 'AI chatbots & support', title: 'AI customer support chatbot', line: 'Answers your customers day and night from your own business info.', search: 'AI chatbot developer Ahmedabad', demo: 'chat', project: { label: 'See the project', href: 'portfolio.html' }, steps: ['A customer asks a question on chat, email or phone.', 'The AI finds the correct answer from your business info.', 'It answers — or passes a difficult case to a person, with full context.'] },
    { id: 'whatsapp', cat: 'AI chatbots & support', title: 'WhatsApp AI receptionist', line: 'Replies on WhatsApp, books appointments and takes orders.', search: 'WhatsApp AI chatbot for business', demo: 'flow', project: null, steps: ['A customer messages you on WhatsApp.', 'The AI replies, books the appointment or takes the order.', 'You see everything in one simple list.'] },
    { id: 'rag', cat: 'AI chatbots & support', title: 'RAG chatbot on company documents', line: 'Staff or customers ask in plain words; AI answers from your own files.', search: 'AI chatbot for company documents', demo: 'flow', project: null, steps: ['Your files go in once — PDFs, docs, sheets.', 'Anyone asks a question in plain words.', 'The answer comes back with the source shown.'] },
    { id: 'reports', cat: 'Automation', title: 'Reporting automation', line: 'Daily and weekly reports made on their own.', search: 'automate business reports with AI', demo: 'flow', project: { label: 'See the project', href: 'portfolio.html' }, steps: ['Your data connects once.', 'The report builds itself on schedule.', 'You read it — no more Excel wrestling.'] },
    { id: 'inventory', cat: 'Automation', title: 'Inventory automation', line: 'Stock tracking, low-stock alerts and reorder lists.', search: 'inventory automation software India', demo: 'flow', project: { label: 'See the project', href: 'portfolio.html' }, steps: ['Stock levels are tracked live.', 'You get an alert before you run out.', 'A reorder list is ready when you need it.'] },
    { id: 'accounting', cat: 'Automation', title: 'Accounting automation', line: 'Invoices, expenses and payment reminders without manual entry.', search: 'automate accounting small business', demo: 'flow', project: { label: 'See the project', href: 'portfolio.html' }, steps: ['Bills and payments come in.', 'Invoices and reminders go out on their own.', 'Your books stay clean.'] },
    { id: 'feedback', cat: 'Automation', title: 'Feedback analytics', line: 'One simple report of what your customers really say.', search: 'customer feedback analysis AI', demo: 'flow', project: { label: 'See the project', href: 'portfolio.html' }, steps: ['Reviews and messages are collected.', 'The AI finds what customers keep repeating.', 'You get one simple report.'] },
    { id: 'leads', cat: 'Automation', title: 'Lead qualification', line: 'AI finds the hot leads so you call only them.', search: 'AI lead qualification service', demo: 'flow', project: null, steps: ['New leads come in.', 'The AI scores them by fit and intent.', 'You call the hot ones first.'] },
    { id: 'n8n', cat: 'Automation', title: 'n8n workflow automation', line: 'Connects your apps so repeated work happens by itself.', search: 'n8n automation expert', demo: 'flow', project: null, steps: ['Your apps connect once.', 'Repeated work moves by itself.', 'You check one dashboard.'] },
    { id: 'arch', cat: 'AI architecture', title: 'AI system design & architecture', line: 'Plan the full AI system before you build it.', search: 'AI technical architect', demo: 'flow', project: { label: 'See the books', href: 'about.html' }, steps: ['Your problem is mapped in plain words.', 'The full AI system is designed.', 'It gets built in the right order.'] },
    { id: 'inference', cat: 'AI architecture', title: 'AI inference & cost engineering', line: 'Make AI faster and cheaper to run.', search: 'AI inference optimization', demo: 'flow', project: { label: 'See the books', href: 'about.html' }, steps: ['Your AI is measured.', 'The slow and expensive parts are found.', 'It runs faster and costs less.'] },
    { id: 'mcp', cat: 'AI architecture', title: 'MCP & AI app connections', line: 'Connect AI to your existing apps and tools.', search: 'MCP AI integration', demo: 'flow', project: { label: 'See the books', href: 'about.html' }, steps: ['Your tools are listed.', 'AI is connected safely.', 'AI works inside your apps.'] },
    { id: 'audit', cat: 'AI architecture', title: 'AI failure audit', line: 'Find out why an AI project is not working.', search: 'AI project audit consultant', demo: 'flow', project: { label: 'See the books', href: 'about.html' }, steps: ['Your AI project is reviewed.', 'The real failure is found.', 'You get a fix plan in plain words.'] },
    { id: 'websites', cat: 'Websites & stores', title: 'Business websites', line: 'Fast, simple websites for small businesses.', search: 'small business website developer Ahmedabad', demo: 'flow', project: null, steps: ['Your business is understood.', 'A fast, simple website is built.', 'Customers find you and contact you.'] },
    { id: 'stores', cat: 'Websites & stores', title: 'Online stores', line: 'Set up and automate an online shop.', search: 'ecommerce website setup India', demo: 'flow', project: { label: 'See the project', href: 'portfolio.html' }, steps: ['Your products are listed.', 'Orders and payments work.', 'Stock and delivery are tracked.'] },
    { id: 'sheets', cat: 'Websites & stores', title: 'Excel & Sheets tools', line: 'Custom automation inside your spreadsheets.', search: 'Excel automation expert', demo: 'flow', project: null, steps: ['Your sheet is understood.', 'Automation is built inside it.', 'One click does the boring work.'] },
    { id: 'seo', cat: 'Search — SEO & AEO', title: 'SEO', line: 'Your site found and ranked on Google.', search: 'SEO services Ahmedabad', demo: 'flow', project: { label: 'See it on this site', href: 'index.html' }, steps: ['Your site is checked.', 'Fixes and keywords are applied.', 'Google finds it and ranks it.'] },
    { id: 'aeo', cat: 'Search — SEO & AEO', title: 'AEO — Answer Engine Optimisation', line: 'AI Mode, ChatGPT and Perplexity quote you.', search: 'AEO answer engine optimisation', demo: 'flow', project: { label: 'See it on this site', href: 'index.html' }, steps: ['Real questions people ask are listed.', 'Short, direct answers are written.', 'AI answers quote your site.'] },
    { id: 'ytmusic', cat: 'Creator automation', title: 'YouTube music automation', line: 'Songs rendered, checked and released — end to end, hands-free.', search: 'YouTube music automation', demo: 'flow', project: null, steps: ['The song is rendered.', 'A clarity check passes it — or it re-renders.', 'It is released on RouteNote, hands-free.'] },
    { id: 'adobe', cat: 'Creator automation', title: 'Adobe Stock scheduled workflow', line: 'Batches made, checked and uploaded on a schedule — end to end.', search: 'Adobe Stock automation workflow', demo: 'flow', project: null, steps: ['100 images are made in one batch.', 'Metadata and quality checks are done.', 'Uploads go out on schedule, every 4 days.'] }
  ];

  var CATS = ['AI chatbots & support', 'Automation', 'AI architecture', 'Websites & stores', 'Search — SEO & AEO', 'Creator automation'];

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---- compact card grid, grouped ---- */
  var html = '';
  CATS.forEach(function (cat) {
    var list = SERVICES.filter(function (s) { return s.cat === cat; });
    if (!list.length) return;
    html += '<h2 class="svc-group">' + esc(cat) + '</h2><div class="svc-grid">';
    list.forEach(function (s) {
      html += '<article class="svc-card" data-id="' + s.id + '">' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p>' + esc(s.line) + '</p>' +
        '<span class="svc-search">' + esc(s.search) + '</span>' +
        '<button class="svc-btn" type="button" data-id="' + s.id + '">See demo <span aria-hidden="true">▾</span></button>' +
        '</article>';
    });
    html += '</div>';
  });
  grid.innerHTML = html;

  /* ---- demos ---- */
  function chatDemo() {
    return '<div class="chat-demo" aria-label="Demo: AI customer support chat">' +
      '<div class="chat-head"><span class="chat-dot"></span> Your shop — AI assistant <span class="chat-live">online</span></div>' +
      '<div class="chat-body">' +
      '<div class="msg customer">Do you deliver to Satellite?</div>' +
      '<div class="msg typing" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '<div class="msg ai">Yes — delivery to Satellite is free above ₹499. Your order arrives tomorrow.</div>' +
      '<div class="msg resolved">✓ Answered in 4 seconds — no human needed</div>' +
      '</div></div>' +
      '<p class="demo-cap">This is a demo — the real assistant answers from your own business info, day and night.</p>';
  }

  function flowDemo(s) {
    var out = '<div class="flow-demo">';
    s.steps.forEach(function (step, i) {
      out += '<div class="flow-step" style="animation-delay:' + (0.4 + i * 2) + 's"><span class="flow-num">' + (i + 1) + '</span><p>' + esc(step) + '</p></div>';
      if (i < s.steps.length - 1) out += '<div class="flow-arrow" style="animation-delay:' + (1.6 + i * 2) + 's" aria-hidden="true">↓</div>';
    });
    return out + '</div>';
  }

  /* ---- detail panel ---- */
  var currentId = null;
  function openDetail(id) {
    var s = null;
    SERVICES.forEach(function (x) { if (x.id === id) s = x; });
    if (!s) return;
    currentId = id;
    var demo = s.demo === 'chat' ? chatDemo() : flowDemo(s);
    var project = s.project
      ? '<p class="svc-project"><a href="' + s.project.href + '">' + esc(s.project.label) + ' →</a></p>'
      : '';
    detail.innerHTML =
      '<button class="svc-close" type="button" aria-label="Close demo">×</button>' +
      '<p class="svc-cat">' + esc(s.cat) + '</p>' +
      '<h2>' + esc(s.title) + '</h2>' +
      '<p class="svc-line">' + esc(s.line) + '</p>' +
      demo + project +
      '<p class="svc-cta"><a href="contact.html">Ask about this service →</a></p>';
    detail.hidden = false;
    grid.querySelectorAll('.svc-card').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-id') === id);
    });
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.svc-card');
    if (card) openDetail(card.getAttribute('data-id'));
  });
  detail.addEventListener('click', function (e) {
    if (e.target.closest('.svc-close')) {
      detail.hidden = true;
      detail.innerHTML = '';
      grid.querySelectorAll('.svc-card').forEach(function (c) { c.classList.remove('active'); });
      currentId = null;
    }
  });
})();
