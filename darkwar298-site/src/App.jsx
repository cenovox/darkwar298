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
      { title: 'About Capital Clash', markdown: `This is one of our most important events as a server, and determines who will be in charge as the president. We can all participate in the capital clash event to earn points for our alliances, and we need to make sure that an alliance we trust to take care of the server wins the overall event.` },
      { title: 'Objectives', markdown: `Capital Clash has two main types of objectives, turrets and the capital building.\n## Capital Building\nThe capital building is the main objective for Capital Clash. Each alliance can defeat the defending toops to then occupy the capital building, similar to the armory fights we have done before. The progress for capture does not reset each time an alliance loses the capital, so if you capture 5% you will resume at 5% next time you enter. Each alliance should try to capture a turret or the capital building at least once to maximize event points for their players.\nTeams that occupt the capital building should focus on garrisoning troops inside to make sure they can defend it against attackers.\nTeams that are attacking the capital building should focus on launching multiple rallies at the same time in order to knock out all garrisoned troops before the building can be reinforced.\n\n## Turrets\nThere are four turrets surrounding the capital building. Each time one is captured, the alliance that occupies it can garrison troops inside the turret to defend it. The turrets will do damage to enemy troops garrisoned inside the capital building, and the turrets will fire faster the longer they have been held. Preventing your enemies from capturing the turrets ensures that you will have an easier time holding the main capital building for a longer period of time.` },
      { title: 'Earning Points', markdown: `Players can earn points from APC skirmishes as well as from capturing turrets and the capital building. Some alliances will focus on just skirmishing with APCs, while others will focus on objectives and try to hold the capital building to win the event or maximize points.` },
      { title: 'Strategy', markdown: `Coming soon!` },
    ]
  },
  {
    name: 'Combat Tips',
    sections: [
      { title: 'Defending your base', markdown: `When defending your base you need to make sure your APCs are recalled to base so that your strongest heroes are guarding the city gate and all of your troops are part of your defensive strength. If you are being rally attacked, you can teleport your base to dodge the rally attack before it lands. After an enemy attacks your base, you can send your troops out to attack their APC immediately after once they are weakened instead of fighting them at full strength.` },
      { title: 'Attacking players', markdown: `There are several ways to attack a player who is stronger than you for a higher chance of success.\n\n## Defeating a Base\nWhen an enemy player teleports near you, don't attack the base immediately as it will be at full defensive strength. Wait for them to send out their APCs before striking at their base while their defenses are weaker, as the heroes and troops that remain won't be as strong and you will take less troop injuries during the attack.\n\n## Attacking APCs\nWhen fighting enemy APCs that are stronger than you, wait until after they attack a target like a base or another APC, then attack them to take advantage of their weakened state. You can also attack the same APC with multiple players at once to do a lot more damage and each take less troop injuries.\n\n## Ambushing players who are rallying\nWhen you see that enemy players are rallying, wait for the rally troops to leave their base and then strike their bases immediately while they are weakly defended, or attack their APCs when they return from the rally and are weakened.` },
      { title: 'Attacking objectives', markdown: `When you want to attack an objective like a Turret, communicate with your alliance members to launch several rallies at the same time against that target. You want them all to land as close together as possible so that the enemy does not have time to reinforce with fresh troops between attacks. Because of this, you can keep APCs parked next to objectives so that if they are attacked you can rapidly reinfore with additional troops without having to wait for marching time.` },
      { title: 'Healing Efficiently', markdown: `Hitting 'Select All' and healing all of your troops at once forces you to use speedups. Instead you should select a smaller number of troops, such as 30 minutes worth of troops to heal. All of your alliance members will help you finish this within seconds and you can do this a few times in a row to heal all of your troops without wasting speedups.` },
    ]
  },
  // {
  //   name: 'How To Get Stronger',
  //   sections: [
  //     { title: 'Improve your defense', markdown: `# Weapons\nFind and upgrade weapons.` },
  //     { title: 'APC Strength', markdown: `# Armor\nProtect yourself with armor.` }
  //   ]
  // },
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
