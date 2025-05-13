const svgNS = "http://www.w3.org/2000/svg";
const svgElement = document.getElementById('nakshatra-svg');
const diagramContainer = document.getElementById('diagram-container');
const infoPanel = document.getElementById('info-panel');
const infoTitle = document.getElementById('info-title');
const infoShortIntro = document.getElementById('info-short-intro');
const infoRulingDeityHeading = document.getElementById('info-ruling-deity-heading');
const infoRulingDeityText = document.getElementById('info-ruling-deity-text');
const nakshatraIconContainer = document.getElementById('nakshatra-icon-container');

const nakshatraClassicalQuotesDiv = document.getElementById('nakshatra-classical-quotes');
const quoteBPHS = document.getElementById('quote-bphs');
const quotePhaladeepika = document.getElementById('quote-phaladeepika');

const infoGunaDetailsDiv = document.getElementById('info-guna-details');
const infoGunaClassicalText = document.getElementById('info-guna-classical-text');
const infoGunaModernSummaryText = document.getElementById('info-guna-modern-summary-text');
const infoGunaModernTraitsList = document.getElementById('info-guna-modern-traits-list');
const infoGunaExamplesList = document.getElementById('info-guna-examples-list');
const infoGunaPositiveList = document.getElementById('info-guna-positive-list');
const infoGunaShadowList = document.getElementById('info-guna-shadow-list');
const infoGunaAssociatedNakshatrasDiv = document.getElementById('info-guna-associated-nakshatras');
const infoGunaAssociatedNakshatrasHeading = document.getElementById('info-guna-associated-nakshatras-heading');
const gunaAssociatedNakshatrasList = document.getElementById('guna-associated-nakshatras-list');

const infoPurusharthaDetailsDiv = document.getElementById('info-purushartha-details');
const infoPurusharthaClassicalText = document.getElementById('info-purushartha-classical-text');
const infoPurusharthaModernSummaryText = document.getElementById('info-purushartha-modern-summary-text');
const infoPurusharthaModernTraitsList = document.getElementById('info-purushartha-modern-traits-list');
const infoPurusharthaExamplesList = document.getElementById('info-purushartha-examples-list');
const infoPurusharthaPositiveList = document.getElementById('info-purushartha-positive-list');
const infoPurusharthaShadowList = document.getElementById('info-purushartha-shadow-list');

const infoGanaDetailsDiv = document.getElementById('info-gana-details');
const infoGanaClassicalText = document.getElementById('info-gana-classical-text');
const infoGanaModernSummaryText = document.getElementById('info-gana-modern-summary-text');
const infoGanaModernTraitsList = document.getElementById('info-gana-modern-traits-list');
const infoGanaExamplesList = document.getElementById('info-gana-examples-list');
const infoGanaPositiveList = document.getElementById('info-gana-positive-list');
const infoGanaShadowList = document.getElementById('info-gana-shadow-list');

const infoPlanetDetailsDiv = document.getElementById('info-planet-details');
const infoPlanetMainDescription = document.getElementById('info-planet-main-description');
const infoPlanetRulingNakshatrasList = document.getElementById('info-planet-ruling-nakshatras-list');
const infoPlanetInfluenceHeading = document.getElementById('info-planet-influence-heading');
const infoPlanetInfluenceText = document.getElementById('info-planet-influence-text');

const nakshatraAttributesContainerDiv = document.getElementById('nakshatra-attributes-container');
const attributesList = document.getElementById('attributes-list');
const attributeRelatedNakshatrasDiv = document.getElementById('info-attribute-related-nakshatras');
const attributeRelatedNakshatrasList = document.getElementById('attribute-related-nakshatras-list');
const infoCategoryItemsHeading = document.getElementById('info-category-items-heading');

const closePanelButton = document.getElementById('close-panel');
const categoryLinkItems = document.querySelectorAll('.category-link-item');

let svgWidth, svgHeight, centerX, centerY; // These will be set in calculateLayoutAndPositions
const elements = {};
let hoverTimeout;
let currentlyClickedId = null;
let currentClickedCategory = null;

const nodeVisualSettings = {
    baseRadius: 6.5,
    planetNodeRadius: 16,
    hoverIncrease: 2.5,
    labelGap: 7,
    labelLineHeight: 15,
    baseSvgLabelFontSize: 12, // Base font size for general SVG labels (Nakshatras, Gunas, etc.)
    basePlanetSymbolSize: 15  // Base font size for planet symbols (e.g., ☉, ☽)
};
const NAKSHATRA_GUNA_TRIANGLE_RADIUS = 25;

