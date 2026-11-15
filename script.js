const profile = {
  avatar: {
    src: 'yitong-mao-portrait.jpg', alt: 'Portrait of Yitong Mao', fit: 'cover',
    desktop: [360, 396], mobile: [200, 250], narrow: [88, 104]
  },
  academicBackground: {
    ielts: { score:'7.5', date:'2026-08', label:'Aug 2026' },
    coursework: [
      'Application and Practice of Artificial Intelligence',
      'Management Operational Research',
      'Data Analysis Practice',
      'Dynamic Web Development',
      'Wilderness Management',
      'Database Management'
    ]
  }
};

// Confirmed project facts live here.
const projects = {
  cardiac: {
    id:'cardiac',caseLayout:'highlights',title:'Cardiac Lock',date:'Jul – Aug 2025',shortDate:'2025.07–08',start:'2025-07',end:'2025-08',
    type:'3D puzzle & parkour',engine:'Unreal Engine 5',theme:'Collaboration & level design',
    role:'Level design, progress management & selected gameplay implementation',
    summary:'A medical robot trapped in its own consciousness must restore power to both atria and escape before a self-destruct countdown ends.',
    deck:'A medical robot is trapped inside its own consciousness. Collect red and blue keys to restore power to both atria and open the final door. Each revival begins in the heart of the hub, but the robot’s unstable form will self-destruct after a short countdown. Surgical shortcuts connect earlier routes to new areas, turning parkour, puzzles and exploration into a way through a goal that once seemed impossible.',
    thumb:null,hero:null,heroAlt:'Cardiac Lock gameplay',caption:'Routes, pressure and a shared development plan.',
    source:'https://www.figma.com/design/xsrGiiljb15n4H3PuFoPfl/Daily-Project?node-id=382-2',videos:[{label:'Watch gameplay',url:'https://youtu.be/Tc4N4wF7ZCo'}],
    film:{poster:null,preview:null},
    chapterAliases:{film:'overview',intention:'exploration',reflection:'implementation',responsibilities:'exploration',collaboration:'implementation'},
    nextWorkLabel:'Professional practice',
    openingMediaGroups:[{id:'CL-00',title:'Gameplay overview',hint:'Select the frame to watch the gameplay video.',format:'Gameplay video',ratio:'16 / 9',items:[{image:'cardiac-level.png',video:null,imageAlt:'Annotated level overview for Cardiac Lock',caption:'Cardiac Lock — gameplay overview. Select to watch.'}]}],
    sections:[
      {id:'exploration',label:'Responsibilities',title:'My responsibilities.',paragraphs:[
        'During the two-month team project, I was responsible for level design, progress management and selected gameplay implementations.'
      ],blocks:[
        {id:'level-design',eyebrow:'Level design',title:'Routes shaped by a short life.',paragraphs:[
          'The self-destruct countdown limits how far the player can travel on a first attempt. Surgical shortcuts create quicker returns to places already explored, while the heart at the centre of the hub connects the surrounding spaces. Players move through parkour, unlock a shortcut, solve a puzzle and push into a new area.'
        ],mediaGroups:[
          {id:'CL-01',title:'Connected spaces and level routes',format:'Annotated level overview',ratio:'748 / 299',items:[{image:'cardiac-level.png',imageAlt:'Annotated level overview showing the connected Cardiac Lock spaces',caption:'The level overview shows how routes and the hub connect the team’s spaces.'}]}
        ]},
        {id:'individual-improvements',eyebrow:'After the collaboration',title:'Individual improvements.',paragraphs:[
          'After the team project, I moved part of the Blueprint logic into C++ and continued developing the game on my own.'
        ],features:[
          {title:'Surgery animation & camera',paragraphs:['I made the character’s surgical actions more expressive by improving the animation and the camera that follows it.']},
          {title:'Environment changes with SAN',paragraphs:['Inspired by Silent Hill, I added environmental effects that change with the player’s SAN value to suggest their consciousness gradually fading.']},
          {title:'Returning to previous locations',paragraphs:['After friends tested the game, I added an echo at the place where the player dies during surgery or through the self-destruct countdown. On the next revival, its position is marked on screen to help players understand the space and return to where they were.']}
        ]}
      ]},
      {id:'implementation',label:'Collaboration',title:'What the project taught me.',blocks:[
        {id:'working-together',eyebrow:'Working together',title:'A shared project without a shared build.',paragraphs:[
          'The two-month collaboration was slower than I expected. We passed large Unreal Engine project files back and forth through social media instead of using a shared collaboration tool. This led to repeated setup work and conflicting local versions.'
        ],cards:[
          {title:'Repeated setup',detail:'We initially designed one level per person. To test each level, everyone had to rebuild the basic character features and game framework on their own computer.'},
          {title:'Conflicting versions',detail:'Each person edited a local copy. When two people changed the same part of the project, combining the work led to serious conflicts.'}
        ]},
        {id:'keeping-moving',eyebrow:'How I kept the project moving',title:'One person in the project at a time.',paragraphs:[
          'Without version control, I asked the team to have only one person work in the Unreal project at a time. The others worked on tasks outside the engine, such as Blender modelling, level sketches and finding replacement assets. I used a Gantt chart and burndown chart to make this schedule easier to follow. The workaround kept the project moving, but it made collaboration inefficient.'
        ]},
        {id:'internship-learning',eyebrow:'What my internship changed',title:'Tools for a shared, consistent project.',transition:true,paragraphs:[
          'After interning at a mature game studio, I understood how much a shared project version and consistent data matter. As the studio began using Codex, its workflow grew from a UGS-centred process toward text-based Unreal assets shared through GitHub. These tools address the duplicated setup and version conflicts we struggled with on Cardiac Lock.'
        ],cards:[
          {title:'Shared versions and coordinated changes',detail:'UGS provided a shared Unreal project workflow, while GitHub made text-based asset changes easier to coordinate and review. Together, they gave the team a more consistent view of project versions and reduced duplicated setup.'},
          {title:'Text-based logic and data',detail:'I am adapting to C++ for core logic, AngelScript for gameplay scripting, and static tables for data storage. Text-based project structures also make changes easier to review and give AI tools clearer material to work with.'}
        ]},
        {id:'internship-bridge',eyebrow:'Systems design internship',title:'',paragraphs:[
          'These experiences shaped how I approached collaboration during my systems design internship on Swords of Legends.'
        ]}
      ]}
    ]
  },
  bestfriend: {
    id:'bestfriend',caseLayout:'highlights',title:'BestFriend',selected:'01',presentation:'illustrated',date:'Oct – Dec 2025',shortDate:'2025.10–12',start:'2025-10',end:'2025-12',
    ownership:'individual',
    type:'2D narrative / Metroidvania',engine:'Unity',theme:'Personal art & connected abilities',role:'All original game art, narrative, gameplay & systems design',
    summary:'A childhood friendship told through original pixel art, four abilities and a changing world.',
    deck:'A childhood friendship unfolds through original pixel art, changing ages and new paths through a connected world.',
    thumb:null,hero:null,heroAlt:'BestFriend gameplay',caption:'Drawn from a friendship. Explored through play.',
    source:'https://www.figma.com/design/xsrGiiljb15n4H3PuFoPfl/Daily-Project?node-id=99-7',
    videos:[{label:'Watch project video',url:'https://youtu.be/ZFhNAW2EAdg'}],
    cardPreview:{video:'previews/bestfriend-preview.mp4',ratio:'16 / 9'},
    film:{poster:null,preview:null},
    chapterAliases:{film:'overview',intention:'exploration',reflection:'exploration'},
    openingMediaGroups:[{id:'BF-00',title:'Project cover',hint:'A still overview of the story and its original pixel art.',format:'Static cover',ratio:'4 / 3',items:[{image:'bestfriend/bf-cover.png',video:null,imageAlt:'Eric and his friend walking before a purple castle in BestFriend',caption:'BestFriend — Eric and his friend in front of the castle.'}]}],
    abilities:[
      {id:'ladder-carrying',title:'Ladder-carrying',description:'Carry and reposition ladders to reach new paths.',image:null,video:null,mediaGroups:[{id:'BF-02',title:'Ladder-carrying',hint:'Show the full action from picking up a ladder to placing it for a new route.',format:'Short clip (5–12 seconds) or gameplay still',ratio:'16 / 9',items:[{image:'bestfriend/bf-ladder-poster.jpg',video:'bestfriend/bf-ladder.mp4',playback:'loop',imageAlt:'Carrying and using a ladder in BestFriend',caption:'Reposition a ladder to reach a new path.'}]}]},
      {id:'object-pushing',title:'Object-pushing',description:'Push objects to open a way forward.',image:null,video:null,mediaGroups:[{id:'BF-03',title:'Object-pushing',hint:'Show how an object’s position changes the route.',format:'Childhood and adulthood clips',ratio:'16 / 9',items:[{label:'Childhood',labelLang:'en',image:'bestfriend/bf-push-child-poster.jpg',video:'bestfriend/bf-push-child.mp4',playback:'loop',imageAlt:'Pushing an object as a child in BestFriend',caption:'Childhood: moving an object opens the route.'},{label:'Adulthood',labelLang:'en',image:'bestfriend/bf-grow-up-poster.jpg',video:'bestfriend/bf-grow-up.mp4',playback:'loop',imageAlt:'Pushing an object as an adult in BestFriend',caption:'Adulthood: the same ability in a changed world.'}]}]},
      {id:'growing-up',title:'Growing up',description:'Grow from child to adult as the story progresses.',image:null,video:null,mediaGroups:[{id:'BF-04',title:'Growing up',hint:'Show the change from childhood to adulthood and its effect on the world.',format:'Short clip (5–12 seconds) or gameplay still',ratio:'16 / 9',items:[{image:'bestfriend/bf-push-adult-poster.jpg',video:'bestfriend/bf-push-adult.mp4',playback:'loop',imageAlt:'Eric growing from a child into an adult in BestFriend',caption:'Growing up changes Eric’s place in the world. *Growth is usually irreversible: once Eric has grown, some narrow spaces are no longer accessible.'}]}]},
      {id:'age-switching',title:'Age switching',description:'Switch between child and adult to explore their different routes.',image:null,video:null,mediaGroups:[{id:'BF-05',title:'Age switching',hint:'Show how switching age opens or changes a route in the same place.',format:'Short clip (5–12 seconds) or gameplay still',ratio:'16 / 9',items:[{image:'bestfriend/bf-age-switch-poster.jpg',video:'bestfriend/bf-age-switch.mp4',playback:'loop',imageAlt:'Switching age to access a different route in BestFriend',caption:'The same place offers different routes at different ages.'}]}]}
    ],
    sections:[
      {id:'exploration',label:'Original art',title:'Learning to draw a feeling.',paragraphs:[
        'BestFriend began with the distance I felt growing between me and a childhood friend. When text alone could not express that feeling, I taught myself to draw and created all the game’s art. Childhood and adulthood became two ways of seeing the same world.'
      ],animationStudies:[
        {id:'happiness',title:'“happiness”',image:'bestfriend/story-playground.png',imageAlt:'A playful BestFriend scene with a child on a bright purple playground',video:null,playback:'loop'},
        {id:'grow-up',title:'“grow up”',image:'bestfriend/characters-pair.png',imageAlt:'Childhood and adulthood versions of the BestFriend characters',video:null,playback:'loop'},
        {id:'conflict',title:'“conflict”',image:'bestfriend/story-bedroom.png',imageAlt:'A tense conversation between the characters in a BestFriend bedroom scene',video:null,playback:'loop'}
      ],mediaGroups:[{id:'BF-01',title:'Childhood and adulthood characters',hint:'Compare the two original character sprites at their native pixel scale.',format:'Two-image comparison',ratio:'4 / 3',items:[{label:'Childhood',labelLang:'en',image:'bestfriend/bf-character-child.png',video:null,imageAlt:'The child version of Eric in BestFriend',caption:'Childhood.'},{label:'Adulthood',labelLang:'en',image:'bestfriend/bf-character-adult.png',video:null,imageAlt:'The adult version of Eric in BestFriend',caption:'Adulthood.'}]}],artGallery:[{id:'BF-ART',title:'Original art from BestFriend',ratio:'16 / 10',items:[
        {image:'bestfriend/story-throne.png',imageAlt:'Hand-drawn pixel-art throne-room scene from BestFriend',caption:'A quiet moment in the throne room.'},
        {image:'bestfriend/castle-child.png',imageAlt:'Hand-drawn pixel-art castle scene from Eric’s childhood',imageSwap:{image:'bestfriend/castle-adult.png',imageAlt:'Hand-drawn pixel-art castle scene from Eric’s adulthood',primaryLabel:'Childhood',alternateLabel:'Adulthood'}},
        {image:'bestfriend/gameplay-age-paths.png',imageAlt:'A hand-drawn pixel-art route that changes with Eric’s age',caption:'Age changes which paths are open.'}
      ]}]},
      {id:'implementation',label:'Abilities & progression',title:'Four abilities, a changing world.',showAbilities:true,paragraphs:[
        'Four abilities unlock along a linear journey, opening routes from Home into a connected world. Changes of age connect progression to the story of growing up.'
      ]}
    ]
  },
  mars: {
    id:'mars',caseLayout:'highlights',title:'Flip the Mars',selected:'03',presentation:'technical',date:'Feb – Jun 2026',shortDate:'2026.02–06',start:'2026-02',end:'2026-06',
    ownership:'individual',
    type:'VR cooking simulator',engine:'Unity / VR',theme:'VR interaction & data architecture',role:'VR development, information systems & physics interaction',
    summary:'A physical pan toss connects VR cooking with an organised system of food, recipes and orders.',
    deck:'A VR cooking game about flipping food, controlling doneness and serving customer orders.',
    thumb:null,hero:null,heroAlt:'Flip the Mars gameplay',caption:'A playful gesture, supported by connected systems.',
    source:'https://www.figma.com/design/Yj6HopZA4lBgHNi0z2bo1E/VR-project',
    videos:[{label:'Watch trailer',url:'https://youtu.be/bU4Y4Ct6b9c'},{label:'Watch devlog',url:'https://youtu.be/N2xhmhCa5bo'}],
    cardPreview:{video:'previews/mars-preview.mp4',ratio:'16 / 9'},
    film:{poster:null,preview:null},
    chapterAliases:{film:'overview',intention:'exploration',reflection:'exploration'},
    openingMediaGroups:[{id:'MARS-00',title:'VR cooking gameplay',hint:'A gameplay frame showing the hand, pan and stove together.',format:'Static cover',ratio:'16 / 9',items:[{image:'mars-gameplay.webp',video:null,imageAlt:'A hand, pan and stove in Flip the Mars',caption:'Flip the Mars — gameplay overview.'}]}],
    sections:[
      {id:'exploration',label:'VR cooking',title:'The pleasure of a pan toss.',paragraphs:[
        'I built the interaction around the pleasure of tossing food in a pan. Food stays with the pan through small movements, then releases for an upward toss or a hand grab. Heat flows from flame to pan to food, so a hot pan keeps cooking away from the stove.'
      ],mediaGroups:[
        {id:'MARS-01',title:'Flip',hint:'Keep the hand, pan, and food visible during the toss.',format:'Short gameplay clip (5–8 seconds)',ratio:'16 / 9',items:[{image:'mars-gameplay.webp',video:'mars/flip.mp4',playback:'loop',imageAlt:'Flipping food in a pan in Flip the Mars',caption:'Flip: a deliberate toss releases the food from the pan.'}]},
        {id:'MARS-04',title:'Juice',hint:'Show the clearest change in the food as it cooks.',format:'Short gameplay clip (5–8 seconds)',ratio:'16 / 9',items:[{image:'mars-gameplay.webp',video:'mars/juice.mp4',playback:'loop',imageAlt:'Food changing form in Flip the Mars',caption:'Juice: cooking changes the food’s form.'}]},
        {id:'MARS-05',title:'Get Paid',hint:'Keep the finished dish, customer, or order feedback visible.',format:'Short gameplay clip (5–8 seconds)',ratio:'16 / 9',items:[{image:'mars-gameplay.webp',video:'mars/get-paid.mp4',playback:'loop',imageAlt:'Serving an order in Flip the Mars',caption:'Get Paid: a finished dish completes the order.'}]}
      ]},
      {id:'implementation',label:'Data & systems',title:'Giving the simulation a structure.',paragraphs:[
        'I designed the relationships between food, recipes and tasks, using an ERD to map the system. Separating configuration from running state helped connect orders and ingredients to the cooking simulation.'
      ],mediaGroups:[
        {id:'MARS-02',title:'ERD evolution',hint:'The initial model was normalised into Recipe, Configuration, Food, Library, and Task relationships.',format:'Initial and final ERDs',ratio:'16 / 9',items:[{label:'Initial ERD',labelLang:'en',image:'mars/erd-initial.png',video:null,imageAlt:'Initial entity relationship diagram for Flip the Mars',caption:'Initial ERD.'},{label:'Final ERD',labelLang:'en',image:'mars/erd-final.png',video:null,imageAlt:'Final entity relationship diagram for Flip the Mars',caption:'Final ERD after 3NF.'}]},
        {id:'MARS-03',title:'Data storage design',hint:'Show the data structures or Inspector views with their fields and stored values clearly readable.',format:'Data structure / Inspector view',ratio:'4 / 3',items:[{label:'Food Data',labelLang:'en',image:'mars/food-data.png',video:null,imageAlt:'Food data storage in Flip the Mars',caption:'Food fields and resource references.',hint:'Show Food fields, values or resource references.'},{label:'Recipe',labelLang:'en',image:'mars/recipe-data.png',video:null,imageAlt:'Recipe data storage in Flip the Mars',caption:'A recipe connecting ingredients and configuration.',hint:'Show how a Recipe references ingredients and configuration.'},{label:'Recipe Library',labelLang:'en',image:'mars/recipe-library.png',video:null,imageAlt:'Recipe library data storage in Flip the Mars',caption:'A library collecting and reading recipes.',hint:'Show how the Recipe Library collects and reads recipes.'}]}
      ]}
    ]
  },
  graycanvas: {
    id:'graycanvas',caseLayout:'highlights',title:'The Gray Canvas',selected:'02',presentation:'research',date:'2026',
    ownership:'individual',
    type:'Interactive narrative',engine:'Godot',theme:'Research-led storytelling & responsible design',
    role:'Participant interviews, narrative design, interaction design & Godot development',
    summary:'An interactive story reshaped through participant interviews and two rounds of testing.',
    deck:'A research-led interactive narrative about everyday experience, family relationships, and choice.',
    thumb:'gray-canvas/process-map.svg',hero:'gray-canvas/canvas-cover.jpg',
    heroAlt:'A woman invites the player to draw on a large blank canvas in The Gray Canvas',
    caption:'An interactive story about the everyday experiences of people living with PKD.',
    videos:[{label:'Watch project video',url:'https://youtu.be/lWENyL8Runo'}],
    chapterAliases:{film:'overview',intention:'origin',decision:'origin',reflection:'iteration-02',research:'interviews',design:'interactions',production:'interactions',testing:'iteration-01','body-awareness':'interactions','family-context':'interactions'},
    openingMediaGroups:[{
      id:'GRAY-00',title:'The Gray Canvas',hint:'An interactive story reshaped through interviews and testing.',
      format:'Gameplay still',ratio:'16 / 9',
      items:[{
        image:'gray-canvas/canvas-cover.jpg',video:null,
        imageAlt:'A woman invites the player to draw on a large blank canvas in The Gray Canvas',
        caption:'A research-led interactive story about everyday experience, family relationships, and choice.'
      }]
    }],
    aiArtDisclosure:'Some art assets were generated with AI to help players develop a more intuitive understanding of PKD.',
    closingReflection:'I learned to ask both what players understood and whether the way I told the story could make someone feel judged.',
    sections:[
      {id:'origin',label:'Inspiration',title:'Inspiration',eyebrow:'01 / Where the story began',inspiration:[
        {title:'A condition I learned about at home',detail:'My father is a nephrologist. Through him, I first learned how polycystic kidney disease can affect patients and their families.'},
        {title:'A game to invite attention and understanding',detail:'I joined a Shanghai medical science communication initiative to help people understand everyday life with PKD. I chose an interactive story so players could encounter those experiences through images and choices.'}
      ],image:'gray-canvas/pkd-kidney-study.svg',imageAlt:'A simple illustration of kidneys with cysts, used to introduce PKD',caption:'Polycystic kidney disease can cause fluid-filled cysts to grow in the kidneys.'},
      {id:'assumptions',label:'What I assumed',title:'What I assumed',eyebrow:'02 / Before the interviews',paragraphs:[
        'Conversations with my father and my own imagination led me to expect inherited risk, workplace bias, and relationship pressure to define the experience. These were assumptions I needed to question through interviews.'
      ],researchCards:[
        {title:'Inheritance burden',detail:'Fear about passing the condition to children.'},
        {title:'Work and social bias',detail:'Being judged or treated differently.'},
        {title:'Relationship pressure',detail:'Worry about how PKD affects close relationships.'}
      ]},
      {id:'personas',label:'Persona',title:'Persona',eyebrow:'03 / Listening to participants',personas:[
        {age:'42',gender:'Woman',quote:'“I was especially worried the condition could be inherited by my child. I was so happy to hear my child had not inherited it.”'},
        {age:'40',gender:'Woman',quote:'“The condition affected my relationships when I was younger. Its impact on my body shape was my biggest difficulty.”'},
        {age:'26',gender:'Man',quote:'“The condition has not affected my life much. I only feel pain from time to time.”'},
        {age:'70',gender:'Woman',quote:'“I worry my children may inherit the condition, and I cannot eat some of the foods I love.”'}
      ],personaNote:'Anonymous silhouettes · Interview excerpts translated from Chinese.'},
      {id:'interviews',label:'What participants described',title:'What participants described',eyebrow:'04 / After listening',paragraphs:[
        'With hospital and participant consent, I asked about daily life rather than medical knowledge. The interviews showed me that experiences differed from person to person.'
      ],researchCards:[
        {title:'Family worries',detail:'Participants 01 and 04 described concern about their children inheriting the condition. Participant 01 also described relief.'},
        {title:'Body image and relationships',detail:'Participant 02 connected changes in body shape with relationships. Other interview notes described being mistaken for pregnant.'},
        {title:'Different everyday burdens',detail:'Participant 03 described occasional pain and little effect on daily life; participant 04 mentioned limits on foods she enjoys.'}
      ],takeaway:'The interviews made me question whether emphasising harm could reinforce the bias I wanted to reduce. I focused on specific daily concerns, explained possible effects factually, and left family decisions to each person.'},
      {id:'iteration-01',label:'Iteration 01',title:'Information and flow',eyebrow:'05 / First test round',testFocus:'Could players take in the information and continue through the game?',paragraphs:[
        'I enjoy writing fiction, so my first version relied on text and images. This round tested understanding and information flow before emotional experience.'
      ],changes:[
        {title:'Reducing text overload',problem:'I tried to include too many details, so players were unlikely to read or remember the main point.',response:'I narrowed the story to inherited risk, body image, care for future children, and available choices. After discussing information density with my supervising professor, I shortened the text and shared the explanation across visuals and actions.',diagram:'text-density'},
        {title:'Making interactions easier',problem:'Some puzzles were too difficult for participants who did not usually play games.',response:'I simplified the functional challenges so players could focus on the story and its emotional choices.',diagram:'simpler-interaction'}
      ]},
      {id:'iteration-02',label:'Iteration 02',title:'Emotional experience',eyebrow:'06 / Second test round',testFocus:'Did the story make room for empathy and personal choice?',reflection:true,changes:[
        {title:'Holding warmth and discomfort together',problem:'The message pile-up made care feel only oppressive, and players could not respond. Testing reminded me that attention can feel warm and uncomfortable at the same time.',response:'I replaced the pile-up, softened the ending, and added a reply action. Players can acknowledge the care while communicating their discomfort.',diagram:'active-reply'},
        {title:'Keeping family decisions open',problem:'The chapter presented one reproductive option so forcefully that players worried it could make parents who chose differently feel blamed.',response:'I made risk reduction optional and rewrote the wish for a child around love and responsibility. I adjusted the interaction and chose calmer, slightly sad music, giving family decisions room to remain personal.',diagram:'open-choices'}
      ]},
      {id:'interactions',label:'Turning findings into interactions',title:'Turning findings into interactions',eyebrow:'07 / From research to play',interactionIntro:'The findings shaped how the story makes everyday changes and family questions tangible, while leaving room for personal choice.',interactionCards:[
        {title:'Making body changes visible over time',detail:'Players turn a clock hand and watch the character change in a mirror, responding to participants’ accounts of body image. I built the interaction in Godot.',comparison:[
          {label:'Before',tone:'child',image:'gray-canvas/mirror-before.jpg',imageAlt:'A character stands in front of a mirror before the time interaction',caption:'Before turning the clock.'},
          {label:'After',tone:'adult',image:'gray-canvas/mirror-after.jpg',imageAlt:'The character’s body changes in the mirror after the time interaction',caption:'The mirror changes as time moves forward.'}
        ]},
        {title:'Placing inheritance within family relationships',detail:'A family scene makes inherited risk tangible through relationships and keeps personal decisions open.',image:'gray-canvas/family-inheritance.png',imageAlt:'A family relationship scene from The Gray Canvas, with the main character highlighted among relatives',caption:'A family scene brings inherited risk into the context of relationships.'}
      ]}
    ]
  },
  deliveryman: {
    id:'deliveryman',caseLayout:'highlights',title:'Deliveryman',timelineLabel:'Earlier',type:'Parkour / third-person action',engine:'UEFN',theme:'Early experiment',role:'UEFN prototyping & level experiments',
    summary:'My first UEFN experiment: delivery missions, parkour and third-person action in a playable level.',
    deck:'An early UEFN game combining dangerous deliveries, parkour and third-person action.',
    thumb:null,hero:null,heroAlt:'Deliveryman gameplay',caption:'Following curiosity into a playable level.',
    source:'https://www.figma.com/design/xsrGiiljb15n4H3PuFoPfl/Daily-Project?node-id=3-2',film:{poster:null,preview:null},
    chapterAliases:{film:'overview',reflection:'exploration'},
    openingMediaGroups:[{id:'DEL-00',title:'Project cover',hint:'A representative gameplay still from the final UEFN version.',format:'Static cover',ratio:'16 / 9',items:[{image:null,video:null,imageAlt:'Deliveryman video cover',caption:'Deliveryman — gameplay overview.'}]}],
    sections:[{id:'exploration',label:'First UEFN project',title:'An idea I could play.',paragraphs:[
      'I used UEFN to bring delivery missions, parkour, combat and NPC conversations into a playable level. It was my first game-development experiment, driven by curiosity before I had a clear design process.'
    ],mediaGroups:[{id:'DEL-01',title:'Delivery, parkour, and combat',hint:'Show how a delivery objective connects to movement or combat in the final build.',format:'Short gameplay clip (5–12 seconds) or still',ratio:'16 / 9',items:[{image:null,video:null,imageAlt:'Delivery missions, parkour or combat in the UEFN Deliveryman project',caption:'Trying delivery missions, movement and action within one playable space.'}]}]}]
  },
  alive: {
    id:'alive',teamLead:true, kind:'jam', showInJourney:false, word:'Alive', title:'No Sleep No Life', date:'Jul 2025', start:'2025-07',
    type:'2D platformer', engine:'Unity', theme:'Everything is Alive',
    event:'CIGA Gamejam', duration:'48 hours', teamSize:6,
    teamComposition:[{role:'Programming',count:1},{role:'Design',count:1},{role:'Art',count:4}],
    role:'Lead design & all programming',
    summary:'A girl who wants to stay in bed, a room full of noisy objects, and a little more time to sleep.',
    deck:'Play as an office worker who would rather stay asleep. Move through a 2D room and interact with noisy objects to quiet them, buying a little more sleep.',
    thumb:'jams/alive-screen-clock.png', hero:'jams/alive-screen-clock.png',
    heroAlt:'No Sleep No Life gameplay showing a sleepy character and countdown clock',
    thumbAlt:'No Sleep No Life gameplay with a sleepy character and countdown clock',
    caption:'No Sleep No Life gameplay.',
    projectUrl:'https://www.gmhub.com/game/7496', videoUrl:'https://youtu.be/FRubGKOd_E0',
    film:{poster:'jams/alive-screen-clock.png',preview:null},
    sections:[
      {id:'jam',label:'The idea',title:'The idea',paragraphs:[
        'Everything is Alive reminded me of the animatronics coming to life in Five Nights at Freddy’s. We wanted to borrow its rhythm of reading clues, recognising something unusual and dealing with it quickly to keep going. In our game, that became a struggle to quiet a noisy room and stay asleep.',
        'None of us had developed a game before. I had only just started learning Unity through 2D platformer tutorials on Bilibili, so I took on the programming and chose a 2D game I had some idea how to build.'
      ],mediaGroups:[
        {id:'NSNL-02',title:'Noisy objects',hint:'Different objects disturb the room in different ways.',ratio:'16 / 9',items:[{label:'Lamp',labelLang:'en',image:'jams/alive-screen-lamp.png',ratio:'3 / 2',imageAlt:'A giant red lamp hangs over the small girl in her bedroom',caption:'A giant lamp turns an everyday object into a source of noise.'},{label:'Teddy bear',labelLang:'en',image:'jams/alive-screen-bear.png',ratio:'4 / 5',imageAlt:'The girl walks beside a giant teddy bear as pink particles fill the room',caption:'The oversized teddy bear fills the room as the girl tries to sleep.'}]}
      ]},
      {id:'planning',label:'Too much brainstorming',title:'Too much brainstorming',paragraphs:[
        'That was why I began with an open discussion. But I had no experience organising one: we had plenty of ideas and no concrete plan. The hardest part of the jam was getting past that point. By the end of the first day, we still had no agreed gameplay, and we parted on bad terms.',
        'That night, I worked from what I could actually program. I kept the idea of spotting and dealing with unusual events, reduced it to a simple side-scrolling platformer, and stayed up building the first character controls and level. When I shared the plan in our WeChat group, I could sense that people were not enthusiastic. After talking it through, they finally agreed to go ahead.'
      ]},
      {id:'collaboration',label:'Specified task is important!',title:'Specified task is important!',paragraphs:[
        'Most of the team were artists, so alongside development I also assigned their tasks. I wanted to give them freedom, but my briefs left too much open: I had overlooked image resolution and a consistent art style.',
        'Xiaoxiu, one of our artists, patiently explained how to communicate with the art team. I am still grateful for that. With their help, I began giving clearer requirements, something I have carried into later collaborations.'
      ],image:'jams/alive-site.png',imageAlt:'The No Sleep No Life team presenting their game at the CIGA Gamejam venue',caption:'At CIGA Gamejam, learning to develop a game together.'},
      {id:'reflection',label:'Reflection',title:'Reflection',reflection:true,paragraphs:[
        'We finished a simple but complete game. I kept learning from video tutorials as I worked, while the team brought the art and programming together. For the first time, I experienced the whole process: turning a plan into tasks, developing in parallel, integrating the work and exporting a build.',
        'What stayed with me was the importance of a structured process. Both our stalled discussion and my unclear tasks came from not having one. Developing games can be joyful, but I learnt that turning ideas into a game still needs a clear way of working.'
      ]}
    ]
  },
  collector: {
    id:'collector', kind:'jam', showInJourney:false, word:'Collector', title:'Sale Ends in 3 Minutes', date:'Oct 2025', start:'2025-10',
    type:'Shopping / interface game', engine:'Unity', theme:'Collector',
    event:'Ludum Dare', duration:'48 hours', teamSize:6,
    teamComposition:[{role:'Programming',count:2},{role:'Design',count:2},{role:'Art',count:2}],
    role:'UI programming & game design',
    summary:'The sale is almost over. Collect bargains in a familiar-looking game store before your time or money runs out.',
    deck:'The autumn sale ends in three minutes. Browse a Steam-like store and fill your library with discounted games before time or money runs out. A final score asks what all those purchases were worth.',
    thumb:'jams/collector-cover.jpg', hero:'jams/collector-cover.jpg',
    heroAlt:'Title screen for Sale Ends in 3 Minutes, a fake storefront packed with game covers',
    caption:'The title screen of our fictional game store, STREAM.',
    projectUrl:'https://ldj.am/58/sale-ends-in-3-minutes',
    film:{poster:'jams/collector-cover.jpg',preview:null},
    openingMediaGroups:[
      {id:'SALE-00',title:'Title screen',hint:'The title screen introduces the final three minutes of the sale.',ratio:'16 / 9',items:[{image:'jams/collector-cover.jpg',imageAlt:'Sale Ends in 3 Minutes title screen with a red three over a collage of game art',caption:'Sale Ends in 3 Minutes.'}]}
    ],
    sections:[
      {id:'jam',label:'The idea',title:'The idea',paragraphs:[
        'Collector made our lead programmer think of the Steam library. Collecting games was something we all knew, including buying games we did not really want just because they were cheap. I suggested setting the game in the last three minutes of an autumn sale.',
        'We wanted to recreate the store, library and cart so players could step into that familiar habit. When time or money ran out, the game would assess their purchases. I hoped it would encourage a shift from collecting cheap games indiscriminately to thinking about which ones they actually wanted.'
      ],mediaGroups:[{id:'SALE-01',title:'Autumn sale storefront',hint:'Discounted game listings, available budget and purchase options.',ratio:'16 / 9',items:[{image:'jams/sale-store.jpg',imageAlt:'Autumn Sale storefront with discounted game cards, a one thousand dollar budget and purchase options',caption:'The storefront puts discounted games and the available budget in view.'}]}]},
      {id:'teamwork',label:'Learning from the team',title:'Learning from the team',paragraphs:[
        'One of the best surprises of this jam was how much I learnt from my teammates about dividing up game systems and working together. Two of them were working as game designers at Ubisoft. From the start, they asked everyone to upload all our assets to separate folders on a shared Google Drive. Having our materials organised in one place made development much more efficient.',
        'Our discussions also had a clear process. Each person presented an idea with a simple proposal for how it could work. The others scored it for feasibility, fit with the theme, originality and expressive potential. We then took the highest-scoring proposal and brainstormed together to develop it further.',
        'I liked how this gave everyone room to shape the game while helping us choose a direction efficiently. We could arrive at something everyone was reasonably happy with and keep the discussion moving.'
      ],mediaGroups:[
        {id:'SALE-03',title:'Shared asset organisation',hint:'Shared folders kept the team’s materials organised.',optional:true,ratio:'16 / 9',items:[{image:'jams/sale-drive-redacted.png',imageAlt:'Shared Google Drive GameJams folders for the team’s resources, design, programming, arts and agenda',caption:'A shared Drive kept team resources in one place.'}]}
      ]},
      {id:'interface',label:'My part',title:'My part',paragraphs:[
        'I handled the UI generation, layout, page transitions and interface visuals. I wanted the style and behaviour to feel close to Steam, helping players settle into the situation without having to learn an unfamiliar interface.',
        'Players could buy a game immediately to save time, or add it to the cart and purchase several together for more deliberate planning. My work connected the screens through which those decisions happened.'
      ],mediaGroups:[
        {id:'SALE-02',title:'Cart & library',hint:'The cart collects purchases before the library records the owned games.',ratio:'16 / 9',items:[{label:'Shopping cart',labelLang:'en',image:'jams/sale-cart.jpg',imageAlt:'Shopping cart with three discounted games, item prices and an estimated total',caption:'The cart shows selected games and the final purchase total.'},{label:'Game library',labelLang:'en',image:'jams/sale-library.jpg',imageAlt:'Library page showing collected games in a grid',caption:'The library records the games the player has collected.'}]}
      ]},
      {id:'collaboration',label:'Understand work boundary',title:'Understand work boundary',paragraphs:[
        'This was the first time I used AI to help with development. Writing individual features was not my main difficulty; understanding the boundary of my role was. I often put game-data logic directly into the UI, while some of my static UI templates had no interface for receiving data at all.',
        'Through repeated discussions with the programmer responsible for the game data and logic, I gradually understood my part: display behaviour and page transitions, with clear interfaces for both static and changing data. I am very grateful to him. His understanding of program design has helped me in every project since.'
      ],image:'jams/collector-site.png',caption:'Developing the store together during Ludum Dare.'},
      {id:'reflection',label:'Reflection',title:'Reflection',reflection:true,paragraphs:[
        'Our design was too large for the time available. To finish the full loop and communicate the consequences at the end, we cut details such as an Epic pop-up joke and purchase notifications intended to strengthen feedback. We delivered the journey from entering the game to shopping and receiving a score and one of several endings.',
        'Looking back, the shopping itself had weak feedback and too little variation. I had treated purchase feedback as something we could trim, but it also helped players feel and understand their actions. A complete ending could not carry that whole experience.',
        'I learnt that piling features into my own part could leave teammates unable to use it and cost us time reworking the connections. I also came away feeling that gameplay matters most: a design idea needs to reach the player through understandable actions and strong feedback. That is what draws me to games.'
      ],mediaGroups:[
        {id:'SALE-04',title:'Purchase receipt & ending',hint:'The receipt summarises the purchase outcome and the ending assigns a final rank.',ratio:'16 / 9',items:[{label:'Purchase receipt',labelLang:'en',image:'jams/sale-receipt.jpg',imageAlt:'Sale Ends in 3 Minutes purchase receipt with total games, original price, game count and potboiler count',caption:'The receipt summarises the player’s purchase history.'},{label:'S-rank ending',labelLang:'en',image:'jams/sale-rank.jpg',imageAlt:'S-rank ending screen with Gabe’s Favorite Child result',caption:'The final result connects the shopping run to its ending.'}]}
      ]}
    ]
  },
  mask: {
    id:'mask', kind:'jam', showInJourney:false, word:'Mask', title:'Mousequrade', date:'Jan 2026', start:'2026-01',
    type:'Top-down / two-player', engine:'Unity', theme:'Mask',
    event:'Global Game Jam', duration:'48 hours', teamSize:4,
    teamComposition:[{role:'Programming',count:2},{role:'Art',count:2}],
    role:'Programming & game design',
    summary:'One cat, one disguised mouse, and a crowded street. Blend in with the crowd or spot the player hiding among it.',
    deck:'A two-player cat-and-mouse game on a crowded street. The mouse disguises itself as a passerby and imitates their behaviour; the cat must find and catch it without attacking innocent people.',
    thumb:'jams/mask-site.png', hero:'jams/mask-site.png',
    heroAlt:'Four teammates standing in front of a Global Game Jam China backdrop',
    caption:'Mousequrade: hiding in plain sight, with another player watching.',
    videoUrl:'https://youtu.be/e8vyVXawwEk',
    film:{poster:'jams/mask-film.jpg', alt:'Mousequrade gameplay video still', preview:null},
    sections:[
      {id:'jam',label:'The idea',title:'The idea',paragraphs:[
        'Mask immediately made me think of disguise. My first idea was a management game about crafting masks for professional assassins, but it would need too many different assets for our two artists. A cat-and-mouse game offered more ways to reuse the same artwork while keeping disguise at its centre.',
        'We made it a two-player game to suit the lively atmosphere of a jam and reduce the amount of AI we had to program. The mouse hides among NPCs by copying their appearance and behaviour, while the cat watches for a mistake. As time passes, the cat can choose buffs that improve its chances of finding the mouse.'
      ],mediaGroups:[
        {id:'MOU-01-PLUS',title:'MOU01 PLUS',ratio:'16 / 9',items:[{image:'jams/mousequrade/mou01-plus-poster.jpg',video:'jams/mousequrade/mou01-plus.mp4',playback:'loop',imageAlt:'Mousequrade MOU01 PLUS gameplay clip'}]}
      ]},
      {id:'interactions',label:'My part',title:'My part',image:'jams/mask-site.png',imageAlt:'The four-person Mousequrade team at Global Game Jam',caption:'The Mousequrade team at Global Game Jam.',imageAfterMedia:true,paragraphs:[
        'I programmed both player characters and their interactions with each other and the NPCs. Smooth controls mattered, but so did what happened when the mouse disguised itself or the cat attacked. After the previous jam, we put much more attention into the gameplay, especially the process of judging a cat’s attack.',
        'I also handled all the UI, the timer and its events, and the opening animation in Unity Timeline. The timer sent events to bring up UI at the right moments, connect it to the game’s data and change the music. Together, these parts let the game follow the flow we had designed.'
      ],mediaGroups:[
        {id:'MOU-01',title:'MOU01',ratio:'16 / 9',items:[{image:'jams/mousequrade/mou01-poster.jpg',video:'jams/mousequrade/mou01.mp4',playback:'loop',imageAlt:'Mousequrade MOU01 gameplay clip'}]},
        {id:'MOU-02',title:'Disguise and attack result',ratio:'16 / 9',items:[{label:'Mouse disguise',labelLang:'en',image:'jams/mousequrade/mou02-disguise-poster.jpg',video:'jams/mousequrade/mou02-disguise.mp4',playback:'loop',imageAlt:'The mouse using a disguise to blend in with NPCs'},{label:'Cat attack',labelLang:'en',image:'jams/mousequrade/mou02-attack-poster.jpg',video:'jams/mousequrade/mou02-attack.mp4',playback:'loop',imageAlt:'The result of the cat attacking a suspected mouse'}]},
        {id:'MOU-03',title:'MOU03',ratio:'16 / 9',items:[{image:'jams/mousequrade/mou03-poster.webp',video:'jams/mousequrade/mou03.mp4',playback:'loop',imageAlt:'Mousequrade MOU03 gameplay clip'}]}
      ]},
      {id:'perfectionism',label:'The process',title:'The process',paragraphs:[
        'The way we worked together felt much more familiar after the previous jam. Our development speed had improved enormously: by the second evening, almost every feature was in place. Then the problems started.',
        'I was unhappy with small details in my part, especially the reliability of UI pop-ups. When I changed their logic, I broke the connection to the game data again. One fix led to another, and I spent the night patching things back together. My perfectionism had kept me awake until morning; by the final day I had no energy left for further improvements or new features.'
      ]},
      {id:'reflection',label:'Reflection',title:'Reflection',reflection:true,paragraphs:[
        'Our overall workflow had improved: discussing a direction, developing in parallel and delivering a build all felt much more manageable, especially in the first part of the jam. But I let perfectionism dictate an unreasonable all-nighter. We were absorbed in details while something as important as the map went unnoticed.',
        'I also need to look at the screen from the perspective of someone who knows nothing about our game. What can they understand at a glance, and what will stay with them? I want to keep hold of the parts that matter most and give the game’s strongest moments room to be seen.'
      ]}
    ]
  },
  anchor: {
    id:'anchor',teamLead:true, kind:'jam', showInJourney:false, word:'Anchor', title:'Debt of the Deep', date:'Aug 2026', start:'2026-08',
    ownership:'team',
    type:'2D diving', engine:'Unity', theme:'Anchor',
    event:'CIGA Game Jam', duration:'48 hours', teamSize:7,
    teamComposition:[{role:'Programming',count:1},{role:'Design',count:2},{role:'Art',count:4}],
    role:'Team lead, lead design & all programming',
    summary:'Dive to repay a debt, using one grappling gun to move through the deep and collect resources before your oxygen runs out.',
    deck:'Dive into the deep to repay a debt. Use a grappling gun to move, dodge enemies and gather resources, then return to the boat before your oxygen or health runs out. Upgrade your equipment and earn enough before the allotted days are over.',
    thumb:'jams/deep-background.webp', hero:'jams/deep-background.webp',
    heroAlt:'Debt of the Deep shown on a television during the jam',
    caption:'Debt of the Deep: one grappling gun for movement and collecting resources.',
    videoUrl:'https://youtu.be/ZYG7qyPPc6Q',
    film:{poster:'jams/deep-background.webp', alt:'Debt of the Deep gameplay video still', preview:null},
    sections:[
      {id:'jam',label:'The idea',title:'The idea',paragraphs:[
        'An anchor dropping from a boat into the sea immediately suggested diving to us. I was also interested in how a ship raises its anchor to move and drops it to stay still. That separation between movement and stillness made me think of a grappling gun, and of a diver moving through the water by hooking onto points.',
        'At first, the diver carried two hooks: one for movement and one for collecting resources. Thinking about “less is more”, I combined both actions in a single gun. Avoiding enemies, gathering resources and upgrading equipment gave the movement a purpose and a sense of progression. Each return to the boat counts as a day, so players must repay their debt within a limited number of dives.'
      ],mediaGroups:[
        {id:'DEEP-01',title:'Gameplay overview',hint:'Show a full dive with oxygen, health and collected resources visible.',ratio:'16 / 9',items:[{image:'jams/deep-01-poster.jpg',video:'jams/deep-01.mp4',playback:'loop',imageAlt:'Debt of the Deep gameplay with oxygen, health and collected resources visible',caption:'A dive for resources, with oxygen and health limiting the time underwater.'}]},
        {id:'DEEP-02',title:'Two uses for one grappling gun',hint:'Show the grappling gun moving the diver and collecting resources.',ratio:'16 / 9',items:[{label:'Grappling movement',labelLang:'en',image:'jams/deep-02-movement-poster.jpg',video:'jams/deep-02-movement.mp4',playback:'loop',imageAlt:'The diver moving towards a hook point with the grappling gun',caption:'Hook onto a point to move through the water.'},{label:'Resource collection',labelLang:'en',image:'jams/deep-02-collection-poster.jpg',video:'jams/deep-02-collection.mp4',playback:'loop',imageAlt:'The same grappling gun collecting underwater resources',caption:'Use the same gun to gather resources.'}]}
      ]},
      {id:'leadership',label:'Leading the team',title:'Leading the team',paragraphs:[
        'A year after my first jam, I was the team leader again, as well as lead designer and the only programmer. Everyone shared an idea and a rough proposal. Two proposals received the most votes, and I brought their strongest parts together: the grappling gun’s movement and stillness, and a diving game with progression.',
        'In about three hours on the first day, we had brainstormed, agreed on a design and reached a shared understanding of the game and the work ahead. I delegated art task planning, music and sound sourcing, and map design to the other two designers. They worked out the artists’ tasks in more detail while I began dividing the game into systems.'
      ],mediaGroups:[{id:'DEEP-05',title:'Team brainstorm',hint:'The team’s shared brainstorm and original game ideas.',ratio:'16 / 9',items:[{image:'jams/deep-brainstorm.png',imageAlt:'The team’s Debt of the Deep brainstorm and shared game ideas',caption:'Our shared Figma brainstorm.'}]}]},
      {id:'systems',label:'Building the game',title:'Building the game',paragraphs:[
        'I handled all the programming, from dividing up the systems to implementing them and integrating the final build. With the direction clear, I could immerse myself in development, checking my phone regularly to answer the team’s questions. The first night centred on character controls, the camera, hook points and collectibles.',
        'The next morning, I connected the diver to depth regions so that oxygen drained at different rates at different depths. Enemy behaviour and spawning followed, using those regions to organise where enemies appeared. The upgrade shop and day system completed the loop between diving and returning to the boat.'
      ],mediaGroups:[
        {id:'DEEP-03',title:'Return to the boat & upgrade',hint:'Return to the boat to spend collected resources on equipment upgrades.',ratio:'16 / 9',items:[{image:'jams/deep-upgrade.png',imageAlt:'Equipment progression concepts for Debt of the Deep',caption:'Resources from a dive can improve the equipment for the next one.'}]}
      ]},
      {id:'integration',label:'Bringing it together',title:'Bringing it together',paragraphs:[
        'By the time the systems were ready, the artists had finished much of the main artwork. I integrated the player and enemy animations, hook points and collectibles, then worked with the two other designers to adjust the map around the player’s actual movement and survival values. We also brought in the core sound effects and music.',
        'There were small disagreements between the designers and artists on the second day, but I helped resolve them and we kept moving. On the final day, I brought the foreground, middle ground and background layers into the engine and finished the sound and gameplay polish before exporting the game. I felt much more at ease holding the whole process together.'
      ],image:'jams/anchor-site.png',caption:'Debt of the Deep on screen during CIGA Game Jam.'},
      {id:'reflection',label:'I was proud of us.',title:'I was proud of us.',reflection:true,paragraphs:[
        'I love how this game turned out. We completed the content we had planned, and the final artwork went beyond what I had imagined. I was proud of my teammates and myself. I could really feel that I had grown and was a little closer to becoming the kind of team leader I wanted to be. I also had a lot of fun playing it.',
        'Some things still needed work. The collectibles’ appearance did not communicate their value clearly, and some hook points were easy for a new player to miss. Collecting an item also needed stronger feedback so players could immediately understand what they had picked up.',
        'After the jam, I found risks in the way I had built the collectible and enemy systems. My grappling implementation also could not attach to moving objects. Those are concrete limits I want to address, but they do not take away how happy I am with what we made.'
      ]}
    ]
  }
};

