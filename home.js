(() => {
  const WHEEL_PAGE_THRESHOLD = 60;
  const SWIPE_PAGE_THRESHOLD = 55;

  function swipeDirection(start, end, scrollTop) {
    const dy = start.y - end.y;
    const dx = start.x - end.x;
    return start.moved && Math.abs(dy) > SWIPE_PAGE_THRESHOLD && Math.abs(dy) > Math.abs(dx) * 1.2 && Math.abs(scrollTop - start.scrollTop) < 2
      ? Math.sign(dy)
      : 0;
  }

  class WheelGesture {
    constructor() { this.last = -Infinity; this.total = 0; this.used = false; this.direction = 0; }
    sample(delta, now, canScroll) {
      if (now - this.last > 180) { this.total = 0; this.used = false; this.direction = 0; }
      this.last = now;
      if (canScroll) { this.used = true; return 0; }
      if (this.used) return 0;
      const direction = Math.sign(delta);
      if (direction !== this.direction) this.total = 0;
      this.direction = direction;
      this.total += delta;
      if (Math.abs(this.total) < WHEEL_PAGE_THRESHOLD) return 0;
      this.used = true;
      return direction;
    }
  }

  function bindPaging({ root, enabled, panel, step, onEscape = () => {} }) {
    const controller = new AbortController();
    const listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, { ...options, signal: controller.signal });
    const wheel = new WheelGesture();
    let touch;
    const canScroll = direction => direction > 0
      ? panel().scrollTop + panel().clientHeight < panel().scrollHeight - 2
      : panel().scrollTop > 2;
    const blocked = event => !enabled() || document.querySelector('dialog[open]') || event.ctrlKey || event.metaKey ||
      window.getSelection()?.toString() || event.target.closest('input,textarea,select,audio,[contenteditable="true"]') ||
      Boolean(event.target.closest('video') && !(event.type !== 'keydown' && event.target.closest('video[data-loop-video]:not([controls])')));

    listen(window, 'wheel', event => {
      if (blocked(event) || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? panel().clientHeight : 1);
      const scrollable = canScroll(Math.sign(delta));
      const action = wheel.sample(delta, performance.now(), scrollable);
      if (scrollable) return;
      event.preventDefault();
      if (action) step(action);
    }, { passive: false });

    listen(root, 'touchstart', event => {
      if (blocked(event) || event.touches.length !== 1) { touch = null; return; }
      const point = event.touches[0];
      touch = {
        x: point.clientX, y: point.clientY, scrollTop: panel().scrollTop,
        atTop: !canScroll(-1), atBottom: !canScroll(1), moved: false
      };
    }, { passive: true });
    listen(root, 'touchmove', event => {
      if (!touch || event.touches.length !== 1) { touch = null; return; }
      const dx = touch.x - event.touches[0].clientX;
      const dy = touch.y - event.touches[0].clientY;
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx) && (dy > 0 ? touch.atBottom : touch.atTop)) {
        event.preventDefault();
        touch.moved = true;
      }
    }, { passive: false });
    listen(root, 'touchend', event => {
      if (!touch) return;
      const point = event.changedTouches[0];
      const direction = swipeDirection(touch, { x: point.clientX, y: point.clientY }, panel().scrollTop);
      if (!blocked(event) && direction) step(direction);
      touch = null;
    });
    listen(root, 'touchcancel', () => { touch = null; });
    listen(window, 'keydown', event => {
      if (!enabled() || document.querySelector('dialog[open]')) return;
      if (event.key === 'Escape') { onEscape(); return; }
      if (blocked(event) || event.altKey || event.target.closest('button,a,summary') || event.repeat) return;
      const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? (event.shiftKey ? -1 : 1)
        : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      if (canScroll(direction)) {
        panel().scrollBy({
          top: direction * panel().clientHeight * 0.75,
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
      } else step(direction, true);
    });
    return () => controller.abort();
  }

  const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  function ownerFor(sections, id) {
    return sections.find(section => section.works.includes(id))?.id || 'early-work';
  }
  function canonicalRoute(sections, raw) {
    if (raw === 'journey') return 'home';
    const alias = sections.find(section => section.legacy?.includes(raw));
    if (alias) return alias.id;
    if (raw.startsWith('selected/')) return ownerFor(sections, raw.split('/')[1]);
    return raw;
  }
  function nextWork(sections, id) {
    const works = sections.flatMap(section => section.works);
    const index = works.indexOf(id);
    return index < 0 ? null : works[index + 1] || null;
  }
  function emphasise(text, words = []) {
    if (!words.length) return escape(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return String(text).split(new RegExp('(' + words.map(word => word.replace(/[.*+?^{}()|[\]\\$]/g, '\\$&')).join('|') + ')', 'g'))
      .map(part => words.includes(part) ? '<strong>' + escape(part) + '</strong>' : escape(part)).join('');
  }

  function create({root, projects, practices, profile, sections, icon, onSectionChange}) {
    const presentation = {
      bestfriend: {
        image:'bestfriend/bf-cover.png', width:704, height:562,
        alt:'Eric and his friend in front of a purple castle in BestFriend',
        summary:'A childhood friendship becomes a playable world through original art, changing ages, and connected routes.',
        contribution:'I drew all of the game’s art and designed the narrative, connected routes, and four abilities that let Eric explore them.'
      },
      graycanvas: {
        image:'gray-canvas/canvas-cover.jpg', width:1366, height:768,
        alt:'A woman invites the player to draw on a large blank canvas in The Gray Canvas',
        summary:'Interviews and two rounds of testing reshaped a story about everyday life with PKD.',
        contribution:'I conducted participant interviews, designed the narrative and interactions, and developed the game in Godot.',
        prompt:'Drag'
      },
      mars: {
        image:'mars-gameplay.png', width:685, height:395,
        alt:'A hand flipping food in a pan in Flip the Mars',
        summary:'A physical pan toss connects cooking interactions with food states, recipes, and orders.',
        contribution:'I built VR cooking interactions and used ERDs to connect food, recipes, and tasks, separating stored configuration from runtime cooking state.'
      },
      cardiac: {
        image:'cardiac-level.png', width:748, height:299,
        alt:'The connected hospital spaces in Cardiac Lock',
        summary:'A surgeon trapped in their memories searches for two keys before an explosion.',
        contribution:'I coordinated schedules and task handoffs across a two-month collaboration while designing connected levels. Visible goals, loops, and shortcuts guide the player; the Respawn Hall joins the team’s separate spaces.'
      },
      internship: {
        image:practices.internship.publicArt, width:460, height:215,
        alt:'Official Swords of Legends promotional artwork',
        contribution:'I designed an efficient hit-reaction tool for QA, fixed the shop equipment preview, built artifact and ability UI prototypes, designed the Bagua Mirror UI, and implemented a toxic-blood effect.'
      }
    };
    const routeFor = id => (practices[id] ? 'practice/' : 'project/') + id;
    const titleFor = id => practices[id]?.team || projects[id].title;
    const workCard = id => {
      const p = practices[id] || projects[id], content = presentation[id];
      const meta = practices[id] ? p.company + ' · ' + p.position : id === 'cardiac' ? '2-month collaboration · Unreal Engine 5' : 'Individual project · ' + p.engine;
      return '<article class="portfolio-work work-' + id + '" data-work="' + id + '">' +
        window.PortfolioMedia.cardMedia(p, { image:content.image, alt:content.alt, href:'#' + routeFor(id), className:'work-art', width:content.width, height:content.height, prompt:content.prompt }) +
        '<a class="work-copy whole-card-link" id="work-' + id + '" href="#' + routeFor(id) + '" aria-label="Explore ' + escape(titleFor(id)) + '"><p class="work-meta">' + escape(meta) + '</p><h3>' + escape(titleFor(id)) + '</h3>' +
        (content.summary ? '<p>' + escape(content.summary) + '</p>' : '') +
        '<div class="work-contribution"><h4>My work</h4><p>' + escape(content.contribution) + '</p></div>' +
        '<span class="work-link">Explore ' + (practices[id] ? 'the internship' : 'the project') + icon('arrow-up-right') + '</span>' +
        (practices[id] ? '<p class="work-source">Official Steam artwork · Work in progress</p>' : '') +
        '</a></article>';
    };
    const timeline = ids => '<ol class="jam-timeline" aria-label="Game jams, newest first">' + ids.map((id,index) => {
      const p = projects[id];
      const covers = {anchor:'jams/anchor-film.jpg',mask:'jams/mask-film.jpg',collector:'jams/collector-cover.jpg',alive:'jams/alive-screen-clock.png'};
      const date = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(p.start.slice(5,7))-1] + ' ' + p.start.slice(0,4);
      return '<li class="jam-node' + (p.teamLead ? ' is-team-lead' : '') + '" style="--reveal-delay:' + index * 100 + 'ms" data-work="' + id + '">' +
        '<time datetime="' + p.start + '">' + date + '</time><div class="jam-card">' +
        window.PortfolioMedia.cardMedia(p, { image:covers[id], alt:p.title + ' gameplay', href:'#project/' + id, linkId:'work-' + id, className:'timeline-cover', width:640, height:400 }) +
        '<a class="jam-card-copy whole-card-link" href="#project/' + id + '" aria-label="Explore ' + escape(p.title) + '">' +
        (p.teamLead ? '<span class="team-lead">Team lead</span>' : '') +
        '<h3>' + escape(p.title) + '</h3><p class="timeline-role">' + escape(p.role) + '</p>' +
        '<span class="work-link">Explore the project ' + icon('arrow-up-right') + '</span></a></div></li>';
    }).join('') + '</ol>';
    const sectionMarkup = (section,index) => {
      const jamIds = section.works.filter(id => projects[id]?.kind === 'jam');
      return '<section id="' + section.id + '" class="portfolio-section section-' + section.id + '" data-portfolio-section="' + section.id + '" aria-labelledby="title-' + section.id + '">' +
        '<div class="portfolio-shell"><header class="portfolio-section-heading"><span class="section-number">' + String(index+1).padStart(2,'0') + '</span><h2 id="title-' + section.id + '" tabindex="-1">' + section.label + '</h2></header>' +
        (section.introduction ? '<p class="section-introduction">' + emphasise(section.introduction) + '</p>' : '') +
        (section.method ? '<div class="method-background" aria-label="Method background">' + section.method.paragraphs.map(p => '<p>' + emphasise(p,section.method.emphasis) + '</p>').join('') + '</div>' : '') +
        (jamIds.length ? timeline(jamIds) : '') + section.works.filter(id => !jamIds.includes(id)).map(workCard).join('') +
        '</div></section>';
    };
    const avatar = profile.avatar;
    const background = profile.academicBackground;
    const backgroundMarkup = background ? '<details class="opening-background"><summary>Coursework &amp; IELTS</summary>' +
      '<div class="opening-background-content"><p class="opening-ielts"><strong>IELTS: ' + escape(background.ielts.score) + '</strong><time datetime="' + escape(background.ielts.date) + '">' + escape(background.ielts.label) + '</time></p>' +
      '<h2>Relevant coursework</h2><ul>' + background.coursework.map(course => '<li>' + escape(course) + '</li>').join('') + '</ul></div></details>' : '';
    root.innerHTML = '<section id="home" class="portfolio-opening portfolio-shell" data-portfolio-section="home" aria-labelledby="opening-title">' +
      '<div class="opening-copy"><p class="opening-eyebrow">Game design portfolio</p><h1 id="opening-title" tabindex="-1">Yitong Mao<span>.</span></h1>' +
      '<p class="opening-introduction">I explore how games<br>can make us <em>feel.</em></p>' +
      '<p class="opening-description">From childhood memories to the motion of a pan, I develop games through personal stories, original art, and interactive systems.</p></div>' +
      '<figure class="opening-portrait"><img class="opening-portrait-image" src="assets/' + escape(avatar.src) + '" alt="' + escape(avatar.alt) + '" width="' + avatar.desktop[0] + '" height="' + avatar.desktop[1] + '"><span class="opening-bird" role="img" aria-label="A toucan perched on a branch"><img src="assets/profile-placeholder.jpg" alt=""></span></figure>' +
      backgroundMarkup +
      '<a class="explore-cue" href="#' + sections[0].id + '"><span class="desktop-cue">Scroll to explore</span><span class="touch-cue">Swipe up to explore</span>' + icon('arrow-down') + '</a></section>' +
      sections.map(sectionMarkup).join('') +
      '<section id="early-work" class="early-work portfolio-shell" data-portfolio-section="early-work" aria-labelledby="title-early-work">' +
      '<div><p class="opening-eyebrow">Early work</p><h2 id="title-early-work" tabindex="-1">Deliveryman</h2></div><a id="work-deliveryman" class="work-link" href="#project/deliveryman">Explore the project ' + icon('arrow-up-right') + '</a><a class="work-link" href="#home">Back to beginning ' + icon('arrow-up') + '</a></section>';
    document.querySelector('#main-navigation').innerHTML = sections.map(section => '<a href="#' + section.id + '" data-nav="' + section.id + '">' + section.label + '</a>').join('');
    const cardMedia = window.PortfolioMedia.bind(root, { enabled:false });
    const panels = [...root.querySelectorAll('[data-portfolio-section]')];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let enabled = false, active = 'home', frame = 0, restoring = false, revision = 0, lastScroll = -1;
    const headerHeight = () => document.querySelector('.site-header').getBoundingClientRect().height;
    const mark = (id, notify = true) => {
      document.querySelectorAll('[data-nav]').forEach(link => {
        if (link.dataset.nav === id) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
      if (active !== id) { active = id; if (notify) onSectionChange?.(id); }
    };
    const track = () => {
      frame = 0;
      if (!enabled || restoring || root.hidden || window.scrollY === lastScroll) return;
      lastScroll = window.scrollY;
      let id = 'home';
      for (const panel of panels) {
        if (panel.getBoundingClientRect().top <= headerHeight() + 100) id = panel.dataset.portfolioSection;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3 && id !== 'early-work') id = sections.at(-1).id;
      mark(id);
    };
    window.addEventListener('scroll', () => { if (enabled && !frame) frame = requestAnimationFrame(track); },{passive:true});
    window.addEventListener('resize', () => { if (enabled && !frame) frame = requestAnimationFrame(track); });
    const nodes = [...root.querySelectorAll('.jam-node')];
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible'); reveal.unobserve(entry.target);
      }
    },{threshold:0.08});
    const revealAll = () => {
      if (motion.matches) nodes.forEach(node => { node.classList.add('is-visible'); node.classList.remove('will-reveal'); });
    };
    if (!motion.matches) nodes.forEach(node => { node.classList.add('will-reveal'); reveal.observe(node); });
    motion.addEventListener('change',revealAll);
    revealAll();
    return {
      isRoute: route => ['home','early-work',...sections.map(section => section.id)].includes(route),
      canonical: route => canonicalRoute(sections,route),
      ownerFor: id => ownerFor(sections,id),
      nextWork: id => nextWork(sections,id),
      snapshot: () => ({section:active,scroll:window.scrollY}),
      show(route,state,focus=false) {
        const token = ++revision;
        enabled = true; restoring = true;
        cardMedia.setEnabled(true);
        document.body.classList.add('home-mode');
        mark(route,false);
        const panel = panels.find(panel => panel.dataset.portfolioSection === route) || panels[0];
        const position = () => {
          if (token !== revision || !enabled) return;
          const top = Number.isFinite(state?.scroll) ? state.scroll : route === 'home' ? 0 : window.scrollY + panel.getBoundingClientRect().top - headerHeight();
          window.scrollTo({top:Math.max(0,top),behavior:'instant'});
          lastScroll = window.scrollY;
          if (focus) panel.querySelector('h1,h2')?.focus({preventScroll:true});
        };
        position();
        Promise.resolve(document.fonts?.ready).then(() => {
          if (token !== revision || !enabled) return;
          position();
          requestAnimationFrame(() => { if (token === revision) restoring = false; });
        });
      },
      hide() { enabled=false; restoring=false; revision++; cardMedia.setEnabled(false); document.body.classList.remove('home-mode'); },
      focus() { (panels.find(panel => panel.dataset.portfolioSection === active) || panels[0]).querySelector('h1,h2')?.focus({preventScroll:true}); }
    };
  }
  // Project chapters still use these shared gesture helpers.
  window.HomeExperience = {create,ownerFor,canonicalRoute,nextWork,bindPaging,WheelGesture,swipeDirection};
})();
