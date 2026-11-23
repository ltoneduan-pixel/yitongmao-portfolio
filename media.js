(() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const asset = file => `assets/${file}`;
  const localFile = value => typeof value === 'string' && value.trim() && !/^(?:[a-z][a-z\d+.-]*:|[\\/])|(?:^|[\\/])\.\.(?:[\\/]|$)/i.test(value) ? value.trim() : null;
  const videoFile = value => { const file = localFile(value); return file && /\.(mp4|webm)$/i.test(file) ? file : null; };
  const ratioFor = value => {
    const parts = String(value || '16 / 9').match(/^\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/);
    return parts && Number(parts[1]) > 0 && Number(parts[2]) > 0 ? `${parts[1]} / ${parts[2]}` : '16 / 9';
  };
  const filled = item => Boolean(videoFile(item.video) || localFile(item.image));
  const formatFor = (item, group) => item.format || group.format || 'Still image (PNG / JPG)';
  const guidance = (item, group) => `<p class="jam-media-slot-format">${escape(formatFor(item, group))} · ${ratioFor(item.ratio || group.ratio).replace(' / ', ':')}</p>${item.hint || group.hint ? `<p class="jam-media-slot-hint">${escape(item.hint || group.hint)}</p>` : ''}`;



  function toggleMarkup(label) {
    return '<button class="portfolio-media-loop-toggle is-paused" type="button" data-media-toggle data-media-label="' + escape(label) + '" aria-label="Play ' + escape(label) + '" aria-pressed="false"><svg class="media-icon-play" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3.5 16 10 6 16.5Z" fill="currentColor"/></svg><svg class="media-icon-pause" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 4h4v12H5zm6 0h4v12h-4z" fill="currentColor"/></svg></button>';
  }
  function videoMarkup(video, { image, alt, loop = false, card = false } = {}) {
    const url = escape(asset(video));
    return '<video class="portfolio-media-video' + (loop ? ' portfolio-media-loop' : '') + '" data-local-video' +
      (loop ? ' data-loop-video muted data-video-src="' + url + '"' : ' controls') + (card ? ' data-card-video' : '') +
      ' playsinline loop preload="' + (loop ? 'none' : 'metadata') + '"' +
      (image ? ' poster="' + escape(asset(image)) + '"' : '') + ' aria-label="' + escape(alt) + '">' +
      (loop ? '' : '<source src="' + url + '" type="' + (/\.webm$/i.test(video) ? 'video/webm' : 'video/mp4') + '">') +
      'Your browser cannot play this video.</video>';
  }
  // Ordinary cards and the Jam timeline share this optional preview. The
  // control is a sibling of the project link, never a button inside a link.
  function cardMedia(project, { image, alt, href, className = '', width, height, linkId } = {}) {
    const poster = localFile(image);
    const video = videoFile(project.cardPreview?.video);
    const title = project.team || project.title;
    return '<div class="portfolio-card-media ' + escape(className) + (video ? ' has-video-preview' : '') + '" data-media-frame' +
      (video ? ' style="--preview-ratio:' + ratioFor(project.cardPreview.ratio) + '"' : '') + '>' +
      '<a class="card-media-link"' + (linkId ? ' id="' + escape(linkId) + '"' : '') + ' href="' + escape(href) + '" aria-label="Explore ' + escape(title) + '">' +
      (poster ? '<img data-preview-poster src="' + escape(asset(poster)) + '" alt="' + escape(alt || title) + '"' + (width && height ? ' width="' + Number(width) + '" height="' + Number(height) + '"' : '') + ' loading="lazy">' : '') +
      (video ? videoMarkup(video, { image: poster, alt: title + ' gameplay preview', loop: true, card: true }) : '') + '</a>' +
      (video ? toggleMarkup('preview of ' + title) + '<p class="card-preview-error" role="status" hidden>Preview unavailable. You can still explore the project.</p>' : '') + '</div>';
  }

  function imageSwap(item, image, alt, eager, media) {
    const alternate = localFile(item.imageSwap?.image);
    if (!alternate) return media(image, alt, eager);
    const primaryLabel = item.imageSwap.primaryLabel || 'First image';
    const alternateLabel = item.imageSwap.alternateLabel || 'Second image';
    const alternateAlt = item.imageSwap.imageAlt || alternateLabel;
    return '<div class="portfolio-image-swap" data-image-swap data-primary-image="' + escape(image) +
      '" data-alternate-image="' + escape(alternate) + '" data-primary-alt="' + escape(alt) +
      '" data-alternate-alt="' + escape(alternateAlt) + '" data-primary-label="' + escape(primaryLabel) +
      '" data-alternate-label="' + escape(alternateLabel) + '">' +
      '<div class="image-swap-visual">' + media(image,alt,eager) +
      '<img class="image-swap-alternate" src="' + escape(asset(alternate)) + '" alt="" aria-hidden="true" loading="' + (eager ? 'eager' : 'lazy') + '"></div>' +
      '<button type="button" class="image-swap-toggle" data-image-swap-toggle aria-pressed="false">Show ' + escape(alternateLabel.toLowerCase()) + '</button></div>';
  }

  function bindImageSwaps(root, options) {
    for (const frame of root.querySelectorAll('[data-image-swap]')) {
      const view = frame.querySelector('[data-image]');
      const toggle = frame.querySelector('[data-image-swap-toggle]');
      if (!view || !toggle) continue;
      const primary = view.querySelector('img');
      let alternate = false;
      const show = value => {
        alternate = value;
        const prefix = value ? 'alternate' : 'primary';
        frame.classList.toggle('is-alternate',value);
        view.dataset.image = frame.dataset[prefix + 'Image'];
        view.dataset.caption = frame.dataset[prefix + 'Alt'];
        view.setAttribute('aria-label','Enlarge: ' + frame.dataset[prefix + 'Alt']);
        primary.alt = frame.dataset[prefix + 'Alt'];
        toggle.setAttribute('aria-pressed',String(value));
        toggle.textContent = 'Show ' + frame.dataset[(value ? 'primary' : 'alternate') + 'Label'].toLowerCase();
      };
      frame.addEventListener('pointerenter',event => { if (event.pointerType === 'mouse') show(true); },options);
      frame.addEventListener('pointerleave',event => { if (event.pointerType === 'mouse') show(false); },options);
      frame.addEventListener('focusin',event => { if (event.target.matches(':focus-visible')) show(true); },options);
      frame.addEventListener('focusout',event => { if (!frame.contains(event.relatedTarget)) show(false); },options);
      toggle.addEventListener('click',() => show(!alternate),options);
      options.signal.addEventListener('abort',() => show(false),{once:true});
    }
  }

  function groups(entries, { media, eager = true, wrapContent } = {}) {
    return (entries || []).map(group => {
      const items = group.items || [];
      const pending = items.some(item => !filled(item));
      const slots = items.map(item => {
        const image = localFile(item.image);
        const video = videoFile(item.video);
        const loop = item.playback === 'loop';
        const ready = Boolean(image || video);
        const alt = item.imageAlt || item.caption || item.label || group.title;
        let content;
        if (video) {
          const url = escape(asset(video));
          content = videoMarkup(video, { image, alt, loop }) + (loop ? toggleMarkup('animation') : '') + '<div class="portfolio-media-error" role="status" hidden><p>This video could not be loaded.</p><button type="button" data-media-retry>Retry video</button><a href="' + url + '" target="_blank" rel="noopener noreferrer">Open video</a></div>';
        } else if (image) content = imageSwap(item, image, alt, eager, media);
        else content = `<div lang="${escape(item.labelLang || 'en')}"><p class="jam-media-slot-label">${escape(item.label || 'Evidence image pending')}</p>${guidance(item, group)}</div>`;
        if (ready && item.label) content += `<span class="jam-media-item-label" lang="${escape(item.labelLang || 'en')}">${escape(item.label)}</span>`;
        if (typeof wrapContent === 'function') content = wrapContent(content, { item, group, image, video, ready, alt });
        return `<figure class="jam-media-item${ready ? ' is-filled' : ' is-empty'}"><div class="jam-media-frame${ready ? '' : ' jam-media-placeholder'}" style="--jam-media-ratio:${ratioFor(item.ratio || group.ratio)}">${content}</div>${ready && item.caption ? `<figcaption>${escape(item.caption)}</figcaption>` : ''}</figure>`;
      }).join('');
      return `<div class="jam-media-group${pending ? ' has-pending-media' : ''}" data-media-group="${escape(group.id)}">${pending ? `<div class="jam-media-group-header" lang="en"><h3><span>${escape(group.id)}</span>${escape(group.title)}${group.optional ? '<small class="jam-media-optional">Optional</small>' : ''}</h3></div>` : ''}<div class="jam-media-items${items.length > 1 ? ' jam-media-comparison' : ''}">${slots}</div></div>`;
    }).join('');
  }

  function cover(project, { compact = false, className = '' } = {}) {
    const hasOpening = Array.isArray(project.openingMediaGroups);
    const group = project.openingMediaGroups?.[0] || {};
    const item = group.items?.[0] || {};
    const image = localFile(hasOpening ? item.image : project.thumb || project.hero);
    const alt = hasOpening ? item.imageAlt || item.caption || project.title : project.thumbAlt || project.heroAlt || project.title;
    const content = image ? `<img src="${escape(asset(image))}" alt="${escape(alt)}" loading="lazy">` : `<div class="portfolio-media-cover-copy" lang="en">${group.id ? `<span class="portfolio-media-cover-code">${escape(group.id)}</span>` : ''}<span class="portfolio-media-cover-title">${escape(group.title || 'Cover image pending')}</span>${compact ? '' : guidance(item, group)}</div>`;
    return `<div class="portfolio-media-cover ${image ? 'is-filled' : 'is-empty'}${compact ? ' is-compact' : ''}${className ? ` ${escape(className)}` : ''}" style="--jam-media-ratio:${ratioFor(item.ratio || group.ratio)}">${content}</div>`;
  }

  function bind(root, { signal, enabled = true } = {}) {
    const controller = new AbortController();
    const options = { signal: controller.signal };
    bindImageSwaps(root, options);
    const videos = [...root.querySelectorAll('video[data-local-video]')];
    if (!videos.length) {
      const destroy = () => { controller.abort(); signal?.removeEventListener('abort', destroy); };
      signal?.addEventListener('abort', destroy, { once:true });
      if (signal?.aborted) destroy();
      return { pauseAll() {}, refresh() {}, setEnabled() {}, destroy };
    }
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const touch = matchMedia('(hover: none), (pointer: coarse)');
    let active = enabled, destroyed = false, scheduled = 0, intent = 0, activeCard = null;
    const states = videos.filter(video => video.hasAttribute('data-loop-video')).map(video => {
      const frame = video.closest('[data-media-frame],.jam-media-frame');
      const card = video.hasAttribute('data-card-video');
      return { video, frame, card, target: card ? frame.closest('[data-work]') || frame : frame,
        toggle: frame.querySelector('[data-media-toggle]'), error: frame.querySelector('.card-preview-error,.portfolio-media-error'),
        hovered: false, focused: false, manual: false, userPaused: false, denied: false, failed: false,
        wanted: false, pending: null, version: 0, stamp: 0 };
    });
    const stateFor = new Map(states.map(state => [state.video, state]));
    const blocked = () => destroyed || !active || root.hidden || document.hidden || Boolean(document.querySelector('dialog[open]'));
    const available = state => !blocked() && state.video.isConnected && !state.video.closest('[hidden],[inert]');
    const updateToggle = state => {
      const button = state.toggle;
      if (!button) return;
      const playing = !state.video.paused && !state.video.ended;
      const label = button.dataset.mediaLabel || 'animation';
      button.setAttribute('aria-label', (state.failed ? 'Retry ' : playing ? 'Pause ' : 'Play ') + label);
      button.setAttribute('aria-pressed', String(playing));
      button.classList.toggle('is-paused', !playing);
    };
    const pauseState = (state, restorePoster = false) => {
      if (state.wanted || state.pending || !state.video.paused) {
        state.version++; state.wanted = false; state.pending = null;
        state.video.pause();
      }
      if (state.card && restorePoster) {
        state.frame.classList.remove('has-preview-frame');
        if (state.video.currentTime > 0) { try { state.video.currentTime = 0; } catch {} }
      }
      updateToggle(state);
    };
    const pauseAll = () => videos.forEach(video => {
      const state = stateFor.get(video);
      if (state) pauseState(state, true); else video.pause();
    });
    const loadSource = state => {
      if (state.video.dataset.videoSrc && !state.video.hasAttribute('src')) {
        state.video.src = state.video.dataset.videoSrc;
        state.video.load();
      }
    };
    const playState = state => {
      if (!available(state) || state.failed || state.userPaused || (!state.manual && (motion.matches || state.denied))) return;
      state.wanted = true;
      if (state.pending || !state.video.paused) return;
      state.video.muted = true; state.video.defaultMuted = true; state.video.playsInline = true;
      loadSource(state);
      const version = ++state.version;
      const promise = state.video.play();
      state.pending = promise;
      Promise.resolve(promise).then(() => {
        if (version !== state.version) return;
        if (!state.wanted || !available(state)) pauseState(state, true);
        updateToggle(state);
      }).catch(error => {
        if (version !== state.version) return;
        // Aborted requests are expected when scrolling away while a clip loads.
        if (error.name !== 'AbortError') { state.denied = true; state.manual = false; }
        state.wanted = false;
        state.frame.classList.remove('has-preview-frame');
        updateToggle(state);
      }).finally(() => { if (state.pending === promise) state.pending = null; });
    };
    const geometry = (state, headerBottom) => {
      if (!available(state)) return { ratio: 0, area: 0, distance: Infinity };
      const box = state.video.getBoundingClientRect();
      const chapter = state.video.closest('.chapter-screen');
      const clip = chapter?.getBoundingClientRect();
      const top = Math.max(box.top, headerBottom, clip?.top || 0);
      const bottom = Math.min(box.bottom, innerHeight, clip?.bottom ?? innerHeight);
      const left = Math.max(box.left, 0, clip?.left || 0);
      const right = Math.min(box.right, innerWidth, clip?.right ?? innerWidth);
      const area = Math.max(0, bottom - top) * Math.max(0, right - left);
      return { area, ratio: box.width && box.height ? area / (box.width * box.height) : 0,
        distance: Math.abs((box.top + box.bottom) / 2 - (headerBottom + innerHeight) / 2) };
    };
    const refreshNow = () => {
      scheduled = 0;
      if (blocked()) { pauseAll(); return; }
      const headerBottom = Math.max(0, document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0);
      const metrics = new Map(states.map(state => [state, geometry(state, headerBottom)]));
      const visibleCards = states.filter(state => state.card && metrics.get(state).ratio >= .5);
      let candidates = touch.matches ? visibleCards : visibleCards.filter(state => state.hovered || state.focused || state.manual);
      if (touch.matches) {
        const manual = candidates.filter(state => state.manual && !state.userPaused);
        if (manual.length) candidates = manual.sort((a, b) => b.stamp - a.stamp);
        else candidates.sort((a, b) => metrics.get(b).area - metrics.get(a).area ||
          (a === activeCard ? -1 : b === activeCard ? 1 : metrics.get(a).distance - metrics.get(b).distance));
      } else candidates.sort((a, b) => b.stamp - a.stamp);
      activeCard = candidates[0] || null;
      for (const state of states) {
        const visible = metrics.get(state).ratio >= (state.card ? .5 : .25);
        const selected = !state.card || state === activeCard;
        const interaction = !state.card || touch.matches || state.hovered || state.focused || state.manual;
        if (visible && selected && interaction && !state.userPaused && !state.failed && (state.manual || (!motion.matches && !state.denied))) playState(state);
        else pauseState(state, state.card && (!visible || !selected || !interaction));
      }
    };
    const refresh = () => {
      if (!destroyed && !scheduled) scheduled = requestAnimationFrame(refreshNow);
    };
    const fail = state => {
      state.failed = true; state.manual = false;
      pauseState(state, true);
      if (state.error) state.error.hidden = false;
      updateToggle(state);
    };
    const manuallyPlay = state => {
      state.userPaused = false; state.denied = false; state.manual = true; state.stamp = ++intent;
      if (state.failed) { state.failed = false; if (state.error) state.error.hidden = true; state.video.load(); }
      if (state.card) states.filter(other => other.card && other !== state).forEach(other => { other.manual = false; pauseState(other, true); });
      playState(state); refresh();
    };
    for (const video of videos) {
      const state = stateFor.get(video);
      const frame = video.closest('[data-media-frame],.jam-media-frame');
      const error = frame?.querySelector('.portfolio-media-error');
      const onError = () => { if (state) fail(state); else { video.pause(); if (error) error.hidden = false; } };
      video.addEventListener('error', onError, options);
      video.querySelector('source')?.addEventListener('error', onError, options);
      video.addEventListener('loadeddata', () => { if (error && !state?.failed) error.hidden = true; }, options);
      video.addEventListener('play', () => {
        if (blocked() || video.closest('[hidden],[inert]') || (state && !state.wanted)) {
          if (state) pauseState(state, true); else video.pause();
          return;
        }
        if (state) updateToggle(state);
      }, options);
      video.addEventListener('playing', () => {
        if (state && state.wanted && available(state)) {
          if (state.card) state.frame.classList.add('has-preview-frame');
          updateToggle(state);
        }
      }, options);
      video.addEventListener('pause', () => { if (state) updateToggle(state); }, options);
      frame?.querySelector('[data-media-retry]')?.addEventListener('click', () => {
        if (state) manuallyPlay(state); else { error.hidden = true; video.load(); }
      }, options);
      if (!state) continue;
      state.toggle?.addEventListener('click', event => {
        event.preventDefault(); event.stopPropagation();
        if (!video.paused || state.pending) {
          state.userPaused = true; state.manual = false; pauseState(state);
        } else manuallyPlay(state);
      }, options);
      if (state.card) {
        state.target.addEventListener('pointerenter', event => {
          if (event.pointerType !== 'mouse') return;
          state.hovered = true; state.stamp = ++intent; refresh();
        }, options);
        state.target.addEventListener('pointerleave', event => {
          if (event.pointerType !== 'mouse') return;
          state.hovered = false; state.manual = false; refresh();
        }, options);
        state.target.addEventListener('focusin', event => {
          if (!event.target.matches(':focus-visible')) return;
          state.focused = true; state.stamp = ++intent; refresh();
        }, options);
        state.target.addEventListener('focusout', event => {
          if (state.target.contains(event.relatedTarget)) return;
          state.focused = false; state.manual = false; refresh();
        }, options);
      }
      updateToggle(state);
    }
    const observer = new IntersectionObserver(refresh, { threshold: [0, .25, .5, .75, 1] });
    states.forEach(state => observer.observe(state.video));
    const mutations = new MutationObserver(refresh);
    mutations.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['open', 'hidden', 'inert'] });
    window.addEventListener('scroll', refresh, { ...options, capture: true, passive: true });
    window.addEventListener('resize', refresh, options);
    document.addEventListener('visibilitychange', () => { if (document.hidden) pauseAll(); else refresh(); }, options);
    document.addEventListener('toggle', () => { if (blocked()) pauseAll(); else refresh(); }, { ...options, capture: true });
    root.addEventListener('click', event => { if (event.target.closest('[data-image]')) pauseAll(); }, options);
    motion.addEventListener('change', () => {
      if (motion.matches) { states.forEach(state => { state.manual = false; }); pauseAll(); }
      refresh();
    }, options);
    touch.addEventListener('change', refresh, options);
    function destroy() {
      if (destroyed) return;
      destroyed = true; pauseAll(); cancelAnimationFrame(scheduled);
      observer.disconnect(); mutations.disconnect(); controller.abort();
      signal?.removeEventListener('abort', destroy);
    }
    const setEnabled = value => {
      active = value;
      states.forEach(state => {
        state.manual = false; state.focused = false;
        state.hovered = Boolean(value && !touch.matches && state.target.matches(':hover'));
      });
      if (!value) pauseAll(); else refresh();
    };
    signal?.addEventListener('abort', destroy, { once: true });
    if (signal?.aborted) destroy(); else refresh();
    return { pauseAll, refresh, destroy, setEnabled };
  }

  window.PortfolioMedia = { groups, cover, cardMedia, bind };
})();
