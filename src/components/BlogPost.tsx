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
    likes: 124,
    rating: 4.9,
    reviews: 78,
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
    likes: 98,
    rating: 4.8,
    reviews: 56,
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
  'pasta-pesto': {
    id: 'pasta-pesto',
    title: 'Pasta pesto med ugnsbakade tomater & stekt halloumi',
    description: 'En smakrik, krämig och färgsprakande pastarätt med pesto, ugnsbakade tomater och stekt halloumi - perfekt för hela familjen.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCfVuc1HC48dYxTFVG4qu9OSWrN21vZPBkJiCo',
    time: '40',
    portions: '4',
    likes: 112,
    rating: 4.9,
    reviews: 65,
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

export const PastaPestoPost = () => {
  const handleBack = () => {
    window.location.hash = '';
  };

  return <RecipeDetails recipe={recipes['pasta-pesto']} onBack={handleBack} />;
};