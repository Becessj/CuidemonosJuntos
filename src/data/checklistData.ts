export const initialChecklists = {
  
  'PRIMEROS AUXILIOS': [
    { id: '1', text: 'Botiquín', completed: false, image: require('../../assets/correctItem2.png') },
  ],
  'COMUNICACIÓN': [
    { id: '1', text: 'Linterna y pilas', completed: false, image: require('../../assets/linterna.png') },
    { id: '2', text: 'Silbato', completed: false, image: require('../../assets/silbato.png') },
    { id: '3', text: 'Radio portátil', completed: false, image: require('../../assets/radio.png') },
    { id: '4', text: 'Agenda de teléfonos', completed: false, image: require('../../assets/agenda.png') },
    { id: '5', text: 'Pilas de repuesto', completed: false, image: require('../../assets/pilas.png') },
    { id: '6', text: 'Útiles para escribir', completed: false, image: require('../../assets/utiles.png') }
  ],
  'BEBIDAS Y ALIMENTOS NO PERECIBLES': [
    { id: '1', text: 'Comida enlatada', completed: false, image: require('../../assets/correct_noperecibles.png') },
    { id: '2', text: 'Agua en botella sin gas (1/2 litro)', completed: false, image: require('../../assets/basicos.png') },
    { id: '3', text: 'Barras de cereal', completed: false, image: require('../../assets/barracereal.png') },
    { id: '4', text: 'Chocolates', completed: false, image: require('../../assets/linterna.png') },
  ],
  'HIGIENE': [
    { id: '1', text: 'Gel antibacterial', completed: false, image: require('../../assets/linterna.png') },
    { id: '2', text: 'Papel higiénico', completed: false, image: require('../../assets/linterna.png') },
    { id: '3', text: 'Toalla de cara y manos', completed: false, image: require('../../assets/linterna.png') },
  ],
  'DIVERSOS': [
    { id: '1', text: 'Bolsas de plástico resistente', completed: false, image: require('../../assets/linterna.png') },
    { id: '2', text: 'Cuchilla multipropósito', completed: false, image: require('../../assets/linterna.png') },
    { id: '3', text: 'Guantes de trabajo', completed: false, image: require('../../assets/linterna.png') },
    { id: '4', text: 'Cuerdas de poliéster', completed: false, image: require('../../assets/linterna.png') },
    { id: '5', text: 'Encendedor', completed: false, image: require('../../assets/linterna.png') },
    { id: '6', text: 'Plástico para piso o techo', completed: false, image: require('../../assets/linterna.png') },
    { id: '7', text: 'Cinta adhesiva multiusos', completed: false, image: require('../../assets/linterna.png') },
    { id: '8', text: 'Mascarillas', completed: false, image: require('../../assets/linterna.png') },
    { id: '9', text: 'Tapete (alfombra para piso)', completed: false, image: require('../../assets/linterna.png') },
    { id: '10', text: 'Manta polar', completed: false, image: require('../../assets/linterna.png') },
    { id: '11', text: 'Dinero en efectivo', completed: false, image: require('../../assets/linterna.png') }
  ],
  'ESPECIFICOS': [
    { id: '1', text: 'Bebés', completed: false, image: require('../../assets/bebes.png'), subChecklist: [
      { id: '1.1', text: 'Lata de Leche', completed: false, image: require('../../assets/linterna.png') },
      { id: '1.2', text: 'Biberón', completed: false, image: require('../../assets/linterna.png') },
      { id: '1.3', text: 'Papilla', completed: false, image: require('../../assets/linterna.png') },
      { id: '1.4', text: 'Pañales descartables', completed: false, image: require('../../assets/linterna.png') },
      { id: '1.5', text: 'Juego de cubiertos para niños', completed: false, image: require('../../assets/linterna.png') },
      { id: '1.6', text: 'Ropa de cambio', completed: false, image: require('../../assets/linterna.png') },
      { id: '1.7', text: 'Medicamentos', completed: false, image: require('../../assets/linterna.png') },
      { id: '1.8', text: 'Juguetes', completed: false, image: require('../../assets/linterna.png') },
    ]},
    { id: '2', text: 'Adulto mayor', completed: false, image: require('../../assets/adultomayor.png'), subChecklist: [
      { id: '2.1', text: 'Pañales geriátricos', completed: false, image: require('../../assets/linterna.png') },
      { id: '2.2', text: 'Ropa de cambio', completed: false, image: require('../../assets/linterna.png') },
      { id: '2.3', text: 'Medicamentos', completed: false, image: require('../../assets/linterna.png') },
    ]},
    { id: '3', text: 'Mascotas', completed: false, image: require('../../assets/mascotas.png'), subChecklist: [
      { id: '3.1', text: 'Comida para mascotas', completed: false, image: require('../../assets/linterna.png') },
      { id: '3.2', text: 'Juguetes para mascotas', completed: false, image: require('../../assets/linterna.png') },
      { id: '3.3', text: 'Correa', completed: false, image: require('../../assets/linterna.png') },
    ]},
  ],
};

export const imageSource = {
  general: require('../../assets/family.png'),
  comunicacion: require('../../assets/principal_comunicacion.png'),
  age: require('../../assets/abuelos.png'),
  specific: require('../../assets/especificas.png'),
  other: require('../../assets/herramientas.png'),
  other2: require('../../assets/kit.png'),
  animal: require('../../assets/animal.png'), 
  question: require('../../assets/question.png'), 
  especifics: require('../../assets/especificos.png'),
};

export const cards = [
  { title: 'PRIMEROS AUXILIOS', image: imageSource.other2 },
  { title: 'COMUNICACIÓN', image: imageSource.comunicacion },
  { title: 'BEBIDAS Y ALIMENTOS NO PERECIBLES', image: imageSource.age },
  { title: 'HIGIENE', image: imageSource.specific },
  { title: 'DIVERSOS', image: imageSource.other },
  { title: 'ESPECIFICOS', image: imageSource.especifics },
];
