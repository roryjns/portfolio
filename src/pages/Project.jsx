import './Project.css'
import 'katex/dist/katex.min.css';
import { useParams } from 'react-router-dom'
import { InlineMath, BlockMath } from 'react-katex';
import { Carousel } from "react-responsive-carousel";

export default function Project() {
  const { projectId } = useParams()

  const projectData = {
    mutagenesis: {
      title: 'Mutagenesis',
      screenshots: [
        { src: '/portfolio/mutagenesis.gif' },
        { src: '/portfolio/mutagenesis2.png' },
        { src: '/portfolio/mutagenesis3.png' },
        { src: '/portfolio/mutagenesis4.png' },
      ],
      duration: '6 months',
      engine: 'Unity (C#)',
      introduction: (
        <>
          <p>
            Mutagenesis is a <strong>2D top-down shooter</strong> I developed in Unity for my final year university project, designed to explore
            how AI can dynamically adapt a game’s difficulty to enhance the player experience. I built the entire system, from procedural
            generation and enemy AI to the underlying <strong>dynamic difficulty adjustment (DDA)</strong> system, to explore how gameplay
            can evolve in real-time in response to player behaviour.
          </p>
          <p>
            The DDA framework is achieved through a <strong>dual-layer approach</strong>: an adaptive loot system to ensure fair but
            unpredictable resource distribution, and a genetic algorithm to evolve enemy parameters in response to player behaviour. These
            systems work in tandem to maintain fairness without relying on static difficulty modes.
          </p>
          <p>
            This project was an opportunity to push my technical and design skills further than ever before. I developed multiple advanced systems
            that required careful architectural planning and efficient communication between them, achieving a level of sophistication I
            hadn’t previously attempted when developing games. Building these interconnected systems presented a significant challenge, demanding
            a <strong>strong emphasis on modularity, performance, and clean, maintainable code</strong>. Mutagenesis ultimately represents the 
            culmination of my technical growth in Unity and my applied understanding of artificial intelligence at the time.
          </p>
        </>),
      body: (
        <>
          <h2>Dungeon generation</h2>
          <p>
            The dungeon generator was designed to create <strong>unique, replayable level layouts</strong> while maintaining a coherent structure 
            and consistent gameplay flow, which would become crucial when implementing the genetic algorithm component of the DDA system. Each 
            level consists of a series of combat rooms populated with enemies and cover, with a chance for adjacent side rooms to spawn containing 
            loot chests.
          </p>
          <p>
            Instead of long connecting corridors, the system uses paired teleporters to link rooms, allowing for instantaneous travel and
            simplifying navigation. These teleporters also serve as gating mechanisms, locking the player inside a combat room during
            encounters and unlocking it only once all enemies have been defeated, ensuring a controlled pacing of progression.
          </p>
          <p>
            The algorithm divides the generation process into distinct stages: room placement, connection linking, object population, and
            tilemap rendering. This structure allowed for efficient iteration and parameter tuning without affecting other components.
          </p>
          <a className='link' href='https://github.com/roryjns/mutagenesis/blob/main/Assets/Scripts/Dungeon%20Generator.cs'>View code</a>

          <h2>Enemy AI</h2>
          <p>
            Enemy behaviour is controlled by a <strong>finite state machine</strong>, illustrated in the diagram below. This approach made the
            logic straightforward to extend and debug, while ensuring enemies react appropriately to the player and the environment.
          </p>
          <p>
            Enemies within the same room are <strong>grouped into clusters</strong> that share the player’s last known position, allowing them to
            coordinate their movements and converge on the player’s position, rather than acting in isolation. Pathfinding is handled using
            Unity’s <strong>NavMesh</strong> system, enabling enemies to navigate efficiently around cover.
          </p>
          <p>
            While the overall enemy AI was sufficient for the purposes of the project, it is relatively simple in practice. If I were to continue
            development I would look to expand the enemy AI with features such as coordinated flanking and cover selection to create more
            intelligent group dynamics.
          </p>
          <a className='link' href='https://github.com/roryjns/mutagenesis/blob/main/Assets/Scripts/Enemy.cs'>View code</a>

          <h2>Adaptive loot system</h2>
          <div>
            <p>
              Instead of fixed drop rates, the adaptive loot system calculates weighted probabilities for all lootable items whenever an
              enemy is defeated or a chest is opened. Some <strong>baseline rules</strong> are imposed beforehand to preserve game balance
              and player expectations:
            </p>
            <ul>
              <li>The chest in the starting room always spawns a weapon to prevent forced melee-only runs.</li>
              <li>Enemies can only drop weapons or ammo that match their type.</li>
              <li>Enemies never drop armour, since its already rewarded through finishers and this would make them less important.</li>
              <li>Health and armour will never drop while the player is full, preventing stockpiling.</li>
            </ul>
            <p>
              Upon opening a chest or defeating an enemy, the drop weights for health, armour and ammo pickups are adjusted using
              a <strong>linear interpolation function</strong> that prioritises resources the player is low on:
            </p>
            <BlockMath math="W = W_0 \cdot [a+(b-a)(1-R)]" />
            <p>
              Here, <InlineMath math="W" /> is the adjusted drop weight, <InlineMath math="W_0" /> is the base weight,
              and <InlineMath math="R" /> represents the player’s current resource ratio (between 0 and 1).
              The constants <InlineMath math="a" /> and <InlineMath math="b" /> define the scaling bounds. For example,
              health and armour can scale from 0 to 2. Weapon weights are adjusted separately to encourage variety:
              the current weapon type scales down to 0.5, while others scale up to 2.5.
            </p>
          </div>
          <p>
            Once all weights are adjusted, a <strong>weighted random selection</strong> determines the actual drop, keeping loot
            unpredictable but fair. This approach preserves the excitement of traditional random drops while ensuring that
            players rarely feel starved of key resources or overloaded with redundant items.
          </p>
          <a className='link' href='https://github.com/roryjns/mutagenesis/blob/main/Assets/Scripts/Loot%20System.cs'>View code</a>

          <h2>Genetic algorithm</h2>
          <p>
            The genetic algorithm evolves a population of enemy configurations over successive levels, optimising for the overall fairness of
            combat encounters. Each level is treated as a new generation, with each enemy cluster (one in every combat room) acting as a
            candidate solution. A cluster’s ‘chromosome’ encodes key difficulty parameters: health, attack range, accuracy and damage.
            After each encounter, fairness is calculated by comparing the damage enemies dealt against how much they were expected to deal. The
            chromosome of the fairest cluster in the level is carried forward and mutated to define the next level's enemy parameters.
          </p>
          <p>
            During testing, it became clear that player behaviour strongly influenced fairness results; cautious players generally took less
            damage, while aggressive players took more, regardless of actual difficulty. To account for this, I introduced a player aggressiveness
            metric, measured by the proportion of attack time spent within close range of enemies. This value is used to scale the expected
            effectiveness accordingly, resulting in more consistent fairness readings across playstyles and a more reliable basis for evolving
            enemy difficulty.
          </p>
          <p>
            This problem highlights one of the key challenges of dynamic difficulty adjustment: accounting for the inherent variability in
            player behaviour, independent of skill level. Factoring in aggressiveness captures some of this complexity, but the algorithm
            could certainly be expanded to consider deeper context.
          </p>
          <p>
            Gameplay data was collected remotely from playtesters through Unity Analytics using two anonymised builds of the game, one with
            DDA enabled and one without. The DDA version achieved both <strong>higher peak fairness</strong> and a <strong>more consistent 
            average fairness</strong> across levels compared to the static difficulty build. Player feedback supported these results, with 
            most participants either preferring the DDA version or perceiving no noticeable difference.
          </p>
          <a className='link' href='https://github.com/roryjns/mutagenesis/blob/main/Assets/Scripts/Difficulty%20Manager.cs'>View code</a>
        </>),
      whatIlearned: (
        <>
          <p>
            Developing Mutagenesis was an incredibly rewarding challenge that pushed every aspect of my design and programming ability. I
            improved my skills in structuring complex, interdependent systems in a way that remains modular, scalable, and maintainable. More
            importantly, it gave me hands-on experience in applying AI techniques to real-time gameplay, bridging theory and practical design.
          </p>
          <p>
            This project also deepened my understanding of player psychology and game balance, showing how subtle factors like playstyle
            variability can complicate adaptive systems. Looking back, Mutagenesis represents <strong>a milestone in my technical growth</strong>, 
            which I’m eager to build upon in future projects.
          </p>
          <p>
            My dissertation documenting the development of Mutagenesis achieved a first with a grade of 76%. You can find that {' '}
            <a className="link" href='https://drive.google.com/file/d/10m_iVPWUA42SnmDAVktR1cepsgthXLM-/view?usp=sharing'>here</a>
            , and view the source code on my{' '}
            <a className='link' href='https://github.com/roryjns/mutagenesis'>GitHub</a>.
            You can <strong>play a web build</strong>  of the game on {' '}
            <a className='link' href='https://rory-simpson.itch.io/mutagenesis'>itch.io</a>.
          </p>
        </>)
    },

    rhyver: {
      title: 'Rhyver',
      screenshots: [
        { src: '/portfolio/rhyver.gif' },
        { src: '/portfolio/rhyver2.png' },
        { src: '/portfolio/rhyver3.png' },
      ],
      duration: '6 Months',
      engine: 'Unity (C#)',
      introduction: (
        <>
          <p>
            Rhyver is inspired by games such as Guitar Hero, where the player has to press the correct
            keys in time with the music as notes scroll down the screen to the player controllers at the
            bottom. Depending on when the player presses the corresponding key, they achieve a
            ‘perfect’, ‘good’ or ‘okay’ hit, or they miss the note entirely. More accurate hits score more
            points, and building up a high combo of consecutive hits will apply a multiplier. There is also
            an audio visualiser on both sides of the lane, which is synchronised to the music.
          </p>
        </>),
      body: (
        <>
          <h2>Note spawning</h2>
          <p>
            Notes spawn and de-spawn during runtime to reduce the number of objects in the scene at
            any given time. For each note, the game calculates the beat on which to spawn it, such that it
            reaches the bottom of the screen on the beat it correponds to. I faced an issue where despite
            this calculation, the notes were arriving too late. Not only were they arriving late, but the
            degree of lateness was different each time I ran the game. After days of trying to debug this, I
            realised that the game spent some time loading the audio into the scene before it could play
            it, and I needed to account for this offset when spawning the notes.
          </p>
          <a className='link' href='https://github.com/roryjns/Rhyver/blob/main/Assets/Scripts/NoteSpawner.cs'>View code</a>
          <h2>Online leaderboards</h2>
          <p>
            Each level on the level select screen has its own menu, showing the player’s personal best
            score, their highest combo and a button to view the online leaderboard for that level. The
            online leaderboards are stored on Microsoft Azure Playfab, and the data is retrieved via JSON
            requests in a custom PlayfabManager class. The player does not need to create an account, as
            Playfab can generate one automatically when the game is launched on a given device for the
            first time.
          </p>
          <a className='link' href='https://github.com/roryjns/Rhyver/blob/main/Assets/Scripts/PlayFabManager.cs'>View code</a>
        </>),
      whatIlearned: (
        <>
          <p>
            
          </p>
          <p>
            You can play the game on {' '}
            <a className='link' href='https://rory-simpson.itch.io/rhyver'>itch.io</a>.
            , or view the source code on my {' '}
            <a className='link' href='https://github.com/roryjns/rhyver'>GitHub</a>.
          </p>
        </>)
    },

    lowertones: {
      title: 'Lowertones',
      screenshots: [
        { src: '/portfolio/lowertones.gif' },
        { src: '/portfolio/lowertones2.png' },
        { src: '/portfolio/lowertones3.png' },
      ],
      duration: '10 Weeks',
      engine: 'Angular (TypeScript)',
      introduction: (
        <>
          <p>

          </p>
        </>),
      body: (
        <>
          <h2>Tech report</h2>
          <p>

          </p>

          <h2>Full stack feature</h2>
          <p>

          </p>
        </>),
      whatIlearned: (
        <>
          <p>

          </p>
        </>)
    },

    rudawful: {
      title: 'Rudawful',
      screenshots: [
        { src: '/portfolio/rudawful.gif' },
        { src: '/portfolio/rudawful2.png' },
        { src: '/portfolio/rudawful3.png' },
      ],
      duration: '1 Week',
      engine: 'Unity (C#)',
      introduction: (
        <>
          <p>
            Rudawful was made within a week for my second game jam, with the theme “running out of
            energy”. You play as Rudolph, dodging obstacles while munching on as many carrots as you
            can find to top up your energy bar. It was my second project to include online leaderboards,
            this time making players compete to finish the levels as fast as possible.
          </p>
        </>),
      body: (
        <>

        </>),
      whatIlearned: (
        <>
          <p>
            My focus for this project was to put my existing knowledge of Unity to practice in a much
            more fast-paced and efficient manner than I had done previously. Some features had to be
            scrapped (such as a tutorial level and a scrolling parallax background), but the end result felt
            more polished and complete than my previous game jam effort, which suffered from an over-ambitious
            scope of features that could not be fully realised in time for the deadline.
          </p>
        </>)
    },

    "brie-afraid": {
      title: 'Brie Afraid',
      screenshots: [
        { src: '/portfolio/brie-afraid.gif' },
        { src: '/portfolio/brie-afraid2.png' },
        { src: '/portfolio/brie-afraid3.png' },
      ],
      duration: '1 Week',
      engine: 'Unity (C#)',
      introduction: (
        <>
          <p>
            This was made for my first game jam, with the theme “something else, and cheese”. You
            play as a mouse, lost in a maze with the mission of finding your friend, but with a sinister
            reversal of roles. Cheese-themed monsters roam the maze and will hunt you if you get too
            close. The player must collect all three keys scattered across the maze to unlock the door in
            the centre and free their friend...
          </p>
        </>),
      body: (
        <>
          <h2>Enemy AI</h2>
          <p>
            The maze was created using a Unity tilemap. The enemies each patrol a section of the maze by
            simply moving to the next point in an array of points, and then moving backwards through
            the array. This made patrolling easier to implement and prevented the need for some
            alternative such as A* pathfinding. If I were to update the game, I would make the maze
            procedural to increase replayability (which would likely require an alternative patrolling
            system), improve the lighting system so the player can’t see through walls, and address
            balancing issues with the enemies appearing too suddenly and being difficult to escape from.
          </p>
        </>),
      whatIlearned: (
        <>
          <p>

          </p>
        </>)
    },
  }

  const project = projectData[projectId]

  if (!project) {
    return (
      <div className="page-not-found">
        <h1>PAGE NOT FOUND</h1>
        <a className="link" href="/portfolio/">&lt; Back</a>
      </div>
    )
  }

  return (
    <div className="project-page">
      <a className="link" href="/">&lt; Back</a>
      <div className='project-title'>{project.title}</div>
      <div className="carousel-container">
        <Carousel showIndicators={true} showArrows={true} showStatus={false} showThumbs={false}>
          {project.screenshots.map((screenshot) => (
            <img src={screenshot.src} alt={project.title} />
          ))}
        </Carousel>
      </div>

      <h2>Introduction</h2>
      {project.introduction}

      {project.body}

      <h2>What I learned</h2>
      {project.whatIlearned}
    </div>
  )
}