const data = {
    nakshatras: [
        {
            id: 'ashwini', name: 'Ashwini', planetId: 'ketu', purusharthaId: 'dharma', ganaId: 'deva', nakshatraGunaId: 'rajas',
            shortIntro: 'Fast, energetic, and full of life — Ashwini is all about fresh starts, healing, and quick action.',
            rulingDeityInfo: 'The Ashwini Kumaras are twin horse-headed gods known for their speed, youth, and healing powers. They bring rapid help and renewal, symbolizing fresh beginnings, medicine, and instinctive action.',
            detailedGunas: 'Rajas–Rajas–Rajas — Bold, driven, and always moving; needs rest to avoid burnout.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Ashwini as a Nakshatra associated with the Ashwini Kumaras, symbolizing swiftness and healing abilities.”',
            phaladeepikaQuote: 'Phaladeepika: “Individuals born under Ashwini are energetic, impulsive, and possess a pioneering spirit.”'
        },
        {
            id: 'bharani', name: 'Bharani', planetId: 'venus', purusharthaId: 'artha', ganaId: 'manushya', nakshatraGunaId: 'rajas',
            shortIntro: 'Deep, intense, and powerful — Bharani is about transformation, restraint, and learning through pressure.',
            rulingDeityInfo: 'Yama, the God of Death and cosmic justice, governs karma, consequences, and the unseen realm. His presence in Bharani brings themes of discipline, endurance, and crossing life\'s boundaries.',
            detailedGunas: 'Rajas–Rajas–Tamas — Passionate and intense; can get stuck in cycles without inner clarity.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Bharani is associated with Yama, the god of death, and reflects themes of restraint, discipline, and transformation.”',
            phaladeepikaQuote: 'Phaladeepika: “Natives of Bharani are determined, self-restrained, and have a strong sense of morality.”'
        },
        {
            id: 'krittika', name: 'Krittika', planetId: 'sun', purusharthaId: 'kama', ganaId: 'rakshasa', nakshatraGunaId: 'rajas',
            shortIntro: 'Sharp and intense — Krittika cuts through illusion and thrives on truth, purification, and transformation.',
            rulingDeityInfo: 'Agni, the God of Fire, is the purifier, truth-bringer, and divine messenger. He burns away what’s false and lights the path with courage and clarity.',
            detailedGunas: 'Rajas–Rajas–Sattva — Focused and fierce; acts with purpose but can be overly intense.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Krittika is ruled by Agni, the god of fire, representing purification, courage, and cutting through impurity.”',
            phaladeepikaQuote: 'Phaladeepika: “Those born under Krittika are sharp-minded, ambitious, and tend to possess a fiery temperament.”'
        },
        {
            id: 'rohini', name: 'Rohini', planetId: 'moon', purusharthaId: 'artha', ganaId: 'manushya', nakshatraGunaId: 'rajas',
            shortIntro: 'Sensual, fertile, and magnetic — Rohini is tied to beauty, growth, and the nurturing side of life.',
            rulingDeityInfo: 'Brahma, the Creator, represents the urge to build, reproduce, and shape reality. His energy brings creativity, sensuality, and the deep pull toward life’s pleasures and meaning.',
            detailedGunas: 'Rajas–Tamas–Rajas — Creative and alluring; needs structure to stay grounded.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Rohini is associated with Prajapati, symbolizing growth, fertility, and creative expression.”',
            phaladeepikaQuote: 'Phaladeepika: “Individuals born under Rohini are attractive, charismatic, and possess a nurturing disposition.”'
        },
        {
            id: 'mrigashira', name: 'Mrigashira', planetId: 'mars', purusharthaId: 'kama', ganaId: 'deva', nakshatraGunaId: 'rajas',
            shortIntro: 'Playful and curious — Mrigashira is about searching, learning, and chasing inspiration.',
            rulingDeityInfo: 'Soma, the Moon God and nectar of immortality, is tied to nourishment, joy, and the pursuit of emotional experience. He brings the charm, wonder, and restlessness of the seeker.',
            detailedGunas: 'Rajas–Tamas–Tamas — Curious but scattered; needs focus and consistency.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Mrigashira is linked to Soma, representing the quest for knowledge and the restless search for truth.”',
            phaladeepikaQuote: 'Phaladeepika: “Natives of Mrigashira are curious, communicative, and have a gentle demeanor.”'
        },
        {
            id: 'ardra', name: 'Ardra', planetId: 'rahu', purusharthaId: 'kama', ganaId: 'manushya', nakshatraGunaId: 'rajas',
            shortIntro: 'Intense and emotional — Ardra deals with storms, chaos, and the power to transform through breakdown.',
            rulingDeityInfo: 'Rudra, the fierce form of Shiva, is the storm god who destroys in order to renew. Ardra reflects the emotional upheaval needed to bring clarity and growth.',
            detailedGunas: 'Rajas–Tamas–Sattva — Emotionally charged and transformative; finds growth through turbulence.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Ardra is associated with Rudra, symbolizing emotional depth, transformative power, and intensity.”',
            phaladeepikaQuote: 'Phaladeepika: “Those born under Ardra are passionate, determined, and often experience profound transformations.”'
        },
        {
            id: 'punarvasu', name: 'Punarvasu', planetId: 'jupiter', purusharthaId: 'dharma', ganaId: 'deva', nakshatraGunaId: 'rajas',
            shortIntro: 'Gentle and hopeful — Punarvasu is about return, renewal, and finding balance after disruption.',
            rulingDeityInfo: 'Aditi, the cosmic mother of gods, represents endless space, nurturing, and wholeness. She brings unity, safety, and the ability to start again with grace.',
            detailedGunas: 'Rajas–Sattva–Rajas — Balanced and expansive; grows through cycles of renewal.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Punarvasu is linked to Aditi, representing restoration, balance, and the return to harmony.”',
            phaladeepikaQuote: 'Phaladeepika: “Individuals born under Punarvasu are optimistic, adaptable, and possess a nurturing nature.”'
        },
        {
            id: 'pushya', name: 'Pushya', planetId: 'saturn', purusharthaId: 'dharma', ganaId: 'deva', nakshatraGunaId: 'rajas',
            shortIntro: 'Nourishing and wise — Pushya is about spiritual growth, protection, and sustaining others.',
            rulingDeityInfo: 'Brihaspati, the guru of the gods, is the divine teacher who guides with wisdom and morality. His presence here gives structure, faith, and lasting success.',
            detailedGunas: 'Rajas–Sattva–Tamas — Supportive and disciplined; grows by nurturing and protecting.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Pushya is associated with Brihaspati, symbolizing nourishment, protection, and spiritual wisdom.”',
            phaladeepikaQuote: 'Phaladeepika: “Natives of Pushya are caring, supportive, and often inclined towards spiritual pursuits.”'
        },
        {
            id: 'ashlesha', name: 'Ashlesha', planetId: 'mercury', purusharthaId: 'dharma', ganaId: 'rakshasa', nakshatraGunaId: 'rajas',
            shortIntro: 'Mysterious and intense — Ashlesha is about inner power, manipulation, healing, and transcendence.',
            rulingDeityInfo: 'The Nagas (serpent beings) are tied to hidden wisdom, psychic depth, and primal instincts. Ashlesha holds both venom and medicine — it transforms through deep psychological insight.',
            detailedGunas: 'Rajas–Sattva–Sattva — Insightful and cunning; thrives in complexity and hidden layers.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Ashlesha is linked to the Nagas, representing intuition, transformation, and the potential for profound inner change.”',
            phaladeepikaQuote: 'Phaladeepika: “Those born under Ashlesha are intuitive, persuasive, and possess a deep understanding of emotions.”'
        },
        {
            id: 'magha', name: 'Magha', planetId: 'ketu', purusharthaId: 'artha', ganaId: 'rakshasa', nakshatraGunaId: 'tamas',
            shortIntro: 'Regal and rooted — Magha connects to ancestry, leadership, and carrying legacy.',
            rulingDeityInfo: 'The Pitris, ancestral spirits, guide souls between lifetimes. In Magha, they bestow authority, tradition, and a sense of responsibility toward lineage and karma.',
            detailedGunas: 'Tamas–Rajas–Rajas — Grounded and authoritative; acts with inherited strength and purpose.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Magha is associated with the Pitris, symbolizing ancestral heritage, authority, and leadership.”',
            phaladeepikaQuote: 'Phaladeepika: “Individuals born under Magha are proud, ambitious, and often hold positions of authority.”'
        },
        {
            id: 'purva_phalguni', name: 'P.Phalguni', planetId: 'venus', purusharthaId: 'kama', ganaId: 'manushya', nakshatraGunaId: 'tamas',
            shortIntro: 'Fun, expressive, and romantic — Purva Phalguni is about love, pleasure, and enjoying the sweetness of life.',
            rulingDeityInfo: 'Bhaga, the god of enjoyment and wealth, presides over love, sensuality, and good fortune. His influence brings charm, artistic flair, and the desire to experience life fully.',
            detailedGunas: 'Tamas–Rajas–Rajas — Expressive and pleasure-seeking; needs depth to avoid excess.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Purva Phalguni is linked to Bhaga, representing love, pleasure, and enjoyment of life.”',
            phaladeepikaQuote: 'Phaladeepika: “Natives of Purva Phalguni are creative, sociable, and have a strong appreciation for beauty and art.”'
        },
        {
            id: 'uttara_phalguni', name: 'U.Phalguni', planetId: 'sun', purusharthaId: 'kama', ganaId: 'manushya', nakshatraGunaId: 'tamas',
            shortIntro: 'Devoted and mature — Uttara Phalguni brings partnership, service, and responsibility into love and life.',
            rulingDeityInfo: 'Aryaman, god of contracts, marriage, and loyalty, stands for enduring relationships and moral strength. He brings trust, honor, and the power to sustain commitment.',
            detailedGunas: 'Tamas–Sattva–Rajas — Loyal and steady; thrives in long-term connections and clear values.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Uttara Phalguni is associated with Aryaman, symbolizing commitment, service, and mutual support.”',
            phaladeepikaQuote: 'Phaladeepika: “Those born under Uttara Phalguni are reliable, generous, and often involved in partnerships or collaborations.”'
        },
        {
            id: 'hasta', name: 'Hasta', planetId: 'moon', purusharthaId: 'artha', ganaId: 'deva', nakshatraGunaId: 'tamas',
            shortIntro: 'Skilled and clever — Hasta is tied to creation, precision, and getting things done with grace and control.',
            rulingDeityInfo: 'Savitar, a solar deity, brings inspiration, craftsmanship, and focus. He empowers creation through hands — whether in art, healing, or action.',
            detailedGunas: 'Tamas–Rajas–Tamas — Capable and crafty; needs inner calm to channel its power.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Hasta is linked to Savitar, representing skill, craftsmanship, and dexterity.”',
            phaladeepikaQuote: 'Phaladeepika: “Individuals born under Hasta are resourceful, intelligent, and possess excellent manual skills.”'
        },
        {
            id: 'chitra', name: 'Chitra', planetId: 'mars', purusharthaId: 'kama', ganaId: 'rakshasa', nakshatraGunaId: 'tamas',
            shortIntro: 'Charismatic and aesthetic — Chitra shines through beauty, architecture, and building a unique identity.',
            rulingDeityInfo: 'Tvashtri, the celestial architect, is a divine designer who inspires innovation, beauty, and individuality. His energy brings structure to creativity.',
            detailedGunas: 'Tamas–Tamas–Sattva — Bold and artistic; must align ego with deeper purpose.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Chitra is associated with Tvashtar, symbolizing creativity, brilliance, and the ability to construct or design.”',
            phaladeepikaQuote: 'Phaladeepika: “Natives of Chitra are artistic, charismatic, and have a strong sense of aesthetics.”'
        },
        {
            id: 'swati', name: 'Swati', planetId: 'rahu', purusharthaId: 'artha', ganaId: 'deva', nakshatraGunaId: 'tamas',
            shortIntro: 'Free-spirited and curious — Swati is about independence, learning, and finding your own rhythm.',
            rulingDeityInfo: 'Vayu, the wind god, represents breath, movement, and the invisible force of change. Swati expresses exploration, flexibility, and the power of going solo.',
            detailedGunas: 'Tamas–Sattva–Tamas — Restless yet insightful; needs direction to stay grounded.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Swati is linked to Vayu, representing independence, flexibility, and movement.”',
            phaladeepikaQuote: 'Phaladeepika: “Those born under Swati are free-spirited, adaptable, and often seek personal freedom.”'
        },
        {
            id: 'vishakha', name: 'Vishakha', planetId: 'jupiter', purusharthaId: 'dharma', ganaId: 'rakshasa', nakshatraGunaId: 'tamas',
            shortIntro: 'Driven and goal-focused — Vishakha is about ambition, transformation, and long-term achievement.',
            rulingDeityInfo: 'Indra-Agni, a dual force of leadership and power, brings boldness, determination, and the ability to spark change through persistent effort and focused energy.',
            detailedGunas: 'Tamas–Rajas–Rajas — Ambitious and fiery; thrives on progress but must stay grounded in values.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Vishakha is associated with Indra and Agni, symbolizing determination, goal orientation, and energy.”',
            phaladeepikaQuote: 'Phaladeepika: “Individuals born under Vishakha are ambitious, focused, and possess strong leadership qualities.”'
        },
        {
            id: 'anuradha', name: 'Anuradha', planetId: 'saturn', purusharthaId: 'dharma', ganaId: 'deva', nakshatraGunaId: 'tamas',
            shortIntro: 'Loyal and collaborative — Anuradha is about friendship, devotion, and building harmony through support.',
            rulingDeityInfo: 'Mitra, the god of friendship and contracts, governs unity, trust, and balanced cooperation. His energy fosters deep emotional bonds and social intelligence.',
            detailedGunas: 'Tamas–Rajas–Sattva — Grounded and steady; excels in teamwork and long-term loyalty.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Anuradha is linked to Mitra, representing friendship, cooperation, and harmony.”',
            phaladeepikaQuote: 'Phaladeepika: “Natives of Anuradha are loyal, supportive, and excel in building relationships.”'
        },
        {
            id: 'jyeshtha', name: 'Jyeshtha', planetId: 'mercury', purusharthaId: 'artha', ganaId: 'rakshasa', nakshatraGunaId: 'tamas',
            shortIntro: 'Powerful and protective — Jyeshtha deals with status, responsibility, and carrying the weight of leadership.',
            rulingDeityInfo: 'Indra, king of the gods, represents authority, strength, and victory through challenge. His presence gives courage, competitiveness, and responsibility.',
            detailedGunas: 'Tamas–Sattva–Rajas — Strategic and intense; must lead with wisdom, not ego.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Jyeshtha is associated with Indra, symbolizing seniority, authority, and protection.”',
            phaladeepikaQuote: 'Phaladeepika: “Those born under Jyeshtha are responsible, courageous, and often take on leadership roles.”'
        },
        {
            id: 'mula', name: 'Mula', planetId: 'ketu', purusharthaId: 'moksha', ganaId: 'rakshasa', nakshatraGunaId: 'sattva',
            shortIntro: 'Deep and fearless — Mula is about uprooting falsehoods, breaking patterns, and going to the core.',
            rulingDeityInfo: 'Nirriti, goddess of destruction, represents chaos, loss, and spiritual clearing. Her energy brings radical transformation and the courage to rebuild from nothing.',
            detailedGunas: 'Tamas–Tamas–Tamas — Raw and intense; sheds old layers to find truth.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Mula is linked to Nirriti, representing destruction, transformation, and the root of things.”',
            phaladeepikaQuote: 'Phaladeepika: “Individuals born under Mula are inquisitive, philosophical, and often seek to uncover hidden truths.”'
        },
        {
            id: 'purva_ashadha', name: 'Purva Ashadha', planetId: 'venus', purusharthaId: 'moksha', ganaId: 'manushya', nakshatraGunaId: 'sattva',
            shortIntro: 'Optimistic and resilient — Purva Ashadha is about purification, emotional strength, and quiet victory.',
            rulingDeityInfo: 'Apah, the goddess of flowing water, symbolizes emotional movement, renewal, and unstoppable drive. Her force clears the path through persistence and adaptability.',
            detailedGunas: 'Tamas–Tamas–Rajas — Soft yet persistent; pushes forward with emotional power.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Purva Ashadha is associated with Apas, symbolizing invigoration, purification, and invincibility.”',
            phaladeepikaQuote: 'Phaladeepika: “Natives of Purva Ashadha are optimistic, persuasive, and possess a strong sense of purpose.”'
        },
        {
            id: 'uttara_ashadha', name: 'Uttara Ashadha', planetId: 'sun', purusharthaId: 'moksha', ganaId: 'manushya', nakshatraGunaId: 'sattva',
            shortIntro: 'Noble and determined — Uttara Ashadha is about leadership, responsibility, and lasting success.',
            rulingDeityInfo: 'Vishwadevas, the universal gods, represent virtue, collective power, and divine order. Their energy brings integrity, focus, and unwavering moral purpose.',
            detailedGunas: 'Tamas–Sattva–Sattva — Steady and wise; achieves greatness through discipline.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Uttara Ashadha is linked to the Vishvadevas, representing universal principles, righteousness, and leadership.”',
            phaladeepikaQuote: 'Phaladeepika: “Those born under Uttara Ashadha are ethical, ambitious, and often achieve lasting success.”'
        },
        {
            id: 'shravana', name: 'Shravana', planetId: 'moon', purusharthaId: 'moksha', ganaId: 'deva', nakshatraGunaId: 'sattva',
            shortIntro: 'Wise and observant — Shravana is about listening, learning, and passing down knowledge.',
            rulingDeityInfo: 'Vishnu, the preserver, maintains cosmic order and protects truth. His presence brings spiritual insight, humility, and a thirst for learning.',
            detailedGunas: 'Tamas–Sattva–Rajas — Calm but curious; absorbs knowledge to guide others.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Shravana is associated with Vishnu, symbolizing listening, learning, and dissemination of knowledge.”',
            phaladeepikaQuote: 'Phaladeepika: “Individuals born under Shravana are attentive, wise, and have a strong inclination towards education and communication.”'
        },
        {
            id: 'dhanishta', name: 'Dhanishta', planetId: 'mars', purusharthaId: 'artha', ganaId: 'rakshasa', nakshatraGunaId: 'sattva',
            shortIntro: 'Rhythmic and successful — Dhanishta blends performance, prosperity, and community status.',
            rulingDeityInfo: 'The Vasus (gods of wealth and natural forces) symbolize material success, creativity, and worldly rhythm.',
            detailedGunas: 'Tamas–Rajas–Tamas — Driven and resourceful; needs inner meaning to avoid emptiness.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Dhanishta is linked to the Vasus, representing prosperity, rhythm, and adaptability.”',
            phaladeepikaQuote: 'Phaladeepika: “Natives of Dhanishta are energetic, sociable, and often have a talent for music or dance.”'
        },
        {
            id: 'shatabhisha', name: 'Shatabhisha', planetId: 'rahu', purusharthaId: 'kama', ganaId: 'rakshasa', nakshatraGunaId: 'sattva',
            shortIntro: 'Private and penetrating — Shatabhisha is about healing, isolation, and decoding mysteries.',
            rulingDeityInfo: 'Varuna, god of cosmic waters and hidden truth, brings healing through boundaries, depth, and intuition. He deals with both inner wounds and collective karma.',
            detailedGunas: 'Tamas–Tamas–Sattva — Detached and intuitive; heals by uncovering what\'s hidden.',
            bphsQuote: 'Brihat Parashara Hora Shastra: “Shatabhisha is associated with Varuna, symbolizing healing, secrecy, and depth.”',
            phaladeepikaQuote: 'Phaladeepika: “Those born under Shatabhisha are introspective, analytical, and often drawn to healing professions.”'
        },
        {
            id: 'purva_bhadrapada', name: 'P.Bhadrapada', planetId: 'jupiter', purusharthaId: 'artha', ganaId: 'manushya', nakshatraGunaId: 'sattva',
            shortIntro: 'Intense and visionary — Purva Bhadrapada is about extremes, inner fire, and walking the edge between chaos and awakening.',
            rulingDeityInfo: 'Aja Ekapada, a mystical one-footed serpent/fire-dragon, bridges destruction and transformation. He holds raw spiritual power, mystery, and the tension between worldly attachment and spiritual liberation.',
            detailedGunas: 'Sattva–Rajas–Tamas — Visionary and intense; must ground wild energy into purpose.',
            bphsQuote: '“Purva Bhadrapada is linked to Aja Ekapada, symbolizing intensity, inner fire, and the potential for spiritual transformation through austerity or upheaval.” – Brihat Parashara Hora Shastra',
            phaladeepikaQuote: '“Those born under Purva Bhadrapada are serious, passionate, and often drawn to mystical or unconventional paths.” – Phaladeepika'
        },
        {
            id: 'uttara_bhadrapada', name: 'U.Bhadrapada', planetId: 'saturn', purusharthaId: 'moksha', ganaId: 'manushya', nakshatraGunaId: 'sattva',
            shortIntro: 'Calm and mystical — Uttara Bhadrapada is about inner peace, emotional maturity, and quiet depth.',
            rulingDeityInfo: 'Ahir Budhnya, the serpent of the deep ocean, represents ancient wisdom, emotional stillness, and spiritual strength rising from the unconscious.',
            detailedGunas: 'Sattva–Sattva–Tamas — Emotionally deep and steady; grows through stillness and surrender.',
            bphsQuote: '“Uttara Bhadrapada is associated with Ahir Budhnya, symbolizing depth, stability, and the support of universal truth.” – Brihat Parashara Hora Shastra',
            phaladeepikaQuote: '“Those born under Uttara Bhadrapada are calm, introspective, and often seek spiritual understanding.” – Phaladeepika'
        },
        {
            id: 'revati', name: 'Revati', planetId: 'mercury', purusharthaId: 'moksha', ganaId: 'deva', nakshatraGunaId: 'sattva',
            shortIntro: 'Kind, nurturing, and guiding — Revati is the final Nakshatra, bringing closure, gentleness, and spiritual care.',
            rulingDeityInfo: 'Pushan, the nourisher and soul guide, ensures safe passage between realms. He is linked to protection, guidance, and helping others find their way.',
            detailedGunas: 'Sattva–Sattva–Sattva — Gentle and spiritually evolved; leads through kindness and care.',
            bphsQuote: '“Revati is linked to Pushan, the nourisher and protector, representing guidance, safety, and prosperity on one’s journey.” – Brihat Parashara Hora Shastra',
            phaladeepikaQuote: '“Natives of Revati are kind, generous, and often drawn to caregiving, the arts, or spiritual paths.” – Phaladeepika'
        }
    ],
    planets: [
        {
          id: 'sun',
          name: 'Surya (Sun)',
          symbolUnicode: '☉',
          mainDescription: "Surya is revered in the Vedas as the visible form of divine truth and the soul of all living beings. In the Rigveda, he is called the 'eye of the gods' and the dispeller of darkness. Brihat Parashara Hora Shastra describes him as square-bodied, clean, firm in resolve, and authoritative. Surya rides a chariot drawn by seven horses, representing the seven meters of Vedic rhythm and the days of the week.",
          psychologicalInfluence: "Surya governs the Atma (soul), dharma, and authority. He reflects one's ability to lead, uphold truth, and radiate inner strength.",
          rulingNakshatrasText: "Krittika (partially)",
          nakshatraInfluence: "Krittika channels Surya’s energy as sharp and illuminating. It cuts through falsehood and purifies through fire, giving a will to lead with focus and moral clarity."
        },
        {
          id: 'moon',
          name: 'Chandra (Moon)',
          symbolUnicode: '☽',
          mainDescription: "Chandra is the lunar deity who carries Soma, the nectar of immortality. In the Puranas, he is the nourisher of plants, emotions, and mind. Brihat Parashara describes him as round-faced, wise, soft-spoken, and fickle-minded. He rides a chariot pulled by antelopes and governs beauty, mood, and receptivity.",
          psychologicalInfluence: "Chandra governs manas (the mind), emotions, and memory. His influence relates to how we nurture, respond, and seek comfort.",
          rulingNakshatrasText: "Rohini, Hasta, Shravana",
          nakshatraInfluence: "These Nakshatras carry lunar qualities of gentleness, creativity, and emotional depth. They seek safety, nourishment, and continuity through tradition or care."
        },
        {
          id: 'mars',
          name: 'Mangala (Mars)',
          symbolUnicode: '♂',
          mainDescription: "Mangala is born from the Earth and known as the celestial commander. In the Skanda Purana, he is the god of war and celibacy, riding a ram and wielding strength and discipline. Parashara describes him as fiery, energetic, and courageous.",
          psychologicalInfluence: "Mars governs courage, assertiveness, physical energy, and the ability to act or protect.",
          rulingNakshatrasText: "Mrigashira, Chitra, Dhanishta",
          nakshatraInfluence: "These Nakshatras channel Mars’ power into skill, motion, and control. They are oriented toward mastery and can bring intensity or impatience."
        },
        {
          id: 'mercury',
          name: 'Budha (Mercury)',
          symbolUnicode: '☿',
          mainDescription: "Budha is the son of Chandra and Tara, embodying a blend of mind and intuition. Described in Parashara as intelligent, eloquent, and youthful, he rides a lion with an elephant trunk and governs commerce, speech, and learning.",
          psychologicalInfluence: "Mercury governs speech, logic, learning, and intelligence.",
          rulingNakshatrasText: "Ashlesha, Jyeshtha, Revati",
          nakshatraInfluence: "These Nakshatras become mentally sharp, expressive, and curious under Budha's influence. They can also show mental tension or trickery when misaligned."
        },
        {
          id: 'jupiter',
          name: 'Guru (Jupiter)',
          symbolUnicode: '♃',
          mainDescription: "Guru or Brihaspati is the preceptor of the gods. In the Rigveda, he is invoked for guidance, wisdom, and sacred speech. Parashara describes him as large-bodied, forgiving, and sattvic. He rides an elephant and governs knowledge, dharma, and expansion.",
          psychologicalInfluence: "Jupiter governs teaching, belief, optimism, and a broad vision of life’s purpose.",
          rulingNakshatrasText: "Punarvasu, Vishakha, Purva Bhadrapada",
          nakshatraInfluence: "These Nakshatras reflect Jupiter’s influence through generosity, moral conviction, and philosophical insight."
        },
        {
          id: 'venus',
          name: 'Shukra (Venus)',
          symbolUnicode: '♀',
          mainDescription: "Shukra is the guru of the Asuras (demigod) and the master of arts, fertility, and rejuvenation. In the Puranas, he is granted the Sanjeevani Vidya, the power to restore life. Parashara describes him as charming, pleasure-seeking, and poetic.",
          psychologicalInfluence: "Venus governs attraction, pleasure, creativity, and value systems.",
          rulingNakshatrasText: "Bharani, Purva Phalguni, Purva Ashadha",
          nakshatraInfluence: "These Nakshatras express Venus’s energy through beauty, union, and creative pleasure. They may also struggle with indulgence or dependency."
        },
        {
          id: 'saturn',
          name: 'Shani (Saturn)',
          symbolUnicode: '♄',
          mainDescription: "Shani is the slow-moving lord of karma and endurance. Described in the Puranas as the son of Surya and Chhaya, he is feared and respected. Parashara describes him as dark, tall, and indifferent. He brings structure, detachment, and maturity through time.",
          psychologicalInfluence: "Saturn governs boundaries, fear, commitment, and delayed rewards.",
          rulingNakshatrasText: "Pushya, Anuradha, Uttara Bhadrapada",
          nakshatraInfluence: "These Nakshatras show Saturn’s influence through discipline, perseverance, and inner strength often gained through hardship or solitude."
        },
        {
          id: 'rahu',
          name: 'Rahu',
          symbolUnicode: '☊',
          mainDescription: "Rahu is the shadowy North Node — the head of the immortal serpent who tried to steal the gods’ nectar. Though bodiless, he was granted planetary status and creates eclipse. In classical texts, Rahu represents illusion, craving, and unconventional desire.",
          psychologicalInfluence: "Rahu governs unfulfilled desire, confusion, foreignness, and worldly ambition.",
          rulingNakshatrasText: "Ardra, Swati, Shatabhisha",
          nakshatraInfluence: "These Nakshatras amplify Rahu’s intensity. They pursue disruption, reinvention, and freedom but may carry obsession or social defiance."
        },
        {
          id: 'ketu',
          name: 'Ketu',
          symbolUnicode: '☋',
          mainDescription: "Ketu is the headless tail of the demon Svarbhanu. After being separated from Rahu, Ketu became the shadowy indicator of moksha, past life karma, and spiritual insight. In texts, Ketu is associated with loss, renunciation, and wisdom born from detachment.",
          psychologicalInfluence: "Ketu governs intuition, past-life residue, mysticism, and internal detachment.",
          rulingNakshatrasText: "Ashwini, Magha, Mula",
          nakshatraInfluence: "These Nakshatras carry Ketu’s subtle power. They may appear withdrawn, instinctive, or unusually gifted — often pointing to karmic depth or spiritual potential."
        }
      ],
    purusharthas: [
        {
            id: 'dharma', name: 'Dharma',
            title: 'Dharma – The Drive for Purpose, Integrity & Service',
            classicalView: 'Dharma is righteous duty, alignment with universal truth, and living by one’s inner principles (svadharma). It upholds cosmic balance and one’s personal role within it.',
            modernSummary: 'Dharma is the voice inside that asks, “Is this meaningful?” or “Am I living in integrity?” It’s about contribution, values, and choosing the path that feels deeply right — even if it’s not the easiest.',
            modernTraits: ['Moral clarity and inner compass', 'Purpose-driven action', 'Desire to serve or protect others', 'Sense of responsibility or leadership'],
            examples: ['Choosing a less profitable job because it aligns with your values', 'Advocating for justice even when it’s inconvenient', 'Mentoring or guiding others', 'Creating systems that benefit your community'],
            positiveSide: ['Strong moral presence', 'Confidence rooted in purpose', 'Inspires others through example'],
            shadowSide: ['Self-righteousness or judgment', 'Burnout from over-serving', 'Rigidity in belief or behavior'],
            associatedNakshatras: ['Ashwini', 'Punarvasu', 'Pushya', 'Uttara Phalguni', 'Vishakha', 'Mula', 'Uttara Ashadha', 'Shravana', 'Purva Bhadrapada']
        },
        {
            id: 'artha', name: 'Artha',
            title: 'Artha – The Drive for Stability, Wealth & Capability',
            classicalView: 'Artha is the pursuit of material resources and competence, in service of a well-functioning life and support of Dharma. It is about worldly engagement, not greed.',
            modernSummary: 'Artha is your drive to build something solid — financial security, a career, a skillset. It’s the motivation to be capable and self-reliant, not just for survival, but to support others and your own long-term goals.',
            modernTraits: ['Strategic thinking and structure', 'Focus on money, assets, or skills', 'Strong work ethic and planning', 'Long-term vision for sustainability'],
            examples: ['Budgeting, investing, or saving', 'Learning a trade or technical skill', 'Building a home, business, or network', 'Taking responsibility for your financial life'],
            positiveSide: ['Self-sufficiency and resilience', 'Long-term wealth or resource generation', 'Brings structure and order to chaos'],
            shadowSide: ['Attachment to money, status, or success', 'Overidentifying with achievement', 'Fear of failure or scarcity mindset'],
            associatedNakshatras: ['Rohini', 'Hasta', 'Anuradha', 'Jyeshtha', 'Dhanishta', 'Magha', 'Bharani', 'Uttara Bhadrapada']
        },
        {
            id: 'kama', name: 'Kama',
            title: 'Kama – The Drive for Love, Pleasure & Connection',
            classicalView: 'Kama refers to all forms of enjoyment — emotional, sensual, aesthetic. It is one of the four legitimate goals of life, when pursued with balance and grace.',
            modernSummary: 'Kama is what makes life feel full — relationships, art, food, touch, and shared joy. It is the desire to connect, feel, and express. When honored, it leads to intimacy and beauty. When distorted, it becomes clinging or escapism.',
            modernTraits: ['Passionate, artistic, or romantic nature', 'Deep appreciation of aesthetics', 'Emotional bonding or craving affection', 'Living through senses and feelings'],
            examples: ['Falling in love with people, places, or experiences', 'Seeking emotional or physical intimacy', 'Creating or enjoying art, food, music, or beauty', 'Longing for closeness or comfort'],
            positiveSide: ['Emotional depth and richness', 'Creative power', 'Fosters intimacy and tenderness'],
            shadowSide: ['Overindulgence or emotional volatility', 'Clinging, jealousy, or lack of boundaries', 'Escaping responsibility through pleasure'],
            associatedNakshatras: ['Krittika', 'Mrigashira', 'Ardra', 'Purva Phalguni', 'Chitra', 'Swati', 'Shatabhisha', 'Revati']
        },
        {
            id: 'moksha', name: 'Moksha',
            title: 'Moksha – The Drive for Liberation, Stillness & Spiritual Truth',
            classicalView: 'Moksha is liberation from the cycle of birth and death. It is the highest aim in Vedic philosophy — the return of the soul to its original nature through detachment, knowledge, and surrender.',
            modernSummary: 'Moksha is the longing for quiet, inner truth, or something beyond worldly success. It’s what drives you to turn inward, reflect, and connect to what’s eternal rather than what’s temporary.',
            modernTraits: ['Strong inner life or spiritual interest', 'Drawn to solitude or contemplation', 'Disillusionment with materialism', 'Love for minimalism, nature, or mysticism'],
            examples: ['Journaling alone in a park', 'Meditating to connect inward', 'Questioning why we exist or what’s real', 'Choosing simplicity over noise'],
            positiveSide: ['Deep inner peace and resilience', 'Profound insight or awakening', 'Wisdom without attachment'],
            shadowSide: ['Emotional detachment or escapism', 'Isolation or withdrawal', 'Using spirituality to avoid hard truths'],
            associatedNakshatras: ['Ashlesha', 'Shatabhisha', 'Purva Ashadha', 'Uttara Bhadrapada', 'Revati']
        }
    ],
    ganas: [
        {
            id: 'deva', name: 'Deva',
            title: 'Deva Gana – The Divine Nature',
            classicalView: 'Deva Gana means “of the gods.” These individuals are sattvic in nature — noble, light-hearted, kind, and interested in upliftment. Deva energy is harmonious and refined.',
            modernSummary: 'Deva Gana is the “helper” energy — gentle, cooperative, and naturally inclined toward balance, compassion, and service. They thrive in calm, respectful environments and seek peace over power.',
            modernTraits: ['Empathetic, kind, and gentle', 'Cooperative and diplomatic', 'Spiritually inclined or mindful', 'Sensitive to conflict or harsh environments'],
            examples: ['Mediating between friends', 'Volunteering or quietly helping others', 'Choosing peace over being right', 'Deep concern for fairness or the well-being of others'],
            positiveSide: ['Inspires trust and ease in others', 'Naturally drawn to spiritual or creative pursuits', 'Seeks harmony without needing to control'],
            shadowSide: ['Can avoid confrontation or be overly passive', 'Struggles to set boundaries', 'May feel overwhelmed in aggressive or chaotic settings'],
            associatedNakshatras: ['Ashwini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Anuradha', 'Shravana', 'Revati']
        },
        {
            id: 'manushya', name: 'Manushya',
            title: 'Manushya Gana – The Human Nature',
            classicalView: 'Manushya Gana means “of the humans.” These individuals live in the middle realm — balancing light and dark, seeking growth through experience. They are adaptable, practical, and learn by doing.',
            modernSummary: 'Manushya Gana is the explorer and everyperson. These are relatable people who experience life through duality — pleasure and pain, success and failure. They are driven to evolve through relationships, work, and self-development.',
            modernTraits: ['Down-to-earth, relatable, and versatile', 'Curious about life’s complexities', 'Practical, driven by goals or challenges', 'Emotionally expressive and socially dynamic'],
            examples: ['Seeking therapy, coaching, or mentorship', 'Learning through trial and error', 'Being highly social and curious', 'Falling in and out of love, jobs, or ideas'],
            positiveSide: ['Grounded and accessible', 'Can navigate both shadow and light with awareness', 'Naturally empathetic and curious'],
            shadowSide: ['May struggle with consistency', 'Easily distracted by life’s noise', 'Can get caught in cycles of desire or comparison'],
            associatedNakshatras: ['Bharani', 'Rohini', 'Ardra', 'Purva Phalguni', 'Uttara Phalguni', 'Swati', 'Dhanishta', 'Purva Bhadrapada']
        },
        {
            id: 'rakshasa', name: 'Rakshasa',
            title: 'Rakshasa Gana – The Fierce / Instinctual Nature',
            classicalView: 'Rakshasa Gana means “of the demons” — but not in a negative sense. It refers to raw, intense, tamasic energy: powerful, driven, passionate, and often disruptive or deeply transformative.',
            modernSummary: 'Rakshasa Gana represents the disruptor, innovator, or survivor. These individuals don’t shy away from power or intensity. They challenge norms, carry strong desires, and often serve as catalysts for growth — in themselves or others.',
            modernTraits: ['Strong-willed, bold, and intense', 'Sharp, strategic, or competitive', 'Emotionally deep and hard to read', 'Often misunderstood or polarizing'],
            examples: ['Calling out injustice or breaking taboos', 'Channeling anger into activism or creation', 'Rising from hardship stronger than before', 'Having magnetic presence or intensity'],
            positiveSide: ['Powerful agents of change', 'Fearless in the face of discomfort', 'Able to handle difficult truths others avoid'],
            shadowSide: ['Can be manipulative or overly dominant', 'Struggles with emotional softness or vulnerability', 'May experience inner chaos or moral confusion'],
            associatedNakshatras: ['Krittika', 'Ashlesha', 'Magha', 'Chitra', 'Vishakha', 'Jyeshtha', 'Mula', 'Uttara Ashadha', 'Shatabhisha']
        }
    ],
    nakshatraGunas: [
        {
            id: 'sattva', name: 'Sattva',
            title: 'Sattva – The Energy of Clarity, Balance & Truth',
            classicalView: 'Sattva is light, harmony, and purity. It brings awareness, truth, and peace. It binds the soul through attachment to joy and knowledge. (Bhagavad Gita 14.6)',
            modernSummary: 'Sattva is presence. It brings inner peace, wisdom, and calm. It’s where balance is felt — where intuition, discipline, and joy come together effortlessly.',
            modernTraits: ['Mindfulness, calm, insight', 'Emotional clarity, presence', 'Harmony with others and with oneself'],
            examples: ['Choosing silence over reaction', 'Eating and living in tune with nature', 'Expressing compassion with boundaries', 'Sensing your place in something larger'],
            positiveSide: ['Spiritual clarity and depth', 'Clear mind and heart', 'Joy without craving'],
            shadowSide: ['Spiritual bypassing', 'Feeling superior due to purity', 'Avoidance of messy human experience'],
            associatedNakshatras: ['Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'],
            manualAngle: -90
        },
        {
            id: 'rajas', name: 'Rajas',
            title: 'Rajas – The Energy of Activity, Desire & Change',
            classicalView: 'Rajas is the force of movement, craving, and restlessness. It binds the soul through attachment to action and results. (Bhagavad Gita 14.7)',
            modernSummary: 'Rajas is your drive. It keeps you chasing goals, multitasking, building, and transforming. It’s necessary for progress but easily tips into exhaustion and anxiety.',
            modernTraits: ['Ambition, motion, goal-setting', 'Passion, excitement, intensity', 'Restlessness, competitive edge'],
            examples: ['Working late nights chasing a deadline', 'Jumping between interests without finishing', 'Scrolling constantly to "stay ahead"', 'Always seeking stimulation or "what’s next?"'],
            positiveSide: ['Momentum, creativity, and change', 'Strong will and leadership', 'Catalyzes growth in others'],
            shadowSide: ['Burnout, distraction, irritability', 'Over-identification with doing', 'Never feeling satisfied'],
            associatedNakshatras: ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha'],
            manualAngle: 30
        },
        {
            id: 'tamas', name: 'Tamas',
            title: 'Tamas – The Energy of Inertia, Obscurity & Depth',
            classicalView: 'Tamas is heaviness, ignorance, and resistance. It creates illusion, attachment, and passivity, but also provides stability and rest. (Bhagavad Gita 14.8)',
            modernSummary: 'Tamas is the root — grounding you in the body, in routine, in stillness. But too much makes you sluggish, stuck, or emotionally numb.',
            modernTraits: ['Heaviness, fatigue, procrastination', 'Avoidance, indulgence, confusion', 'Clinging to comfort zones or denial'],
            examples: ['Sleeping or binge-watching as an escape', 'Ignoring responsibilities until there\'s a crisis', 'Feeling "foggy" or emotionally blocked', 'Numbing out with food, substances, or noise'],
            positiveSide: ['Rest, recovery, integration', 'Groundedness and quiet strength', 'Ties to long-term memory and tradition'],
            shadowSide: ['Depression, addiction, denial', 'Staying in unhealthy cycles', 'Resistance to change'],
            associatedNakshatras: ['Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha'],
            manualAngle: 150
        }
    ]
};
const categoryGeneralInfo = {
    planets: {
        description: `<p><strong>What Are the 9 planets or 9 Grahas?</strong></p><p>In Vedic astrology, the 9 Grahas: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu, are not just planets. They are living archetypes that shape your personality, emotions, and karmic tendencies. Texts like the <em>Brihat Parashara Hora Shastra</em> and <em>Phaladeepika</em> describe them as active forces that influence not just events, but your inner experience.</p><p><strong>Why Graha + Nakshatra Matters</strong></p><p>Each Nakshatra is ruled by one of the 9 Grahas. This rulership acts like a filter, changing how the Nakshatra’s energy feels and functions in your chart. For example:</p><ul><li>Moon in a Saturn-ruled Nakshatra (like Pushya) may express emotion with restraint</li><li>Mars in a Venus-ruled Nakshatra (like Bharani) may act with more sensuality or emotional depth</li></ul><p>This helps you see beyond surface traits and into the emotional “tone” of each planet in your life.</p><p><strong>How to Use This</strong></p><ul><li>Find the Nakshatra of your Moon, Sun, or Ascendant</li><li>Identify the ruling Graha</li><li>Reflect on how that planet shapes your thoughts, reactions, or habits</li></ul><p>The Graha–Nakshatra link offers a more personal and nuanced understanding of your chart — one that bridges ancient insight with modern self-awareness.</p>`,
        itemsType: 'planet'
    },
    purusharthas: {
        description: `<p><strong>What Are the Purusharthas?</strong></p><p>In Vedic philosophy, the Purusharthas are the four aims of life: <strong>Dharma</strong> (purpose), <strong>Artha</strong> (security), <strong>Kama</strong> (pleasure), and <strong>Moksha</strong> (liberation).<br>Each Nakshatra expresses one of these aims as its core motivation — showing what the soul is ultimately seeking through that part of the chart.<br>These aims are not about morality, but about balance. They help reveal whether a Nakshatra's energy is driven by service, achievement, connection, or spiritual release.</p><p><strong>Why Purushartha + Nakshatra Matters</strong></p><p>Understanding the Purushartha of a Nakshatra adds context to its behavior and emotional tone.<br>For example:</p><ul><li>A Dharma Nakshatra may push you toward contribution or learning</li><li>A Kama Nakshatra may draw you to creativity or emotional intimacy</li><li>A Moksha Nakshatra may make you crave peace, solitude, or inner meaning</li></ul><p>It shows what your emotional or karmic drive is really aiming for.</p><p><strong>How to Use This</strong></p><ul><li>Find the Purushartha of your Moon or Ascendant Nakshatra</li><li>Reflect on whether that aim is being honored or blocked in your life</li><li>Ask how you can bring more balance among all four aims</li></ul><p>The Purusharthas help you understand your deeper motivations and align your actions with what truly brings fulfillment.</p>`,
        itemsType: 'purushartha'
    },
    ganas: {
        description: `<p><strong>What Are the Ganas?</strong></p><p>In Vedic astrology, each Nakshatra belongs to one of three Ganas: <strong>Deva</strong> (divine), <strong>Manushya</strong> (human), or <strong>Rakshasa</strong> (instinctual).<br>These Ganas describe the <em>temperament</em> or emotional nature behind a Nakshatra, not its morality. They help explain how you relate to others and respond to the world.</p><p><strong>Why Gana + Nakshatra Matters</strong></p><p>The Gana adds another layer to your emotional expression and social behavior.<br>For example:</p><ul><li>Deva Gana types may be soft, cooperative, or idealistic</li><li>Manushya Gana types are practical, curious, and adaptive</li><li>Rakshasa Gana types are intense, bold, or driven by passion</li></ul><p>Each brings strengths and challenges, depending on context and balance.</p><p><strong>How to Use This</strong></p><ul><li>Identify the Gana of your Moon or Ascendant Nakshatra</li><li>Reflect on how that temperament shows up in your life</li><li>Notice how you relate to others, and whether your reactions feel aligned with your deeper self</li></ul><p>The Ganas help you understand the emotional lens through which you move through relationships, stress, and growth.</p>`,
        itemsType: 'gana'
    },
    nakshatraGunas: {
        description: `<p><strong>What Are the Gunas?</strong></p><p>In Vedic thought, all things including emotions and behavior, are made up of three qualities called <strong>Gunas</strong>:<br><strong>Sattva</strong> (clarity), <strong>Rajas</strong> (activity), and <strong>Tamas</strong> (inertia).<br>Every Nakshatra expresses a combination of these Gunas, giving it a unique emotional and psychological flavor.</p><p><strong>Why Guna + Nakshatra Matters</strong></p><p>The Gunas show how a Nakshatra’s energy moves and feels. They help explain how we act under stress, how we seek pleasure, or how we find peace.<br>For example:</p><ul><li>A Rajas-heavy Nakshatra may feel driven, ambitious, or restless</li><li>A Tamas-oriented one may be more grounded, intense, or avoidant</li><li>A Sattva-based one may lean toward balance, simplicity, or spiritual focus</li></ul><p>These patterns shape how your chart plays out day to day.</p><p><strong>How to Use This</strong></p><ul><li>Find the Guna pattern of your Moon or Ascendant Nakshatra</li><li>Reflect on how it influences your motivation, habits, and emotional responses</li><li>Ask whether you might need more stillness (Tamas), clarity (Sattva), or movement (Rajas)</li></ul><p>The Gunas give insight into your inner balance — helping you make more conscious choices in how you think, feel, and act.</p>`,
        itemsType: 'nakshatra_guna'
    },
    nakshatrasOverview: {
        description: `<p><strong>What Is a Nakshatra?</strong></p>
                      <p>In Vedic astrology, a Nakshatra is one of 27 lunar sectors that the Moon travels through in its monthly cycle.<br>Each Nakshatra spans about 13°20′ of the zodiac and carries distinct qualities that shape how we feel, think, act, and grow.</p>
                      <p>The concept of Nakshatras is one of the oldest parts of Jyotisha, with roots in the Taittiriya Brahmana, and further explained in texts like the <em>Brihat Parashara Hora Shastra</em> and <em>Phaladeepika</em>. These texts describe each Nakshatra’s ruling deity, planetary lord, life motivation, and temperament.</p>
                      <p><strong>Why These Layers Matter</strong></p>
                      <ul>
                        <li>The Graha (planet) ruling the Nakshatra sets the emotional tone</li>
                        <li>The Purushartha shows what that energy is seeking (purpose, gain, pleasure, or release)</li>
                        <li>The Guna explains how its energy operates (active, clear, or dense)</li>
                        <li>The Gana reflects its social nature such as divine, human, or instinctual</li>
                      </ul>
                      <p>Together, these layers shape how a Nakshatra expresses itself through you in your instincts, habits, strengths, and patterns.</p>
                      <p><strong>Scientific Perspective</strong></p>
                      <p>Astronomically, Nakshatras correspond to fixed star groups along the Moon’s path across the sky.<br>They divide the zodiac into finer intervals than the 12 signs, making them valuable for understanding timing, personality, and emotional rhythms.</p>
                      <p><strong>How to Use This</strong></p>
                      <ul>
                        <li>Find the Nakshatra of your Moon, Sun, or Ascendant</li>
                        <li>Learn the ruling Graha, Guna, Gana, and Purushartha</li>
                        <li>Reflect on how those layers shape your behavior and emotional responses</li>
                      </ul>
                      <p>Understanding Nakshatras helps reveal your internal patterns with more clarity. It becomes easier to work with your energy, not against it.</p>`,
        itemsType: 'generalInfo'
    }
};
const labelVerticalOffsetDefault = nodeVisualSettings.baseRadius + nodeVisualSettings.labelGap;
const categoriesLayout = [
    { name: 'nakshatraGunas',  angleStart: -90, labelVerticalOffset: labelVerticalOffsetDefault, isTriangle: true, fixedRadius: NAKSHATRA_GUNA_TRIANGLE_RADIUS, ringPadding: 35 },
    { name: 'ganas',            angleStart: -90, labelVerticalOffset: labelVerticalOffsetDefault, ringPadding: 35 },
    { name: 'purusharthas',     angleStart: -90, labelVerticalOffset: labelVerticalOffsetDefault, ringPadding: 40 },
    { name: 'planets',          angleStart: -90, labelVerticalOffset: labelVerticalOffsetDefault, ringPadding: 50 },
    { name: 'nakshatras',       angleStart: -90, labelVerticalOffset: labelVerticalOffsetDefault, ringPadding: 0 }
];
const computedRootStyle = getComputedStyle(document.documentElement);

