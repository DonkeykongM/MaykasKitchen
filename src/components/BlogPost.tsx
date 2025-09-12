import React from 'react';
import { RecipeDetails } from './RecipeDetails';

const recipes = {
  'lins-bulgur-jarpar': {
    id: 'lins-bulgur-jarpar',
    title: 'Lins- och bulgurjärpar med sumak och spetspaprika',
    titleEn: 'Lentil and Bulgur Patties with Sumac and Sweet Pepper',
    description: 'Proteinrika och mättande vegetariska järpar med smakrik kombination av röda linser, bulgur och aromatiska kryddor från mellanöstern.',
    descriptionEn: 'Protein-rich and filling vegetarian patties with a flavorful combination of red lentils, bulgur and aromatic Middle Eastern spices.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCrZI4Zt1TCmP1dAHK4ioO3RwLkl5gtYD2IMbW',
    time: '45',
    portions: '4-6',
    likes: 38,
    rating: 4.8,
    reviews: 2,
    badges: ['Vegetariskt', 'Mellanöstern', 'Protein'],
    badgesEn: ['Vegetarian', 'Middle Eastern', 'Protein'],
    videoUrl: '',
    difficulty: 'Medel',
    difficultyEn: 'Medium',
    nutritionInfo: {
      calories: '320 kcal',
      protein: '18g',
      carbs: '52g',
      fat: '6g',
      fiber: '12g',
      salt: '1.4g'
    },
    allergens: ['Kan innehålla spår av gluten från bulgur'],
    allergensEn: ['May contain traces of gluten from bulgur'],
    content: {
      ingredients: [
        {
          section: 'Huvudingredienser',
          sectionEn: 'Main Ingredients',
          items: [
            '1 liter vatten',
            '3 dl röda linser',
            '6 dl finmalen bulgur',
            '1,5 gul lök, finhackad',
            '2 röda spetspaprikor, finhackade',
            '5–6 salladslökar, finhackade',
            '0,5 dl rapsolja (till stekning)',
            '1–1,5 msk tomatpuré'
          ],
          itemsEn: [
            '1 liter water',
            '3 dl red lentils',
            '6 dl fine bulgur',
            '1.5 yellow onion, finely chopped',
            '2 red sweet peppers, finely chopped',
            '5–6 scallions, finely chopped',
            '0.5 dl canola oil (for frying)',
            '1–1.5 tbsp tomato paste'
          ]
        },
        {
          section: 'Kryddor',
          sectionEn: 'Spices',
          items: [
            '2,5 tsk salt',
            '1 msk sumak',
            '1 tsk svartpeppar',
            '1 tsk garam masala',
            '1 tsk cayennepeppar'
          ],
          itemsEn: [
            '2.5 tsp salt',
            '1 tbsp sumac',
            '1 tsp black pepper',
            '1 tsp garam masala',
            '1 tsp cayenne pepper'
          ]
        }
      ],
      instructions: [
        {
          section: 'Koka linser och bulgur',
          sectionEn: 'Cook lentils and bulgur',
          steps: [
            'Koka upp 1 liter vatten i en stor kastrull.',
            'Skölj linserna noggrant och tillsätt dem i det kokande vattnet.',
            'Skumma av ytan med en sked eller sil när skum bildas.',
            'Koka linserna i ca 10 minuter, tills de får en grönaktig ton.',
            'Stäng av värmen.',
            'Skölj bulguren i kallt vatten och rör ner den i kastrullen med linserna.',
            'Blanda väl och låt blandningen stå och svälla tills den tjocknar.'
          ],
          stepsEn: [
            'Bring 1 liter of water to a boil in a large pot.',
            'Rinse the lentils thoroughly and add them to the boiling water.',
            'Skim the surface with a spoon or strainer when foam forms.',
            'Boil the lentils for about 10 minutes, until they get a greenish tone.',
            'Turn off the heat.',
            'Rinse the bulgur in cold water and stir it into the pot with the lentils.',
            'Mix well and let the mixture stand and swell until it thickens.'
          ]
        },
        {
          section: 'Förbered grönsaksröran',
          sectionEn: 'Prepare the vegetable mixture',
          steps: [
            'Finhacka lök, paprika och salladslök.',
            'Hetta upp rapsoljan i en stekpanna och fräs den gula löken tills den blir mjuk.',
            'Tillsätt spetspaprika och tomatpuré, låt fräsa i ytterligare ett par minuter.',
            'Vänd ner salladslöken och kryddorna. Stek ihop allting i ca 5–7 minuter.',
            'Låt röran svalna något.'
          ],
          stepsEn: [
            'Finely chop onion, peppers and scallions.',
            'Heat the canola oil in a frying pan and sauté the yellow onion until soft.',
            'Add sweet peppers and tomato paste, let sauté for another couple of minutes.',
            'Add the scallions and spices. Fry everything together for about 5–7 minutes.',
            'Let the mixture cool slightly.'
          ]
        },
        {
          section: 'Blanda och forma',
          sectionEn: 'Mix and form',
          steps: [
            'När både lins- och bulgurröran samt grönsaksröran har svalnat – blanda ihop dem ordentligt.',
            'Tillsätt vatten emellanåt om degen inte vill fastna eller känns för torr. Degen ska vara lättformad och mjuk i konsistensen.',
            'Forma järpar eller bollar av smeten med händerna.'
          ],
          stepsEn: [
            'When both the lentil-bulgur mixture and vegetable mixture have cooled – mix them together thoroughly.',
            'Add water occasionally if the dough won\'t stick or feels too dry. The dough should be easy to shape and soft in consistency.',
            'Form patties or balls from the mixture with your hands.'
          ]
        }
      ],
      tips: [
        'Servera järparna som de är eller i libabröd',
        'Pressa gärna citron över och ringla lite dadelsirap eller granatäpplesirap ovanpå',
        'Mörk sirap fungerar också fint som tillbehör',
        'Sumak ger en härlig syrlig smak - finns i mellanösternbutiker',
        'Kan förberedas dagen innan och förvaras i kylskåp'
      ],
      tipsEn: [
        'Serve the patties as they are or in pita bread',
        'Feel free to squeeze lemon over and drizzle some date syrup or pomegranate syrup on top',
        'Dark syrup also works fine as an accompaniment',
        'Sumac gives a lovely sour taste - available in Middle Eastern stores',
        'Can be prepared the day before and stored in the refrigerator'
      ]
    }
  },
  'kall-foul-medames': {
    id: 'kall-foul-medames',
    title: 'Kall foul medames',
    titleEn: 'Cold Foul Medames',
    description: 'En fräsch och proteinrik sallad med kokta bruna bönor eller favabönor, färska örter och citron. Perfekt som meze eller lätt måltid!',
    descriptionEn: 'A fresh and protein-rich salad with cooked brown beans or fava beans, fresh herbs and lemon. Perfect as meze or light meal!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCzNWv2DP9mAtjTsb7I6ZNyREunpVPwDz3h850',
    time: '15',
    portions: '4',
    likes: 15,
    rating: 4.8,
    reviews: 1,
    badges: ['Vegan', 'Mellanöstern', 'Snabb', 'Sallad'],
    badgesEn: ['Vegan', 'Middle Eastern', 'Quick', 'Salad'],
    videoUrl: '',
    difficulty: 'Lätt',
    difficultyEn: 'Easy',
    nutritionInfo: {
      calories: '240 kcal',
      protein: '12g',
      carbs: '32g',
      fat: '8g',
      fiber: '10g',
      salt: '1.2g'
    },
    allergens: ['Inga kända allergener'],
    allergensEn: ['No known allergens'],
    content: {
      ingredients: [
        {
          section: 'Huvudingredienser',
          sectionEn: 'Main Ingredients',
          items: [
            '2 burkar kokta bruna bönor eller favabönor (à ca 400g)',
            '2–3 vitlöksklyftor, finhackade eller pressade',
            '1 liten lök, finhackad',
            '1 stor tomat, hackad (eller 6 körsbärstomater)',
            '1 grön chili, finhackad (den styrkan du föredrar)',
            '1 dl färsk persilja, grovhackad',
            '2-3 msk färsk salvia, finhackad',
            '2 msk färsk mynta, finhackad',
            '1 citron, saften',
            '0,5 dl olivolja (gärna extra till servering)',
            'Salt och svartpeppar, efter smak'
          ],
          itemsEn: [
            '2 cans cooked brown beans or fava beans (about 400g each)',
            '2–3 garlic cloves, finely chopped or pressed',
            '1 small onion, finely chopped',
            '1 large tomato, chopped (or 6 cherry tomatoes)',
            '1 green chili, finely chopped (strength you prefer)',
            '1 dl fresh parsley, roughly chopped',
            '2-3 tbsp fresh sage, finely chopped',
            '2 tbsp fresh mint, finely chopped',
            '1 lemon, juiced',
            '0.5 dl olive oil (preferably extra for serving)',
            'Salt and black pepper, to taste'
          ]
        }
      ],
      instructions: [
        {
          steps: [
            'Skölj bönorna noga och häll av vätskan.',
            'Lägg bönorna i en skål och blanda med alla grönsaker.',
            'Ringla över citron och olivolja.',
            'Krydda med färska örter, salt och peppar.',
            'Rör om och låt gärna stå 5–10 minuter så smakerna sätter sig.'
          ],
          stepsEn: [
            'Rinse the beans thoroughly and drain the liquid.',
            'Put the beans in a bowl and mix with all vegetables.',
            'Drizzle with lemon and olive oil.',
            'Season with fresh herbs, salt and pepper.',
            'Stir and let stand for 5–10 minutes so the flavors set.'
          ]
        }
      ],
      tips: [
        'Servera med libabröd eller pita',
        'Kan förberedas dagen innan och förvaras i kylskåp',
        'Supergott med extra olivolja och färsk citron vid servering',
        'Prova att tillsätta feta eller tahini för extra smak',
        'Perfekt som tillbehör till grillat eller som lätt lunch'
      ],
      tipsEn: [
        'Serve with pita bread or flatbread',
        'Can be prepared the day before and stored in refrigerator',
        'Delicious with extra olive oil and fresh lemon when serving',
        'Try adding feta or tahini for extra flavor',
        'Perfect as a side dish for grilled food or as a light lunch'
      ]
    }
  },
  'qrimyothe-munkar': {
    id: 'qrimyothe-munkar',
    title: 'Qrimyothe – Mormors munkar 🍩',
    titleEn: 'Qrimyothe – Grandma\'s Donuts 🍩',
    description: 'Mamma berättar om mormors kärlek i varje tugga ♥️ Det här receptet på Qrimyothe är mer än bara ingredienser – det är ett stycke historia från mitt hem, min kultur och framför allt från mitt hjärta.',
    descriptionEn: 'Mom tells about grandma\'s love in every bite ♥️ This recipe for Qrimyothe is more than just ingredients – it\'s a piece of history from my home, my culture and above all from my heart.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCMH3uifMpaES95dj1pBAJ4iwc3fNXxvqYhzGT',
    time: '120',
    portions: '20',
    likes: 8,
    rating: 4.9,
    reviews: 1,
    badges: ['Traditionellt', 'Bakverk', 'Assyriskt', 'Dessert'],
    badgesEn: ['Traditional', 'Baking', 'Assyrian', 'Dessert'],
    videoUrl: '',
    difficulty: 'Medel',
    difficultyEn: 'Medium',
    nutritionInfo: {
      calories: '180 kcal',
      protein: '4g',
      carbs: '28g',
      fat: '6g',
      fiber: '1g',
      salt: '0.3g'
    },
    allergens: ['Gluten'],
    allergensEn: ['Gluten'],
    personalStory: 'Det här receptet på Qrimyothe är mer än bara ingredienser – det är ett stycke historia från mitt hem, min kultur och framför allt från mitt hjärta.\n\nMin mamma har berättat hur mormor brukade baka dessa munkar hemma, särskilt när resurserna var knappa. Med mjöl, vatten, jäst och en nypa socker skapade hon något sött, varmt och älskat av barnen 👌😋.\n\nQrimyothe blev en kär tradition – ett sätt att visa kärlek genom enkelhet. Doften av nygräddade munkar bar med sig barndom, trygghet och omtanke. De påminde oss om att det inte krävs mycket för att ge – bara vilja, kärlek och omtanke 💫⭐️🌟.\n\nMed det här receptet vill jag bevara hennes minne och föra vidare smaken av våra rötter ❤️.',
    personalStoryEn: 
      'This recipe for Qrimyothe is more than just ingredients – it\'s a piece of history from my home, my culture and above all from my heart.\n\n' +
      'My mother has told me how grandma used to bake these donuts at home, especially when resources were scarce. With flour, water, yeast and a pinch of sugar, she created something sweet, warm and beloved by the children 👌😋.\n\n' +
      'Qrimyothe became a dear tradition – a way to show love through simplicity. The scent of freshly baked donuts carried with it childhood, safety and care. They reminded us that it doesn\'t take much to give – just willingness, love and care 💫⭐️🌟.\n\n' +
      'With this recipe I want to preserve her memory and pass on the taste of our roots ❤️.',
    content: {
      ingredients: [
        {
          section: 'Huvudingredienser',
          sectionEn: 'Main Ingredients',
          items: [
            '7 dl varmt vatten (minst 40°C)',
            '1 paket torrjäst (ca 12 g)',
            '2 msk socker',
            '1 msk salt',
            '16 dl vetemjöl (ca 960 g)',
            'Olja till fritering'
          ],
          itemsEn: [
            '7 dl water (at least 40°C)',
            '1 packet dry yeast (about 12 g)',
            '2 tbsp sugar',
            '1 tbsp salt',
            '16 dl all-purpose flour (about 960 g)',
            'Oil for frying'
          ]
        }
      ],
      instructions: [
        {
          section: 'Förbered degen',
          sectionEn: 'Prepare the dough',
          steps: [
            'Häll det varma vattnet i en stor bunke.',
            'Tillsätt socker och torrjäst. Rör om och låt stå i 10 minuter tills det börjar bubbla (det visar att jästen aktiverats).',
            'Tillsätt salt och sedan mjölet lite i taget under omrörning.',
            'Knåda degen tills den blir jämn och elastisk – cirka 10 minuter för hand eller 5–7 minuter i maskin.'
          ],
          stepsEn: [
            'Pour the warm water into a large bowl.',
            'Add sugar and dry yeast. Stir and let stand for 10 minutes until it starts to bubble (this shows that the yeast is activated).',
            'Add salt and then flour gradually while stirring.',
            'Knead the dough until smooth and elastic – about 10 minutes by hand or 5–7 minutes in a machine.'
          ]
        },
        {
          section: 'Jäsning',
          sectionEn: 'Rising',
          steps: [
            'Täck bunken med plastfolie eller bakduk.',
            'Låt degen jäsa i 1–1,5 timme på en varm plats tills den fördubblats i storlek.'
          ],
          stepsEn: [
            'Cover the bowl with plastic wrap or baking cloth.',
            'Let the dough rise for 1–1.5 hours in a warm place until doubled in size.'
          ]
        },
        {
          section: 'Forma munkarna',
          sectionEn: 'Shape the donuts',
          steps: [
            'Häll lite olja på händerna för att degen inte ska fastna.',
            'Ta små bitar av degen och forma till bollar eller ringar.'
          ],
          stepsEn: [
            'Pour a little oil on your hands so the dough won\'t stick.',
            'Take small pieces of dough and shape into balls or rings.'
          ]
        },
        {
          section: 'Fritering',
          sectionEn: 'Frying',
          steps: [
            'Hetta upp olja i en djup kastrull eller fritös till cirka 180°C.',
            'Fritera några munkar åt gången tills de är gyllenbruna och genomstekta – vänd dem för jämn färg.',
            'Låt munkarna rinna av på hushållspapper.'
          ],
          stepsEn: [
            'Heat oil in a deep saucepan or fryer to about 180°C.',
            'Fry a few donuts at a time until golden brown and cooked through – turn them for even color.',
            'Let the donuts drain on paper towels.'
          ]
        },
        {
          section: 'Serveringstips',
          sectionEn: 'Serving tips',
          steps: [
            'Servera som de är, eller pudra med florsocker.',
            'Ringla över sirap eller servera med glass, hallon och mynta 😍.'
          ],
          stepsEn: [
            'Serve as they are, or dust with powdered sugar.',
            'Drizzle with syrup or serve with ice cream, raspberries and mint 😍'
          ]
        }
      ],
      tips: [
        'Degen ska vara mjuk och elastisk – tillsätt mer mjöl om den känns för klibbig',
        'Temperaturen på oljan är viktig – för kall olja ger seg konsistens, för het gör munkarna mörka utanpå men råa inuti',
        'Traditionellt serveras de med socker eller honung',
        'Kan förvaras i lufttät behållare i 2-3 dagar',
        'Blir extra goda uppvärmda kort i ugnen innan servering'
      ],
      tipsEn: [
        'The dough should be soft and elastic – add more flour if it feels too sticky',
        'Oil temperature is important – too cold oil gives tough consistency, too hot makes the donuts dark outside but raw inside',
        'Traditionally served with sugar or honey',
        'Can be stored in airtight container for 2-3 days',
        'Taste extra good when reheated briefly in the oven before serving'
      ]
    }
  },
  'kycklingfile-potatis-dragon': {
    id: 'kycklingfile-potatis-dragon',
    title: 'Stekt kycklingfilé med smörslungad potatis, sautéade grönsaker och dragonsås',
    titleEn: 'Pan-fried Chicken Fillet with Butter-tossed Potatoes, Sautéed Vegetables and Tarragon Sauce',
    description: 'En rätt som snabbt blev en favorit både hemma och på jobbet. Kombinerar krämig dragonsås med saftig kyckling och smörstekta grönsaker – enkel men med känsla av något riktigt lyxigt.',
    descriptionEn: 'A dish that quickly became a favorite both at home and at work. Combines creamy tarragon sauce with juicy chicken and butter-sautéed vegetables – simple but with a feeling of something truly luxurious.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8m7bPB037zrR9qXSut4TKmZEpjlBcOhHew02',
    time: '60',
    portions: '3-4',
    likes: 56,
    rating: 4.9,
    reviews: 2,
    badges: ['Kött', 'Klassisk', 'Vardagslyx'],
    videoUrl: '',
    difficulty: 'Medel',
    nutritionInfo: {
      calories: '580 kcal',
      protein: '42g',
      carbs: '28g',
      fat: '32g',
      fiber: '4g',
      salt: '1.8g'
    },
    allergens: ['Laktos (från grädde och smör)'],
    personalStory: 'Det här är en rätt som snabbt blev en favorit både hemma och på jobbet. Jag började experimentera med den i köket hemma, och det dröjde inte länge förrän den blev en självklar klassiker hos familjen – en sådan där rätt som alla ber om "igen, snart". Den kombinerar krämig dragonsås med saftig kyckling och smörstekta grönsaker – enkel men med känsla av något riktigt lyxigt.\n\nDet är en sådan rätt som ser ut och smakar som helg – men som faktiskt går snabbt nog att laga en vanlig vardagskväll. Vällagad, färgstark och full av smak – det här är vardagslyx när den är som bäst.',
    content: {
      ingredients: [
        {
          section: 'Kycklingfilé',
          items: [
            '3 st kycklingfiléer',
            'Salt och svartpeppar',
            'Smör och neutral olja till stekning',
            'Färsk timjan, rosmarin eller vitlök (valfritt)',
            'Ev. lite kycklingbuljong för extra smak i ugnen'
          ]
        },
        {
          section: 'Smörstekt potatis och grönsaker',
          items: [
            '800g delikatesspotatis',
            '1 röd paprika',
            '1 gul paprika',
            '1 orange paprika',
            '1 stor rödlök',
            'Ca 300g brysselkål',
            '50–75g smör',
            'Salt och svartpeppar',
            'Ev. lite olivolja eller rapsolja',
            'Färsk persilja (valfritt)'
          ]
        },
        {
          section: 'Dragonsås',
          items: [
            '2 dl vispgrädde',
            '1 dl crème fraîche',
            '1–2 tsk dijonsenap',
            '1 tsk vitvinsvinäger (eller citronjuice)',
            '1–2 tsk torkad dragon (eller 1 msk färsk)',
            'Salt och svartpeppar'
          ]
        }
      ],
      instructions: [
        {
          section: 'Förbered kycklingen',
          steps: [
            'Sätt ugnen på 150°C (över- och undervärme).',
            'Ta fram kycklingen i god tid så den inte är kylskåpskall.',
            'Krydda filéerna runtom med salt och peppar.',
            'Hetta upp en panna med smör och lite olja.',
            'Bryn filéerna 2–3 minuter per sida tills de fått en fin gyllene yta. Lägg gärna i en kvist timjan, rosmarin eller en krossad vitlöksklyfta för smak.',
            'Lägg de brynta filéerna i en ugnsform. Tillsätt ev. en skvätt buljong eller en klick smör i formen.',
            'Tillaga i ugn tills innertemperaturen är 70–72°C.',
            'Låt vila i 5–10 minuter innan servering så att köttsaften sätter sig.'
          ]
        },
        {
          section: 'Smörstekt potatis och grönsaker',
          steps: [
            'Koka potatisen nästan klar i saltat vatten, ca 12–15 minuter. Häll av, låt ånga av och dela stora potatisar i halvor.',
            'Skär paprikorna i stora klyftor.',
            'Skala och skär rödlöken i båtar eller grova strimlor.',
            'Ansa och halvera brysselkålen. Förkoka i lättsaltat vatten i ca 3 minuter, häll av och låt torka.',
            'Hetta upp en stor stekpanna med hälften smör, hälften olja.',
            'Lägg i potatisen först och stek tills den får fin gyllenbrun yta.',
            'Tillsätt brysselkål, rödlök och paprika. Stek på medelhög värme i cirka 10 minuter tills grönsakerna är mjuka men fortfarande har lite tuggmotstånd.',
            'Avsluta med en klick smör. Smaka av med salt, peppar och eventuellt finhackad persilja.'
          ]
        },
        {
          section: 'Dragonsås',
          steps: [
            'Häll grädde och crème fraîche i en kastrull och koka upp.',
            'Sänk värmen något och vispa ner dijonsenap, dragon och vinäger.',
            'Låt såsen sjuda i 5–10 minuter tills den tjocknar lätt.',
            'Smaka av med salt, peppar och ev. mer vinäger eller senap om du vill ha mer syra.'
          ]
        },
        {
          section: 'Servering',
          steps: [
            'Skär den färdiga kycklingen i sneda skivor.',
            'Lägg potatis- och grönsaksblandningen i botten på tallriken.',
            'Placera kycklingskivorna ovanpå.',
            'Ringla över dragonsåsen eller servera den vid sidan.',
            'Garnera eventuellt med färsk dragon eller persilja.'
          ]
        }
      ],
      tips: [
        'Använd en kötttermometer för perfekt resultat – 70-72°C är optimalt för kycklingfilé',
        'Låt kycklingen vila efter ugnen så köttsaften sätter sig',
        'Förkoka brysselkålen så den inte blir för hård',
        'Dragonsåsen kan göras i förväg och värmas upp vid servering',
        'Varierar grönsaker efter säsong – zucchini, sparris och morötter funkar också bra'
      ]
    }
  },
  'pannpizzor': {
    id: 'pannpizzor',
    title: 'Snabba pannpizzor direkt i ugnsformen',
    description: 'Perfekt när du har kylskåpsrester att ta vara på! Släng på det du har hemma – ost, skinka, grönsaker – och njut av en enkel middag på nolltid.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC9IRZic42Pb4HZiuUEJYFXxpw0kyC8QIv7W2f',
    time: '90',
    portions: '4-6',
    likes: 32,
    rating: 4.7,
    reviews: 2,
    badges: ['Vegetariskt', 'Bakverk', 'Pizza'],
    videoUrl: '',
    difficulty: 'Lätt',
    nutritionInfo: {
      calories: '280 kcal',
      protein: '12g',
      carbs: '45g',
      fat: '8g',
      fiber: '3g',
      salt: '1.1g'
    },
    allergens: ['Gluten', 'Kan innehålla ägg'],
    content: {
      ingredients: [
        {
          section: 'Pizzadeg (räcker till flera pannpizzor)',
          items: [
            '5 dl ljummet vatten',
            '25g färsk jäst (eller 1/2 paket)',
            '2 tsk salt',
            '2 msk olivolja',
            'ca 10–12 dl vetemjöl (börja med mindre, tillsätt mer efter behov)'
          ]
        },
        {
          section: 'Toppings (exempel)',
          items: [
            'Tomatsås',
            'Ost (mozzarella, cheddar eller vad du har hemma)',
            'Kylskåpsrester (skinka, grönsaker, champinjoner)',
            'Örter (oregano, basilika)'
          ]
        }
      ],
      instructions: [
        {
          steps: [
            'Smula ner jästen i en bunke. Häll över det ljumma vattnet och rör tills jästen lösts upp.',
            'Tillsätt salt och olivolja.',
            'Arbeta in mjölet lite i taget tills du får en smidig och ganska lös deg.',
            'Låt jäsa under duk i ca 45–60 minuter, tills degen blivit dubbelt så stor.',
            'Dela 2 lika stora bitar. Lägg varje bit på en ugnsform med bakplåtspapper och dra ut plus pressa ut med fingertopparna – anpassa till ugnsformens storlek.',
            'Låt jäsa i 20 min.',
            'Lägg på tomatsås och valfria kylskåpsrester som topping.',
            'Grädda i ugnen i ca 15-20 min på 230°C över- & undervärme.',
            'Sen är det bara att njuta! 😊'
          ]
        }
      ],
      tips: [
        'Perfekt sätt att använda kylskåpsrester',
        'Degen kan förberedas dagen innan och förvaras i kylskåpet',
        'Prova olika toppings: skinka, champinjoner, paprika, oliver',
        'För glutenfri variant, använd glutenfritt mjöl',
        'Kan frysas efter gräddning och värmas upp vid behov'
      ]
    }
  },
  'batata-harra': {
    id: 'batata-harra',
    title: 'Batata Harra – Friterad potatis med tomatsås',
    description: 'En smakrik och kryddig libanesisk rätt med krispig potatis, het tomatsås och färska örter. Perfekt som meze, tillbehör eller huvudrätt!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfWaFTn48dYxTFVG4qu9OSWrN21vZPBkJiCoK',
    time: '35',
    portions: '4-6',
    likes: 35,
    rating: 4.8,
    reviews: 1,
    badges: ['Vegan', 'Libanesiskt', 'Potatis'],
    videoUrl: '',
    difficulty: 'Medel',
    nutritionInfo: {
      calories: '320 kcal',
      protein: '4g',
      carbs: '38g',
      fat: '18g',
      fiber: '4g',
      salt: '1.5g'
    },
    allergens: ['Inga kända allergener'],
    content: {
      ingredients: [
        {
          section: 'Potatis',
          items: [
            '1 kg fast potatis',
            'Olja till fritering (t.ex. rapsolja)'
          ]
        },
        {
          section: 'Tomatsås',
          items: [
            '1,5 msk tomatpuré',
            '2 msk rapsolja',
            '1 msk lökpulver',
            '½ msk svartpeppar',
            '1 dl vatten',
            '1,5 tsk salt',
            '1 vitlöksklyfta (riven eller pressad)',
            '1,5 tsk chiliflakes',
            '1 msk paprikapulver'
          ]
        },
        {
          section: 'Topping',
          items: [
            'Färsk persilja (finhackad)',
            'Färsk mynta (finhackad)',
            'Tajinkrydda (efter smak)'
          ]
        }
      ],
      instructions: [
        {
          section: 'Förbered potatisen',
          steps: [
            'Skala och tärna potatisen i kuber.',
            'Lägg dem i kallt vatten i ca 5 minuter för att dra ut stärkelsen.',
            'Häll av vattnet, torka potatisen ordentligt med en kökshandduk eller hushållspapper.'
          ]
        },
        {
          section: 'Fritera',
          steps: [
            'Hetta upp olja i en kastrull eller fritös.',
            'Fritera potatisen tills den är gyllene och ca 80% genomstekt – de ska bli krispiga men inte helt mjuka.',
            'Låt rinna av på hushållspapper.'
          ]
        },
        {
          section: 'Gör tomatsåsen',
          steps: [
            'Hetta upp 2 msk rapsolja i en stekpanna.',
            'Stek tomatpurén kort i oljan för att fördjupa smaken.',
            'Häll i vattnet och rör om till en slät sås.',
            'Tillsätt lökpulver, svartpeppar, salt, chiliflakes, paprikapulver och vitlök.',
            'Rör om väl och låt sjuda någon minut.'
          ]
        },
        {
          section: 'Slutför rätten',
          steps: [
            'Vänd ner de friterade potatisarna i såsen och rör om så att allt täcks ordentligt.',
            'Strö över rikligt med finhackad persilja och mynta.',
            'Smaka av med tajinkrydda och rör om försiktigt.',
            'Servera varm som en del av ett mezebord, till grillat eller som ensam rätt med libabröd och hummus.'
          ]
        }
      ],
      tips: [
        'Viktigt att torka potatisen ordentligt för att få bra fritering',
        'Fritera inte potatisen helt färdig första gången – den ska vara ca 80% klar',
        'Tajinkrydda finns i mellanösternbutiker och ger en autentisk smak',
        'Kan serveras som tillbehör till kött eller som vegetarisk huvudrätt',
        'Supergott med libabröd och hummus på sidan'
      ]
    }
  },
  'mini-lahmacun': {
    id: 'mini-lahmacun',
    title: 'Mini Lahmacun – Perfekt mängd, noll svinn!',
    titleEn: 'Mini Lahmacun – Perfect Amount, Zero Waste!',
    description: '15 små perfekta lahmacun – köttfärs pizzor. Inget svinn, bara ren lycka! Perfekt att frysa in för framtida måltider.',
    descriptionEn: '15 small perfect lahmacun – ground meat pizzas. No waste, just pure joy! Perfect to freeze for future meals.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCFL7L57kjIHwnGYgUvXdix8ms3ac07hetyqO4',
    time: '75',
    portions: '15',
    likes: 25,
    rating: 4.9,
    reviews: 1,
    badges: ['Turkiskt', 'Kött', 'Traditionellt'],
    badgesEn: ['Turkish', 'Meat', 'Traditional'],
    videoUrl: '',
    difficulty: 'Medel',
    difficultyEn: 'Medium',
    nutritionInfo: {
      calories: '180 kcal',
      protein: '12g',
      carbs: '20g',
      fat: '6g',
      fiber: '2g',
      salt: '1.2g'
    },
    allergens: ['Gluten'],
    allergensEn: ['Gluten'],
    personalStory: 
      'Mini lahmacun är den perfekta lösningen när man har lust på hemmagjord lahmacun men inte vill ha massor av rester. Dessa små guldkorn är precis lagom stora för en person som snacks eller två som förrätt. Och det bästa? Du kan frysa in dem och bara ta fram så många du behöver!',
    personalStoryEn: `Mini lahmacun is the perfect solution when you crave homemade lahmacun but don't want lots of leftovers. These little golden nuggets are just the right size for one person as a snack or two as an appetizer. And the best part? You can freeze them and just take out as many as you need!`,
    content: {
      ingredients: [
        {
          section: 'Degen (räcker till ca 15 mini lahmacun)',
          sectionEn: 'Dough',
          items: [
            '4 dl varmt vatten (ca 40°C)',
            '1 tsk torrjäst',
            '½ dl rapsolja',
            '2 tsk salt',
            '7 dl vetemjöl'
          ],
          itemsEn: [
            '1 cup lukewarm water',
            '1 tsp active dry yeast',
            '1 tsp sugar',
            '1.7 cups all-purpose flour',
            '1 tsp salt',
            '2 tbsp olive oil'
          ]
        },
        {
          section: 'Köttfärsfyllning (till alla 15 st)',
          sectionEn: 'Ground Meat',
          items: [
            '1 gul lök',
            '1 kvisttomat',
            '1 röd spetspaprika',
            '1 grön paprika (gärna turkisk sivri)',
            '350g nötfärs (eller 50/50 nöt och lamm)',
            '1 msk paprikapulver',
            '½ tsk svartpeppar'
          ],
          itemsEn: [
            '300 g ground beef',
            '1 small yellow onion, finely chopped',
            '2 garlic cloves, pressed',
            '1 tbsp tomato paste',
            '1 tsp paprika powder',
            '½ tsp ground cumin',
            '½ tsp ground coriander',
            '¼ tsp cinnamon',
            '1 tsk salt',
            '½ tsk black pepper'
          ]
        },
        {
          section: 'Till montering',
          items: [
            'En näve färsk persilja'
          ]
        }
      ],
      instructions: [
        {
          section: 'Gör degen',
          sectionEn: 'Prepare the dough',
          steps: [
            'Värm vattnet till ca 40°C. Blanda med jäst och olja. Låt stå i 5 minuter.',
            'Tillsätt mjöl och salt. Knåda till en smidig deg.',
            'Täck över degen och låt jäsa i 15 minuter.',
            'Dela i 15 små bitar och kavla ut tunna runda kakor.'
          ],
          stepsEn: [
            'Mix lukewarm water, yeast and sugar. Let stand for 5 minutes.',
            'Add flour, salt and olive oil. Knead to a smooth dough.',
            'Let rise under a towel for 30 minutes.',
            'Divide into 15 small pieces and roll out thin round cakes.'
          ]
        },
        {
          section: 'Gör köttfärsfyllningen',
          sectionEn: 'Prepare the ground meat',
          steps: [
            'Mixa alla grönsaker till en puré i matberedaren.',
            'Blanda köttfärsen med alla kryddor och grönsaker.',
            'Knåda väl så allt blandas.',
            'Låt stå i kylen medan degen jäser.'
          ],
          stepsEn: [
            'Mix all ground meat with all spices and vegetables.',
            'Knead well so everything mixes.',
            'Let stand in the fridge while the dough rises.'
          ]
        },
        {
          section: 'Montering & gräddning',
          sectionEn: 'Assemble and bake',
          steps: [
            'Förvärm ugnen till 250°C (över- och undervärme).',
            'Bred ut köttfärsen tunt på degkakorna.',
            'Grädda i ugnen i 8-10 minuter tills kanterna är gyllene.',
            'Servera genast eller frys in för senare.'
          ],
          stepsEn: [
            'Preheat oven to 250°C/480°F.',
            'Spread the ground meat thinly on the dough cakes.',
            'Bake in oven for 8-10 minutes until edges are golden.',
            'Serve immediately or freeze for later.'
          ]
        }
      ],
      tips: [
        'Lägg dina mini lahmacun i plastpåsar när de svalnat och frys in – perfekt att ta fram vid behov!',
        'Smaken håller sig riktigt bra i frysen',
        'Du kan använda 50/50 nöt och lamm för mer autentisk smak',
        'Tajin krydda finns i mellanösternbutiker och ger en speciell smak',
        'Turkisk sivri paprika är mild och perfekt för detta recept'
      ],
      tipsEn: [
        'Feel free to freeze after baking – then heat in oven for 5 minutes',
        'Serve with lemon, parsley and red onion',
        'Can also be shaped as larger lahmacun if you prefer',
        'Perfect as appetizer or snack'
      ]
    }
  },
  'kikarts-tikka-masala': {
    id: 'kikarts-tikka-masala',
    title: 'Den krämigaste kikärts tikka masalan någonsin 🤯🔥',
    titleEn: 'The Creamiest Chickpea Tikka Masala Ever 🤯🔥',
    description: 'En gryta som kramar om både hjärta och smaklökar – den krämigaste kikärts tikka masalan du kan tänka dig. Fullproppad med dofter, kryddor och värme, och ändå klar på bara 20 minuter. Perfekt för en mysig familjemiddag eller en kväll med vänner. Och det bästa av allt? Den är helt vegansk – men så god att ingen ens märker det 😊',
    descriptionEn: 'A stew that embraces both heart and taste buds – the creamiest chickpea tikka masala you can imagine. Packed with aromas, spices and warmth, yet ready in just 20 minutes.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCKJbVDrdNwFxeKMmirjvq6ZL34tbPu8S2X5Q9',
    time: '20',
    portions: '4-6',
    likes: 12,
    rating: 4.9,
    reviews: 1,
    badges: ['Vegan', 'Indiskt', 'Vegetariskt', 'Snabb'],
    badgesEn: ['Vegan', 'Indian', 'Vegetarian', 'Quick'],
    videoUrl: '',
    difficulty: 'Lätt',
    difficultyEn: 'Easy',
    nutritionInfo: {
      calories: '380 kcal',
      protein: '16g',
      carbs: '45g',
      fat: '18g',
      fiber: '12g',
      salt: '1.6g'
    },
    allergens: ['Inga kända allergener (naturligt glutenfri)'],
    allergensEn: ['No known allergens (naturally gluten-free)'],
    personalStory: 
      'Perfekt för en mysig familjemiddag eller en kväll med vänner. Och det bästa av allt? Den är helt vegansk – men så god att ingen ens märker det 😊\n\n' +
      'Den här rätten har blivit en riktig favorit hemma hos oss. Barnen älskar den krämiga konsistensen och jag älskar hur enkelt det är att laga något så smakrikt på så kort tid.',
    personalStoryEn: 
      'Perfect for a cozy family dinner or an evening with friends. And the best part? It\'s completely vegan – but so delicious that no one even notices 😊\n\n' +
      'This dish has become a real favorite at home. The kids love the creamy consistency and I love how easy it is to cook something so flavorful in such a short time.',
    content: {
      ingredients: [
        {
          section: 'Huvudingredienser',
          sectionEn: 'Main Ingredients',
          items: [
            '1 gul lök, finhackad',
            '3 vitlöksklyftor, finrivna',
            '390g krossade tomater',
            '5 dl vatten',
            '2 × 380g kikärtor (tetrapack, avrunna och sköljda)',
            '350g kokosmjölk',
            'Rapsolja till stekning'
          ],
          itemsEn: [
            '1 yellow onion, finely chopped',
            '3 garlic cloves, finely grated',
            '390 g crushed tomatoes',
            '2 cups water',
            '2 × 380g chickpeas (canned, drained and rinsed)',
            '350 g coconut milk',
            'Rapeseed oil for frying'
          ]
        },
        {
          section: 'Kryddor',
          sectionEn: 'Spices',
          items: [
            '1 msk salt',
            '1 msk lökpulver',
            '1 msk paprikapulver',
            '1 tsk chiliflakes',
            '1 msk malen ingefära',
            '1 msk spiskummin',
            '½ msk malen koriander',
            '1 msk gurkmeja'
          ],
          itemsEn: [
            '1 tbsp salt',
            '1 tbsp onion powder',
            '1 tbsp paprika powder',
            '1 tsp chili flakes',
            '1 tbsp ground ginger',
            '1 tbsp ground cumin',
            '½ tbsp ground coriander',
            '1 tbsp turmeric'
          ]
        }
      ],
      instructions: [
        {
          steps: [
            'Hetta upp lite rapsolja i en kastrull eller djup panna. Fräs den finhackade löken tills den blir mjuk och lätt gyllene.',
            'Tillsätt vitlöken och låt fräsa med en kort stund.',
            'Häll i krossade tomater och vatten, rör om och låt sjuda under lock i ca 10 minuter.',
            'Blanda ner alla kryddorna och låt dem fräsa med i såsen så smakerna kommer fram.',
            'Rör ner kikärtorna och kokosmjölken, låt sjuda på låg värme i ca 10 minuter.',
            'Smaka av och servera med ris, naan eller bara som den är.'
          ],
          stepsEn: [
            'Heat a little rapeseed oil in a pot or deep pan. Fry the finely chopped onion until soft and lightly golden.',
            'Add the garlic and let it fry briefly.',
            'Pour in crushed tomatoes and water, stir and let simmer covered for about 10 minutes.',
            'Mix in all the spices and let them fry with the sauce to bring out the flavors.',
            'Stir in chickpeas and coconut milk, let simmer on low heat for about 10 minutes.',
            'Taste and serve with rice, naan or just as it is.'
          ]
        }
      ],
      tips: [
        'Extra gott med nybakat naan – recept hittar du bland mina reels',
        'Kan serveras med basmatiris, quinoa eller bara med bröd',
        'För extra krämighet, mixa hälften av kikärtorna före servering',
        'Rätten smakar ännu bättre dagen efter när smakerna hunnit sätta sig',
        'Kan frysas i upp till 3 månader – perfekt att laga större portioner'
      ],
      tipsEn: [
        'Extra delicious with freshly baked naan – you can find the recipe among my reels',
        'Can be served with basmati rice, quinoa or just with bread',
        'For extra creaminess, blend half the chickpeas before serving',
        'The dish tastes even better the next day when the flavors have had time to develop',
        'Can be frozen for up to 3 months – perfect for making larger portions'
      ]
    }
  },
  'lax-risbowl': {
    id: 'lax-risbowl',
    title: 'Kryddig lax- & risbowl',
    description: 'Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt, du kommer vilja göra det här om och om igen!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0',
    time: '45',
    portions: '4',
    likes: 47,
    rating: 4.8,
    reviews: 2,
    badges: ['Fisk', 'Hälsosam', 'Snabb'],
    videoUrl: '',
    difficulty: 'Lätt',
    nutritionInfo: {
      calories: '420 kcal',
      protein: '35g',
      carbs: '48g',
      fat: '12g',
      fiber: '6g',
      salt: '1.4g'
    },
    allergens: ['Fisk', 'Kan innehålla spår av senap'],
    content: {
      ingredients: [
        {
          section: 'Laxen',
          items: [
            '500g färsk laxfilé (utan skinn och ben)',
            '1 tsk salt',
            '½ tsk cayennepeppar',
            '1 tsk vitlökspulver'
          ]
        },
        {
          section: 'Riset',
          items: [
            '3 dl basmatiris',
            '6 dl vatten',
            '1 tsk salt'
          ]
        },
        {
          section: 'Primörgrönsaker',
          items: [
            '1 bunt sparris',
            '1 påse mini morötter',
            '3-4 salladslökar',
            '5-6 rädisor',
            '1 paket sockerärtor',
            '1 vitlöksklyfta',
            '1 tsk havssalt',
            '1 krm chiliflakes',
            'Rivet skal från ½ citron',
            '1 msk olivolja för fräsning'
          ]
        },
        {
          section: 'Honungs- & senapsmajonnäs',
          items: [
            '1 dl majonnäs (hemmagjord eller köpt)',
            '2 tsk dijonsenap',
            '1 tsk honung',
            '1 krm cayennepeppar',
            'Saften från ½ citron'
          ]
        }
      ],
      instructions: [
        {
          section: 'Tillagning',
          steps: [
            'Förbered laxen: Skär laxen i kuber och lägg i en ugnsform. Krydda med salt, cayennepeppar och vitlökspulver. Tillaga i ugnen på 180°C i ca 15 minuter.',
            'Koka riset: Skölj riset noggrant. Koka upp vatten med salt och lägg i riset. Sänk värmen, lägg på lock och låt sjuda i ca 10 minuter tills riset är mjukt.',
            'Gör majonnäsen: Blanda majonnäs med dijonsenap, honung, cayennepeppar och citronsaft. Rör eller mixa tills såsen är slät och krämig.',
            'Fräs grönsakerna: Skär primörgrönsaker i bitar. Hetta upp olivolja i en panna och fräs dem snabbt med vitlök, havssalt, chili och citronzest.',
            'Montera bowlen: Fördela riset i skålar, toppa med grönsakerna, laxen och ringla över honungs- & senapsmajonnäs'
          ]
        }
      ],
      tips: [
        'Byt ut lax mot tofu eller ugnsbakad halloumi för ett veganskt/vegetariskt alternativ',
        'Förbered grönsakerna i förväg för snabbare tillagning',
        'Servera gärna med extra citronklyftor',
        'För en glutenfri variant, kontrollera att majonnäsen är glutenfri',
        'Övriga grönsaker som funkar bra: broccoli, ärtor, avokado eller marinerad rödlök'
      ]
    }
  },
  'kafta-bil-sejnie': {
    id: 'kafta-bil-sejnie',
    title: 'Kafta bil sejnie - Köttbullar i tomatsås',
    description: 'En traditionell rätt från mellanöstern med saftiga köttbullar och potatis i en smakrik tomatsås.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8zXxYz037zrR9qXSut4TKmZEpjlBcOhHew02',
    time: '60',
    portions: '5-6',
    likes: 42,
    rating: 4.7,
    reviews: 2,
    badges: ['Kött', 'Traditionell', 'Assyriskt'],
    videoUrl: 'https://www.instagram.com/reel/DJT6lr7iPsV/',
    difficulty: 'Medel',
    nutritionInfo: {
      calories: '480 kcal',
      protein: '28g',
      carbs: '38g',
      fat: '24g',
      fiber: '4g',
      salt: '1.5g'
    },
    allergens: ['Kan innehålla spår av gluten från buljongen'],
    content: {
      ingredients: [
        {
          section: 'Biffarna',
          items: [
            '450g nötfärs',
            '1 liten gul lök, finskuren',
            '1/2 liten gul paprika, finskuren',
            'Näve persilja'
          ]
        },
        {
          section: 'Tomatsåsen / Grytan',
          items: [
            'Stekta biffarna',
            '450g delikatesspotatis',
            '1 liter vatten',
            '3 stora msk tomatpuré',
            '3 msk kalvbuljong',
            '1 tsk biber (chiliflakes)',
            '1 nypa havsalt',
            '1 tsk koriander'
          ]
        }
      ],
      instructions: [
        {
          section: 'Tillagning',
          steps: [
            'Blanda färs med grönsaker, forma till små bollar och platta ut dem i handen.',
            'Stek dem lätt i olja.',
            'Tillsätt vatten och tomatpuré.',
            'Halvera delikatesspotatisarna och lägg dem i grytan.',
            'Tillsätt buljong och krydda med biber (chiliflakes), havssalt och koriander.',
            'Lägg på lock och låt grytan koka klart.',
            'Under tiden, koka ris med vermicellinudlar.'
          ]
        }
      ],
      tips: [
        'Servera med ris och vermicellinudlar för en autentisk upplevelse',
        'Justera mängden chiliflakes efter önskad styrka',
        'Grytan kan förberedas dagen innan och värmas upp vid servering',
        'För en vegetarisk version, byt ut nötfärsen mot sojafärs eller linser',
        'För ökad smak, tillsätt en nypa spiskummin till färsen'
      ]
    }
  },
  'kofta-bil-sanieh': {
    id: 'kofta-bil-sanieh',
    title: 'Köfta bil Sanieh',
    description: 'Mellanösterns vardagsfavorit med smak av hem. En autentisk syrisk rätt med kryddig köttfärs, potatis och padron paprika i mustig tomatsås.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCGg5LVZ9bnLa0KVhUD3INroEj6yqmid4HwlYB',
    time: '60',
    portions: '8',
    likes: 33,
    rating: 4.9,
    reviews: 1,
    badges: ['Kött', 'Traditionell', 'Syriskt', 'Mellanöstern'],
    videoUrl: '',
    difficulty: 'Medel',
    nutritionInfo: {
      calories: '450 kcal',
      protein: '32g',
      carbs: '35g',
      fat: '22g',
      fiber: '5g',
      salt: '1.8g'
    },
    allergens: ['Kan innehålla spår av gluten'],
    personalStory: 'Köfta bil Sanieh är en rätt som doftar av barndom, gemenskap och kryddor från det syriska köket. Mina föräldrar kommer från Syrien och just den här rätten har alltid haft en självklar plats vid våra matbord. Det var ofta den som stod i ugnen när vi samlades med släktingar, högljudda och hungriga, med skratt och samtal som blandades med doften av stekt lök och tomatsås.\n\nDet är enkel mat, men med djup. Kryddig köttfärs blandas med lök, persilja och värmande smaker. Potatis och biffarna varvas i ugnsformen och får sjuda ihop i en mustig tomatsås tills allt är mjukt, saftigt och dofterna liksom vilar kvar i köket långt efter att maten är uppäten.\n\nFör mig bär Köfta bil Sanieh inte bara smaken av Mellanöstern, utan också smaken av min familj, vår historia och de där stunderna då vi verkligen var tillsammans.',
    content: {
      ingredients: [
        {
          section: 'Köftabiffarna',
          items: [
            '1kg nötfärs (gärna 10–15 % fetthalt)',
            '2 st salladslök hackad fint eller riv den',
            '1 knippe persilja, finhackad',
            '3 vitlöksklyftor',
            '3 msk olivolja',
            '1 msk salt',
            '1 tsk svartpeppar',
            '1 tsk garamasala'
          ]
        },
        {
          section: 'Grönsakerna',
          items: [
            'Ca 4 st (fasta) potatisar, skalade och klyftade',
            '5-6 st padron paprika'
          ]
        },
        {
          section: 'Tomatsåsen',
          items: [
            '3 dl vatten',
            '1 msk tomatpuré',
            '1 tsk lökpulver',
            '1 tsk salt',
            '1 tsk chiliflakes',
            'Olja till att steka/panera potatis och biffar'
          ]
        }
      ],
      instructions: [
        {
          section: 'Förbered järparna',
          steps: [
            'Hacka lök, vitlök och persilja fint (gärna i matberedare). Blanda i olivolja och alla kryddorna och mixa fint. Blanda örtoljan i färsen och knåda ihop till en jämn smet. Forma färsen till lika stora järpar.'
          ]
        },
        {
          section: 'Förstek potatisen',
          steps: [
            'Halvstek potatisskivorna i olja tills de är gyllenbruna men inte helt genomstekta. Detta ser till att potatisarna blir klara i ugnen.'
          ]
        },
        {
          section: 'Stek järparna lätt',
          steps: [
            'Snabbstek biffarna i het panna 1–2 minuter per sida för smak och för att de ska hålla formen.'
          ]
        },
        {
          section: 'Varva i ugnsform',
          steps: [
            'Lägg järparna och potatisklyftorna i en smörad form - varva järpar och potatis.'
          ]
        },
        {
          section: 'Häll på tomatsås',
          steps: [
            'Rör ihop tomatpuré och vatten. Smaka av med kryddorna. Häll över så att det täcker ingredienserna nästan helt.'
          ]
        },
        {
          section: 'Grädda',
          steps: [
            'Baka i 250°C i ca 20 minuter, sedan lägg på padron paprikorna och baka i ytterligare 15 min.',
            'Ta ut och servera med ris eller bara som den är med lite bröd till, supergott!'
          ]
        }
      ],
      tips: [
        'Garama masala ger en autentisk smak - finns i mellanösternbutiker',
        'Padron paprika kan ersättas med annan mild paprika',
        'För bästa resultat, använd färs med lite högre fetthalt för saftigare järpar',
        'Rätten smakar ännu bättre dagen efter när smakerna hunnit sätta sig',
        'Servera gärna med basmatiris och lite yoghurt på sidan'
      ]
    }
  },
  'pasta-pesto': {
    id: 'pasta-pesto',
    title: 'Pasta pesto med ugnsbakade tomater & stekt halloumi',
    description: 'En smakrik, krämig och färgsprakande pastarätt med pesto, ugnsbakade tomater och stekt halloumi - perfekt för hela familjen.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo',
    time: '40',
    portions: '4',
    likes: 41,
    rating: 4.9,
    reviews: 1,
    badges: ['Vegetariskt', 'Snabb', 'Pasta'],
    videoUrl: 'https://www.instagram.com/',
    difficulty: 'Lätt',
    nutritionInfo: {
      calories: '520 kcal',
      protein: '18g',
      carbs: '58g',
      fat: '26g',
      fiber: '6g',
      salt: '1.8g'
    },
    allergens: ['Laktos', 'Gluten (från pastan)', 'Kan innehålla spår av nötter från peston'],
    content: {
      ingredients: [
        {
          section: 'Ugnsbakade tomater',
          items: [
            '400g körsbärstomater eller små tomater',
            '2 msk olivolja',
            '1 tsk havssalt',
            '1 krm svartpeppar'
          ]
        },
        {
          section: 'Såsen',
          items: [
            '1 gul lök',
            '5 dl matgrädde',
            '380g grön pesto',
            '400g pasta'
          ]
        },
        {
          section: 'Halloumi och garnering',
          items: [
            '250g halloumi',
            '1 knippe färsk basilika',
            'Nymalen svartpeppar'
          ]
        }
      ],
      instructions: [
        {
          steps: [
            'Ugnsbaka tomaterna: Lägg tomaterna i en ugnsform, ringla över olivolja och strö över lite salt. Baka i ugnen i 200°C i ca 15 minuter tills de är mjuka och lätt karamelliserade.',
            'Koka pastan enligt anvisningarna på paketet. Spara gärna lite av pastavattnet till såsen.',
            'Gör såsen: Fräs finhackad lök i lite olja tills den blir mjuk och glansig. Tillsätt grädden och låt den börja småputtra. Rör därefter ner peston och låt allt blandas till en krämig sås.',
            'Blanda: Vänd ner den nykokta pastan i pestosåsen. Tillsätt en skvätt av det sparade pastavattnet om såsen behöver bli lite lösare.',
            'Stek halloumin: Skiva halloumin och stek gyllene på båda sidor i en het, torr stekpanna.',
            'Servera: Lägg upp pastan på tallrikar, toppa med de ugnsbakade tomaterna och stekt halloumi. Avsluta gärna med lite färsk basilika och ett drag med pepparkvarnen.'
          ]
        }
      ],
      tips: [
        'Använd gärna olika färger på tomaterna för en vackrare presentation',
        'Pastavattnet hjälper till att binda såsen och gör den krämigare',
        'Halloumin kan bytas ut mot grillad zucchini för en vegansk version',
        'För en matigare rätt, tillsätt ugnsbakade grönsaker som paprika, aubergine eller zucchini',
        'Prova att använda soltorkade tomater istället för ugnsbakade för en annan smakprofil'
      ]
    }
  },
  'kyckling-shawarma': {
    id: 'kyckling-shawarma',
    title: 'Kyckling Shawarma',
    description: 'Autentisk mellanöstern kyckling shawarma med hemmagjorda tunnbröd, kryddigt kött och fräscha tillbehör. Perfekt för familjen!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCG7jiQH9bnLa0KVhUD3INroEj6yqmid4HwlYB',
    time: '120',
    portions: '5',
    likes: 28,
    rating: 4.8,
    reviews: 2,
    badges: ['Kött', 'Mellanöstern', 'Familj'],
    videoUrl: 'https://www.instagram.com/',
    difficulty: 'Medel',
    nutritionInfo: {
      calories: '650 kcal',
      protein: '42g',
      carbs: '58g',
      fat: '28g',
      fiber: '4g',
      salt: '2.1g'
    },
    allergens: ['Gluten', 'Laktos (från yoghurt)'],
    content: {
      ingredients: [
        {
          section: 'Till köttet',
          items: [
            '900g kycklinglårfilé (eller kycklingbröst, men lår är saftigare)',
            '1 tsk malen spiskummin',
            '1 tsk paprikapulver',
            '1 tsk gurkmeja',
            '1 tsk malen koriander',
            '1 msk vitlökspulver',
            '1 msk lökpulver',
            '1 tsk cayennepeppar',
            '1 tsk dragon',
            '1 msk salt',
            '1 tsk svartpeppar',
            '1 msk tomatpuré'
          ]
        },
        {
          section: 'Vitlökssås',
          items: [
            '2.5 dl grekisk yoghurt',
            '2 vitlöksklyftor (rivna)',
            'Några blad mynta och handfull persilja, finhackad',
            '1 tsk limesaft',
            'Flingsalt (efter smak)'
          ]
        },
        {
          section: 'Löksallad med persilja & sumak',
          items: [
            '2 röda lökar',
            '1 msk torkad persilja',
            '1-2 tsk sumak',
            '1 msk olivolja',
            'Flingsalt (efter smak)'
          ]
        },
        {
          section: 'Tunnbröd (ca 5 st)',
          items: [
            '5.5 dl vetemjöl',
            '2.5 dl ljummet vatten',
            '1 tsk salt',
            '15g färsk jäst'
          ]
        },
        {
          section: 'Till servering',
          items: [
            'Tunnbröd, libabröd eller pita',
            'Vitlökssåsen',
            'Pirri pirrisås eller harissa',
            'Lök- & persilja sallad',
            'Tomat, saltgurka och sallad'
          ]
        }
      ],
      instructions: [
        {
          section: 'Marinera kycklingen',
          steps: [
            'Skär kycklingen i strimlor och lägg i en djup skål.',
            'Häll över alla kryddor och avsluta med tomatpuré.',
            'Blanda ordentligt, plasta och ställ i kylen i minst 1 timme.'
          ]
        },
        {
          section: 'Gör vitlökssåsen',
          steps: [
            'Häll yoghurt i en skål.',
            'Riv i vitlök, finhacka örterna och pressa i limesaft.',
            'Smaka av med salt och blanda väl.'
          ]
        },
        {
          section: 'Löksallad med persilja & sumak',
          steps: [
            'Skiva löken tunt – helst i halvmånar. Lägg i en skål.',
            'Hacka persiljan fint.',
            'Lägg lök och persilja i en skål. Tillsätt sumak, olivolja och avsluta med salt.',
            'Blanda ordentligt med händerna eller en sked – gärna så att sumaken fördelas jämnt.',
            'Låt gärna stå i 10–15 min innan servering så smakerna hinner sätta sig.'
          ]
        },
        {
          section: 'Tunnbröd',
          steps: [
            'Lös upp jästen i vattnet.',
            'Tillsätt mjöl och salt.',
            'Knåda i ca 8–10 minuter tills du har en mjuk, smidig deg.',
            'Täck med duk och låt jäsa i 1 timme tills den dubblats i storlek.',
            'Dela degen i 5 lika stora bitar.',
            'Rulla till bollar och låt vila 10 min under en duk.',
            'Kavla ut tunt (ca 2 mm), till runda eller ovala bröd – cirka 20 cm diameter.',
            'Hetta upp en stekpanna (gärna gjutjärn) till medelhög värme.',
            'Grädda ett bröd i taget, ca 1 minut per sida. Det ska få ljusa bruna fläckar och puffa lite.',
            'Lägg de färdiga bröden i en handduk så de håller sig mjuka.'
          ]
        },
        {
          section: 'Tillaga kycklingen',
          steps: [
            'Hetta upp lite olja i en panna.',
            'Stek kycklingen tills den är genomstekt och fått färg (ca 4–5 min/sida).'
          ]
        },
        {
          section: 'Bygg din shawarma',
          steps: [
            'Lägg kyckling i bröd.',
            'Toppa med grönsaker, vitlökssås och lite färska örter.',
            'Rulla ihop till wrap eller vik som en kebab.'
          ]
        }
      ],
      tips: [
        'Marinera kycklingen över natten för ännu bättre smak',
        'Kan serveras med ris istället för bröd',
        'Gör extra vitlökssås - den är fantastisk som dipp till mycket annat!',
        'Tunnbröden kan göras i förväg och frysas',
        'Prova att grilla kycklingen för rökig smak'
      ]
    }
  }
};

export const LaxRisbowlPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['lax-risbowl']} onBack={handleBack} />;
};

export const KaftaBilSejniePost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['kafta-bil-sejnie']} onBack={handleBack} />;
};

export const KoftaBilSaniehPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['kofta-bil-sanieh']} onBack={handleBack} />;
};

export const PastaPestoPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['pasta-pesto']} onBack={handleBack} />;
};

export const KycklingShawarmaPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['kyckling-shawarma']} onBack={handleBack} />;
};

export const PannpizzorPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['pannpizzor']} onBack={handleBack} />;
};

export const BatataHarraPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['batata-harra']} onBack={handleBack} />;
};

export const KycklingfilePotatisDragonPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['kycklingfile-potatis-dragon']} onBack={handleBack} />;
};

export const MiniLahmacunPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['mini-lahmacun']} onBack={handleBack} />;
};

export const KikartsTikkaMasalaPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['kikarts-tikka-masala']} onBack={handleBack} />;
};

export const KallFoulMedamesPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['kall-foul-medames']} onBack={handleBack} />;
};

export const QrimyotheMunkarPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['qrimyothe-munkar']} onBack={handleBack} />;
};

export const LinsBulgurJarparPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['lins-bulgur-jarpar']} onBack={handleBack} />;
};