// One ordered source for navigation, ownership, the main flow, and next-work links.
const portfolioSections = [
  {id:'story',label:'Story',works:['bestfriend'],legacy:['skill','skill/storytelling','selected','selected/01','archive/normal']},
  {id:'system',label:'System',works:['mars'],legacy:['skill/systems','selected/02'],method:{
    paragraphs:[
      'Management Operational Research taught me to examine dependencies through methods such as AON. I bring that thinking to game systems: understanding what depends on what, how a change affects other parts, and where responsibilities need to be clear.',
      'Coursework in data analysis, dynamic web development, and database management trained me to follow information across contexts. In games, I pay attention to how stored data becomes runtime state and how interfaces pass that state between systems.'
    ],emphasis:['AON','dependencies','stored data','runtime state','interfaces']
  }},
  {id:'research',label:'Research',works:['graycanvas'],legacy:['skill/research']},
  {id:'collaboration',label:'Collaboration',works:['anchor','mask','collector','alive','cardiac'],legacy:['skill/collaboration','more','archive/jam'],
    introduction:'I have also taken part in **4** game jams (**2** as team leader) and worked on a **2-month** collaborative project.'},
  {id:'internship',label:'Internship',works:['internship'],legacy:['archive/internship'],
    introduction:'I am a systems design intern on **Swords of Legends**, a **large-scale single-player action game**.'}
];

