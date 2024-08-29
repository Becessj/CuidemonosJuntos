// src/data/entries.ts

const antelopeCanyon = require('../../assets/cursos-virtuales-05.jpg');
const nycMorning = require('../../assets/temporadabaja.png');
const whitePocketSunset = require('../../assets/1710788827130.jpg');
const acrocorinthGreece = require('../../assets/incendiosurbanos.png');
const loneTreeNZ = require('../../assets/bannermain.png');
const leftArrow = require('../../assets/leftArrow.png');
const rightArrow = require('../../assets/rightArrow.png');

export const DATAINICIO = [
  {
    id: '1',
    title: 'La preparación empieza contigo',
    subtitle: 'El Perú es un país con gran diversidad climática, contando con 28 de los 32 climas en el mundo, ello aunado a su geomorfología, su ubicación en el borde sur oriental del Océano Pacifico, y a ser parte del denominado Cinturón de Fuego del Pacífico, da como resultado no solo un país con gran riqueza y diversidad étnica y cultural, sino también con un alto nivel de vulnerabilidad y una gran variedad de potenciales peligros que han llevado a su población a convivir a lo largo de su historia con múltiples escenarios de riesgo. ',
    illustration: antelopeCanyon,
    correctAnswer: 'Preparación',
  },
  {
    id: '2',
    title: 'Bajas Temperaturas',
    subtitle: 'En nuestro país, se conoce como temporada de Bajas Temperaturas a aquel periodo del año comprendido entre los meses de abril a octubre, durante el cual, en diferentes regiones del país, se presenten fenómenos como las heladas, los friajes, nevadas y granizadas.',
    illustration: nycMorning,
    correctAnswer: 'Friajes',
  },
  {
    id: '3',
    title: 'Tormentas Electricas',
    subtitle: 'Son un fenómeno meteorológico caracterizado por la presencia de rayos y sus efectos sonoros (truenos) en la atmósfera, viene acompañado con vientos de extraordinaria fuerza. Se presentan a través de descargas violentas de electricidad atmosférica, que se manifiesta con rayos o chispas, emiten un resplandor breve o relámpago (luz) y un trueno (sonido). Por lo general están acompañadas por vientos fuertes, lluvia copiosa y a veces nieve, granizo, o sin ninguna precipitación.',
    illustration: whitePocketSunset,
    correctAnswer: 'Tormentas',
  },
  {
    id: '4',
    title: 'Incendios Urbanos',
    subtitle: 'El incendio es la propagación libre y no programada del fuego de grandes proporciones que se desarrolla sin control, el cual puede presentarse de manera instantánea o gradual, pudiendo provocar daños materiales, interrupción de los procesos de producción, pérdida de vidas humanas y afectación al ambiente. El incendio urbano es causado, principalmente, por fallas en las instalaciones eléctricas, fugas de gas, manejo inadecuado de materiales inflamables, velas encendidas, mantenimiento deficiente de tanques contenedores de gas, entre otras, en instalaciones, casas o edificios, en los cuales existe una alta concentración de asentamientos humanos, ya sea dentro de ellos o en sus alrededores.',
    illustration: acrocorinthGreece,
    correctAnswer: 'Incendios',
  },
  {
    id: '5',
    title: 'Combo de la Supervivencia',
    subtitle: 'El Combo de la Supervivencia es una buena dupla para estar mejor preparados ante emergencias y desastres. Está conformado por la mochila para emergencias y la caja de reserva, las cuales contienen provisiones básicas de la familia debe tener para afrontar los primeros días de una emergencia.  -Mochila para Emergencias. Contiene artículos indispensables para que podamos sobrevivir las primeras 24 horas después de la emergencia. Lo recomendable es una mochila por cada 2 personas. - Caja de Reserva. Contiene artículos necesarios para que una familia pueda vivir del segundo al cuarto día de la emergencia. Es para todos los miembros de la familia.',
    illustration: loneTreeNZ,
    correctAnswer: 'Supervivencia',
  },
];