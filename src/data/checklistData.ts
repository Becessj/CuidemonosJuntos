export const initialChecklists = {
  'PRIMEROS AUXILIOS': [
    { id: '1', text: 'Botiquín', completed: false, image: require('../../assets/correct_botiquin.png') },
  ],
  'COMUNICACIÓN': [
    { id: '1', text: 'Linterna y pilas', completed: false, image: require('../../assets/correct_linterna.png') },
    { id: '2', text: 'Silbato', completed: false, image: require('../../assets/correct_silbato.png') },
    { id: '3', text: 'Radio portátil', completed: false, image: require('../../assets/correct_radio.png') },
    { id: '4', text: 'Agenda de teléfonos', completed: false, image: require('../../assets/correct_agenda.png') },
    { id: '5', text: 'Pilas de repuesto', completed: false, image: require('../../assets/correct_pilas.png') },
    { id: '6', text: 'Útiles para escribir', completed: false, image: require('../../assets/correct_utiles.png') }
  ],
  'BEBIDAS Y ALIMENTOS NO PERECIBLES': [
    { id: '1', text: 'Comida enlatada', completed: false, image: require('../../assets/correct_noperecibles.png') },
    { id: '2', text: 'Agua en botella sin gas (1/2 litro)', completed: false, image: require('../../assets/correct_agua.png') },
    { id: '3', text: 'Barras de cereal', completed: false, image: require('../../assets/correct_cereales.png') },
    { id: '4', text: 'Chocolates', completed: false, image: require('../../assets/correct_chocolate.png') },
  ],
  'HIGIENE': [
    { id: '1', text: 'Gel antibacterial', completed: false, image: require('../../assets/correct_gel.png') },
    { id: '2', text: 'Papel higiénico', completed: false, image: require('../../assets/correct_papel.png') },
    { id: '3', text: 'Toalla de cara y manos', completed: false, image: require('../../assets/correct_toallas.png') },
  ],
  'DIVERSOS': [
    { id: '1', text: 'Bolsas de plástico resistente', completed: false, image: require('../../assets/correct_bolsasplasticas.png') },
    { id: '2', text: 'Cuchilla multipropósito', completed: false, image: require('../../assets/correct_cuchilla.png') },
    { id: '3', text: 'Guantes de trabajo', completed: false, image: require('../../assets/correct_guantes.png') },
    { id: '4', text: 'Cuerdas de poliéster', completed: false, image: require('../../assets/correct_cuerda.png') },
    { id: '5', text: 'Encendedor', completed: false, image: require('../../assets/correct_encendedor.png') },
    { id: '6', text: 'Plástico para piso o techo', completed: false, image: require('../../assets/correct_plastico.png') },
    { id: '7', text: 'Cinta adhesiva multiusos', completed: false, image: require('../../assets/correct_cintamultiusos.png') },
    { id: '8', text: 'Mascarillas', completed: false, image: require('../../assets/correct_mascarillas.png') },
    { id: '9', text: 'Tapete (alfombra para piso)', completed: false, image: require('../../assets/correct_tapetepiso.png') },
    { id: '10', text: 'Manta polar', completed: false, image: require('../../assets/correct_mantas.png') },
    { id: '11', text: 'Dinero en efectivo', completed: false, image: require('../../assets/correct_dinero.png') }
  ],
  'ESPECIFICOS': [
    { id: '1', text: 'Bebés', completed: false, image: require('../../assets/bebes.png'), subChecklist: [
      { id: '1.1', text: 'Lata de Leche', completed: false, image: require('../../assets/lecheenpolvo.png'), expirationDate: '2025-08-15' },
      { id: '1.2', text: 'Biberón', completed: false, image: require('../../assets/biberon.png') },
      { id: '1.3', text: 'Papilla', completed: false, image: require('../../assets/papilla.png') },
      { id: '1.4', text: 'Pañales', completed: false, image: require('../../assets/panialesbebe.png') },
      { id: '1.5', text: 'Cubiertos', completed: false, image: require('../../assets/cubiertoninos.png') },
      { id: '1.6', text: 'Ropa de cambio', completed: false, image: require('../../assets/ropadecambio2.png') },
      { id: '1.7', text: 'Medicamentos', completed: false, image: require('../../assets/pastillas.png'), expirationDate: '2024-12-01' },
      { id: '1.8', text: 'Juguetes', completed: false, image: require('../../assets/juguetesbebe.png') },
    ]},
    { id: '2', text: 'Adulto mayor', completed: false, image: require('../../assets/adultomayor.png'), subChecklist: [
      { id: '2.1', text: 'Pañales', completed: false, image: require('../../assets/paniales.png') },
      { id: '2.2', text: 'Ropa de cambio', completed: false, image: require('../../assets/ropa.png') },
      { id: '2.3', text: 'Medicamentos', completed: false, image: require('../../assets/pastillas.png'), expirationDate: '2024-12-01' }, 
    ]},
    { id: '3', text: 'Mascotas', completed: false, image: require('../../assets/mascotas.png'), subChecklist: [
      { id: '3.1', text: 'Comida', completed: false, image: require('../../assets/comidaperro.png') },
      { id: '3.2', text: 'Juguetes', completed: false, image: require('../../assets/jugueteperro.png') },
      { id: '3.3', text: 'Correa', completed: false, image: require('../../assets/correaperro.png') },
    ]},
  ],
};


export const imageSource = {
  general: require('../../assets/family.png'),
  comunicacion: require('../../assets/principal_comunicacion.png'),
  age: require('../../assets/bebidasalimentosnoperecibles.png'),
  specific: require('../../assets/articuloshigiene.png'),
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