// --- Core Functions ---
async function loadItemIcon(itemId) {
    const iconPath = `icons/${itemId}.svg`;
    nakshatraIconContainer.innerHTML = '';
    nakshatraIconContainer.style.display = 'none';

    try {
        const response = await fetch(iconPath);
        if (!response.ok) {
            console.error(`Failed to load icon: ${iconPath}, Status: ${response.status}`);
            nakshatraIconContainer.style.display = 'none';
            return;
        }
        const svgText = await response.text();
        nakshatraIconContainer.innerHTML = svgText;
        nakshatraIconContainer.style.display = 'flex';

    } catch (error) {
        console.error(`Error fetching SVG icon ${iconPath}:`, error);
        nakshatraIconContainer.style.display = 'none';
    }
}

function calculateLayoutAndPositions() {
    const containerWidth = diagramContainer.clientWidth;
    const containerHeight = diagramContainer.clientHeight;
    svgElement.setAttribute('width', containerWidth);
    svgElement.setAttribute('height', containerHeight);
    svgWidth = containerWidth; // svgWidth is set here and accessible globally in this script
    svgHeight = containerHeight;
    centerX = svgWidth / 2; centerY = svgHeight / 2;
    let currentCalculatedRadius = 0;
    categoriesLayout.forEach((catInfo, ringIndex) => {
        const items = data[catInfo.name];
        if (!items || items.length === 0) { catInfo.calculatedRadius = currentCalculatedRadius; return; }
        const nodeRadiusForThisRing = (catInfo.name === 'planets') ? nodeVisualSettings.planetNodeRadius : nodeVisualSettings.baseRadius;
        if (catInfo.isTriangle) { currentCalculatedRadius = catInfo.fixedRadius; }
        else {
            const prevCat = categoriesLayout[ringIndex - 1];
            const prevNodeRadius = (prevCat && prevCat.name === 'planets') ? nodeVisualSettings.planetNodeRadius : nodeVisualSettings.baseRadius;
            if (prevCat) { currentCalculatedRadius = prevCat.calculatedRadius + prevNodeRadius + prevCat.labelVerticalOffset + nodeVisualSettings.labelLineHeight + prevCat.ringPadding; }
            else { currentCalculatedRadius = nodeRadiusForThisRing + nodeVisualSettings.labelGap + 10; }
        }
        catInfo.calculatedRadius = currentCalculatedRadius;
        const numItems = items.length;
        const angleStep = catInfo.isTriangle ? 0 : (360 / numItems);
        items.forEach((item, index) => {
            if (catInfo.isTriangle) { item.angle = typeof item.manualAngle === 'number' ? item.manualAngle : catInfo.angleStart + (index * (360/numItems)); }
            else { item.angle = catInfo.angleStart + (index * angleStep); }
            item.type = catInfo.name === 'nakshatraGunas' ? 'nakshatra_guna' : catInfo.name.slice(0, -1);
            item.cx = centerX + currentCalculatedRadius * Math.cos(item.angle * Math.PI / 180);
            item.cy = centerY + currentCalculatedRadius * Math.sin(item.angle * Math.PI / 180);
            item.labelVerticalOffset = nodeRadiusForThisRing + nodeVisualSettings.labelGap;
        });
    });
    const outermostRing = categoriesLayout[categoriesLayout.length -1];
    const outermostNodeRadius = (outermostRing.name === 'planets') ? nodeVisualSettings.planetNodeRadius : nodeVisualSettings.baseRadius;
    const diagramEffectiveRadius = outermostRing.calculatedRadius + outermostNodeRadius + outermostRing.labelVerticalOffset + nodeVisualSettings.labelLineHeight + 15;
    let scaleFactor = 1;
    const availableRadius = (Math.min(svgWidth, svgHeight) / 2) - 10;
    if (diagramEffectiveRadius > 0 && diagramEffectiveRadius > availableRadius) { scaleFactor = availableRadius / diagramEffectiveRadius; }
    else if (diagramEffectiveRadius > 0 && availableRadius / diagramEffectiveRadius > 1.05) { scaleFactor = Math.min(1.3, availableRadius / diagramEffectiveRadius); }
    if (scaleFactor < 0.1) scaleFactor = 0.1;
    categoriesLayout.forEach((catInfo) => {
        const items = data[catInfo.name];
        if (!items || items.length === 0) return;
        const nodeRadiusForThisRing = (catInfo.name === 'planets') ? nodeVisualSettings.planetNodeRadius : nodeVisualSettings.baseRadius;
        catInfo.scaledRadius = catInfo.isTriangle ? catInfo.fixedRadius : catInfo.calculatedRadius * scaleFactor;
        if (catInfo.scaledRadius < nodeRadiusForThisRing && !catInfo.isTriangle) { catInfo.scaledRadius = nodeRadiusForThisRing + (categoriesLayout.indexOf(catInfo) * 2); }
        if (catInfo.isTriangle && catInfo.scaledRadius < catInfo.fixedRadius) { catInfo.scaledRadius = Math.max(catInfo.fixedRadius, catInfo.scaledRadius); }
        const numItems = items.length;
        const angleStep = catInfo.isTriangle ? 0 : (360 / numItems);
        items.forEach((item, index) => {
             if (catInfo.isTriangle) { item.angle = typeof item.manualAngle === 'number' ? item.manualAngle : catInfo.angleStart + (index * (360/numItems)); }
             else { item.angle = catInfo.angleStart + (index * angleStep); }
            item.cx = centerX + catInfo.scaledRadius * Math.cos(item.angle * Math.PI / 180);
            item.cy = centerY + catInfo.scaledRadius * Math.sin(item.angle * Math.PI / 180);
            item.labelVerticalOffset = nodeRadiusForThisRing + nodeVisualSettings.labelGap;
        });
    });
}

