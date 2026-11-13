(() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  function chaptersFor(project) {
    // Keep film as an alias for the opening media, including image-only projects.
    return [{ id: 'overview', label: 'Overview' }, { id: 'film', label: 'Game & media' }, ...project.sections];
  }

  function create({ root, project, routePrefix = 'project', nextProject, backLabel: requestedBackLabel, from = 'archive/jam', media, icon, external, onChange }) {
    const chapters = chaptersFor(project);
    const route = id => `${routePrefix}/${project.id}/${id}`;
    const backLabel = requestedBackLabel || 'Back to portfolio';
    const toc = [{ id: 'overview', label: 'Overview' }, ...project.sections].map(c => `<a href="#${route(c.id)}" data-jam-link="${c.id}">${escape(c.label)}</a>`).join('');
    const figure = (item, eager = false, className = '') => item.image ? `<figure class="jam-figure ${className}">${media(item.image, item.imageAlt || item.caption || project.title, eager)}${item.caption ? `<figcaption>${escape(item.caption)}</figcaption>` : ''}</figure>` : '';
    const mediaGroups = groups => window.PortfolioMedia.groups(groups, { media, icon, eager: true });
    const poster = project.videoUrl ? project.film?.poster || project.hero : project.hero;
    const posterAlt = project.videoUrl ? project.film?.alt || project.heroAlt : project.heroAlt;
    const openingGroups = mediaGroups(project.openingMediaGroups);
    const openingMedia = project.videoUrl ? `<figure class="jam-figure jam-hero"><a class="film-preview" href="${escape(project.videoUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${escape(project.title)} video (opens in a new tab)"><img src="assets/${escape(poster)}" alt="${escape(posterAlt)}" loading="eager"><span class="film-play" aria-hidden="true">${icon('play')}</span></a>${project.caption ? `<figcaption>${escape(project.caption)}</figcaption>` : ''}</figure>${openingGroups}` : openingGroups || figure({ image: poster, imageAlt: posterAlt, caption: project.caption }, true, 'jam-hero');
    const facts = [
      ['When', project.date || project.start?.replace('-', '.')],
      ['Event', project.event],
      ['Theme', project.theme],
      ['Time', project.duration],
      ['Team', typeof project.teamSize === 'number' ? `${project.teamSize} people` : project.teamSize],
      ['Tools', project.engine],
      ['My contribution', project.role]
    ].filter(([, value]) => value !== undefined && value !== null && value !== '');
    const teamComposition = project.teamComposition?.length ? `<div class="jam-team-composition"><dt>Team composition · Primary roles</dt><dd><ul>${project.teamComposition.map(item => `<li><span>${escape(item.role)}</span><strong>${escape(item.count)}</strong></li>`).join('')}</ul></dd></div>` : '';
    const sources = [project.projectUrl && external(project.projectUrl, 'View game page'), project.videoUrl && external(project.videoUrl, 'Watch video')].filter(Boolean).join('');
    const sections = project.sections.map(c => `<section class="jam-section${c.reflection ? ' jam-reflection' : ''}${c.image ? ' jam-section-with-image' : ''}" data-jam-section="${c.id}" aria-labelledby="heading-${c.id}"><header>${c.label === c.title ? '' : '<p class="eyebrow">' + escape(c.label) + '</p>'}<h2 tabindex="-1" id="heading-${c.id}">${escape(c.title)}</h2></header><div class="jam-prose">${c.note ? `<p class="jam-note">${escape(c.note)}</p>` : ''}${c.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}</div>${c.imageAfterMedia ? mediaGroups(c.mediaGroups) + figure(c, true) : figure(c, true) + mediaGroups(c.mediaGroups)}</section>`).join('');
    const nextLink = nextProject ? `<a href="#${nextProject.route || 'project/' + nextProject.id}" class="jam-next" id="next-${nextProject.id}"><span><small>Next work</small>${escape(nextProject.title)}</span>${icon('arrow-up-right')}</a>` : '';

    root.innerHTML = `<div class="jam-topbar"><div class="jam-topbar-inner"><a href="#${escape(from)}" class="text-link" data-back>${icon('arrow-left')}${backLabel}</a><span class="jam-reader-name">${escape(project.title)}</span><details class="jam-contents"><summary>Contents</summary><nav aria-label="Game Jam sections">${toc}</nav></details></div></div><div class="jam-article jam-${project.id}"><section class="jam-intro" data-jam-section="overview" aria-labelledby="case-title"><div class="jam-lead"><header><p class="eyebrow">Game Jam / ${escape(project.type)}</p><h1 id="case-title" tabindex="-1">${escape(project.title)}</h1><p class="jam-deck">${escape(project.deck)}</p>${sources ? `<div class="jam-sources">${sources}</div>` : ''}</header><div class="jam-opening-media" data-jam-section="film" tabindex="-1" aria-label="${escape(project.title)} game and media">${openingMedia}</div></div><dl class="jam-facts">${facts.map(([label, value]) => `<div${label === 'My contribution' ? ' class="jam-role"' : ''}><dt>${label}</dt><dd>${escape(value)}</dd></div>`).join('')}${teamComposition}</dl></section><div class="jam-story">${sections}</div>${nextLink}</div>`;

    const controller = new AbortController();
    const signal = controller.signal;
    const localMedia = window.PortfolioMedia.bind(root, { signal });
    const menu = root.querySelector('.jam-contents');
    const panels = [...root.querySelectorAll('[data-jam-section]')];
    const links = [...root.querySelectorAll('[data-jam-link]')];
    let active = 'overview';
    let alive = true;
    let shown = false;
    let frame = 0;
    let restoration = null;
    let settleTimer = 0;
    let restoredTop = null;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const filmLink = root.querySelector('a.film-preview');
    const stopFilm = window.CaseExperience.bindFilmPreview(filmLink, { title: project.title, film: project.film, demo: project.videoUrl }, signal);
    const stopMedia = () => { stopFilm(); localMedia.pauseAll(); };
    const layoutReady = Promise.allSettled([
      document.fonts?.ready,
      ...[...root.querySelectorAll('img')].map(img => img.decode?.())
    ]);
    const panelFor = id => panels.find(panel => panel.dataset.jamSection === id) || panels[0];
    const headingFor = id => panelFor(id).querySelector('h1,h2') || panelFor(id);
    const inset = () => (document.querySelector('.site-header')?.getBoundingClientRect().height || 0) + root.querySelector('.jam-topbar').getBoundingClientRect().height + 24;

    function mark(id, notify = true) {
      const changed = active !== id;
      active = id;
      links.forEach(link => {
        const current = link.dataset.jamLink === (id === 'film' ? 'overview' : id);
        if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
      if (changed && notify) onChange?.(route(active));
    }

    function track() {
      frame = 0;
      if (!alive || !shown || restoration || document.querySelector('dialog[open]')) return;
      // Media is part of the introduction, so normal reading does not manufacture
      // a separate film chapter. Its legacy link remains directly addressable.
      let id = 'overview';
      for (const panel of panels) {
        if (panel.dataset.jamSection === 'film') continue;
        if (panel.getBoundingClientRect().top <= inset() + 48) id = panel.dataset.jamSection;
      }
      mark(id);
      if (filmLink) {
        const box = filmLink.getBoundingClientRect();
        if (box.bottom <= inset() || box.top >= window.innerHeight) stopFilm();
      }
    }

    function applyRestoration() {
      if (!alive || !restoration) return;
      const top = restoration.scroll ?? (restoration.id === 'overview' ? 0 : Math.max(0, panelFor(restoration.id).getBoundingClientRect().top + window.scrollY - inset()));
      restoredTop = top;
      window.scrollTo({ top, behavior: 'instant' });
      restoredTop = window.scrollY;
    }

    function cancelRestoration() { restoration = null; restoredTop = null; clearTimeout(settleTimer); }
    window.addEventListener('scroll', () => {
      if (!shown || restoration || window.scrollY === restoredTop) return;
      restoredTop = null;
      if (!frame) frame = requestAnimationFrame(track);
    }, { passive: true, signal });
    window.addEventListener('resize', () => { applyRestoration(); if (!frame) frame = requestAnimationFrame(track); }, { passive: true, signal });
    for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) window.addEventListener(event, cancelRestoration, { passive: true, signal });
    for (const img of root.querySelectorAll('img')) img.addEventListener('load', applyRestoration, { signal });
    document.fonts?.ready.then(() => applyRestoration());
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopMedia(); }, { signal });
    root.addEventListener('click', event => {
      if (event.target.closest('[data-image]')) stopMedia();
      const link = event.target.closest('[data-jam-link]');
      if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) menu.open = false;
    }, { signal });
    document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; }, { signal });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open && !document.querySelector('dialog[open]')) {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    }, { signal });
    document.body.classList.add('jam-mode');

    return {
      show(id = 'overview', state, focus = false, instant = true) {
        shown = true;
        const requested = state?.chapter || id;
        const target = chapters.some(c => c.id === requested) ? requested : 'overview';
        cancelAnimationFrame(frame); frame = 0;
        stopMedia(); menu.open = false;
        mark(target, false);
        const savedScroll = Number.isFinite(state?.scroll) ? Math.max(0, state.scroll) : null;
        restoration = { id: target, scroll: savedScroll };
        const intent = restoration;
        if (instant || motion.matches || savedScroll !== null) {
          applyRestoration();
          requestAnimationFrame(applyRestoration);
        } else {
          const top = target === 'overview' ? 0 : Math.max(0, panelFor(target).getBoundingClientRect().top + window.scrollY - inset());
          window.scrollTo({ top, behavior: 'smooth' });
        }
        // Reapply the destination once fonts and images have their final size.
        // Stop retaining it afterwards so ordinary page scrolling can update
        // the reading position, including scrollbar and assistive navigation.
        layoutReady.then(() => {
          if (!alive || restoration !== intent) return;
          const settle = () => {
            if (!alive || restoration !== intent) return;
            applyRestoration(); restoration = null;
          };
          if (instant || motion.matches || savedScroll !== null) settle();
          else settleTimer = setTimeout(settle, 700);
        });
        if (focus) headingFor(target).focus({ preventScroll: true });
      },
      snapshot: () => ({ project: project.id, routePrefix, chapter: active, scroll: window.scrollY }),
      focus: () => headingFor(active).focus({ preventScroll: true }),
      destroy() {
        alive = false; restoration = null; clearTimeout(settleTimer);
        cancelAnimationFrame(frame); stopMedia(); localMedia.destroy(); controller.abort();
        document.body.classList.remove('jam-mode');
      }
    };
  }

  function resolveChapter(project, chapter) {
    if (project.id === 'mask' && chapter === 'environment') return 'interactions';
    return chaptersFor(project).some(section => section.id === chapter) ? chapter : null;
  }

  window.JamExperience = { create, chaptersFor, resolveChapter };
})();
