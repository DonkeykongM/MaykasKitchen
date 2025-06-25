import React from 'react';
import { RecipeDetails } from './RecipeDetails';

const recipes = {
  'lax-risbowl': {
    id: 'lax-risbowl',
    title: 'Kryddig lax- & risbowl',
    description: 'Perfekt som fräsch vardagsmiddag eller när du vill lyxa till lunchen. Snabbt, enkelt och så himla smakrikt, du kommer vilja göra det här om och om igen!',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8y19NS5037zrR9qXSut4TKmZEpjlBcOhHew0',
    time: '45',
    portions: '4',
    likes: 156,
    rating: 4.9,
    reviews: 87,
    badges: ['Fisk', 'Snabb', 'Under 60 min'],
    videoUrl: 'https://www.instagram.com/reel/DJXHMYpCoaR/',
    difficulty: 'Lätt',
    nutritionInfo: {
      calories: '420 kcal',
      protein: '35g',
      carbs: '48g',
      fat: '12g',
      fiber: '5g',
      salt: '1.2g'
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
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC2bVVcBHX4Xuw0sOU5gWozk6clEfde8bBYInQ',
    time: '60',
    portions: '5-6',
    likes: 134,
    rating: 4.8,
    reviews: 73,
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
    image: '/public/recipes/kofta-bil-sanieh.jpeg',
    time: '60',
    portions: '8',
    likes: 89,
    rating: 4.9,
    reviews: 45,
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
    likes: 142,
    rating: 4.9,
    reviews: 79,
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
    image: '/image.png',
    time: '120',
    portions: '5',
    likes: 89,
    rating: 5.0,
    reviews: 23,
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