function getNodeColor(item) {
    if (!item) return '#CCCCCC';
    let colorVar = '';
    if (item.type === 'nakshatra') colorVar = '--color-nakshatra-default';
    else if (item.type === 'planet') colorVar = `--color-planet-${item.id}`;
    else if (item.type === 'gana') colorVar = `--color-gana-base`;
    else if (item.type === 'purushartha') colorVar = `--color-purushartha-base`;
    else if (item.type === 'nakshatra_guna') colorVar = `--color-nakshatra-guna-base`;
    return computedRootStyle.getPropertyValue(colorVar).trim() || '#CCCCCC';
}

function createNode(item) {
    const group = document.createElementNS(svgNS, 'g');
    group.classList.add('node-group'); group.dataset.id = item.id; group.dataset.type = item.type;
    const currentBaseRadius = (item.type === 'planet') ? nodeVisualSettings.planetNodeRadius : nodeVisualSettings.baseRadius;
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', item.cx); circle.setAttribute('cy', item.cy); circle.setAttribute('r', currentBaseRadius);
    circle.classList.add(`${item.type}-node`); circle.dataset.id = item.id;
    group.appendChild(circle);

    let currentLabelFontSize = nodeVisualSettings.baseSvgLabelFontSize;
    let currentPlanetSymbolSize = nodeVisualSettings.basePlanetSymbolSize;

    if (svgWidth < 480) {
        currentLabelFontSize = 7;
        currentPlanetSymbolSize = 9;
    } else if (svgWidth < 768) {
        currentLabelFontSize = 10;
        currentPlanetSymbolSize = 13;
    }

    if (item.type === 'planet' && item.symbolUnicode) {
        const symbolText = document.createElementNS(svgNS, 'text');
        symbolText.textContent = item.symbolUnicode;
        symbolText.setAttribute('x', item.cx); symbolText.setAttribute('y', item.cy);
        symbolText.setAttribute('class', 'planet-symbol');
        symbolText.style.fontSize = currentPlanetSymbolSize + 'px';
        symbolText.setAttribute('dominant-baseline', 'central');
        const circleFill = getNodeColor(item);
        if (circleFill.toLowerCase() === '#ffd700' || circleFill.toLowerCase() === '#f0e68c' || circleFill.toLowerCase() === '#dda0dd' || circleFill.toLowerCase() === '#b9ffe2' ) { symbolText.style.fill = '#333333'; }
        else { symbolText.style.fill = '#FFFFFF'; }
        group.appendChild(symbolText);
    }

    const textLabel = document.createElementNS(svgNS, 'text');
    textLabel.textContent = item.name;
    textLabel.classList.add('node-text');
    textLabel.setAttribute('x', item.cx);
    textLabel.setAttribute('y', item.cy + item.labelVerticalOffset);
    textLabel.setAttribute('text-anchor', 'middle');
    textLabel.setAttribute('dominant-baseline', 'hanging');
    if (item.type !== 'planet') {
        textLabel.style.fontSize = currentLabelFontSize + 'px';
    } else {
        textLabel.style.fontSize = currentLabelFontSize + 'px';
    }

    const hoverTarget = document.createElementNS(svgNS, 'circle');
    hoverTarget.setAttribute('cx', item.cx); hoverTarget.setAttribute('cy', item.cy);
    hoverTarget.setAttribute('r', currentBaseRadius + nodeVisualSettings.labelGap * 0.6);
    hoverTarget.classList.add('node'); hoverTarget.dataset.id = item.id;
    group.appendChild(textLabel); group.appendChild(hoverTarget);
    svgElement.appendChild(group);
    elements[item.id] = { group, circle, text: textLabel, data: item, baseGUIRadius: currentBaseRadius };
}

