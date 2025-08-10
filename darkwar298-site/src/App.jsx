import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './App.css'

// Redirect configuration
const redirects = {
  '/introduction': '/getting-started/introduction',
  '/server-rules/what-is-nap15': '/server-rules/what-is-nap10',
  '/other-events': '/events',
  '/other-events/coming-soon': '/events/coming-soon',
  
  // Add more redirects here as needed
  // '/old-path': '/new-category/new-section',
};

const categories = [
  {
    name: 'Getting Started',
    path: 'getting-started',
    sections: [
      { title: 'Introduction', path: 'introduction', markdownFile: '/GettingStarted_Introduction.md' },
    ]
  },
  {
    name: 'Server Rules (NAP10)',
    path: 'server-rules',
    sections: [
      { title: 'Current Server Rules', path: 'current-rules', markdownFile: '/ServerRules_CurrentNAP10Rules.md' },
      { title: 'What is NAP10 ?', path: 'what-is-nap10', markdownFile: '/ServerRules_WhatIsNAP10.md' },
      { title: 'Changelog', path: 'changelog', markdownFile: '/ServerRules_Changelog.md' }
    ]
  },
  {
    name: 'Capital Clash',
    path: 'capital-clash',
    sections: [
      { title: 'About Capital Clash', path: 'about', markdownFile: '/CapitalClash_About.md' },
      { title: 'Objectives', path: 'objectives', markdownFile: '/CapitalClash_Objectives.md' },
      { title: 'Earning Points', path: 'earning-points', markdownFile: '/CapitalClash_EarningPoints.md' },
      { title: 'Strategy', path: 'strategy', markdownFile: '/CapitalClash_Strategy.md' },
    ]
  },
  {
    name: 'Combat Tips',
    path: 'combat-tips',
    sections: [
      { title: 'Defending your base', path: 'defending-base', markdownFile: '/CombatTips_DefendingBase.md' },
      { title: 'Attacking players', path: 'attacking-players', markdownFile: '/CombatTips_AttackingPlayers.md' },
      { title: 'Attacking objectives', path: 'attacking-objectives', markdownFile: '/CombatTips_AttackingObjectives.md' },
      { title: 'Healing Efficiently', path: 'healing-efficiently', markdownFile: '/CombatTips_HealingEfficiently.md' },
    ]
  },
  // {
  //   name: 'How To Get Stronger',
  //   path: 'how-to-get-stronger',
  //   sections: [
  //     { title: 'Improve your defense', path: 'improve-defense', markdownFile: '/HowToGetStronger_ImproveDefense.md' },
  //     { title: 'APC Strength', path: 'apc-strength', markdownFile: '/HowToGetStronger_APCStrength.md' }
  //   ]
  // },
  {
    name: 'Season 2',
    path: 'season-2',
    sections: [
      { title: 'Season 2 Overview', path: 'overview', markdownFile: '/Season2_Overview.md' },
      { title: 'Week 1', path: 'week-1', markdownFile: '/Season2_Week1.md' },
      { title: 'Week 2', path: 'week-2', markdownFile: '/Season2_Week2.md' },
      { title: 'Week 3', path: 'week-3', markdownFile: '/Season2_Week3.md' },
    ]
  },
  {
    name: 'Events',
    path: 'events',
    sections: [
      { title: 'Coming Soon', path: 'coming-soon', markdownFile: '/Events_ComingSoon.md' },
    ]
  },
  {
    name: 'Other Resources',
    path: 'other-resources',
    sections: [
      { title: 'Links', path: 'links', markdownFile: '/OtherResources_Links.md' },
    ]
  }
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/:categoryPath/:sectionPath" element={<AppContent />} />
        {/* Redirect routes */}
        {Object.entries(redirects).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

function AppContent() {
  const [markdown, setMarkdown] = useState('');
  const navigate = useNavigate();
  
  // Get category and section from URL params
  const { categoryPath = 'getting-started', sectionPath = 'introduction' } = useParams();
  
  // Find category and section by path
  const category = categories.find(cat => cat.path === categoryPath) || categories[0];
  const section = category.sections.find(sec => sec.path === sectionPath) || category.sections[0];
  
  const selectedSection = section;

  const handleSelect = (catIdx, secIdx) => {
    const category = categories[catIdx];
    const section = category.sections[secIdx];
    navigate(`/${category.path}/${section.path}`);
  };

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(selectedSection.markdownFile);
        if (!response.ok) throw new Error('Markdown file not found');
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        setMarkdown('Error loading content.');
      }
    };
    fetchMarkdown();
  }, [selectedSection]);

  return (
    <div className="app-container">
      {/* Google Translate Widget - moved outside sidebar */}
      <div id="google_translate_element" className="translate-widget"></div>
      <div className="sidebar">
        <div className="site-title">298 Manual</div>
        <h2>Guide Index</h2>
        <div className="category-list">
          {categories.map((cat, catIdx) => (
            <div key={cat.name} className="category">
              <div className="category-title">{cat.name}</div>
              <ul>
                {cat.sections.map((sec, secIdx) => (
                  <li
                    key={sec.title}
                    className={
                      category.path === categories[catIdx].path && section.path === categories[catIdx].sections[secIdx].path
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleSelect(catIdx, secIdx)}
                  >
                    {sec.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <footer className="footer">Brought to you by Cenovox</footer>
      </div>
      <main className="main-content">
        <h1>{selectedSection.title}</h1>
        
        {/* Quick Navigation Tiles - Only show on Introduction page */}
        {selectedSection.path === 'introduction' && (
          <div className="tile-grid">
            <div 
              className="tile-button" 
              onClick={() => {
                const category = categories.find(cat => cat.path === 'server-rules');
                const section = category.sections.find(sec => sec.path === 'current-rules');
                const catIdx = categories.indexOf(category);
                const secIdx = category.sections.indexOf(section);
                handleSelect(catIdx, secIdx);
              }}
            >
              <h3>📋 Server Rules</h3>
              <p>Learn about NAP10 rules, current server policies, and recent changes</p>
            </div>
            
            <div 
              className="tile-button" 
              onClick={() => {
                const category = categories.find(cat => cat.path === 'season-2');
                const section = category.sections.find(sec => sec.path === 'overview');
                const catIdx = categories.indexOf(category);
                const secIdx = category.sections.indexOf(section);
                handleSelect(catIdx, secIdx);
              }}
            >
              <h3>🎯 Season 2 Tips</h3>
              <p>Master the latest season with weekly guides and advanced strategies</p>
            </div>
            
            <div 
              className="tile-button" 
              onClick={() => {
                const category = categories.find(cat => cat.path === 'combat-tips');
                const section = category.sections.find(sec => sec.path === 'defending-base');
                const catIdx = categories.indexOf(category);
                const secIdx = category.sections.indexOf(section);
                handleSelect(catIdx, secIdx);
              }}
            >
              <h3>⚔️ Basic Tips</h3>
              <p>Essential combat strategies for attacking, defending, and healing</p>
            </div>
          </div>
        )}
        
        <ReactMarkdown 
          components={{
            a: ({ href, children }) => {
              if (href && href.startsWith('/')) {
                return (
                  <a 
                    href={href} 
                    onClick={(e) => {
                      e.preventDefault();
                      // Parse the path to find category and section
                      const pathParts = href.split('/').filter(Boolean);
                      if (pathParts.length >= 2) {
                        const categoryPath = pathParts[0];
                        const sectionPath = pathParts[1];
                        const category = categories.find(cat => cat.path === categoryPath);
                        if (category) {
                          const section = category.sections.find(sec => sec.path === sectionPath);
                          if (section) {
                            const catIdx = categories.indexOf(category);
                            const secIdx = category.sections.indexOf(section);
                            handleSelect(catIdx, secIdx);
                          }
                        }
                      }
                    }}
                    style={{ color: '#d31c20', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    {children}
                  </a>
                );
              }
              return <a href={href}>{children}</a>;
            }
          }}
        >
          {markdown}
        </ReactMarkdown>
      </main>
    </div>
  );
}

export default App
