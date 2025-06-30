import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

const categories = [
  {
    name: 'Getting Started',
    sections: [
      { title: 'Introduction', markdown: `Welcome to the Server 298 Manual!\n\nThis is a guide to help you improve your combat skills in the game in preparation for the Capital Clash event and other server-versus-server events in the future.` },
    ]
  },
  {
    name: 'Capital Clash',
    sections: [
      { title: 'About Capital Clash', markdown: `This is one of our most impo` },
      { title: 'Objectives', markdown: `# Co-op Mode\nTeam up with friends.` },
      { title: 'Earning Points', markdown: `# PvP Mode\nCompete against other players.` },
      { title: 'Strategy', markdown: `Coming soon!` },
    ]
  },
  {
    name: 'Combat Tips',
    sections: [
      { title: 'Defending your base', markdown: `When defending your base you need to make sure your troops are ` },
      { title: 'Attacking players', markdown: `# Abilities\nLearn about abilities.` },
      { title: 'Attacking objectives', markdown: `# Customization\nPersonalize your character.` },
      { title: 'Healing Efficiently', markdown: `# Leveling\nHow to level up.` },
    ]
  },
  {
    name: 'How To Get Stronger',
    sections: [
      { title: 'Weapons', markdown: `# Weapons\nFind and upgrade weapons.` },
      { title: 'Armor', markdown: `# Armor\nProtect yourself with armor.` },
      { title: 'Consumables', markdown: `# Consumables\nUse items to survive.` },
      { title: 'Crafting', markdown: `# Crafting\nCreate new items.` },
      { title: 'Trading', markdown: `# Trading\nTrade with others.` },
    ]
  },
  {
    name: 'Other Events',
    sections: [
      { title: 'Coming Soon', markdown: `We're working on it!` },
    ]
  }
];

function App() {
  const [selected, setSelected] = useState({cat: 0, sec: 0});

  const handleSelect = (catIdx, secIdx) => {
    setSelected({cat: catIdx, sec: secIdx});
  };

  const selectedSection = categories[selected.cat].sections[selected.sec];

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
                      selected.cat === catIdx && selected.sec === secIdx
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
        <ReactMarkdown>{selectedSection.markdown}</ReactMarkdown>
      </main>
    </div>
  );
}

export default App