function drawConnections() {
    data.nakshatras.forEach(n => {
        const connections = [
            { targetId: n.planetId, targetCategory: 'planets', colorSourceItem: data.planets.find(p=>p.id === n.planetId) },
            { targetId: n.purusharthaId, targetCategory: 'purusharthas', colorSourceItem: data.purusharthas.find(p=>p.id === n.purusharthaId) },
            { targetId: n.ganaId, targetCategory: 'ganas', colorSourceItem: data.ganas.find(g=>g.id === n.ganaId) },
            { targetId: n.nakshatraGunaId, targetCategory: 'nakshatraGunas', colorSourceItem: data.nakshatraGunas.find(ng=>ng.id === n.nakshatraGunaId) }
        ];
        connections.forEach(conn => {
            const target = data[conn.targetCategory]?.find(t => t.id === conn.targetId);
            if (target && typeof n.cx === 'number' && typeof target.cx === 'number') {
                const line = document.createElementNS(svgNS, 'line');
                line.setAttribute('x1', n.cx); line.setAttribute('y1', n.cy);
                line.setAttribute('x2', target.cx); line.setAttribute('y2', target.cy);
                line.setAttribute('class', 'connection-line');
                line.dataset.from = n.id; line.dataset.to = target.id;
                const lineColor = conn.colorSourceItem ? getNodeColor(conn.colorSourceItem) : '#888888';
                line.setAttribute('stroke', lineColor);
                svgElement.insertBefore(line, svgElement.firstChild);
            }
        });
    });
}

