import type { Story, InstagridItem } from '../types';

export const stories: Story[] = [
  // MAIN FEATURED STORY (also displayed on homepage)
  {
    slug: 'architecture-along-coastline-amorgos',
    category: 'greece',
    categoryLabel: 'Aegean Sea',
    readTime: '10m read',
    title: 'An Elegant Study of Space: Architecture along the Coastline of Amorgos',
    excerpt: 'A minimal exploration into hidden Mediterranean archipelagos, visual balance, and intentional slow living.',
    publishedAt: '2026-06-15T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/travelminimal/1600/1000',
    likeCount: 482,
    author: {
      name: 'Evelyn Vance',
      role: 'Lead Essayist',
      avatarUrl: 'https://picsum.photos/seed/evelyn/150/150'
    },
    body: [
      'To step onto the raw, wind-beaten shores of Amorgos is to realize that minimalism is not a contemporary design invention, but an ancient geographical necessity. Here, whitewashed cubic architectures cling with impossible precision to towering slate cliffs. They are structural echoes of the surrounding stone, designed to survive the elements while demanding nothing but quiet presence from the viewer.',
      'As we walked along the paths leading toward the Hozoviotissa Monastery, the pure contrast of simple white limestone against the deep cobalt of the Aegean Sea illustrated a perfect visual truce. There is no excess decoration, no unnecessary line. The building serves the sky, and the sky supports the building.',
      'Inside the homes, the theme of spaciousness persists. Nooks carved directly into the plaster walls hold simple earthenware vessels, eliminating the need for heavy storage furniture. Light enters through deep, small windows, creating shafts of dramatic illumination that change dynamically throughout the day. It is an architecture designed for reflection.',
      'Designing our daily workflows with this same spatial restraint allows for mental breathing room. When we reduce clutter in our physical, digital, and intellectual environments, the thoughts that remain finally have the space to expand and mature.'
    ],
    pullQuote: {
      text: 'Minimalism is not the absence of energy. It is the perfect concentration of elements until they achieve absolute balance.',
      citation: 'Visual Studies, Vol. 04'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/amorgoscoast/1000/625',
      caption: 'Plate 02. The interplay of architectural shadow and stone.'
    }
  },

  // --- DESTINATIONS STORIES (greece/travel) ---
  {
    slug: 'shadows-over-santorini',
    category: 'greece',
    categoryLabel: 'Aegean Sea',
    readTime: '8m read',
    title: 'Shadows Over Santorini: Finding Solitude',
    excerpt: 'An atmospheric study of light and shade in remote Cycladic villages away from the crowd.',
    publishedAt: '2026-06-10T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/greecedoc/500/500',
    likeCount: 124,
    author: {
      name: 'Evelyn Vance',
      role: 'Lead Essayist',
      avatarUrl: 'https://picsum.photos/seed/evelyn/150/150'
    },
    body: [
      'Santorini is often remembered for its crowded sunsets and bustling pathways. However, if one wanders into the inland villages of Pyrgos or Emporio during the quiet hours of early afternoon, a different island emerges.',
      'Here, the high sun casts dramatic, sharp shadows across arched doorways and narrow vaults. The whitewashed plaster acts as a blank canvas, capturing the play of light and shade in a silent performance that changes by the minute.',
      'In these quiet corners, one feels the true spirit of the Cyclades: a slow, measured existence where local traditions are preserved behind heavy wooden doors, and time seems to stand completely still.'
    ],
    pullQuote: {
      text: 'The shadow of a dome on Amorgos is as heavy as the stone itself.',
      citation: 'Notes on Shadow, 1982'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/santorinishadow/1000/625',
      caption: 'Plate 03. Arched passageways in Pyrgos casting geometric silhouettes.'
    }
  },
  {
    slug: 'quiet-paths-of-naxos',
    category: 'greece',
    categoryLabel: 'Aegean Sea',
    readTime: '12m read',
    title: 'The Quiet Paths of Naxos: Valleys of Olive Groves',
    excerpt: 'Exploring the ancient, slow-paced stone pathways connecting the highland villages of central Naxos.',
    publishedAt: '2026-05-28T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/naxos/500/500',
    likeCount: 145,
    author: {
      name: 'Marcus Thorne',
      role: 'Field Photographer',
      avatarUrl: 'https://picsum.photos/seed/marcus/150/150'
    },
    body: [
      'In central Naxos, ancient pathways of polished grey stone wind through valleys of thousand-year-old olive trees. These paths, or monopatia, have connected villages like Halki, Filoti, and Apiranthos for generations.',
      'To walk these paths is to listen to the whispers of ancient marble quarries and abandoned Byzantine chapels. There is no urgency here; the pace is dictated by the incline of the hills and the heat of the afternoon sun.',
      'We stopped by a small stone chapel whose frescoes had faded into beautiful abstract washes of terracotta and teal. It was a reminder that time is the ultimate artist, refining everything down to its most essential form.'
    ],
    pullQuote: {
      text: 'Stone is the memory of the earth. In Naxos, that memory is carved into every walking path.',
      citation: 'Central Aegean Telemetry'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/naxosolive/1000/625',
      caption: 'Plate 04. Old growth olive trees along the path to Halki.'
    }
  },
  {
    slug: 'light-rocks-hydra',
    category: 'greece',
    categoryLabel: 'Aegean Sea',
    readTime: '9m read',
    title: 'Light on the Rocks of Hydra: An Artists Retreat',
    excerpt: 'How the absence of vehicles and the sheer limestone cliffs of Hydra foster creative clarity.',
    publishedAt: '2026-05-14T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/hydra/500/500',
    likeCount: 92,
    author: {
      name: 'Evelyn Vance',
      role: 'Lead Essayist',
      avatarUrl: 'https://picsum.photos/seed/evelyn/150/150'
    },
    body: [
      'Hydra is an island shaped by sound, or rather, the lack of it. With wheeled vehicles strictly banned, the click-clack of horse hooves and the lap of water against stone replace the hum of engines.',
      'This auditory silence is matched by a visual clarity. The island’s stone houses rise like natural extensions of the grey limestone hills, facing a bay that reflects a brilliant, unmodified Aegean light.',
      'Generations of writers and painters have sought refuge here. They come not for luxury, but for the purity of the environment—a place where the mind is freed from modern distractions.'
    ],
    pullQuote: {
      text: 'On Hydra, the silence is not empty. It is a presence that fills the gaps in our thoughts.',
      citation: 'Reflections from the Port'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/hydraport/1000/625',
      caption: 'Plate 05. The amphitheater layout of stone mansions overlooking the harbor.'
    }
  },
  {
    slug: 'stones-mani-peninsula',
    category: 'travel',
    categoryLabel: 'Peloponnese',
    readTime: '11m read',
    title: 'Stones of Mani Peninsula: The Tower Houses',
    excerpt: 'Discovering the rugged, fort-like architecture of Mani and its stark, beautiful landscape.',
    publishedAt: '2026-04-30T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/mani/500/500',
    likeCount: 108,
    author: {
      name: 'Marcus Thorne',
      role: 'Field Photographer',
      avatarUrl: 'https://picsum.photos/seed/marcus/150/150'
    },
    body: [
      'The Mani Peninsula in the southern Peloponnese is a land of extreme contrasts. Sun-scorched mountains slide steeply into deep blue waters, dotted with defensive stone tower houses that speak of a turbulent past.',
      'Constructed from local marble and slate, these tower houses look less like homes and more like natural rock formations. They stand as monuments to survival, built to withstand both elements and invaders.',
      'To explore Mani is to embrace a raw, unpolished beauty. It is a geography that demands resilience and offers in return a profound sense of isolation and focus.'
    ],
    pullQuote: {
      text: 'Here, the earth is stone, the houses are towers, and the people are as silent as the cliffs.',
      citation: 'Travels in Mani, 1961'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/manitower/1000/625',
      caption: 'Plate 06. The abandoned towers of Vatheia under the evening sky.'
    }
  },
  {
    slug: 'cretan-wilds-gorge',
    category: 'travel',
    categoryLabel: 'Crete',
    readTime: '14m read',
    title: 'Cretan Wilds: A Trek Through Samaria Gorge',
    excerpt: 'A journey through one of Europe’s longest canyons, witnessing geological scale and wild nature.',
    publishedAt: '2026-04-18T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/samaria/500/500',
    likeCount: 167,
    author: {
      name: 'Marcus Thorne',
      role: 'Field Photographer',
      avatarUrl: 'https://picsum.photos/seed/marcus/150/150'
    },
    body: [
      'Descending into the Samaria Gorge is a lesson in humility. The trail drops from high pine forests into a narrow, winding canyon where limestone walls rise up to 500 meters on either side.',
      'For six hours, the only companion is the sound of rushing water and the occasional sighting of the kri-kri, Crete’s elusive wild goat. The sheer scale of the geology makes human concerns feel delightfully small.',
      'At the exit of the gorge, the path leads to Agia Roumeli, a isolated black-sand beach accessible only by foot or boat. Jumping into the cool Libyan Sea is a cleansing end to an intense physical meditation.'
    ],
    pullQuote: {
      text: 'Nature does not hurry, yet everything is accomplished. The canyon walls took millions of years to speak.',
      citation: 'Geological Telemetry'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/cretangorge/1000/625',
      caption: 'Plate 07. The famous "Iron Gates" passage, where the canyon narrows to just four meters.'
    }
  },
  {
    slug: 'milotic-light-volcanic',
    category: 'greece',
    categoryLabel: 'Aegean Sea',
    readTime: '10m read',
    title: 'Milotic Light: Sarakiniko’s Volcanic Landscapes',
    excerpt: 'Walking the moon-like white pumice structures of Milos under the silver light of dawn.',
    publishedAt: '2026-04-05T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/milos/500/500',
    likeCount: 198,
    author: {
      name: 'Evelyn Vance',
      role: 'Lead Essayist',
      avatarUrl: 'https://picsum.photos/seed/evelyn/150/150'
    },
    body: [
      'Before the sun rises over Milos, Sarakiniko beach looks like a fragment of the moon fallen into the sea. The smooth, white volcanic pumice cliffs reflect the pale dawn light, creating a surreal landscape of curves and hollows.',
      'There is no sand, no shade, and no vegetation. It is a pure sculptural form carved by the wind and wave action over millennia. To sit here as the light changes is to watch the birth of form.',
      'As the sun ascends, the white stone becomes almost blindingly bright, contrasted against a deep turquoise sea. It is a reminder of how powerful a restricted color palette can be.'
    ],
    pullQuote: {
      text: 'Milos is a lesson in sculptural purity. The wind has left nothing but curves.',
      citation: 'Volcanic Architecture'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/miloswhite/1000/625',
      caption: 'Plate 08. The smooth white formations of Sarakiniko at first light.'
    }
  },

  // --- STYLE STORIES (minimalism/interiors) ---
  {
    slug: 'art-of-white-space',
    category: 'minimalism',
    categoryLabel: 'Visual Theory',
    readTime: '6m read',
    title: 'The Art of White Space: Design Margins',
    excerpt: 'How conscious margins and breathing room in design systems impact brain activity and retention rates.',
    publishedAt: '2026-06-02T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/mindfulspace/500/500',
    likeCount: 89,
    author: {
      name: 'Evelyn Vance',
      role: 'Lead Essayist',
      avatarUrl: 'https://picsum.photos/seed/evelyn/150/150'
    },
    body: [
      'In graphic and web design, white space is often treated as empty or wasted area. In reality, it is the most critical element of layout. It defines boundaries, establishes hierarchy, and gives elements room to exist.',
      'Neurological studies show that reading text surrounded by generous margins reduces cognitive load and increases retention. The brain is not forced to process multiple competing inputs, allowing it to focus completely on the content.',
      'This visual restraint is not just functional; it carries an emotional weight. A layout with breathing room feels premium, intentional, and calm, contrasting with the chaotic, dense interfaces of typical media sites.'
    ],
    pullQuote: {
      text: 'The music is not in the notes, but in the silence between them.',
      citation: 'Claude Debussy'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/whitespacedesign/1000/625',
      caption: 'Plate 09. A study in visual margins and typographic focus.'
    }
  },
  {
    slug: 'monolithic-comfort-concrete',
    category: 'interiors',
    categoryLabel: 'Architecture',
    readTime: '11m read',
    title: 'Monolithic Comfort: Concrete in Design',
    excerpt: 'Exploring how raw, industrial materials create unexpected warmth and stillness when balanced correctly.',
    publishedAt: '2026-05-20T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/concrete/500/500',
    likeCount: 76,
    author: {
      name: 'Clara Sterling',
      role: 'Contributing Architect',
      avatarUrl: 'https://picsum.photos/seed/clara/150/150'
    },
    body: [
      'Concrete is often associated with cold, urban landscapes or brutalist monuments. However, when brought indoors and polished, it can introduce an incredible sense of monolithic calm and visual weight.',
      'The key lies in balance. Raw concrete surfaces, with their subtle imperfections and variations in tone, pair beautifully with the warmth of natural oak, linen, and soft indirect lighting.',
      'By removing grout lines and joint divisions, a concrete floor or wall creates an uninterrupted plain that unifies a room. It becomes a peaceful background that allows individual objects to shine.'
    ],
    pullQuote: {
      text: 'Concrete is a material that remembers its liquid form. It captures the texture of the timber that cast it.',
      citation: 'Architectural Details'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/concreteinterior/1000/625',
      caption: 'Plate 10. The contrast between cast concrete walls and warm timber cabinetry.'
    }
  },
  {
    slug: 'earthen-vessels-spatial-silence',
    category: 'minimalism',
    categoryLabel: 'Visual Theory',
    readTime: '8m read',
    title: 'Earthen Vessels and Spatial Silence',
    excerpt: 'The curation of functional pottery as a way to focus attention and ground living spaces.',
    publishedAt: '2026-05-08T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/pottery/500/500',
    likeCount: 112,
    author: {
      name: 'Clara Sterling',
      role: 'Contributing Architect',
      avatarUrl: 'https://picsum.photos/seed/clara/150/150'
    },
    body: [
      'A room does not require many objects to feel finished. Often, a single, hand-thrown ceramic vessel placed on a wooden bench creates a stronger focal point than a gallery wall of prints.',
      'Pottery brings the texture of the earth indoors. The subtle variations in clay bodies and glazes catch the light, reminding us of the human hands that shaped the form and the fire that sealed it.',
      'This intentional curation forces us to look closely. We begin to appreciate the curve of a neck, the texture of a foot ring, and the volume of empty space contained within the vessel.'
    ],
    pullQuote: {
      text: 'Shape clay into a vessel; it is the space within that makes it useful.',
      citation: 'Lao Tzu, Tao Te Ching'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/ceramicvessels/1000/625',
      caption: 'Plate 11. Hand-fired earthenware standing in a shafts of morning sun.'
    }
  },
  {
    slug: 'shadows-textures-tokyo',
    category: 'interiors',
    categoryLabel: 'Architecture',
    readTime: '13m read',
    title: 'Shadow and Textures in Tokyo Apartments',
    excerpt: 'How modern architects maximize visual interest in small spaces through shadow play and texture.',
    publishedAt: '2026-04-25T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/tokyoapt/500/500',
    likeCount: 134,
    author: {
      name: 'Clara Sterling',
      role: 'Contributing Architect',
      avatarUrl: 'https://picsum.photos/seed/clara/150/150'
    },
    body: [
      'In a dense metropolis like Tokyo, apartments are often compact. To prevent these spaces from feeling claustrophobic, designers use textures and shadows to create depth and visual complexity.',
      'Instead of uniform white paint, walls are finished in textured plaster or ribbed timber paneling. When illuminated by low, recessed lights, these surfaces catch shadows, adding a layers of depth.',
      'By focusing on the sensory qualities of materials rather than square footage, these spaces offer a sense of shelter and richness that belies their small size.'
    ],
    pullQuote: {
      text: 'We find beauty not in the thing itself but in the patterns of shadows, the light and the darkness.',
      citation: 'Jun’ichirō Tanizaki, In Praise of Shadows'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/tokyointerior/1000/625',
      caption: 'Plate 12. A minimal bedroom showcasing shoji paper screens and cedar frames.'
    }
  },
  {
    slug: 'subtractive-living-philosophy',
    category: 'minimalism',
    categoryLabel: 'Visual Theory',
    readTime: '7m read',
    title: 'Subtractive Living: A Philosophy of Editing',
    excerpt: 'Moving beyond minimalism as a style to subtraction as an active daily habit.',
    publishedAt: '2026-04-12T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/subtractive/500/500',
    likeCount: 154,
    author: {
      name: 'Evelyn Vance',
      role: 'Lead Essayist',
      avatarUrl: 'https://picsum.photos/seed/evelyn/150/150'
    },
    body: [
      'Many people approach minimalism by buying specific "minimalist" products. This misses the entire point. True minimalism is not an acquisition; it is a subtraction.',
      'It requires us to look at our homes, our schedules, and our thoughts, and ask: "What can be removed without losing the essence?" It is an ongoing, active process of editing.',
      'When we subtract the noise, we are left with the signal. The remaining items, relationships, and thoughts gain value because they are no longer competing for our attention.'
    ],
    pullQuote: {
      text: 'To attain knowledge, add things every day. To attain wisdom, remove things every day.',
      citation: 'Ancient Proverb'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/minimalistliving/1000/625',
      caption: 'Plate 13. A single desk with a notebook, pen, and glass of water.'
    }
  },
  {
    slug: 'raw-timber-refined-glass',
    category: 'interiors',
    categoryLabel: 'Architecture',
    readTime: '10m read',
    title: 'Raw Timber and Refined Glass: The Tension',
    excerpt: 'Analyzing the visual dialogue between rough-hewn beams and pristine glass panels.',
    publishedAt: '2026-03-29T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/timber/500/500',
    likeCount: 88,
    author: {
      name: 'Clara Sterling',
      role: 'Contributing Architect',
      avatarUrl: 'https://picsum.photos/seed/clara/150/150'
    },
    body: [
      'Great design often arises from tension. One of the most satisfying dialogues is the contrast between raw, weathered timber and clear, precision-cut glass.',
      'The timber brings a sense of history, decay, and organic texture. The glass represents human precision, transparency, and connection to the outside world.',
      'When these materials meet in a window frame or furniture joint, they elevate each other. The glass makes the timber look more rustic, while the timber makes the glass look sharper.'
    ],
    pullQuote: {
      text: 'Tension is the spark of design. Without contrast, there is only uniformity.',
      citation: 'Visual Grammar, Vol. 12'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/timberglass/1000/625',
      caption: 'Plate 14. An exposed barn beam meeting a frameless glass pane.'
    }
  },

  // --- WELLNESS STORIES (wellness) ---
  {
    slug: 'rituals-morning-mist',
    category: 'wellness',
    categoryLabel: 'Slow Living',
    readTime: '7m read',
    title: 'Rituals of the Morning Mist: Waking Slow',
    excerpt: 'The transformative power of spending the first hour of the day without digital inputs or screens.',
    publishedAt: '2026-06-05T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/morning/500/500',
    likeCount: 201,
    author: {
      name: 'Dr. Alistair Finch',
      role: 'Cognitive Researcher',
      avatarUrl: 'https://picsum.photos/seed/alistair/150/150'
    },
    body: [
      'The way we wake up sets the tone for our nervous system. Checking email or news in the first minutes of consciousness floods the brain with cortisol and fragments our focus.',
      'Instead, the practice of "slow waking" encourages us to observe the natural transition from sleep to wakefulness. Spending the first hour in silence, with a cup of tea or a simple walk, allows the mind to integrate before being loaded with data.',
      'Those who adopt this ritual report a profound increase in emotional stability, creative insights, and sustained energy levels throughout the day.'
    ],
    pullQuote: {
      text: 'The morning hour has gold in its mouth, but only if we keep it shut.',
      citation: 'German Folk Saying'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/morningmist/1000/625',
      caption: 'Plate 15. The sun breaking through trees on a quiet country lane.'
    }
  },
  {
    slug: 'sensory-fasting-silence',
    category: 'wellness',
    categoryLabel: 'Slow Living',
    readTime: '10m read',
    title: 'Sensory Fasting: Silence as Sanctuary',
    excerpt: 'A practical guide to periodic sensory deprivation to heal an overstimulated nervous system.',
    publishedAt: '2026-05-24T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/silence/500/500',
    likeCount: 232,
    author: {
      name: 'Dr. Alistair Finch',
      role: 'Cognitive Researcher',
      avatarUrl: 'https://picsum.photos/seed/alistair/150/150'
    },
    body: [
      'We live in a state of constant sensory overload. Notifications, ads, music, traffic, and neon lights are constantly demanding our attention, leaving our brains exhausted.',
      'Sensory fasting is the practice of shutting out inputs for a set period. This can mean sitting in a dark, quiet room for an hour, walking without headphones, or spending a weekend offline.',
      'By removing external stimuli, we give our sensory receptors a chance to reset. Colors look brighter, sounds seem clearer, and thoughts regain their natural speed.'
    ],
    pullQuote: {
      text: 'All of man’s troubles stem from his inability to sit quietly in a room alone.',
      citation: 'Blaise Pascal'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/sensoryfast/1000/625',
      caption: 'Plate 16. A sparse room with light filtering through linen curtains.'
    }
  },
  {
    slug: 'hydration-of-flow',
    category: 'wellness',
    categoryLabel: 'Slow Living',
    readTime: '5m read',
    title: 'The Hydration of Flow: Tea Ceremonies',
    excerpt: 'Understanding the meditative structure of tea preparation and its somatic benefits.',
    publishedAt: '2026-05-10T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/tea/500/500',
    likeCount: 114,
    author: {
      name: 'Dr. Alistair Finch',
      role: 'Cognitive Researcher',
      avatarUrl: 'https://picsum.photos/seed/alistair/150/150'
    },
    body: [
      'Preparing a cup of tea can be a mindless chore or a profound meditation. In the tea ceremony, every action is performed with complete awareness: warming the pot, measuring the leaves, pouring the water, and tasting.',
      'This process anchors us in the present. We watch the leaves unfurl, breathe in the steam, and feel the warmth of the cup in our hands.',
      'It is a somatic anchor. In a busy day, this simple five-minute ritual serves as a portal into flow state, reconnecting mind and body through warmth.'
    ],
    pullQuote: {
      text: 'Drink your tea slowly and reverently, as if it is the axis on which the world revolves.',
      citation: 'Thich Nhat Hanh'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/teaceremony/1000/625',
      caption: 'Plate 17. Loose leaf oolong steeping in a clay teapot.'
    }
  },
  {
    slug: 'breathing-through-seasons',
    category: 'wellness',
    categoryLabel: 'Slow Living',
    readTime: '8m read',
    title: 'Breathing Through the Seasons: Rhythm',
    excerpt: 'Aligning our energy levels and daily goals with natural and seasonal cycles.',
    publishedAt: '2026-04-28T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/seasons/500/500',
    likeCount: 142,
    author: {
      name: 'Dr. Alistair Finch',
      role: 'Cognitive Researcher',
      avatarUrl: 'https://picsum.photos/seed/alistair/150/150'
    },
    body: [
      'Modern society demands that we produce at the same high rate all year. This is biologically unnatural. Humans are seasonal creatures, designed to cycle between activity and rest.',
      'By aligning our projects with the seasons—undertaking outward-facing work in spring and summer, and reflective, analytical work in autumn and winter—we avoid burnout.',
      'It is a rhythm of breath: spring/summer is the exhalation of energy, while autumn/winter is the inhalation of reflection.'
    ],
    pullQuote: {
      text: 'Adopt the pace of nature: her secret is patience.',
      citation: 'Ralph Waldo Emerson'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/seasonalrhythm/1000/625',
      caption: 'Plate 18. Bare branches against a winter sun.'
    }
  },
  {
    slug: 'intentional-solitude-forest',
    category: 'wellness',
    categoryLabel: 'Slow Living',
    readTime: '11m read',
    title: 'Intentional Solitude in Forest Retreats',
    excerpt: 'The psychological benefits of green solitude and nature immersion (Shinrin-yoku).',
    publishedAt: '2026-04-10T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/forest/500/500',
    likeCount: 189,
    author: {
      name: 'Dr. Alistair Finch',
      role: 'Cognitive Researcher',
      avatarUrl: 'https://picsum.photos/seed/alistair/150/150'
    },
    body: [
      'Forest bathing, or Shinrin-yoku, is not just a hike. It is the practice of engaging with the forest through all five senses: smelling the pine needles, touching the bark, listening to the birds, and seeing the light filter through leaves.',
      'Chemicals emitted by trees, called phytoncides, have been shown to boost immune cell function and lower heart rate and blood pressure.',
      'Spending time alone in the woods allows us to step outside our social roles. The trees do not judge us, enabling a deep, restorative relaxation.'
    ],
    pullQuote: {
      text: 'Into the forest I go, to lose my mind and find my soul.',
      citation: 'John Muir'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/forestbathing/1000/625',
      caption: 'Plate 19. Sunlight streaming through a canopy of redwoods.'
    }
  },
  {
    slug: 'digital-sunset-reclaiming',
    category: 'wellness',
    categoryLabel: 'Slow Living',
    readTime: '9m read',
    title: 'Digital Sunset: Reclaiming the Night',
    excerpt: 'How setting a strict boundary on screens before bed improves sleep architecture and mental health.',
    publishedAt: '2026-03-25T00:00:00Z',
    imageUrl: 'https://picsum.photos/seed/sunset/500/500',
    likeCount: 220,
    author: {
      name: 'Dr. Alistair Finch',
      role: 'Cognitive Researcher',
      avatarUrl: 'https://picsum.photos/seed/alistair/150/150'
    },
    body: [
      'Just as the sun dips below the horizon, we should establish a "digital sunset" in our homes. This means turning off all screens—phones, tablets, TVs—at least two hours before bed.',
      'The blue light emitted by devices suppresses melatonin production, delaying sleep and reducing REM cycles. Furthermore, the stimulating content keeps our minds in a state of high alert.',
      'Replacing screens with reading, conversation, or stretching signals to the brain that it is safe to wind down, leading to deeper, more restorative sleep.'
    ],
    pullQuote: {
      text: 'Sleep is the golden chain that ties health and our bodies together.',
      citation: 'Thomas Dekker'
    },
    midStoryImage: {
      url: 'https://picsum.photos/seed/digitalsunset/1000/625',
      caption: 'Plate 20. A bedroom lit only by a candle and a reading lamp.'
    }
  }
];

export const instagridItems: InstagridItem[] = [
  {
    id: 'insta1',
    imageUrl: 'https://picsum.photos/seed/insta1/400/400',
    likeCount: '1.4k',
    commentCount: 42
  },
  {
    id: 'insta2',
    imageUrl: 'https://picsum.photos/seed/insta2/400/400',
    likeCount: '980',
    commentCount: 18
  },
  {
    id: 'insta3',
    imageUrl: 'https://picsum.photos/seed/insta3/400/400',
    likeCount: '2.1k',
    commentCount: 84
  },
  {
    id: 'insta4',
    imageUrl: 'https://picsum.photos/seed/insta4/400/400',
    likeCount: '750',
    commentCount: 9
  },
  {
    id: 'insta5',
    imageUrl: 'https://picsum.photos/seed/insta5/400/400',
    likeCount: '1.1k',
    commentCount: 31
  },
  {
    id: 'insta6',
    imageUrl: 'https://picsum.photos/seed/insta6/400/400',
    likeCount: '1.8k',
    commentCount: 55
  }
];
