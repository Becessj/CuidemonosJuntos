const imageSource = {
    general: require('../../assets/family.png'),
    basic: require('../../assets/basicos.png'),
    age: require('../../assets/abuelos.png'),
    specific: require('../../assets/especificas.png'),
    other: require('../../assets/herramientas.png'),
    other2: require('../../assets/kit.png'),
    animal: require('../../assets/animal.png'), // Imagen del animal
    question: require('../../assets/question.png'), // Imagen de la interrogante (este ya no se usará)
    especifics: require('../../assets/especificos.png'),
  };
  
  export const initialChecklists = {
    'COMUNICACIÓN': [
      { id: '1', text: 'Linterna y pilas', completed: false },
      { id: '2', text: 'Silbato', completed: false },
      { id: '3', text: 'Radio portatil', completed: false },
      { id: '4', text: 'Agenda de teléfonos de emergencia', completed: false },
      { id: '5', text: 'Pilas de repuesto', completed: false },
      { id: '6', text: 'Útiles para escribir', completed: false }
    ],
    'BEBIDAS Y ALIMENTOS NO PERECIBLES': [
      { id: '1', text: 'Comida enlatada', completed: false },
      { id: '2', text: 'Agua en botella sin  gas (1/2 litro)', completed: false },
      { id: '3', text: 'Barras de cereal', completed: false },
      { id: '4', text: 'Chocolates', completed: false },
    ],
    'HIGIENE': [
      { id: '1', text: 'Gel antibacterial', completed: false },
      { id: '2', text: 'Papel higiénico', completed: false },
      { id: '3', text: 'Toalla de cara y manos', completed: false },
    ],
    'DIVERSOS': [
      { id: '1', text: 'Bolsas de plático resistente', completed: false },
      { id: '2', text: 'Cuchilla multipropósito', completed: false },
      { id: '3', text: 'Guantes de trabajo', completed: false },
      { id: '4', text: 'Cuerdas de poliéster', completed: false },
      { id: '5', text: 'Encendedor', completed: false },
      { id: '6', text: 'Plástico para piso o techo', completed: false },
      { id: '7', text: 'Cinta adhesiva multiusos', completed: false },
      { id: '8', text: 'Mascarillas', completed: false },
      { id: '9', text: 'Tapete (alfombra para piso)', completed: false },
      { id: '10', text: 'Manta polar', completed: false },
      { id: '11', text: 'Dinero en efectivo', completed: false }
    ],
    'BOTIQUIN DE PRIMEROS AUXILIOS': [
      { id: '1', text: 'Documentos importantes 2', completed: false },
      { id: '2', text: 'Dinero en efectivo 2', completed: false },
    ],
    'ESPECIFICOS': [
      { id: '1', text: 'Bebés', completed: false, subChecklist: [
        { id: '1.1', text: 'Pañales', completed: false },
        { id: '1.2', text: 'Comida para bebé', completed: false },
        { id: '1.3', text: 'Juguetes', completed: false },
      ]},
      { id: '2', text: 'Enfermedades', completed: false, subChecklist: [
        { id: '2.1', text: 'Medicamentos', completed: false },
        { id: '2.2', text: 'Inhalador', completed: false },
        { id: '2.3', text: 'Recetas médicas', completed: false },
      ]},
      { id: '3', text: 'Mascotas', completed: false, subChecklist: [
        { id: '3.1', text: 'Comida para mascotas', completed: false },
        { id: '3.2', text: 'Juguetes para mascotas', completed: false },
        { id: '3.3', text: 'Correa', completed: false },
      ]},
    ],
  };