// --- Highlighting and State Management ---
function highlightNode(elementId, shouldHighlight, isPrimary) {
    const el = elements[elementId]; if (!el) return;
    const isClicked = el.group.classList.contains('clicked');
    const currentBaseRadius = (el.data.type === 'planet') ? nodeVisualSettings.planetNodeRadius : nodeVisualSettings.baseRadius;
    if (shouldHighlight || isClicked) {
        el.group.classList.add('highlight');
        if (isPrimary || isClicked) el.text.classList.add('highlight');
        else el.text.classList.add('secondary-highlight-text');
        el.circle.setAttribute('r', currentBaseRadius + nodeVisualSettings.hoverIncrease);
    } else {
        if (!el.group.classList.contains('category-glow')) {
            el.group.classList.remove('highlight');
            el.text.classList.remove('highlight');
            el.text.classList.remove('secondary-highlight-text');
            el.circle.setAttribute('r', currentBaseRadius);
        }
    }
}

function setClickedState(elementId, shouldBeClicked) {
    const el = elements[elementId]; if (!el) return;
    el.group.classList.toggle('clicked', shouldBeClicked);
    el.text.classList.toggle('clicked', shouldBeClicked);
    if (shouldBeClicked) { highlightNode(elementId, true, true); }
    else { const isStillHovered = el.group.classList.contains('highlight'); highlightNode(elementId, isStillHovered, isStillHovered); }
}