const archiveOrder = ['bestfriend','graycanvas','mars','cardiac','deliveryman'];
const jamOrder = portfolioSections.flatMap(section => section.works).filter(id => projects[id]?.kind === 'jam');

// Professional practice remains separate from authored game projects and is
// deliberately text-led until any material is cleared for publication.
const practices = {
  "internship": {
    "id": "internship",
    "kind": "practice",
    "title": "Professional Practice",
    "type": "Game-development internship",
    "date": "In progress",
    "company": "Aurogon Shanghai",
    "position": "Systems Design Intern",
    "team": "Swords of Legends",
    "steamUrl": "https://store.steampowered.com/app/4729320/",
    "officialWebsite": "https://www.swordsoflegends.com/",
    "publicArt": "practice/swords-of-legends-steam-header.jpg",
    "tones": [
      "practice-cover",
      "practice-paper",
      "practice-ink",
      "practice-sand"
    ],
    "overview": {
      "id": "overview",
      "label": "The internship",
      "title": "Swords of Legends",
      "subtitle": "Gameplay fixes, interface prototypes, independent system research, and a QA tool shaped by the people who used it.",
      "summaryLabel": "Work, learning & collaboration",
      "skills": [
        {
          "title": "Work delivered",
          "description": "Designed an efficient hit-reaction tool for QA. Fixed the shop equipment preview, built artifact and ability UI prototypes, designed the Bagua Mirror UI, and implemented a toxic-blood effect.",
          "chapter": "systems"
        },
        {
          "title": "How I learned the systems",
          "description": "I followed questions from each task through **data, saves, loading, and combat logic**, then compared what I found with my own Dark Souls III study.",
          "chapter": "learning"
        },
        {
          "title": "Collaboration & tools",
          "description": "I adapted as the team expanded from **UGS toward text-based assets and GitHub**, and shaped a QA test tool through ongoing feedback.",
          "chapter": "qa-tool"
        }
      ],
      "confidentiality": {
        "title": "A note on showing my work",
        "text": "Internal internship work cannot be shown due to a non-disclosure agreement. The architecture diagram on this page is my personal research."
      }
    },
    "sections": [
      {
        "id": "systems",
        "label": "Work delivered",
        "title": "Work I",
        "accent": "delivered.",
        "subtitle": "Specific fixes, prototypes, interface work, and one gameplay feature from my internship.",
        "evidence": [
          {
            "title": "Design efficient hit-reaction tool for QA",
            "paragraphs": [
              "I designed the test menu around QA’s workflow: run repeatable hit reactions in place, use quick loops, and switch cameras while comparing directions."
            ]
          },
          {
            "title": "Fixed the shop equipment preview",
            "paragraphs": [
              "I fixed the equipment preview in the shop. Following the issue into the data and UI layers also showed me where the displayed item information came from."
            ]
          },
          {
            "title": "Built artifact upgrade and ability detail prototypes",
            "paragraphs": [
              "I made UI prototypes for the artifact upgrade system and the ability details page, learning how each screen needed to present the feature it supported."
            ]
          },
          {
            "title": "Designed the Bagua Mirror special UI",
            "paragraphs": [
              "I studied the artifact’s combat behaviour before designing its interface, so the UI could make its role in the combat loop clear to players."
            ]
          },
          {
            "title": "Implemented toxic blood and poison pools",
            "paragraphs": [
              "I added a feature in which poisoned enemies spray toxic blood, damaging enemies on impact and leaving a poison pool on the ground. The team adopted the feature."
            ]
          }
        ],
        "takeaway": {
          "label": "What I learnt",
          "key": "Make the mechanic clear to the player.",
          "text": "Working on the Bagua Mirror UI taught me to understand a feature’s role in the combat loop before deciding how the interface should explain it."
        }
      },
      {
        "id": "learning",
        "label": "Investigation & tools",
        "title": "How I",
        "accent": "learned.",
        "subtitle": "I followed unfamiliar systems beyond the immediate task, then used those connections to make better decisions at work.",
        "evidence": [
          {
            "title": "Followed saved data into map loading",
            "paragraphs": [
              "I traced what the save system owned and followed saved data through world restoration and map loading.",
              "I used **DSMapStudio** to study map organization and loading in **Dark Souls III**. I examined how buildings, ground geometry, and enemies are organized through shared data structures and grouping rules, aiming to understand how map declarations lead to objects appearing in a scene. I summarized this personal study in the accompanying diagram.",
              "The comparison helped me reason about asynchronous loading, responsibility boundaries, and architectural trade-offs."
            ]
          },
          {
            "title": "Traced a hit reaction through combat logic",
            "paragraphs": [
              "While building the QA menu, I followed the path from an action through the animation state machine and combat data to the target’s BehaviourComponent. Tracing the full call path helped me understand why a test reaction behaved as it did."
            ]
          },
          {
            "title": "Adapted to text-based collaboration tools",
            "paragraphs": [
              "As the studio began using Codex, the team expanded from a UGS-centred workflow toward text-based Unreal assets shared through **GitHub**. I learned the new tools quickly and adapted how I shared and handed off my work as the collaboration process changed."
            ]
          }
        ],
        "research": {
          "image": "practice/dark-souls-loading-study.png",
          "title": "My Dark Souls III loading study",
          "caption": "Personal research on Dark Souls III’s map organization and loading, using DSMapStudio. Diagram compiled by me.",
          "tool": {"label": "DSMapStudio · Open-source tool on GitHub", "url": "https://github.com/soulsmods/DSMapStudio"},
          "alt": "My personal diagram of Dark Souls III map loading, asynchronous backread, map events, and runtime updates."
        },
        "takeaway": {
          "label": "How I learn",
          "key": "Follow the question into the system around it.",
          "text": "I used implementation tasks as a starting point, traced the connected systems, and compared what I found. That made unfamiliar architecture easier to understand and helped me adapt when the team’s tools changed."
        }
      },
      {
        "id": "qa-tool",
        "label": "QA collaboration",
        "title": "Working with",
        "accent": "QA.",
        "subtitle": "I refined a hit-reaction test menu by repeatedly checking how QA needed to run and compare tests.",
        "workflowComparison": {
          "beforeTitle": "Initial workflow",
          "before": [
            "Move the player to a test location.",
            "Remember which weapon produced each strength.",
            "Trigger reactions manually; multiple hit directions were difficult to cover."
          ],
          "afterTitle": "Revised workflow",
          "after": [
            "Open the test menu in place.",
            "Run repeatable hit-reaction tests and quick firing loops.",
            "Switch cameras quickly while comparing multiple hit directions."
          ],
          "estimate": "My estimate: repeated hit-reaction testing became approximately 90% more efficient.",
          "estimateNote": "Personal estimate; not a timed benchmark."
        },
        "evidence": [
          {
            "title": "Started by watching how QA tested",
            "paragraphs": [
              "I discussed the testing needs with QA and gathered functions that were scattered around the map. The first setup still asked testers to move the player, remember weapon strengths, and trigger attacks by hand."
            ]
          },
          {
            "title": "Changed the tool around the real workflow",
            "paragraphs": [
              "After further QA conversations, I moved the tests into one in-place menu, added quick repeat loops and camera switching, and made it easier to check multiple hit directions. The project team adopted the tool."
            ]
          }
        ],
        "takeaway": {
          "label": "What I learnt",
          "key": "Understand the work behind the request.",
          "text": "This taught me to look beyond whether a feature works and consider **how someone will use it repeatedly**. Listening to QA and being willing to revise my first approach helped me build a tool that supported their actual work."
        }
      }
    ]
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const imagePath = name => `assets/${name}`;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const media = (file, caption, eager = false) => `<button type="button" class="media-button" data-image="${file}" data-caption="${esc(caption)}" aria-label="Enlarge: ${esc(caption)}"><img src="${imagePath(file)}" alt="${esc(caption)}" loading="${eager?'eager':'lazy'}" /><span class="expand-icon">${icon('maximize-2')}</span></button>`;
const external = (url, label) => `<a class="text-link" href="${url}" target="_blank" rel="noopener noreferrer">${label} ${icon('arrow-up-right')}</a>`;

const views={home:$('#home-view'),project:$('#case-view')};
let currentRoute='';
let caseReader;
let mediaOrigin;
let zoom=1;
let fitWidth=0;
history.scrollRestoration='manual';

const home = window.HomeExperience.create({
  root:views.home,projects,practices,profile,sections:portfolioSections,icon,
  onSectionChange:route=>{
    currentRoute=route;
    history.replaceState({...history.state,home:home.snapshot(),scroll:window.scrollY},'','#'+route);
  }
});
function normaliseRoute(hash){
  const raw=home.canonical(hash.replace(/^#/,'')||'home');
  if(home.isRoute(raw))return raw;
  if(raw.startsWith('project/')&&projects[raw.split('/')[1]]){
    const [,id,chapter]=raw.split('/');
    const reader=projects[id].kind==='jam'?window.JamExperience:window.CaseExperience;
    if(chapter&&projects[id].caseLayout==='highlights')return 'project/'+id+'/'+reader.resolveChapter(projects[id],chapter);
    const resolvedChapter=chapter&&reader.resolveChapter?reader.resolveChapter(projects[id],chapter):chapter&&reader.chaptersFor(projects[id]).some(c=>c.id===chapter)?chapter:null;
    return resolvedChapter?'project/'+id+'/'+resolvedChapter:'project/'+id;
  }
  if(raw.startsWith('practice/')&&practices[raw.split('/')[1]]){
    const [,id,chapter]=raw.split('/');
    return chapter&&window.CaseExperience.chaptersFor(practices[id]).some(c=>c.id===chapter)?'practice/'+id+'/'+chapter:'practice/'+id;
  }
  return 'home';
}
function stashPosition(focusId){
  history.replaceState({...history.state,scroll:window.scrollY,focus:focusId||document.activeElement?.id||null,
    ...(!views.home.hidden?{home:home.snapshot()}:{}),...(caseReader?{case:caseReader.snapshot()}:{})},'');
}
function navigate(hash,options={}){
  const route=normaliseRoute(hash);
  if(caseReader&&route.split('/')[0]===currentRoute.split('/')[0]&&route.split('/')[1]===currentRoute.split('/')[1]){
    caseReader.show(route.split('/')[2]||'overview',null,options.focus!==false,false);
    currentRoute=route;
    history.replaceState({...history.state,case:caseReader.snapshot()},'','#'+route);
    return;
  }
  if(route===currentRoute&&!options.restoreState){
    if(home.isRoute(route))home.show(route,null,options.focus!==false);
    return;
  }
  stashPosition(options.focusId);
  const origins={...history.state?.mainOrigins};
  const enteringCase=!home.isRoute(route);
  const owner=enteringCase?home.ownerFor(route.split('/')[1]):null;
  if(home.isRoute(currentRoute)&&enteringCase){
    origins[owner]={home:home.snapshot(),scroll:window.scrollY,focus:options.focusId||'work-'+route.split('/')[1]};
  }
  const next={portfolio:true,from:currentRoute,mainOrigins:origins,scroll:0};
  if(options.restoreState)Object.assign(next,options.restoreState);
  if(options.replace)history.replaceState(next,'','#'+route);
  else history.pushState(next,'','#'+route);
  renderRoute(route,Boolean(options.restoreState),options.focus!==false);
}
function renderRoute(route,restore=false,moveFocus=true){
  const routeState=history.state?.portfolio?history.state:{portfolio:true,scroll:0};
  if(!history.state?.portfolio)history.replaceState(routeState,'','#'+route);
  caseReader?.destroy();caseReader=null;
  if($('#image-dialog').open)$('#image-dialog').close();
  currentRoute=route;
  if(location.hash!=='#'+route)history.replaceState(routeState,'','#'+route);
  const isHome=home.isRoute(route);
  views.home.hidden=!isHome;views.project.hidden=isHome;
  if(!isHome)home.hide();
  const owner=isHome?route:home.ownerFor(route.split('/')[1]);
  document.querySelectorAll('[data-nav]').forEach(link=>{
    if(link.dataset.nav===owner)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  if(!isHome){
    const [routeType,id]=route.split('/');
    const p=routeType==='practice'?practices[id]:projects[id];
    const nextId=home.nextWork(id);
    const next=nextId&&(practices[nextId]||projects[nextId]);
    const reader=p.kind==='jam'?window.JamExperience:window.CaseExperience;
    const label=portfolioSections.find(section=>section.id===owner)?.label||'Early work';
    caseReader=reader.create({
      root:views.project,project:p,routePrefix:routeType,
      nextProject:next?{id:nextId,title:practices[nextId]?.team||next.title,kicker:p.nextWorkLabel||'Next work',route:(practices[nextId]?'practice/':'project/')+nextId}:null,
      from:owner,backLabel:'Back to '+label,media,icon,external,
      onChange:chapterRoute=>{
        currentRoute=chapterRoute;
        history.replaceState({...history.state,case:caseReader.snapshot()},'','#'+chapterRoute);
      }
    });
    document.title=(practices[id]?.team||p.title)+' — Yitong Mao';
  }else document.title='Yitong Mao — Games, feeling & systems';
  window.lucide?.createIcons();
  requestAnimationFrame(()=>{
    if(currentRoute!==route)return;
    if(isHome){
      const saved=restore?(routeState?.home||{scroll:routeState?.scroll||0}):null;
      home.show(route,saved,moveFocus&&!restore);
    }else{
      window.scrollTo({top:0,behavior:'instant'});
      const state=restore&&routeState?.case?.project===route.split('/')[1]&&routeState?.case?.routePrefix===route.split('/')[0]?routeState.case:null;
      caseReader.show(route.split('/')[2]||'overview',state,moveFocus&&!restore);
    }
    if(restore&&routeState?.focus)document.getElementById(routeState.focus)?.focus({preventScroll:true});
  });
}
document.addEventListener('click',event=>{
  if(event.target.closest('.skip-link')){
    event.preventDefault();if(!views.home.hidden)home.focus();else caseReader?.focus();return;
  }
  if(!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){
    const back=event.target.closest('[data-back]');
    if(back){
      event.preventDefault();
      const owner=home.ownerFor(currentRoute.split('/')[1]);
      const origin=history.state?.mainOrigins?.[owner];
      if(history.state?.from===owner&&origin){stashPosition();history.back();}
      else {
        const targetId='work-'+currentRoute.split('/')[1];
        navigate('#'+owner,origin?{restoreState:origin}:{focus:false});
        if(!origin)requestAnimationFrame(()=>document.getElementById(targetId)?.focus({preventScroll:true}));
      }
      return;
    }
    const anchor=event.target.closest('a[href^="#"]');
    if(anchor){
      event.preventDefault();
      const work=anchor.closest('[data-work]')?.dataset.work;
      navigate(anchor.getAttribute('href'),{focusId:work?'work-'+work:anchor.id});
      return;
    }
  }
  const imageButton=event.target.closest('[data-image]');
  if(imageButton)openImage(imageButton);
});
window.addEventListener('popstate',()=>renderRoute(normaliseRoute(location.hash),Boolean(history.state?.portfolio)));
window.addEventListener('hashchange',()=>{
  const route=normaliseRoute(location.hash);
  if(route!==currentRoute)renderRoute(route);
});
window.addEventListener('pagehide',()=>stashPosition());

const dialog=$('#image-dialog');
const expanded=$('#expanded-image');
function updateZoom(){
  expanded.classList.toggle('fit',zoom===1);
  expanded.style.width=zoom===1?'':`${fitWidth*zoom}px`;
  $('[data-zoom="out"]').disabled=zoom<=1;
  $('[data-zoom="in"]').disabled=zoom>=4;
  $('#zoom-status').textContent=`Zoom ${Math.round(zoom*100)} percent`;
}
function openImage(button){
  mediaOrigin=button;zoom=1;expanded.className='fit';expanded.style.width='';
  expanded.alt=button.dataset.caption;$('#image-title').textContent=button.dataset.caption;
  expanded.onload=()=>{fitWidth=expanded.getBoundingClientRect().width;updateZoom();};
  expanded.src=imagePath(button.dataset.image);dialog.showModal();document.body.classList.add('image-open');
  requestAnimationFrame(()=>{fitWidth=expanded.getBoundingClientRect().width;updateZoom();});
}
$('#close-image').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('image-open');if(mediaOrigin?.isConnected&&!mediaOrigin.closest('[hidden]'))mediaOrigin.focus({preventScroll:true});});
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
  zoom=button.dataset.zoom==='reset'?1:Math.max(1,Math.min(4,zoom+(button.dataset.zoom==='in'?0.5:-0.5)));updateZoom();
}));
const firstRoute=normaliseRoute(location.hash);
if(!history.state?.portfolio)history.replaceState({portfolio:true,scroll:0},'',`#${firstRoute}`);
renderRoute(firstRoute,Boolean(history.state?.scroll||history.state?.home||history.state?.case),false);
