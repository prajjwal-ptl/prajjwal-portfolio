import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({ component: Portfolio })

const projects = [
  {
    number: '01', category: 'ai', type: 'PYTHON · APPLIED AI · CUSTOMER SUPPORT',
    title: 'CarePilot — Customer Support Retrieval Demo',
    description: 'A support assistant project with a self-contained browser demo and Python Streamlit source for FAQ retrieval, evidence-linked reply drafts, sentiment cues, categorization, and human-review escalation.',
    tags: ['Python', 'Streamlit', 'Sentence Transformers', 'ChromaDB', 'RAG'],
    status: 'PUBLIC BROWSER DEMO + SOURCE', visual: 'support',
    previewTag: 'CARE / PILOT · SUPPORT COPILOT', previewTitle: 'Evidence before answers.', previewSymbol: '✳',
    whatBuilt: 'I built a Python Streamlit support assistant for FAQ retrieval and evidence-linked reply drafts. It uses Sentence Transformers, ChromaDB, a keyword fallback, optional LLM drafting, sentiment/category signals, and an escalation flag. The browser demo uses local rules and sample FAQs.',
    problemSolved: 'I designed it to help support agents find relevant policy information and see the FAQ evidence behind a reply, rather than treat an unsupported answer as certain.',
    learned: 'I learned to keep retrieval, reply drafting, and human review separate. The browser demo does not call the Python backend or an LLM API.',
    improve: 'I’d test retrieval against expected FAQ IDs, include unclear, empty, and prompt-injection-style inputs, and improve confidence calibration before suggesting replies.',
    screenshotLabel: 'CarePilot demo screenshot',
    demoUrl: 'https://prajjwal-ptl.github.io/prajjwal-portfolio/projects/ai-customer-support-assistant/demo/',
    repoUrl: 'https://github.com/prajjwal-ptl/prajjwal-portfolio/tree/main/projects/ai-customer-support-assistant',
    statusNote: 'The public browser demo uses local rules and a sample FAQ; it does not call the Python backend or an LLM API. The Python app and retrieval engine are separate source files.',
  },
  {
    number: '02', category: 'web', type: 'HTML · CSS · JAVASCRIPT',
    title: 'GitHub Portfolio Website',
    description: 'The existing multi-page static website in your public GitHub repository, with home, projects, about, and contact pages, plus a GitHub Actions workflow.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive design', 'GitHub Pages'],
    status: 'LIVE · GITHUB PAGES', visual: 'github-site',
    previewTag: 'PERSONAL PORTFOLIO / WEB', previewTitle: 'Work with a clear story.', previewSymbol: '◈',
    whatBuilt: 'I built a multi-page static website with Home, Projects, About, and Contact pages using HTML, CSS, and JavaScript. GitHub Actions deploys it to GitHub Pages.',
    problemSolved: 'I organized projects, background, and contact details into one public site, with separate pages for visitors to explore.',
    learned: 'I learned to maintain separate pages with a shared stylesheet and JavaScript interactions.',
    improve: 'I’d review responsive navigation, page-to-page links, and keyboard focus, and keep the README, deployed site, and project folder in sync.',
    screenshotLabel: 'GitHub portfolio screenshot',
    demoUrl: 'https://prajjwal-ptl.github.io/prajjwal-portfolio/',
    repoUrl: 'https://github.com/prajjwal-ptl/prajjwal-portfolio',
    statusNote: 'The GitHub Pages website was checked and returned HTTP 200 on 19 October 2026. Its repository also contains the CarePilot browser demo.',
  },
  {
    number: '03', category: 'blockchain', type: 'RUST · STELLAR SOROBAN',
    title: 'Soroban Dice Game Contract Prototype',
    description: 'A public GitHub repository containing a Rust smart-contract workspace built around Stellar Soroban, with a documented dice-game contract concept.',
    tags: ['Rust', 'Stellar Soroban', 'Smart contracts', 'Blockchain'],
    status: 'PUBLIC GITHUB REPOSITORY', visual: 'blockchain',
    previewTag: 'STELLAR / SOROBAN', previewTitle: 'Code you can inspect.', previewSymbol: '◇',
    whatBuilt: 'I worked on a Rust smart-contract workspace using Stellar Soroban for a documented dice-game contract concept.',
    problemSolved: 'I documented the dice-game concept and identified that its random-number generation still needs improvement. I have not claimed this issue is fixed or that the contract is production-ready.',
    learned: 'I learned that randomness, authorization, and payout logic need careful review before a smart contract is used with real value.',
    improve: 'I’d improve randomness, review authorization and payout handling, expand tests, and document contract behavior.',
    screenshotLabel: 'Soroban dice game contract screenshot',
    demoUrl: '',
    repoUrl: 'https://github.com/prajjwal-ptl/blockchain',
    statusNote: 'Only the public source repository is linked; this card does not claim the contract is audited, production-ready, or suitable for real-value betting.',
  },
]] as const

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 })
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'web' | 'blockchain'>('all')
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  useEffect(() => {
    if (!selectedProject) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedProject])
  const visibleProjects = projects.filter((project) => activeFilter === 'all' || project.category === activeFilter)

  return (
    <main className="portfolio-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a href="#home" className="brand" aria-label="Prajjwal Patel home">
          <span className="brand-mark">P<span>.</span></span>
          <span className="brand-name">PRAJJWAL PATEL <small>PORTFOLIO / 2026</small></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? 'CLOSE −' : 'MENU +'}</button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#toolkit" onClick={() => setMenuOpen(false)}>Toolkit</a>
          <a href="#leetcode" onClick={() => setMenuOpen(false)}>LeetCode</a>
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s connect <span>↗</span></a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> TARGET ROLE · JUNIOR GENAI / PYTHON · AI/ML & DATA SCIENCE <span className="eyebrow-line" /></div>
          <h1>Junior GenAI<br />developer with <em>Python</em><span className="title-period">.</span></h1>
          <p className="hero-lede">I’m Prajjwal, a 2026 B.Tech CSE graduate targeting junior GenAI and Python roles, with interests in AI/ML and data science. Java is my main language for LeetCode.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#work">Explore my work <span>↘</span></a>
            <a className="button-text" href="#about">A little about me <span>↗</span></a>
          </div>
          <div className="hero-meta">
            <div><span className="meta-label">BASE</span><strong>Bengaluru, India <i>↗</i></strong></div>
            <div><span className="meta-label">BACKGROUND</span><strong>B.Tech CSE · 2026</strong></div>
            <div><span className="meta-label">TARGET ROLE</span><strong>Junior GenAI · Python · AI/ML · Data Science</strong></div>
          </div>
        </div>

        <div className="hero-stage" aria-label="Interactive abstract 3D orbit illustration" onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          const x = (event.clientX - bounds.left) / bounds.width - 0.5
          const y = (event.clientY - bounds.top) / bounds.height - 0.5
          setHeroPointer({ x: Math.round(x * 22), y: Math.round(y * 22) })
        }} onMouseLeave={() => setHeroPointer({ x: 0, y: 0 })}>
          <div className="stage-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="planet" style={{ translate: `${heroPointer.x}px ${heroPointer.y}px` }}> 
            <div className="planet-shine" />
            <div className="planet-ring" />
            <div className="planet-cut" />
          </div>
          <div className="floating-chip chip-python"><span className="chip-icon">J</span><span>JAVA <small>LEETCODE · DSA</small></span></div>
          <div className="floating-chip chip-ai"><span className="chip-symbol">Py</span><span>PYTHON <small>GENAI LEARNING FOCUS</small></span></div>
          <div className="floating-chip chip-api"><span className="chip-symbol">✳</span><span>GENAI · AI / ML <small>LEARNING BY BUILDING</small></span></div>
          <div className="stage-caption"><span>FIG. 01</span><span>IDEAS → WORKING SOFTWARE</span></div>
          <div className="stage-cross cross-one">+</div><div className="stage-cross cross-two">+</div>
        </div>
        <div className="hero-bottomline"><span>CURIOUS BY DEFAULT. PRACTICAL BY DESIGN.</span><a href="#work">SCROLL TO EXPLORE ↓</a></div>
      </section>

      <section className="workflow-strip" aria-labelledby="workflow-title">
        <div className="workflow-head">
          <div><span className="workflow-kicker">THE BUILD LOOP / 04 STEPS</span><h2 id="workflow-title">How I turn a problem into <em>working software.</em></h2></div>
          <span className="workflow-side">CLARITY → CODE → CONFIDENCE</span>
        </div>
        <div className="workflow-steps">
          <article className="workflow-step"><span className="workflow-index">01</span><span className="workflow-icon">⌕</span><h3>Understand</h3><p>Define the real problem, the user, and a useful outcome.</p></article>
          <span className="workflow-arrow" aria-hidden="true">↗</span>
          <article className="workflow-step"><span className="workflow-index">02</span><span className="workflow-icon">{'{ }'}</span><h3>Plan</h3><p>Break the solution into small, testable tasks.</p></article>
          <span className="workflow-arrow" aria-hidden="true">↗</span>
          <article className="workflow-step"><span className="workflow-index">03</span><span className="workflow-icon">⌘</span><h3>Build</h3><p>Write readable code and connect only what is needed.</p></article>
          <span className="workflow-arrow" aria-hidden="true">↗</span>
          <article className="workflow-step"><span className="workflow-index">04</span><span className="workflow-icon">✓</span><h3>Validate</h3><p>Test edge cases, document limits, and improve with feedback.</p></article>
        </div>
      </section>

      <section className="proof-strip" aria-label="Portfolio highlights">
        <div className="proof-intro"><span className="section-kicker">A FEW FACTS, NO FLUFF</span><p>Grounded in fundamentals.<br /><em>Built by learning.</em></p></div>
        <div className="proof-item"><strong>1,023</strong><span>LeetCode problems solved</span></div>
        <div className="proof-item"><strong>43</strong><span>LeetCode badges earned</span></div>
        <div className="proof-item"><strong>7.73</strong><span>CGPA · B.Tech CSE</span></div>
      </section>

      <section className="manifesto" id="about">
        <div className="section-kicker"><span>01 / THE PERSON BEHIND THE PROJECTS</span><span className="kicker-rule" /></div>
        <div className="manifesto-grid">
          <h2>Technology should<br />make things feel<br /><em>less complicated.</em></h2>
          <div className="manifesto-copy">
            <p>I’m a 2026 Computer Science graduate from Oriental College of Technology, Bhopal. I enjoy breaking down problems, understanding what people actually need, and turning that understanding into useful digital tools.</p>
            <p>My interest in customer-support workflows has led me toward applied AI: tools that can find the right information, assist with repetitive tasks, and keep people in control when a situation needs human judgement.</p>
            <div className="education-stamp"><span className="stamp-icon">✳</span><span><small>EDUCATION</small><strong>B.Tech · Computer Science Engineering</strong><small>ORIENTAL COLLEGE OF TECHNOLOGY, BHOPAL · CGPA 7.73</small></span></div>
          </div>
        </div>
      </section>

      <section className="leetcode-section" id="leetcode" aria-labelledby="leetcode-heading">
        <div className="section-kicker"><span>02 / LEETCODE ACHIEVEMENTS</span><span className="kicker-rule" /><span className="section-side-note">PUBLIC PROFILE SNAPSHOT · 19 OCT 2026</span></div>
        <div className="leetcode-heading-row">
          <div className="leetcode-heading-copy">
            <span className="leetcode-eyebrow"><span className="leetcode-pulse" /> PROFILE VERIFIED FROM LEETCODE PUBLIC DATA</span>
            <h2 id="leetcode-heading">A thousand problems.<br /><em>Years of consistency.</em></h2>
            <p>My problem-solving record spans interview-style algorithms, database queries, data manipulation, and repeated daily practice. The numbers and badge list below were read from my public LeetCode profile.</p>
          </div>
          <a className="leetcode-profile-button" href="https://leetcode.com/u/_Prajjwal_39_/" target="_blank" rel="noreferrer">View live LeetCode profile <span>↗</span></a>
        </div>
        <div className="leetcode-stat-grid">
          <article className="leetcode-stat leetcode-stat-featured"><span>PROBLEMS SOLVED</span><strong>1,023</strong><small>323 Easy · 528 Medium · 172 Hard</small><div className="leetcode-stat-mark">LC / 001</div></article>
          <article className="leetcode-stat"><span>GLOBAL RANK</span><strong>#32,674</strong><small>Public profile rank at snapshot time</small></article>
          <article className="leetcode-stat"><span>BADGES EARNED</span><strong>43</strong><small>Consistency, daily challenges, study plans</small></article>
          <article className="leetcode-stat"><span>LONG-RUN MILESTONE</span><strong>500 days</strong><small>Also earned the 365 Days Badge</small></article>
        </div>
        <div className="leetcode-insights-grid">
          <article className="leetcode-panel">
            <div className="leetcode-panel-heading"><div><span>01 / PROBLEM MIX</span><h3>Difficulty breakdown</h3></div><span className="leetcode-panel-icon">▥</span></div>
            <p className="leetcode-panel-copy">Medium problems make up just over half of the solved set.</p>
            <div className="difficulty-list">
              <div className="difficulty-line"><div><span>Easy</span><strong>323 <small>· 31.6%</small></strong></div><div className="difficulty-track"><i className="difficulty-easy" style={{ width: '31.6%' }} /></div></div>
              <div className="difficulty-line"><div><span>Medium</span><strong>528 <small>· 51.6%</small></strong></div><div className="difficulty-track"><i className="difficulty-medium" style={{ width: '51.6%' }} /></div></div>
              <div className="difficulty-line"><div><span>Hard</span><strong>172 <small>· 16.8%</small></strong></div><div className="difficulty-track"><i className="difficulty-hard" style={{ width: '16.8%' }} /></div></div>
            </div>
            <div className="leetcode-divider" />
            <div className="leetcode-panel-heading"><div><span>02 / LANGUAGES</span><h3>Tools used to solve</h3></div><span className="leetcode-panel-icon">{'{ }'}</span></div>
            <div className="language-achievement-list">
              <div><span className="language-token token-java">J</span><span className="language-name">Java</span><strong>958</strong><small>problems</small></div>
              <div><span className="language-token token-sql">SQL</span><span className="language-name">MySQL</span><strong>50</strong><small>problems</small></div>
              <div><span className="language-token token-pandas">Pd</span><span className="language-name">Pandas</span><strong>15</strong><small>problems</small></div>
            </div>
          </article>
          <article className="leetcode-panel topic-panel">
            <div className="leetcode-panel-heading"><div><span>03 / TOPIC STRENGTHS</span><h3>Areas I’ve practised most</h3></div><span className="leetcode-panel-icon">✳</span></div>
            <p className="leetcode-panel-copy">Topic counts can overlap because a problem may have more than one tag.</p>
            <div className="topic-achievement-list">
              <div><span>Array</span><div className="topic-track"><i style={{ width: '100%' }} /></div><strong>599</strong></div>
              <div><span>Hash Table</span><div className="topic-track"><i style={{ width: '37.6%' }} /></div><strong>225</strong></div>
              <div><span>String</span><div className="topic-track"><i style={{ width: '40.7%' }} /></div><strong>244</strong></div>
              <div><span>Math</span><div className="topic-track"><i style={{ width: '29.0%' }} /></div><strong>174</strong></div>
              <div><span>Dynamic Programming</span><div className="topic-track"><i style={{ width: '25.0%' }} /></div><strong>150</strong></div>
              <div><span>Sorting</span><div className="topic-track"><i style={{ width: '24.9%' }} /></div><strong>149</strong></div>
              <div><span>Greedy</span><div className="topic-track"><i style={{ width: '22.2%' }} /></div><strong>133</strong></div>
              <div><span>Binary Search</span><div className="topic-track"><i style={{ width: '16.2%' }} /></div><strong>97</strong></div>
            </div>
          </article>
        </div>
        <div className="badge-collection-heading"><div><span>04 / COMPLETE COLLECTION</span><h3>Every badge, in one place.</h3><p>43 earned badges from the public profile: consistency milestones, monthly challenges, and structured study plans.</p></div><span className="badge-total">43 <small>BADGES</small></span></div>
        <details className="badge-group" open>
          <summary><span><i className="badge-group-dot" />Consistency & annual milestones</span><b>12 badges <span>＋</span></b></summary>
          <div className="badge-grid">{leetcodeBadges.filter(badge => badge.group === 'consistency').map(badge => <article className="leetcode-badge-card" key={badge.name}><div className="leetcode-badge-art"><img src={badge.icon} alt="" loading="lazy" /></div><div><strong>{badge.name}</strong><small>{badge.date}</small></div></article>)}</div>
        </details>
        <details className="badge-group">
          <summary><span><i className="badge-group-dot" />Daily LeetCoding Challenges</span><b>28 badges <span>＋</span></b></summary>
          <div className="badge-grid">{leetcodeBadges.filter(badge => badge.group === 'daily').map(badge => <article className="leetcode-badge-card" key={badge.name}><div className="leetcode-badge-art"><img src={badge.icon} alt="" loading="lazy" /></div><div><strong>{badge.name}</strong><small>{badge.date}</small></div></article>)}</div>
        </details>
        <details className="badge-group">
          <summary><span><i className="badge-group-dot" />Study-plan awards</span><b>3 badges <span>＋</span></b></summary>
          <div className="badge-grid">{leetcodeBadges.filter(badge => badge.group === 'study').map(badge => <article className="leetcode-badge-card" key={badge.name}><div className="leetcode-badge-art"><img src={badge.icon} alt="" loading="lazy" /></div><div><strong>{badge.name}</strong><small>{badge.date}</small></div></article>)}</div>
        </details>
        <div className="leetcode-footnote"><span>i</span><p>Stats are a snapshot retrieved on 19 October 2026 and can change as new submissions or awards are recorded. The submission calendar and contest rating were not available from the public query, so they are intentionally not claimed here.</p><a href="https://leetcode.com/u/_Prajjwal_39_/" target="_blank" rel="noreferrer">Check latest stats ↗</a></div>
      </section>

      <section className="work-section" id="work">
        <div className="section-kicker"><span>03 / SELECTED WORK</span><span className="kicker-rule" /><span className="section-side-note">EARLY BUILDS, REAL LEARNING</span></div>
        <div className="work-heading"><h2>Selected work.<br /><em>One place.</em></h2><p>Three selected projects across applied AI, web development, and smart-contract experimentation. Explore each project’s available demo or source repository.</p></div>
        <div className="project-filters" role="group" aria-label="Filter projects">
          <button type="button" className={activeFilter === 'all' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('all')} aria-pressed={activeFilter === 'all'}>Selected projects <span>03</span></button>
          <button type="button" className={activeFilter === 'ai' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('ai')} aria-pressed={activeFilter === 'ai'}>AI & support <span>01</span></button>
          <button type="button" className={activeFilter === 'web' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('web')} aria-pressed={activeFilter === 'web'}>Web & portfolio <span>01</span></button>
          <button type="button" className={activeFilter === 'blockchain' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('blockchain')} aria-pressed={activeFilter === 'blockchain'}>Blockchain <span>01</span></button>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className={activeProject === Number(project.number) - 1 ? 'project-card project-active' : 'project-card'} key={project.number} onMouseEnter={() => setActiveProject(Number(project.number) - 1)}>
              <div className={'project-art ' + project.visual}>
                <div className="art-window">
                  <div className="portfolio-preview">
                    <div className="preview-top"><span className="mini-dot" /><span>{project.previewTag}</span><span className="ui-pill">{project.category.toUpperCase()}</span></div>
                    <div className="preview-main">
                      <span className="preview-symbol">{project.previewSymbol}</span>
                      <div><small>{project.type}</small><strong>{project.previewTitle}</strong></div>
                    </div>
                    <div className="preview-bars"><i /><i /><i /></div>
                    <div className="preview-bottom"><span>{project.tags[0]}</span><span>{project.tags[1]}</span></div>
                  </div>
                </div>
                <span className="art-index">{project.number} / {String(projects.length).padStart(2, '0')}</span>
                <span className="art-orb" />
              </div>
              <div className="project-content">
                <div className="project-meta"><span>{project.type}</span><span className={(project.demoUrl || project.repoUrl) ? "in-progress live-status" : "in-progress"}><i /> {project.status}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <div className="project-actions">{project.demoUrl && <a className="project-action project-action-primary" href={project.demoUrl} target="_blank" rel="noreferrer">{project.title === 'GitHub Portfolio Website' ? 'Open portfolio site' : 'Open live demo'} <span>↗</span></a>}{project.repoUrl && <a className="project-action" href={project.repoUrl} target="_blank" rel="noreferrer">View GitHub source <span>↗</span></a>}</div><button type="button" className="project-link" onClick={() => setSelectedProject(project)}>Read case study details <span>↗</span></button>
              </div>
            </article>
          ))}

        </div>
        
      </section>

      <section className="toolkit-section" id="toolkit">
        <div className="section-kicker"><span>04 / MY TOOLKIT</span><span className="kicker-rule" /><span className="section-side-note">LEARNING BY BUILDING</span></div>
        <div className="toolkit-heading"><h2>Core skills.<br /><em>Focused next steps.</em></h2><p>Java is my main language for LeetCode, with 1,023 problems solved. I’m building my Python foundation and learning toward junior GenAI, AI/ML, and data science work.</p></div>
        <div className="toolkit-grid">
          <div className="toolkit-card"><span className="tool-number">01</span><div className="tool-icon api-icon">J</div><h3>Java & problem solving</h3><p>My main LeetCode language, backed by consistent practice with algorithmic problems.</p><div className="tool-tags"><span>Java</span><span>DSA practice</span><span>LeetCode</span></div></div>
          <div className="toolkit-card"><span className="tool-number">02</span><div className="tool-icon python-icon">Py</div><h3>Python foundations</h3><p>Developing programming, scripting, and data-handling fundamentals for AI-focused work.</p><div className="tool-tags"><span>Python</span><span>JSON</span><span>Data basics</span></div></div>
          <div className="toolkit-card"><span className="tool-number">03</span><div className="tool-icon ai-icon">✳</div><h3>GenAI & AI/ML learning</h3><p>Exploring LLM and retrieval concepts while building toward practical AI/ML projects.</p><div className="tool-tags"><span>LLM concepts</span><span>RAG concepts</span><span>ML foundations</span></div></div>
          <div className="toolkit-card"><span className="tool-number">04</span><div className="tool-icon git-icon">▦</div><h3>Data science foundations</h3><p>Practising database queries and data manipulation through structured problem solving.</p><div className="tool-tags"><span>MySQL</span><span>Pandas</span><span>Data basics</span></div></div>
        </div>
      </section>


      {selectedProject && (
        <div className="case-overlay" onClick={() => setSelectedProject(null)}>
          <section className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-modal-title" tabIndex={-1} onClick={(event) => event.stopPropagation()}>
            <div className="case-modal-top"><span className="case-overline">CASE FILE / {selectedProject.number} · {selectedProject.status}</span><button type="button" className="case-close" aria-label="Close case study" onClick={() => setSelectedProject(null)}>×</button></div>
            <div className="case-modal-body">
              <span className="case-category">{selectedProject.type}</span>
              <h2 id="case-modal-title">{selectedProject.title}<span>.</span></h2>
              <p className="case-lede">{selectedProject.description}</p>
              <div className="project-tags case-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <figure className="case-screenshot-slot">
                <div className="case-screenshot-frame" role="img" aria-label={`Screenshot placeholder for ${selectedProject.title}`}>
                  <span className="case-screenshot-icon" aria-hidden="true">▧</span>
                  <strong>{selectedProject.screenshotLabel}</strong>
                  <span className="case-screenshot-prompt">Screenshot to be added</span>
                </div>
                <figcaption>Project screenshot</figcaption>
              </figure>
              <div className="case-grid">
                <article><span>01 / WHAT I BUILT</span><h3>What I built</h3><p>{selectedProject.whatBuilt}</p></article>
                <article><span>02 / A PROBLEM I SOLVED</span><h3>A problem I solved</h3><p>{selectedProject.problemSolved}</p></article>
                <article><span>03 / WHAT I LEARNED</span><h3>What I learned</h3><p>{selectedProject.learned}</p></article>
                <article><span>04 / WHAT I’D IMPROVE</span><h3>What I’d improve</h3><p>{selectedProject.improve}</p></article>
              </div>
              <div className="case-reality"><span className="case-reality-mark">i</span><p><strong>Project access & status:</strong> {selectedProject.statusNote}</p></div>
              <div className="case-actions"><button type="button" className="case-secondary" onClick={() => setSelectedProject(null)}>Close details</button>{selectedProject.demoUrl && <a className="button-primary" href={selectedProject.demoUrl} target="_blank" rel="noreferrer">{selectedProject.title === 'GitHub Portfolio Website' ? 'Open portfolio site' : 'Open live demo'} <span>↗</span></a>}{selectedProject.repoUrl && <a className="button-outline" href={selectedProject.repoUrl} target="_blank" rel="noreferrer">View GitHub source ↗</a>}</div>
            </div>
          </section>
        </div>
      )}

      <section className="contact-section" id="contact">
        <div className="contact-orbit"><div className="contact-orbit-ring" /><div className="contact-orbit-core">P<span>.</span></div><span className="contact-star">✳</span></div>
        <div className="contact-copy"><div className="section-kicker"><span>05 / LET’S CONNECT</span></div><h2>Ready to build<br /><em>and keep learning.</em></h2><p>I’m looking for junior GenAI opportunities with a Python focus, and entry-level work connected to AI/ML and data science. Java is my main language for LeetCode, and I’m continuing to strengthen my Python foundations.</p><div className="contact-actions"><a className="button-primary" href="mailto:patelprajjwal7@gmail.com">Email me <span>↗</span></a><a className="button-outline" href="https://github.com/prajjwal-ptl" target="_blank" rel="noreferrer">GitHub profile ↗</a><a className="button-outline" href="https://www.linkedin.com/in/prajjwalpatel/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="button-outline" href="https://prajjwal-ptl.github.io/prajjwal-portfolio/macaly-3d-portfolio/resume.pdf" download="Prajjwal_Patel_Resume.pdf">Download résumé ↓</a></div></div>
      </section>
      <footer className="footer"><a href="#home" className="footer-brand">P<span>.</span> PRAJJWAL PATEL</a><span>BUILT THROUGH PRACTICE.</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
    </main>
  )
}