function highlightSvgNodesByCategory(categoryKey, shouldHighlight) {
    const targetType = categoryGeneralInfo[categoryKey]?.itemsType || categoryKey.slice(0,-1);
    Object.values(elements).forEach(elObj => {
        const elementType = elObj.data.type === 'nakshatra_guna' ? 'nakshatra_guna' : elObj.data.type;
        if (elementType === targetType) {
            elObj.group.classList.toggle('category-glow', shouldHighlight);
            const currentBaseRadius = (elObj.data.type === 'planet') ? nodeVisualSettings.planetNodeRadius : nodeVisualSettings.baseRadius;
            if (!shouldHighlight && !elObj.group.classList.contains('highlight') && !elObj.group.classList.contains('clicked')) {
                 elObj.circle.setAttribute('r', currentBaseRadius);
            }
        }
    });
}

function updateRelatedHighlights(primaryId, isActivating) {
    Object.values(elements).forEach(elObj => {
        if (elObj.data.id !== currentlyClickedId && !elObj.group.classList.contains('category-glow')) {
            highlightNode(elObj.data.id, false, false);
        }
    });
    document.querySelectorAll('.connection-line.highlight').forEach(l => {
        let involvedInClick = false;
        if (currentlyClickedId) { involvedInClick = l.dataset.from === currentlyClickedId || l.dataset.to === currentlyClickedId; }
        if (!involvedInClick) { l.classList.remove('highlight'); }
    });

    if (isActivating && elements[primaryId]) {
        highlightNode(primaryId, true, true);
        const lines = document.querySelectorAll(`.connection-line[data-from="${primaryId}"], .connection-line[data-to="${primaryId}"]`);
        lines.forEach(line => {
            line.classList.add('highlight');
            const connectedId = (line.dataset.from === primaryId) ? line.dataset.to : line.dataset.from;
            if (elements[connectedId] && connectedId !== currentlyClickedId && !elements[connectedId].group.classList.contains('category-glow')) {
                highlightNode(connectedId, true, false);
            }
        });
    }

    if (currentlyClickedId && elements[currentlyClickedId]) {
        highlightNode(currentlyClickedId, true, true);
        const clickedLines = document.querySelectorAll(`.connection-line[data-from="${currentlyClickedId}"], .connection-line[data-to="${currentlyClickedId}"]`);
        clickedLines.forEach(line => {
            line.classList.add('highlight');
            const connectedToClickedId = (line.dataset.from === currentlyClickedId) ? line.dataset.to : line.dataset.from;
            if (elements[connectedToClickedId] && !elements[connectedToClickedId].group.classList.contains('category-glow')) {
                if (connectedToClickedId === primaryId && isActivating) { highlightNode(connectedToClickedId, true, true); }
                else { highlightNode(connectedToClickedId, true, false); }
            }
        });
    }
}

// --- Info Panel Logic ---
function showInfoPanel(itemDataOrCategoryKey) {
    infoTitle.innerHTML = '';
    infoShortIntro.innerHTML = '';
    infoRulingDeityHeading.style.display = 'none';
    infoRulingDeityText.textContent = '';
    infoGunaDetailsDiv.style.display = 'none';
    infoPurusharthaDetailsDiv.style.display = 'none';
    infoGanaDetailsDiv.style.display = 'none';
    infoPlanetDetailsDiv.style.display = 'none';
    nakshatraAttributesContainerDiv.style.display = 'none';
    attributeRelatedNakshatrasDiv.style.display = 'none';
    infoGunaAssociatedNakshatrasDiv.style.display = 'none';
    attributesList.innerHTML = '';
    attributeRelatedNakshatrasList.innerHTML = '';
    gunaAssociatedNakshatrasList.innerHTML = '';
    infoGunaModernTraitsList.innerHTML = ''; infoGunaExamplesList.innerHTML = ''; infoGunaPositiveList.innerHTML = ''; infoGunaShadowList.innerHTML = '';
    infoPurusharthaModernTraitsList.innerHTML = ''; infoPurusharthaExamplesList.innerHTML = ''; infoPurusharthaPositiveList.innerHTML = ''; infoPurusharthaShadowList.innerHTML = '';
    infoGanaModernTraitsList.innerHTML = ''; infoGanaExamplesList.innerHTML = ''; infoGanaPositiveList.innerHTML = ''; infoGanaShadowList.innerHTML = '';
    infoPlanetRulingNakshatrasList.innerHTML = '';

    nakshatraIconContainer.innerHTML = '';
    nakshatraIconContainer.style.display = 'none';

    nakshatraClassicalQuotesDiv.style.display = 'none';
    quoteBPHS.textContent = '';
    quotePhaladeepika.textContent = '';


    if (typeof itemDataOrCategoryKey === 'string') {
        const categoryKey = itemDataOrCategoryKey;
        const categoryDisplayName = document.querySelector(`.category-link-item[data-category="${categoryKey}"]`)?.dataset.categoryName || categoryKey;
        const generalInfo = categoryGeneralInfo[categoryKey];
        infoTitle.textContent = categoryDisplayName;

        if (generalInfo) {
            infoShortIntro.innerHTML = generalInfo.description || '';
            const itemsOfTypeKey = generalInfo.itemsType === 'nakshatra_guna' ? 'nakshatraGunas' : generalInfo.itemsType + 's';
            const itemsOfType = data[itemsOfTypeKey] || data[generalInfo.itemsType]; // Check both plural and singular for itemsType
            if (itemsOfType && itemsOfType.length > 0 && generalInfo.itemsType !== 'generalInfo') { // Don't list items for generalInfo
                attributeRelatedNakshatrasDiv.style.display = 'block';
                infoCategoryItemsHeading.textContent = `Items in ${categoryDisplayName}:`;
                attributeRelatedNakshatrasList.innerHTML = '';
                itemsOfType.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.name;
                    if (item.type === 'planet' && item.psychologicalInfluence) {
                        const descSpan = document.createElement('span'); descSpan.className = 'detail-list-item-description';
                        descSpan.textContent = item.psychologicalInfluence; li.appendChild(descSpan);
                    } else if ( (item.type === 'purushartha' || item.type === 'gana' || item.type === 'nakshatra_guna') && item.modernSummary) {
                         const descSpan = document.createElement('span'); descSpan.className = 'detail-list-item-description';
                        descSpan.textContent = item.modernSummary; li.appendChild(descSpan);
                    }
                    attributeRelatedNakshatrasList.appendChild(li);
                });
            } else {
                attributeRelatedNakshatrasDiv.style.display = 'none';
            }
        } else {
            infoShortIntro.innerHTML = "<p>Detailed information for this category is not yet available.</p>";
        }
    } else {
        const itemData = itemDataOrCategoryKey;
        infoTitle.textContent = itemData.name;

        if (itemData.type === 'nakshatra' || itemData.type === 'planet' || itemData.type === 'nakshatra_guna' || itemData.type === 'purushartha' || itemData.type === 'gana') {
            loadItemIcon(itemData.id);
        }

        if (itemData.type === 'nakshatra') {
            infoShortIntro.innerHTML = `<p>${itemData.shortIntro || ''}</p>`;
            if (itemData.rulingDeityInfo) {
                infoRulingDeityHeading.style.display = 'block';
                infoRulingDeityText.textContent = itemData.rulingDeityInfo;
            }
            nakshatraAttributesContainerDiv.style.display = 'block';
            attributesList.innerHTML = '';
            const planet = data.planets.find(p => p.id === itemData.planetId);
            const purushartha = data.purusharthas.find(pu => pu.id === itemData.purusharthaId);
            const gana = data.ganas.find(g => g.id === itemData.ganaId);
            if (planet) attributesList.innerHTML += `<li><strong>Planetary Ruler:</strong> ${planet.name.split('(')[0].trim()}<span class="attribute-description">${planet.psychologicalInfluence || planet.mainDescription}</span></li>`;
            if (purushartha) attributesList.innerHTML += `<li><strong>Purushartha:</strong> ${purushartha.name}<span class="attribute-description">${purushartha.modernSummary || purushartha.classicalView}</span></li>`;
            if (gana) attributesList.innerHTML += `<li><strong>Gana:</strong> ${gana.name}<span class="attribute-description">${data.ganas.find(g => g.id === gana.id)?.modernSummary || gana.classicalView}</span></li>`;
            if (itemData.detailedGunas) {
                const gunaParts = itemData.detailedGunas.split('—');
                const gunaTypes = gunaParts[0] ? gunaParts[0].trim().replace(/–/g, '-') : '';
                const gunaSummary = gunaParts[1] ? gunaParts[1].trim() : '';
                attributesList.innerHTML += `<li><strong>Gunas:</strong> ${gunaTypes}<span class="attribute-description">${gunaSummary}</span></li>`;
            }

            if (itemData.bphsQuote || itemData.phaladeepikaQuote) {
                let hasContent = false;
                if (itemData.bphsQuote && itemData.bphsQuote.trim() !== '') {
                    quoteBPHS.textContent = itemData.bphsQuote;
                    quoteBPHS.style.display = 'block';
                    hasContent = true;
                } else {
                    quoteBPHS.textContent = '';
                    quoteBPHS.style.display = 'none';
                }
                if (itemData.phaladeepikaQuote && itemData.phaladeepikaQuote.trim() !== '') {
                    quotePhaladeepika.textContent = itemData.phaladeepikaQuote;
                    quotePhaladeepika.style.display = 'block';
                    hasContent = true;
                } else {
                    quotePhaladeepika.textContent = '';
                    quotePhaladeepika.style.display = 'none';
                }
                if(hasContent){
                    nakshatraClassicalQuotesDiv.style.display = 'block';
                } else {
                    nakshatraClassicalQuotesDiv.style.display = 'none';
                }
            } else {
                nakshatraClassicalQuotesDiv.style.display = 'none';
                quoteBPHS.style.display = 'none';
                quotePhaladeepika.style.display = 'none';
            }

        } else if (itemData.type === 'planet') {
            infoPlanetDetailsDiv.style.display = 'block';
            infoPlanetMainDescription.textContent = itemData.mainDescription || '';
            infoShortIntro.innerHTML = `<p>${itemData.psychologicalInfluence || ''}</p>`;
            infoPlanetRulingNakshatrasList.innerHTML = '';
            const rulingNaksHeading = document.getElementById('info-planet-ruling-nakshatras-heading');
            if (itemData.rulingNakshatrasText) {
                rulingNaksHeading.style.display = 'block';
                const naks = itemData.rulingNakshatrasText.split(',').map(n => n.trim());
                naks.forEach(nak => { if (nak) infoPlanetRulingNakshatrasList.innerHTML += `<li>${nak}</li>`; });
            } else {
                rulingNaksHeading.style.display = 'none';
            }
            infoPlanetInfluenceHeading.textContent = `When ${itemData.name.split('(')[0].trim()} rules or occupies a Nakshatra:`;
            infoPlanetInfluenceText.textContent = itemData.nakshatraInfluence || '';
            attributeRelatedNakshatrasDiv.style.display = 'block';
            infoCategoryItemsHeading.textContent = `Governed Nakshatras (Connections):`;
            attributeRelatedNakshatrasList.innerHTML = '';
            const relatedNaks = data.nakshatras.filter(n => n.planetId === itemData.id);
            if (relatedNaks.length > 0) {
                relatedNaks.forEach(n => { const li = document.createElement('li'); li.textContent = n.name; attributeRelatedNakshatrasList.appendChild(li); });
            } else {
                attributeRelatedNakshatrasList.innerHTML = '<li>No directly governed Nakshatras.</li>';
            }

        } else if (itemData.type === 'nakshatra_guna') {
            infoGunaDetailsDiv.style.display = 'block';
            const titlePartsGuna = itemData.title.split('–');
            const mainTitleGuna = titlePartsGuna[0] ? titlePartsGuna[0].trim() : itemData.name;
            const subTitleGuna = titlePartsGuna[1] ? titlePartsGuna[1].trim() : '';
            infoTitle.innerHTML = `${mainTitleGuna}<span class="info-panel-title-subtitle">${subTitleGuna}</span>`;
            infoGunaClassicalText.textContent = itemData.classicalView || '';
            infoGunaModernSummaryText.textContent = itemData.modernSummary || '';
            infoGunaModernTraitsList.innerHTML = ''; itemData.modernTraits?.forEach(trait => infoGunaModernTraitsList.innerHTML += `<li>${trait}</li>`);
            infoGunaExamplesList.innerHTML = ''; itemData.examples?.forEach(ex => infoGunaExamplesList.innerHTML += `<li>${ex}</li>`);
            infoGunaPositiveList.innerHTML = ''; itemData.positiveSide?.forEach(pos => infoGunaPositiveList.innerHTML += `<li>${pos}</li>`);
            infoGunaShadowList.innerHTML = ''; itemData.shadowSide?.forEach(sh => infoGunaShadowList.innerHTML += `<li>${sh}</li>`);
            if (itemData.associatedNakshatras && itemData.associatedNakshatras.length > 0) {
                infoGunaAssociatedNakshatrasDiv.style.display = 'block';
                infoGunaAssociatedNakshatrasHeading.textContent = `Nakshatras with primary ${itemData.name} Guna:`;
                gunaAssociatedNakshatrasList.innerHTML = '';
                itemData.associatedNakshatras.forEach(nakName => { gunaAssociatedNakshatrasList.innerHTML += `<li>${nakName}</li>`; });
            }

        } else if (itemData.type === 'purushartha') {
            infoPurusharthaDetailsDiv.style.display = 'block';
            const titlePartsPurush = itemData.title.split('–');
            const mainTitlePurush = titlePartsPurush[0] ? titlePartsPurush[0].trim() : `Purushartha: ${itemData.name}`;
            const subTitlePurush = titlePartsPurush[1] ? titlePartsPurush[1].trim() : '';
            infoTitle.innerHTML = `${mainTitlePurush}<span class="info-panel-title-subtitle">${subTitlePurush}</span>`;
            infoPurusharthaClassicalText.textContent = itemData.classicalView || '';
            infoPurusharthaModernSummaryText.textContent = itemData.modernSummary || '';
            infoPurusharthaModernTraitsList.innerHTML = ''; itemData.modernTraits?.forEach(trait => infoPurusharthaModernTraitsList.innerHTML += `<li>${trait}</li>`);
            infoPurusharthaExamplesList.innerHTML = ''; itemData.examples?.forEach(ex => infoPurusharthaExamplesList.innerHTML += `<li>${ex}</li>`);
            infoPurusharthaPositiveList.innerHTML = ''; itemData.positiveSide?.forEach(pos => infoPurusharthaPositiveList.innerHTML += `<li>${pos}</li>`);
            infoPurusharthaShadowList.innerHTML = ''; itemData.shadowSide?.forEach(sh => infoPurusharthaShadowList.innerHTML += `<li>${sh}</li>`);
            attributeRelatedNakshatrasDiv.style.display = 'block';
            attributeRelatedNakshatrasList.innerHTML = '';
            infoCategoryItemsHeading.textContent = `Nakshatras with ${itemData.name} Purushartha:`;
            if (itemData.associatedNakshatras && itemData.associatedNakshatras.length > 0) {
                itemData.associatedNakshatras.forEach(nakName => { const li = document.createElement('li'); li.textContent = nakName; attributeRelatedNakshatrasList.appendChild(li); });
            } else { attributeRelatedNakshatrasList.innerHTML = '<li>No directly related Nakshatras.</li>'; }

        } else if (itemData.type === 'gana') {
            infoGanaDetailsDiv.style.display = 'block';
            const titlePartsGana = itemData.title.split('–');
            const mainTitleGana = titlePartsGana[0] ? titlePartsGana[0].trim() : itemData.name;
            const subTitleGana = titlePartsGana[1] ? titlePartsGana[1].trim() : '';
            infoTitle.innerHTML = `${mainTitleGana}<span class="info-panel-title-subtitle">${subTitleGana}</span>`;
            infoGanaClassicalText.textContent = itemData.classicalView || '';
            infoGanaModernSummaryText.textContent = itemData.modernSummary || '';
            infoGanaModernTraitsList.innerHTML = ''; itemData.modernTraits?.forEach(trait => infoGanaModernTraitsList.innerHTML += `<li>${trait}</li>`);
            infoGanaExamplesList.innerHTML = ''; itemData.examples?.forEach(ex => infoGanaExamplesList.innerHTML += `<li>${ex}</li>`);
            infoGanaPositiveList.innerHTML = ''; itemData.positiveSide?.forEach(pos => infoGanaPositiveList.innerHTML += `<li>${pos}</li>`);
            infoGanaShadowList.innerHTML = ''; itemData.shadowSide?.forEach(sh => infoGanaShadowList.innerHTML += `<li>${sh}</li>`);
            attributeRelatedNakshatrasDiv.style.display = 'block';
            attributeRelatedNakshatrasList.innerHTML = '';
            infoCategoryItemsHeading.textContent = `Nakshatras with ${itemData.name} Gana:`;
            if (itemData.associatedNakshatras && itemData.associatedNakshatras.length > 0) {
                itemData.associatedNakshatras.forEach(nakName => { const li = document.createElement('li'); li.textContent = nakName; attributeRelatedNakshatrasList.appendChild(li); });
            } else { attributeRelatedNakshatrasList.innerHTML = '<li>No directly related Nakshatras.</li>'; }
        }
    }
    infoPanel.classList.add('visible');
}

