import React from 'react';
import { RecipeDetails } from './RecipeDetails';

const recipes = {
  'lins-bulgur-jarpar': {
    id: 'lins-bulgur-jarpar',
    title: 'Lins- och bulgurjärpar med sumak och spetspaprika',
    description: 'Proteinrika och mättande vegetariska järpar med smakrik kombination av röda linser, bulgur och aromatiska kryddor från mellanöstern.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCrZI4Zt1TCmP1dAHK4ioO3RwLkl5gtYD2IMbW',
    time: '45',
    portions: '4-6',
    likes: 38,
    rating: 4.8,
    reviews: 2,
    badges: ['Vegetariskt', 'Mellanöstern', 'Protein'],
    videoUrl: '',
    difficulty: 'Medel',
    nutritionInfo: {
      calories: '320 kcal',
      protein: '18g',
      carbs: '52g',
      fat: '6g',
      fiber: '12g',
      salt: '1.4g'
    },
    allergens: ['Kan innehålla spår av gluten från bulgur'],
    content: {
      ingredients: [
        {
          section: 'Huvudingredienser',
          items: [
            '1 liter vatten',
            '3 dl röda linser',
            '6 dl finmalen bulgur',
            '1,5 gul lök, finhackad',
            '2 röda spetspaprikor, finhackade',
            '5–6 salladslökar, finhackade',
            '0,5 dl rapsolja (till stekning)',
            '1–1,5 msk tomatpuré'
          ]
        },
        {
          section: 'Kryddor',
          items: [
            '2,5 tsk salt',
            '1 msk sumak',
            '1 tsk svartpeppar',
            '1 tsk garam masala',
            '1 tsk cayennepeppar'
          ]
        }
      ],
      instructions: [
        {
          section: 'Koka linser och bulgur',
          steps: [
            'Koka upp 1 liter vatten i en stor kastrull.',
            'Skölj linserna noggrant och tillsätt dem i det kokande vattnet.',
            'Skumma av ytan med en sked eller sil när skum bildas.',
            'Koka linserna i ca 10 minuter, tills de får en grönaktig ton.',
            'Stäng av värmen.',
            'Skölj bulguren i kallt vatten och rör ner den i kastrullen med linserna.',
            'Blanda väl och låt blandningen stå och svälla tills den tjocknar.'
          ]
        },
        {
          section: 'Förbered grönsaksröran',
          steps: [
            'Finhacka lök, paprika och salladslök.',
            'Hetta upp rapsoljan i en stekpanna och fräs den gula löken tills den blir mjuk.',
            'Tillsätt spetspaprika och tomatpuré, låt fräsa i ytterligare ett par minuter.',
            'Vänd ner salladslöken och kryddorna. Stek ihop allting i ca 5–7 minuter.',
            'Låt röran svalna något.'
          ]
        },
        {
          section: 'Blanda och forma',
          steps: [
            'När både lins- och bulgurröran samt grönsaksröran har svalnat – blanda ihop dem ordentligt.',
            'Tillsätt vatten emellanåt om degen inte vill fastna eller känns för torr. Degen ska vara lättformad och mjuk i konsistensen.',
            'Forma järpar eller bollar av smeten med händerna.'
          ]
        }
      ],
      tips: [
        'Servera järparna som de är eller i libabröd',
        'Pressa gärna citron över och ringla lite dadelsirap eller granatäpplesirap ovanpå',
        'Mörk sirap fungerar också fint som tillbehör',
        'Sumak ger en härlig syrlig smak - finns i mellanösternbutiker',
        'Kan förberedas dagen innan och förvaras i kylskåp'
      ]
    }
  },
  'kycklingfile-potatis-dragon': {
    id: 'kycklingfile-potatis-dragon',
    title: 'Stekt kycklingfilé med smörslungad potatis, sautéade grönsaker och dragonsås',
    description: 'En rätt som snabbt blev en favorit både hemma och på jobbet. Kombinerar krämig dragonsås med saftig kyckling och smörstekta grönsaker – enkel men med känsla av något riktigt lyxigt.',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHC8m7bPB037zrR9qXSut4TKmZEpjlBcOhHew02',
    image: 'https://j0bzpddd4j.ufs.sh/f/bwjssIq7FWHCYrirAg5FD3Nod0fKROYijVPHAbra9e8uWhMJ',
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
            '1 stor