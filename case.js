(() => {
  function embedFor(link) {
    if (!link) return null;
    let url;
    try { url = new URL(link); } catch { return null; }
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'vimeo.com' && /^\/\d+\/?$/.test(url.pathname)) {
      const player = new URL(`https://player.vimeo.com/video/${url.pathname.split('/')[1]}`);
      player.search = new URLSearchParams({ autoplay: '1', muted: '1', loop: '1', controls: '0', playsinline: '1', dnt: '1' });
      return { provider: 'vimeo', url: player.href, origin: player.origin };
    }
    const id = host === 'youtu.be' ? url.pathname.slice(1) : ['youtube.com', 'm.youtube.com'].includes(host) ? url.searchParams.get('v') : null;
    if (id && /^[\w-]{11}$/.test(id)) {
      const player = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
      player.search = new URLSearchParams({ autoplay: '1', mute: '1', loop: '1', playlist: id, controls: '0', playsinline: '1', enablejsapi: '1', origin: location.origin });
      return { provider: 'youtube', url: player.href, origin: player.origin };
    }
    return null;
  }

  function videosFor(project) {
    const videos = Array.isArray(project.videos) ? project.videos.filter(video => video?.url) : [];
    return videos.length ? videos : project.demo ? [{ label: 'Watch video', url: project.demo }] : [];
  }
  function primaryVideoFor(project) { return videosFor(project)[0] || null; }

  function bindFilmPreview(link, project, signal) {
    if (!link) return () => {};
    const embedded = embedFor(primaryVideoFor(project)?.url);
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let player, timeout, handshake;
    function stop() {
      clearTimeout(timeout); clearInterval(handshake);
      player?.remove(); player = null;
      link.classList.remove('is-playing');
    }
    function playing() {
      clearTimeout(timeout); clearInterval(handshake);
      link.classList.add('is-playing');
    }
    function send(message) { player?.contentWindow?.postMessage(JSON.stringify(message), embedded.origin); }
    function start() {
      if (player || motion.matches || document.hidden || link.closest('[inert]') || document.querySelector('dialog[open]')) return;
      if (embedded) {
        const iframe = document.createElement('iframe');
        iframe.title = `${project.title} muted preview`;
        iframe.tabIndex = -1; iframe.setAttribute('aria-hidden', 'true');
        iframe.allow = 'autoplay; encrypted-media';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.src = embedded.url; player = iframe;
        iframe.addEventListener('load', () => {
          if (player !== iframe) return;
          if (embedded.provider === 'vimeo') {
            send({ method: 'addEventListener', value: 'play' });
            send({ method: 'addEventListener', value: 'timeupdate' });
            send({ method: 'addEventListener', value: 'error' });
            send({ method: 'play' });
          } else {
            send({ event: 'listening' });
            handshake = setInterval(() => send({ event: 'listening' }), 500);
          }
        }, { signal });
        link.append(iframe);
      } else return;
      // Leave the poster visible until the player confirms real playback.
      timeout = setTimeout(() => { if (!link.classList.contains('is-playing')) stop(); }, 15000);
    }
    window.addEventListener('message', event => {
      if (!embedded || !player?.contentWindow || event.source !== player.contentWindow || event.origin !== embedded.origin) return;
      let data;
      try { data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch { return; }
      if (!data) return;
      if (embedded.provider === 'vimeo') {
        if (data.event === 'play' || data.event === 'timeupdate' && data.data?.seconds > 0) playing();
        if (data.event === 'error') stop();
      } else {
        if (data.event === 'onReady') {
          send({ event: 'command', func: 'mute', args: [] });
          send({ event: 'command', func: 'playVideo', args: [] });
          send({ event: 'command', func: 'addEventListener', args: ['onStateChange'] });
        }
        if (data.event === 'onStateChange' && data.info === 1 || data.event === 'infoDelivery' && data.info?.playerState === 1) playing();
        if (data.event === 'onError') stop();
      }
    }, { signal });
    link.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') start(); }, { signal });
    link.addEventListener('pointerleave', stop, { signal });
    link.addEventListener('focus', start, { signal });
    link.addEventListener('blur', stop, { signal });
    link.addEventListener('click', stop, { signal });
    motion.addEventListener('change', stop, { signal });
    signal.addEventListener('abort', stop, { once: true });
    return stop;
  }

  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  // Emphasise selected phrases without allowing content strings to inject HTML.
  const practiceText = value => String(value ?? '').split(/(\*\*[^*]+\*\*)/g).map(part => part.startsWith('**') && part.endsWith('**') ? `<strong class="practice-emphasis">${escape(part.slice(2, -2))}</strong>` : escape(part)).join('');

  function chaptersFor(project) {
    if (project.kind === 'practice') return [project.overview, ...project.sections];
    return [{ id: 'overview', label: 'Overview' }, ...(project.caseLayout === 'highlights' ? [] : [{ id: 'film', label: 'Project film' }]), ...project.sections];
  }
  function resolveChapter(project, id = 'overview') {
    const target = project.chapterAliases?.[id] || id;
    return chaptersFor(project).some(chapter => chapter.id === target) ? target : 'overview';
  }

  function create({ root, project, routePrefix = 'project', nextProject, backLabel: requestedBackLabel, from = 'archive/normal', media, icon, external, onChange }) {
    const chapters = chaptersFor(project);
    const practice = project.kind === 'practice';
    const highlights = !practice && project.caseLayout === 'highlights';
    const tones = project.tones || ['paper', 'white', 'blue', 'lilac', 'mint'];
    const pad = n => String(n).padStart(2, '0');
    const route = id => `${routePrefix}/${project.id}/${id}`;
    const backLabel = requestedBackLabel || 'Back to portfolio';
    const toc = chapters.map((c, i) => `<a href="#${route(c.id)}" data-chapter-link="${i}"><span>${pad(i + 1)}</span>${escape(c.label)}</a>`).join('');
    const videos = videosFor(project);
    const primaryVideo = videos[0];
    const sources = [project.source && external(project.source, 'Project board'), ...videos.map(video => external(video.url, video.label || 'Watch video'))].filter(Boolean).join('');
    const sourcesMarkup = sources ? `<div class="reader-sources">${sources}</div>` : '';
    const nextLink = nextProject ? `<a href="#${nextProject.route || 'project/' + nextProject.id}" class="chapter-next-project" id="next-${nextProject.id}"><span><small>${escape(nextProject.kicker || 'Next work')}</small>${escape(nextProject.title)}</span>${icon('arrow-up-right')}</a>` : '';
    const facts = () => `<dl class="chapter-facts${project.date ? '' : ' chapter-facts-undated'}">${project.date ? `<div><dt>Period</dt><dd>${escape(project.date)}</dd></div>` : ''}<div><dt>Tools & medium</dt><dd>${escape(project.engine)}</dd></div><div><dt>My contribution</dt><dd>${escape(project.role)}</dd></div></dl>`;
    const figure = (item, extra = '') => item.image ? `<figure class="chapter-figure ${project.id} ${extra}">${media(item.image, item.imageAlt || item.caption || project.title, true)}${item.caption ? `<figcaption>${escape(item.caption)}</figcaption>` : ''}</figure>` : '';
    const groups = (items, mediaHelper = media, eager = true) => items?.length ? window.PortfolioMedia.groups(items, { media: mediaHelper, icon, eager }) : '';
    const openingItem = !practice ? project.openingMediaGroups?.[0]?.items?.[0] : null;
    const coverPreview = Boolean(openingItem && primaryVideo);
    const openingMedia = () => {
      if (!coverPreview) return groups(project.openingMediaGroups);
      // The cover stays a link, including while its image is still pending.
      // Only the hosted player provides motion; this slot is a static cover.
      const entries = project.openingMediaGroups.map((group, index) => index ? group : { ...group, items: group.items.map((item, itemIndex) => itemIndex ? item : { ...item, video: null }) });
      return window.PortfolioMedia.groups(entries, {
        eager: true,
        media: (file, alt) => `<img src="assets/${escape(file)}" alt="${escape(alt)}" loading="eager">`,
        wrapContent: (content, { group, item, image }) => group.id === entries[0].id && item === entries[0].items[0]
          ? `<a class="film-preview${image ? '' : ' film-cover-empty'}" href="${escape(primaryVideo.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(primaryVideo.label || `Watch ${project.title} video`)} (opens in a new tab)">${content}${image ? `<span class="film-play" aria-hidden="true">${icon('play')}</span>` : `<span class="film-cover-action" aria-hidden="true">${icon('play')} ${escape(primaryVideo.label || 'Watch video')} ${icon('arrow-up-right')}</span>`}</a>`
          : content
      });
    };
    const practiceIdentity = () => `<dl class="skill-identity" aria-label="Internship details"><div><dt>Company</dt><dd>${escape(project.company)}</dd></div><div><dt>Position</dt><dd>${escape(project.position)}</dd></div><div><dt>Project / Steam</dt><dd><a href="${escape(project.steamUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(project.team)} on Steam (opens in a new tab)">${escape(project.team)} ${icon('arrow-up-right')}</a></dd></div></dl>`;
    const practiceOverview = () => `<div class="chapter-shell gujian-overview">
      ${practiceIdentity()}
      <header class="gujian-introduction"><p class="gujian-eyebrow">Professional practice / Swords of Legends</p><h1 id="case-title" tabindex="-1">${escape(project.overview.title)}</h1><p>${escape(project.overview.subtitle)}</p><figure class="gujian-public-art"><img src="assets/${escape(project.publicArt)}" alt="Official Swords of Legends promotional artwork with the game title and a character" width="460" height="215"><figcaption>Official Steam promotional artwork</figcaption></figure><a class="gujian-steam-cta" href="${escape(project.steamUrl)}" target="_blank" rel="noopener noreferrer">View Swords of Legends on Steam ${icon('arrow-up-right')}</a></header>
      <section class="gujian-skill-summary" aria-labelledby="gujian-skills-title"><h2 id="gujian-skills-title" class="skill-section-label">${escape(project.overview.summaryLabel)}</h2><ol>${project.overview.skills.map((skill,i) => `<li><a href="#${route(skill.chapter)}"><span>${pad(i+1)}</span><div><h3>${escape(skill.title)}</h3><p>${practiceText(skill.description)}</p></div>${icon('arrow-up-right')}</a></li>`).join('')}</ol></section>
      <aside class="gujian-confidentiality"><p class="skill-section-label">${escape(project.overview.confidentiality.title)}</p><p>${escape(project.overview.confidentiality.text)}</p></aside>
    </div>`;
    const practiceChapter = (c, i) => {
      return `<div class="chapter-shell skill-page skill-page-${escape(c.id)}${c.research || c.iteration || c.workflowComparison ? ' skill-with-aside' : ''}">
        <header class="skill-intro"><p class="skill-kicker"><span>${pad(i)}</span> / Swords of Legends · Internship</p><h2 id="heading-${escape(c.id)}" tabindex="-1">${escape(c.title)} <span>${escape(c.accent)}</span></h2><p class="skill-subtitle">${escape(c.subtitle)}</p></header>
        <div class="skill-evidence"><p class="skill-section-label">${c.id === 'systems' ? 'Work delivered' : c.id === 'learning' ? 'How I investigated' : 'What changed through QA feedback'}</p>${c.evidence.map((item, index) => `<section class="skill-example"><h3><span class="skill-example-number">${pad(index + 1)}</span>${escape(item.title)}</h3><div class="skill-prose">${item.paragraphs.map(paragraph => `<p>${practiceText(paragraph)}</p>`).join('')}</div></section>`).join('')}</div>
        ${c.research ? `<figure class="skill-research"><div class="skill-research-heading"><h3>${escape(c.research.title)}</h3><span>Personal research</span></div>${media(c.research.image,c.research.alt,true)}<figcaption>${escape(c.research.caption)}<span>Click the diagram to enlarge · Use + to inspect details</span>${c.research.tool ? `<span class="research-tool-link">${external(c.research.tool.url, c.research.tool.label)}</span>` : ''}</figcaption></figure>` : ''}
        ${c.workflowComparison ? `<aside class="skill-workflow-comparison" aria-label="Initial and revised QA workflows"><p class="skill-section-label">The testing workflow</p><div class="skill-workflow-grid"><section class="skill-workflow-before"><p class="skill-step-label">${escape(c.workflowComparison.beforeTitle)}</p><ul>${c.workflowComparison.before.map(step => `<li>${escape(step)}</li>`).join('')}</ul></section><section class="skill-workflow-after"><p class="skill-step-label">${escape(c.workflowComparison.afterTitle)}</p><ul>${c.workflowComparison.after.map(step => `<li>${escape(step)}</li>`).join('')}</ul></section></div><p class="skill-workflow-estimate">${escape(c.workflowComparison.estimate)}</p><p class="skill-workflow-estimate-note">${escape(c.workflowComparison.estimateNote)}</p></aside>` : ''}
        <footer class="skill-takeaway"><p class="skill-section-label">${escape(c.takeaway.label)}</p><div><strong>${escape(c.takeaway.key)}</strong><p>${practiceText(c.takeaway.text)}</p></div></footer>${i === chapters.length - 1 ? nextLink : ""}
      </div>`;
    };
    const overview = () => `<div class="chapter-shell chapter-overview${highlights ? ' highlight-overview' : ''}"><header><p class="eyebrow">${escape(project.type)}${project.selected ? ` / Selected ${escape(project.selected)}` : ` / ${escape(project.theme)}`}</p><h1 id="case-title" tabindex="-1">${escape(project.title)}</h1><p class="chapter-deck">${escape(project.deck)}</p>${highlights && videos.length ? `<div class="overview-video-link">${videos.map(video => external(video.url, video.label || 'Watch video')).join('')}</div>` : ''}</header>${facts()}${project.aiArtDisclosure ? `<p class="graycanvas-ai-disclosure">${escape(project.aiArtDisclosure)}</p>` : ''}${highlights ? `<div class="case-opening-media">${openingMedia()}</div>` : figure({image:project.hero,imageAlt:project.heroAlt,caption:project.caption})}</div>`;
    const film = () => {
      const poster = project.film?.poster || project.hero;
      return `<div class="chapter-shell chapter-film film-${project.id}"><header><p class="eyebrow">02 / Project film</p><h2 tabindex="-1">${escape(project.title)}<em> in motion.</em></h2></header>${poster ? `<figure class="film-figure">${primaryVideo ? `<a class="film-preview" href="${escape(primaryVideo.url)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${escape(project.title)} film on video site (opens in a new tab)">` : '<div class="film-preview">'}<img src="assets/${escape(poster)}" alt="${escape(project.film?.alt || project.heroAlt)}">${primaryVideo ? `<span class="film-play" aria-hidden="true">${icon('play')}</span></a>` : '</div>'}<figcaption><span>${escape(project.title)} / ${escape(project.engine)}</span>${primaryVideo ? external(primaryVideo.url, primaryVideo.label || 'Watch video') : ''}</figcaption></figure>` : ''}</div>`;
    };
    const comparison = c => `<div class="castle-comparison">${c.comparison.map(item => `<div class="castle-version castle-${item.tone}"><h3>${escape(item.label)}</h3>${figure(item)}</div>`).join('')}</div>`;
    const abilitiesMarkup = () => `<ul class="ability-grid${highlights ? ' highlight-abilities' : ''}" aria-label="Four abilities">${(project.abilities || []).map((ability, i) => `<li class="ability-item" data-ability="${escape(ability.id)}"><span class="ability-number">${pad(i + 1)}</span><h3>${escape(ability.title || ability.name)}</h3>${ability.description ? `<p class="ability-description">${escape(ability.description)}</p>` : ''}${ability.mediaGroups?.length ? groups(ability.mediaGroups) : figure({image:ability.image,imageAlt:ability.title,caption:ability.caption})}</li>`).join('')}</ul>`;
    const animationStudies = items => items?.length ? '<section class="art-studies" aria-label="Original animation studies">' + items.map(item => '<article class="art-study"><h3 class="art-handwritten">' + escape(item.title) + '</h3>' + groups([{id:'BF-study-' + item.id,title:item.title,ratio:'16 / 10',items:[item]}]) + '</article>').join('') + '</section>' : '';
    const paragraphsMarkup = paragraphs => paragraphs?.length ? paragraphs.map(p => `<p>${escape(p)}</p>`).join('') : '';
    const chapterBlock = (block, index) => {
      const cards = block.cards?.length ? `<div class="chapter-info-cards">${block.cards.map(card => `<article><h4>${escape(card.title)}</h4><p>${escape(card.detail)}</p></article>`).join('')}</div>` : '';
      const features = block.features?.length ? `<div class="chapter-feature-rows">${block.features.map((feature, featureIndex) => {
        const featureMedia = groups(feature.mediaGroups);
        return `<article class="chapter-feature-row${featureMedia ? ' has-media' : ''}"><div class="chapter-feature-copy"><p class="eyebrow">${pad(featureIndex + 1)}</p><h4>${escape(feature.title)}</h4>${paragraphsMarkup(feature.paragraphs)}</div>${featureMedia}</article>`;
      }).join('')}</div>` : '';
      return `<section class="chapter-block${block.id ? ` chapter-block-${escape(block.id)}` : ''}${block.transition ? ' is-transition' : ''}" data-chapter-block="${escape(block.id || index)}"${block.eyebrow ? ` aria-label="${escape(block.eyebrow)}"` : ''}>${block.title || block.eyebrow ? `<header>${block.eyebrow ? `<p class="eyebrow">${escape(block.eyebrow)}</p>` : ''}${block.title ? `<h3>${escape(block.title)}</h3>` : ''}</header>` : ''}${paragraphsMarkup(block.paragraphs) ? `<div class="chapter-block-prose">${paragraphsMarkup(block.paragraphs)}</div>` : ''}${cards}${features}${groups(block.mediaGroups)}</section>`;
    };
    const chapter = (c, i) => `<div class="chapter-shell ${highlights ? 'highlight-chapter' : c.image || c.comparison ? 'chapter-with-media' : 'chapter-text-only'} ${c.comparison ? 'chapter-art-comparison' : ''} ${c.showAbilities ? 'chapter-with-abilities' : ''} ${c.reflection ? 'chapter-reflection' : ''} ${practice ? 'practice-chapter' : ''}"><header><p class="eyebrow">${pad(i + 1)} / ${escape(c.label)}</p><h2 tabindex="-1" id="heading-${c.id}">${escape(c.title)}</h2></header>${c.note ? `<p class="chapter-note">${escape(c.note)}</p>` : ''}${paragraphsMarkup(c.paragraphs) ? `<div class="chapter-prose">${paragraphsMarkup(c.paragraphs)}</div>` : ''}${c.blocks?.length ? `<div class="chapter-blocks">${c.blocks.map(chapterBlock).join('')}</div>` : ''}${c.showAbilities ? abilitiesMarkup() : ''}${groups(c.mediaGroups)}${animationStudies(c.animationStudies)}${c.artGallery ? `<section class="bestfriend-art-gallery" aria-labelledby="bestfriend-art-gallery-title"><header><p class="eyebrow">Original art / 02</p><h3 id="bestfriend-art-gallery-title">Scenes I drew for BestFriend</h3><p>Every image is hand-drawn game art by me.</p></header>${groups(c.artGallery, media, false)}</section>` : ''}${c.image ? figure(c) : c.comparison ? comparison(c) : ''}${i === chapters.length - 1 ? nextLink : ''}</div>`;
    const researchDiagram = type => {
      const before = type === 'text-density'
        ? '<i></i><i></i><i></i><i></i><i></i><i></i>'
        : type === 'simpler-interaction'
          ? '<i class="node"></i><i class="node"></i><i class="node"></i><i class="node"></i><i class="node"></i>'
          : type === 'active-reply'
            ? '<i class="bubble"></i>'
            : '<i class="branch branch-one"></i>';
      const after = type === 'text-density'
        ? '<i></i><i></i><i class="highlight-line"></i>'
        : type === 'simpler-interaction'
          ? '<i class="node"></i><i class="node selected-node"></i>'
          : type === 'active-reply'
            ? '<i class="bubble"></i><i class="bubble reply-bubble"></i>'
            : '<i class="branch branch-two"></i><i class="branch branch-three"></i>';
      return `<div class="research-change-diagram diagram-${escape(type)}" aria-hidden="true"><span class="diagram-before">${before}</span><span class="diagram-arrow">→</span><span class="diagram-after">${after}</span></div>`;
    };
    const researchChapter = (c, i) => `<div class="chapter-shell research-chapter research-${escape(c.id)}"><header><p class="eyebrow">${escape(c.eyebrow || `${pad(i + 1)} / ${c.label}`)}</p><h2 tabindex="-1" id="heading-${escape(c.id)}">${escape(c.title)}</h2></header>${c.inspiration ? `<div class="research-inspiration-layout">${figure(c, 'research-inspiration-figure')}<ol class="research-inspiration-flow">${c.inspiration.map((item, index) => `<li class="inspiration-step inspiration-step-${pad(index + 1)}"><span>${pad(index + 1)}</span><h3>${escape(item.title)}</h3><p>${escape(item.detail)}</p></li>`).join('')}</ol></div>` : ''}${c.testFocus ? `<p class="research-test-focus"><span>Test focus</span>${escape(c.testFocus)}</p>` : ''}${c.paragraphs?.length ? `<div class="chapter-prose">${c.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}</div>` : ''}${c.researchCards ? `<ol class="research-case-cards">${c.researchCards.map((card, index) => `<li><span>${pad(index + 1)}</span><h3>${escape(card.title)}</h3><p>${escape(card.detail)}</p>${card.participants ? `<small>${escape(card.participants)}</small>` : ''}</li>`).join('')}</ol>` : ''}${c.personas ? `<ol class="research-persona-grid">${c.personas.map((persona, index) => `<li class="research-persona persona-${pad(index + 1)}"><span class="persona-figure" aria-hidden="true"><svg viewBox="0 0 120 150" focusable="false"><path class="persona-body" d="M15 146c2-39 17-58 45-58s43 19 45 58H15Z"/><path class="persona-neck" d="M49 82h22v22H49z"/><ellipse class="persona-head" cx="60" cy="53" rx="28" ry="34"/><path class="persona-hair" d="M32 55c-3-25 9-40 29-40 20 0 31 14 28 40-8-4-13-11-16-21-9 10-24 15-41 15v6Z"/></svg></span><span class="persona-index">Participant ${pad(index + 1)}</span><h3>${escape(persona.gender)}, ${escape(persona.age)}</h3><blockquote>${escape(persona.quote)}</blockquote></li>`).join('')}</ol><p class="research-persona-note">${escape(c.personaNote)}</p>` : ''}${c.changes ? `<div class="research-test-steps">${c.changes.map((change, index) => `<article class="research-change-pair" data-research-substep="${index}"${index ? ' hidden inert aria-hidden="true"' : ''}><header class="research-pair-heading"><span class="research-change-number">${pad(index + 1)}</span><div><p class="research-step-progress">Issue ${index + 1} of ${c.changes.length}</p><h3 id="heading-${escape(c.id)}-issue-${index + 1}" tabindex="-1" data-research-heading="${index}">${escape(change.title)}</h3></div></header><div class="research-pair-flow"><section class="research-pair-card research-problem"><p class="research-card-label">Problem</p><p>${escape(change.problem)}</p><div class="research-pair-visual">${researchDiagram(change.diagram)}</div></section><span class="research-pair-connector" aria-hidden="true">→</span><section class="research-pair-card research-change"><p class="research-card-label">Change</p><p>${escape(change.response)}</p></section></div></article>`).join('')}</div>` : ''}${c.interactionIntro ? `<p class="research-interaction-intro">${escape(c.interactionIntro)}</p>` : ''}${c.interactionCards ? `<div class="research-interaction-grid">${c.interactionCards.map(item => `<article class="research-interaction-card"><div class="interaction-copy"><h3>${escape(item.title)}</h3><p>${escape(item.detail)}</p></div>${item.comparison ? comparison(item) : figure(item, 'research-interaction-figure')}</article>`).join('')}</div>` : c.inspiration ? '' : c.image ? figure(c, 'research-case-figure') : c.comparison ? comparison(c) : ''}${c.takeaway ? `<aside class="research-case-takeaway"><p class="research-card-label">What changed</p><p>${escape(c.takeaway)}</p></aside>` : ''}${i === chapters.length - 1 ? `<div class="research-case-ending"><p>${escape(project.closingReflection || 'Research changed the story. Testing changed how players could understand and respond to it.')}</p>${nextLink}</div>` : ''}</div>`;
    root.innerHTML = `<div class="reader-topbar"><a href="#${escape(from)}" class="text-link" data-back>${icon('arrow-left')}${backLabel}</a><span class="reader-project-name">${practice ? escape(project.team) + ' / ' : ''}${escape(project.title)}</span><details class="reader-mobile-toc"><summary>Contents</summary><nav aria-label="Project chapters on mobile">${toc}${sourcesMarkup}</nav></details></div>
      <aside class="reader-sidebar">${practice ? `<a class="gujian-sidebar-title" href="${escape(project.steamUrl)}" target="_blank" rel="noopener noreferrer">Swords of<br>Legends<span>Gujian / Aurogon Shanghai</span></a>` : ''}<p class="eyebrow">${escape(project.title)}</p><nav aria-label="Project chapters">${toc}</nav>${sourcesMarkup}${practice ? `<div class="gujian-source-note"><a href="${escape(project.steamUrl)}" target="_blank" rel="noopener noreferrer">Public visuals from Steam ${icon('arrow-up-right')}</a></div>` : ''}</aside>
      <div class="chapter-stage">${chapters.map((c, i) => `<section class="chapter-screen tone-${c.reflection ? 'mint' : tones[i % tones.length]}" data-chapter="${c.id}" aria-label="${escape(c.label)}" ${i ? 'aria-hidden="true" inert' : 'aria-hidden="false"'}>${practice ? i ? practiceChapter(c, i) : practiceOverview() : c.id === 'film' ? film() : i ? project.presentation === 'research' ? researchChapter(c, i) : chapter(c, i) : overview()}</section>`).join('')}</div>
      <nav class="chapter-controls" aria-label="Chapter navigation"><button class="icon-button" data-chapter-step="-1" aria-label="Previous chapter" title="Previous chapter">${icon('arrow-up')}</button><span class="chapter-counter" aria-live="polite"></span><div class="chapter-dots">${chapters.map((c, i) => `<button data-chapter-button="${i}" aria-label="${escape(c.label)}" title="${escape(c.label)}"><span></span></button>`).join('')}</div><span class="chapter-scroll-cue" aria-live="polite"></span><span class="chapter-current-label"></span><button class="icon-button" data-chapter-step="1" aria-label="Next chapter" title="Next chapter">${icon('arrow-down')}</button></nav>`;
    const panels = [...root.querySelectorAll('.chapter-screen')];
    const menu = root.querySelector('.reader-mobile-toc');
    const projectClass = `case-project-${project.id}`;
    root.classList.add(projectClass);
    if (highlights) root.classList.add('case-highlights');
    let active = 0;
    let activeSubstep = 0;
    let lastSwitch = -Infinity;
    let enabled = true;
    let restoration = null;
    let restoreFrame = 0;
    const controller = new AbortController();
    const signal = controller.signal;
    const stopFilm = bindFilmPreview(root.querySelector('a.film-preview'), project, signal);
    const localMedia = !practice ? window.PortfolioMedia.bind(root, { signal }) : null;
    const stopVideos = () => { stopFilm(); localMedia?.pauseAll(); };
    const cue = root.querySelector('.chapter-scroll-cue');
    const substepCount = (index = active) => project.presentation === 'research' && Array.isArray(chapters[index]?.changes) ? chapters[index].changes.length : 0;
    const substepIndex = (index, requested = 0) => Math.max(0, Math.min(Math.max(0, substepCount(index) - 1), Number.isFinite(requested) ? requested : 0));
    function updateChapterProgress() {
      const panel = panels[active];
      if (!panel) return;
      const max = Math.max(0, (panel.scrollHeight || 0) - (panel.clientHeight || 0));
      const overflow = max > 2;
      const ratio = overflow ? Math.min(1, Math.max(0, (panel.scrollTop || 0) / max)) : 0;
      root.classList.toggle('chapter-needs-scroll', overflow);
      root.querySelectorAll('[data-chapter-link]').forEach(link => {
        if (Number(link.dataset.chapterLink) === active) link.style.setProperty?.('--chapter-progress', String(ratio));
      });
      const hasNextSubstep = activeSubstep + 1 < substepCount();
      const compactCue = matchMedia('(max-width: 420px)').matches;
      if (cue) cue.textContent = overflow ? (ratio >= .995 ? hasNextSubstep ? compactCue ? 'Next issue' : 'Scroll again for next issue' : active === panels.length - 1 ? 'End of chapter' : compactCue ? 'Next chapter' : 'Scroll again for next chapter' : compactCue ? 'Scroll to continue' : `Scroll for more · ${Math.round(ratio * 100)}%`) : hasNextSubstep ? compactCue ? 'Next issue' : 'Scroll for next issue' : '';
    }
    const layoutReady = Promise.allSettled([document.fonts?.ready, ...[...root.querySelectorAll('img')].map(image => image.decode?.())]);
    const restoreScroll = () => {
      if (!enabled || !restoration || restoration.panel !== panels[active]) return;
      restoration.panel.scrollTop = restoration.scroll;
    };
    const cancelRestore = () => { restoration = null; cancelAnimationFrame(restoreFrame); };
    for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) root.addEventListener(event, cancelRestore, { passive: true, signal });
    for (const image of root.querySelectorAll('img')) image.addEventListener('load', restoreScroll, { signal });
    panels.forEach(panel => panel.addEventListener('scroll', updateChapterProgress, { passive: true, signal }));
    window.addEventListener('resize', updateChapterProgress, { signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopVideos(); }, { signal });
    root.addEventListener('click', event => { if (event.target.closest('[data-image]')) stopVideos(); }, { signal });
    function updateSubstepMarkup() {
      const panel = panels[active];
      const items = panel.querySelectorAll('[data-research-substep]');
      items.forEach((item, index) => {
        const visible = index === activeSubstep;
        item.hidden = !visible;
        item.inert = !visible;
        item.setAttribute('aria-hidden', String(!visible));
        const heading = item.querySelector('[data-research-heading]');
        if (visible) heading?.setAttribute('data-current-step-heading', '');
        else heading?.removeAttribute('data-current-step-heading');
      });
      syncChapterControls();
    }
    function syncChapterControls() {
      const previous = root.querySelector('[data-chapter-step="-1"]');
      const next = root.querySelector('[data-chapter-step="1"]');
      previous.disabled = active === 0 && activeSubstep === 0;
      next.disabled = active === chapters.length - 1 && activeSubstep >= Math.max(0, substepCount() - 1);
    }
    function setChapter(index, { instant = false, focus = false, notify = true, direction = 0, substep } = {}) {
      const previous = active;
      cancelRestore(); stopVideos();
      active = Math.max(0, Math.min(chapters.length - 1, index));
      activeSubstep = substepIndex(active, substep ?? (direction < 0 ? substepCount(active) - 1 : 0));
      panels[active].scrollTop = 0;
      root.classList.toggle('chapter-instant', instant || matchMedia('(prefers-reduced-motion: reduce)').matches);
      panels.forEach((panel, i) => {
        panel.classList.toggle('is-active', i === active);
        panel.style.transform = `translateY(${(i - active) * 100}%)`;
        panel.inert = i !== active;
        panel.setAttribute('aria-hidden', String(i !== active));
      });
      root.querySelectorAll('[data-chapter-link],[data-chapter-button]').forEach(link => {
        const index = Number(link.dataset.chapterLink ?? link.dataset.chapterButton);
        if (index === active) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current');
      });
      updateSubstepMarkup();
      root.querySelector('.chapter-counter').textContent = `${pad(active + 1)} / ${pad(chapters.length)}`;
      root.querySelector('.chapter-current-label').textContent = chapters[active].label;
      document.body.dataset.caseTone = chapters[active].reflection ? 'mint' : tones[active % tones.length];
      menu.open = false;
      if (focus || (previous !== active && panels[previous].contains(document.activeElement))) (panels[active].querySelector('[data-current-step-heading]') || panels[active].querySelector('h1,h2')).focus({ preventScroll: true });
      if (previous !== active) lastSwitch = performance.now();
      updateChapterProgress(); localMedia?.refresh?.();
      if (notify) onChange(route(chapters[active].id));
    }
    function setSubstep(index, focus = false) {
      if (index < 0 || index >= substepCount()) return false;
      activeSubstep = index;
      root.classList.toggle('chapter-instant', matchMedia('(prefers-reduced-motion: reduce)').matches);
      updateSubstepMarkup();
      panels[active].scrollTop = 0;
      if (focus) panels[active].querySelector('[data-current-step-heading]')?.focus({ preventScroll: true });
      lastSwitch = performance.now();
      updateChapterProgress();
      onChange(route(chapters[active].id));
      return true;
    }
    function step(direction, focus = false) {
      if (performance.now() - lastSwitch < (matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 540) || active + direction < 0 || active + direction >= chapters.length) return;
      if (direction > 0 && activeSubstep + 1 < substepCount()) { setSubstep(activeSubstep + 1, focus); return; }
      if (direction < 0 && activeSubstep > 0) { setSubstep(activeSubstep - 1, focus); return; }
      setChapter(active + direction, { focus, direction });
    }
    root.addEventListener('click', event => {
      const link = event.target.closest('[data-chapter-link]');
      if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
        event.preventDefault(); event.stopPropagation(); setChapter(Number(link.dataset.chapterLink), { focus: true });
      }
      const button = event.target.closest('[data-chapter-button]');
      if (button) setChapter(Number(button.dataset.chapterButton), { focus: true });
      const arrow = event.target.closest('[data-chapter-step]');
      if (arrow) step(Number(arrow.dataset.chapterStep), true);
    }, { signal });
    const unbind = window.HomeExperience.bindPaging({ root, enabled: () => enabled && !menu.open, panel: () => panels[active], step });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.open && !document.querySelector('dialog[open]')) { menu.open = false; menu.querySelector('summary').focus(); } }, { signal });
    document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; }, { signal });
    document.body.classList.add('case-mode');
    if (highlights || practice) document.body.dataset.caseProject = project.id;
    return {
      show(id = 'overview', state, focus = false, instant = true) {
        const requested = state?.chapter || id;
        const chapter = resolveChapter(project, requested);
        const index = chapters.findIndex(item => item.id === chapter);
        const requestedSubstep = chapter === requested && Number.isInteger(state?.substep) ? state.substep : 0;
        setChapter(index, { instant, focus, notify: false, substep: requestedSubstep });
        const scroll = chapter === requested && Number.isFinite(state?.scroll) ? Math.max(0, state.scroll) : 0;
        const intent = restoration = { panel: panels[active], scroll };
        restoreScroll();
        layoutReady.then(() => {
          if (!enabled || restoration !== intent) return;
          restoreFrame = requestAnimationFrame(() => {
            if (!enabled || restoration !== intent) return;
            restoreScroll(); restoration = null;
            updateChapterProgress(); localMedia?.refresh?.();
          });
        });
      },
      snapshot: () => ({ project: project.id, routePrefix, chapter: chapters[active].id, ...(substepCount() ? { substep: activeSubstep } : {}), scroll: panels[active].scrollTop }),
      focus: () => (panels[active].querySelector('[data-current-step-heading]') || panels[active].querySelector('h1,h2')).focus({ preventScroll: true }),
      destroy() {
        enabled = false; cancelRestore(); stopVideos(); localMedia?.destroy(); controller.abort(); unbind();
        root.classList.remove(projectClass); root.classList.remove('case-highlights'); root.classList.remove('chapter-instant');
        document.body.classList.remove('case-mode'); delete document.body.dataset.caseProject;
      }
    };
  }
  window.CaseExperience = { create, chaptersFor, resolveChapter, videosFor, primaryVideoFor, embedFor, bindFilmPreview };
})();
