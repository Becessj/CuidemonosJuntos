const questionsData = {
    'Sismo': [
      { question: '¿Qué fenómeno se describe como la liberación súbita de energía mecánica en el interior de la Tierra?', options: [
        'Huracanes',
        'Deslizamientos',
        'Terremotos '
      ], correctAnswer: 'Terremotos ' },
      { question: '¿Dónde se generan las vibraciones que se propagan durante un terremoto?', options: [
        'En la superficie del agua.',
        'En el interior de la Tierra.',
        'En la atmósfera.'
      ], correctAnswer: 'En el interior de la Tierra.'},
      { question: '¿Según la clasificación de la escala Mercalli Modificada, ¿qué grados corresponden a temblores de baja intensidad?', options: [
        'VI, VII',
        'III, IV, V',
        'I, II'
      ], correctAnswer: 'III, IV, V' },
      { question: '¿Cuál de las siguientes opciones puede originar un terremoto?', options: [
        'Procesos volcánicos',
        'Viento fuerte',
        'Cambios climáticos',
      ], correctAnswer: 'Procesos volcánicos' },
      { question: '¿Cómo se clasifica un terremoto que tiene una intensidad entre los grados VI y VII en la escala Mercalli Modificada?', options: [
        'Crítica',
        'Baja intensidad',
        'Alta intensidad'
      ], correctAnswer: 'Alta intensidad'},
      { question: '¿Qué tipo de vibraciones se generan durante un terremoto?', options: [
        'Eléctricas',
        'Lumínicas',
        'Mecánicas'
      ], correctAnswer: 'Mecánicas' },
      { question: '¿A qué profundidades se generan las grandes columnas de rocas que provocan los terremotos?', options: [
        'Entre la corteza y manto superior de la Tierra',
        'En la atmósfera',
        'Solo en el núcleo externo'
      ], correctAnswer: 'Entre la corteza y manto superior de la Tierra' },
      { question: '¿Dónde se generan las vibraciones que se propagan durante un terremoto?', options: [
        'En la superficie del agua.',
        'En el interior de la Tierra.',
        'En la atmósfera.'
      ], correctAnswer: 'En el interior de la Tierra.'},
      { question: 'La energía mecánica liberada en un terremoto se propaga a través de:', options: [
        'Materiales radiactivos',
        'El aire',
        'Diferentes capas terrestres'
      ], correctAnswer: 'Diferentes capas terrestres' },
      { question: '¿Qué ocurre en la corteza terrestre durante un terremoto?', options: [
        'Se producen lluvias',
        'Se calienta la atmósfera',
        'Se generan vibraciones mecánicas'
      ], correctAnswer: 'Se generan vibraciones mecánicas' },
    ],
    'Deslizamiento de tierra': [
      { question: '¿Qué fenómeno describe el desplazamiento lento y progresivo de una porción de terreno?', options: [
        'Terremoto',
        'Avalancha',
        'Deslizamiento de tierra'
      ], correctAnswer: 'Deslizamiento de tierra' },
      { question: '¿Cuál de los siguientes factores NO contribuye al desplazamiento del terreno?', options: [
        'Agotamiento de recursos naturales',
        'Erosión del terreno',
        'Actividad sísmica',
      ], correctAnswer:  'Agotamiento de recursos naturales' },
      { question: '¿En qué dirección se desplaza típicamente la porción de terreno afectada?', options: [
        'Aleatoriamente',
        'En el sentido de la pendiente',
        'En dirección opuesta a la pendiente',
      ], correctAnswer: 'En el sentido de la pendiente' },
    ],
    'Inundación': [
      { question: '¿Qué es el desborde lateral del agua de los ríos, lagos, mares y/o represas?', options: [
       'Disminución de caudal',
            'Contaminación',
            'Inundación'
      ], correctAnswer:  'Inundación' },
      { question: '¿Qué cubren temporalmente las zonas inundables?', options: [
        'Montañas',
        'Terrenos bajos',
        'Terrenos altos',
      ], correctAnswer: 'Terrenos bajos'},
      { question: '¿Cuándo suelen ocurrir las inundaciones?', options: [
        'En primavera',
        'En épocas de grandes precipitaciones',
        'En épocas de sequía',
      ], correctAnswer: 'En épocas de grandes precipitaciones' },
    ],
    'Incendio': [
      { question: '¿Qué tipo de incendio se da exclusivamente sobre la vegetación?', options: [
        'Incendio forestal',
        'Incendio urbano',
        'Incendio comercial'
      ], correctAnswer:  'Incendio forestal' },
      { question: '¿Qué cubren temporalmente las zonas inundables?', options: [
        'Montañas',
        'Terrenos bajos',
        'Terrenos altos',
      ], correctAnswer: 'Terrenos bajos'},
      { question: '¿Cuándo suelen ocurrir las inundaciones?', options: [
        'En primavera',
        'En épocas de grandes precipitaciones',
        'En épocas de sequía',
      ], correctAnswer: 'En épocas de grandes precipitaciones'},
    ],
    'Aluvión': [
      { question: '¿Qué fenómeno natural se describe en el contexto?', options: [
        'Terremoto',
        'Tornado',
        'Huayco'
      ], correctAnswer: 'Huayco' },
      { question: '¿Según el texto, ¿de dónde proviene el término huayco?', options: [
        'Agotamiento de recursos naturales',
        'Erosión del terreno',
        'Actividad sísmica',
      ], correctAnswer:  'Agotamiento de recursos naturales' },
      { question: '¿Cuál es la causa principal del desprendimiento de nieve y rocas mencionado?', options:[
        'Actividad sísmica',
        'Intensas precipitaciones',
        'Erosión',
      ], correctAnswer:  'Intensas precipitaciones'},
    ],
    'Derrumbe': [
      { question: '¿Qué es una caída de terreno?', options: [
        'La caída de una porción de suelo o roca por inestabilidad',
        'Un fenómeno agrícola',
        'Un proceso de construcción'
      ], correctAnswer:  'La caída de una porción de suelo o roca por inestabilidad' },
      { question: '¿Qué condición puede aumentar el riesgo de deslizamientos?', options: [
        'Clima áridos.',
        'Taludes con poca pendiente',
        'Presencia de grietas'
      ], correctAnswer:     'Presencia de grietas'},
      { question: '¿Cuál de las siguientes características tiene una caída de terreno?', options: [
        'Ocurre solo en época de sequía',
        'No presenta planos ni superficie de deslizamiento',
        'Siempre se acompaña de lluvias'
      ], correctAnswer: 'No presenta planos ni superficie de deslizamiento' },
    ],
    'Erosión Fluvial/de Laderas': [
      { question: '¿Qué es la erosión?', options: [
        'La acumulación de sedimentos',
        'La formación de ríos',
        'La desintegración y pérdida de suelo o rocas'
      ], correctAnswer:  'La desintegración y pérdida de suelo o rocas' },
      { question: '¿Qué tipo de erosión se refiere a la acción del agua de lluvia en la superficie terrestre?', options: [
        'Erosión de laderas',
        'Erosión glaciar',
        'Erosión eólica'
      ], correctAnswer: 'Erosión de laderas'},
      { question: '¿Cuál de los siguientes es un agente erosivo mencionado en el texto?', options: [
        "Temperaturas extremas",
        "Agua de lluvias",
        "Plantas"
      ], correctAnswer: 'Agua de lluvias'},
    ],
    'Viento': [
      { question: '¿Qué es el viento?', options: [
        'Movimiento de las rocas',
        'Movimiento del aire en sentido horizontal',
        'Movimiento de las aves'
      ], correctAnswer:  'Movimiento del aire en sentido horizontal' },
      { question: '¿Cuál es la causa principal del viento?', options: [
        'La posición de la Luna',
        'La contaminación del aire',
        'Diferencias de temperaturas y calentamiento desigual'
      ], correctAnswer: 'Diferencias de temperaturas y calentamiento desigual'},
      { question: '¿Qué significa que el viento sea de alta intensidad?', options: [
        'Que el viento supera la velocidad promedio y causa daños',
        'Que el viento es débil',
        'Que el viento es frío',
      ], correctAnswer: 'Que el viento supera la velocidad promedio y causa daños'},
    ],
    'Lluvia': [
      { question: '¿Cuál es el término que se utiliza para referirse a la lluvia que supera el promedio y genera daños?', options: [
        'Lluvia normal',
        'Lluvia torrencial',
        'Lluvia intensa'
      ], correctAnswer:    'Lluvia intensa'},
      { question: '¿Qué forma puede tomar la precipitación además de ser líquida?', options: [
        'Nieve',
        'Niebla',
        'Calor'
      ], correctAnswer: 'Nieve'},
      { question: '¿En qué se basa la clasificación de la lluvia intensa?', options: [
        'En la velocidad del viento',
        'En la temperatura',
        'En el promedio de precipitación de la región'
      ], correctAnswer:  'En el promedio de precipitación de la región'},
    ],
    'Helada': [
      { question: '¿Qué fenómeno se produce cuando la temperatura ambiental disminuye a valores cercanos o debajo de cero grados?', options: [
        'Lluvia de invierno',
        'Helada',
        'Nieve derretida',
      ], correctAnswer:  'Helada' },
      { question: '¿Cuál es una de las causas del fenómeno de helada?', options: [
        'Exceso de enfriamiento del suelo',
        'Alta humedad relativa',
        'Aumento de la temperatura',
      ], correctAnswer: 'Exceso de enfriamiento del suelo'},
      { question: '¿Qué condiciones climáticas favorecen la formación de heladas?', options: [
        'Vientos calientes y húmedos',
        'Cielos claros y secos',
        'Cielos nublados y fríos'
      ], correctAnswer: 'Cielos claros y secos'},
    ],
    'Sequia': [
      { question: '¿Cuál es la principal causa de la sequía según el contexto?', options: [
        'Aumento de la temperatura',
        'Cambios en el viento',
        'Reducción en la precipitación'
      ], correctAnswer:  'Reducción en la precipitación'},
      { question: '¿Qué impacto NO se menciona como consecuencia de la sequía?', options: [
        'Aumento de la población',
        'Efectos en la agricultura',
        'Impacto en el ambiente'
      ], correctAnswer: 'Aumento de la población'},
      { question: '¿Qué tipo de fenómeno climático es la sequía?', options: [
        'Permanente',
        'Cíclico',
        'Inmediato'
      ], correctAnswer: 'Cíclico'},
    ],
    'Granizada': [
      { question: '¿Qué fenómeno se produce cuando la temperatura ambiental disminuye a valores cercanos o debajo de cero grados?', options: [
        'Lluvia de invierno',
        'Tormenta tropical',
        'Helada'
      ], correctAnswer:  'Helada' },
      { question: '¿Cuál es una de las causas del fenómeno de helada?', options: [
        'Presencia de nubes densas',
        'Alta humedad relativa',
        'Exceso de enfriamiento del suelo'
      ], correctAnswer: 'Exceso de enfriamiento del suelo'},
      { question: '¿Qué condiciones climáticas favorecen la formación de heladas?', options: [
        'Vientos calientes y húmedos',
        'Cielos claros y secos',
        'Cielos nublados y fríos'
      ], correctAnswer: 'Cielos claros y secos'},
    ],
    'Nevada': [
      { question: '¿Qué temperatura debe haber para que se forme la nieve?', options: [
        'Por debajo de 0°C',
        '10°C',
        '5°C'
      ], correctAnswer:  'Por debajo de 0°C'},
      { question: '¿Dónde se registran normalmente las nevadas en el país?', options: [
        'Entre 1000 y 2000 m.s.n.m',
        'Abajo de 1000 m.s.n.m',
        'Entre 3800 y 4000 m.s.n.m',
      ], correctAnswer: 'Entre 3800 y 4000 m.s.n.m'},
      { question: '¿Cómo se expresa la cantidad de nieve caída en un período determinado?', options: [
        'En cantidad de copos',
        'En litros',
        'Cielos nublados y fríos',
      ], correctAnswer: 'En litros'},
    ],
    'Friaje': [
      { question: '¿Qué fenómeno se produce cuando hay una invasión de masas de aire antártico en las partes altas de la sierra?', options: [
        'Tormenta eléctrica',
        'Frente cálido',
        'Inundación'
      ], correctAnswer:  'Inundación' },
      { question: '¿En qué región se manifiestan principalmente las heladas asociadas al friaje?', options: [
        'En la costa',
        'En la selva',
        'En las partes altas de la sierra',
      ], correctAnswer: 'En las partes altas de la sierra'},
      { question: '¿Qué tipo de clima previene el friaje?', options: [
        'Clima templado',
        'Clima frío de montaña',
        'Clima cálido húmedo',
      ], correctAnswer: 'Clima frío de montaña'},
    ],
  };


  export default questionsData;