function hideInfoPanelAndReset() {
    infoPanel.classList.remove('visible');
    nakshatraIconContainer.innerHTML = '';
    nakshatraIconContainer.style.display = 'none';
    nakshatraClassicalQuotesDiv.style.display = 'none';
    quoteBPHS.textContent = '';
    quotePhaladeepika.textContent = '';

    if (currentlyClickedId) {
        const unClickedNodeId = currentlyClickedId;
        setClickedState(unClickedNodeId, false);
        updateRelatedHighlights(unClickedNodeId, false);
        currentlyClickedId = null;
    }
    if (currentClickedCategory) {
        highlightSvgNodesByCategory(currentClickedCategory, false);
        currentClickedCategory = null;
    }
    categoryLinkItems.forEach(item => { highlightSvgNodesByCategory(item.dataset.category, false); });
}

// --- Event Listeners ---
svgElement.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('node')) {
        const id = e.target.dataset.id;
        clearTimeout(hoverTimeout);
        if (!currentClickedCategory) {
            hoverTimeout = setTimeout(() => {
                if (id) updateRelatedHighlights(id, true);
            }, 30);
        }
    }
});

svgElement.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('node')) {
        const id = e.target.dataset.id;
        clearTimeout(hoverTimeout);
        if (!currentClickedCategory) {
            if (id !== currentlyClickedId) {
                updateRelatedHighlights(id, false);
            }
        }
    }
});

svgElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('node')) {
        const id = e.target.dataset.id;
        const itemData = elements[id]?.data;
        if (itemData) {
            if (currentClickedCategory) {
                highlightSvgNodesByCategory(currentClickedCategory, false);
                currentClickedCategory = null;
            }
            if (currentlyClickedId && currentlyClickedId !== id) {
                setClickedState(currentlyClickedId, false);
                updateRelatedHighlights(currentlyClickedId, false);
            }
            if (currentlyClickedId === id) {
                hideInfoPanelAndReset();
            } else {
                currentlyClickedId = id;
                setClickedState(id, true);
                updateRelatedHighlights(id, true);
                showInfoPanel(itemData);
            }
        }
    }
});

categoryLinkItems.forEach(item => {
    const categoryKey = item.dataset.category;
    item.addEventListener('mouseover', () => {
        if (!currentClickedCategory || currentClickedCategory !== categoryKey) {
            highlightSvgNodesByCategory(categoryKey, true);
        }
    });
    item.addEventListener('mouseout', () => {
        if (currentClickedCategory !== categoryKey) {
            highlightSvgNodesByCategory(categoryKey, false);
        }
    });
    item.addEventListener('click', () => {
        if (currentlyClickedId) {
            setClickedState(currentlyClickedId, false);
            updateRelatedHighlights(currentlyClickedId, false);
            currentlyClickedId = null;
        }
        if (currentClickedCategory === categoryKey) {
            hideInfoPanelAndReset();
        } else {
            if (currentClickedCategory) {
                highlightSvgNodesByCategory(currentClickedCategory, false);
            }
            currentClickedCategory = categoryKey;
            highlightSvgNodesByCategory(categoryKey, true);
            showInfoPanel(categoryKey);
        }
    });
});

closePanelButton.addEventListener('click', hideInfoPanelAndReset);

document.addEventListener('click', (event) => {
    if (infoPanel.classList.contains('visible') && !infoPanel.contains(event.target)) {
        let targetElement = event.target;
        let isSvgNodeClick = false;
        let isCategoryLinkClick = false;
        while(targetElement != null) {
            if (targetElement.classList && targetElement.classList.contains('node')) { isSvgNodeClick = true; break; }
            if (targetElement.classList && targetElement.classList.contains('category-link-item')) { isCategoryLinkClick = true; break; }
            if (targetElement === svgElement || targetElement.id === 'category-links-container') break;
            targetElement = targetElement.parentNode;
        }
        if (!isSvgNodeClick && !isCategoryLinkClick) {
            hideInfoPanelAndReset();
        }
    }
});

// --- Initialization ---
function init() {
    svgElement.innerHTML = '';
    for (const key in elements) delete elements[key];
    currentlyClickedId = null;
    currentClickedCategory = null;
    calculateLayoutAndPositions(); // This will set svgWidth
    drawConnections();
    Object.values(data).flat().forEach(item => {
        if(item && typeof item === 'object' && item.id && typeof item.cx === 'number' && typeof item.cy === 'number') {
            createNode(item); // createNode will now use the updated svgWidth
        }
    });
}

window.addEventListener('resize', init);
init();
