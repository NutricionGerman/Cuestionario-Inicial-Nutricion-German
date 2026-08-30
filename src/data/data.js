export const OBJETIVOS = [
  { id: 'perdida_grasa',   icono: 'G', titulo: 'Pérdida de grasa',               subtitulo: 'Reducción de masa grasa corporal', color: 'from-emerald-600 to-teal-700' },
  { id: 'masa_muscular',   icono: 'M', titulo: 'Ganar músculo',                   subtitulo: 'Desarrollo de masa muscular magra', color: 'from-stone-600 to-stone-800' },
  { id: 'rendimiento',     icono: 'R', titulo: 'Rendimiento deportivo',           subtitulo: 'Optimizar marcas y rendimiento en tu disciplina', color: 'from-amber-500 to-amber-700' },
  { id: 'longevidad',      icono: 'L', titulo: 'Salud y longevidad',              subtitulo: 'Vivir más años sin enfermedad', color: 'from-teal-600 to-emerald-700' },
];

export const CHIPS_DESAYUNO = [
  'Cafe solo', 'Cafe con leche', 'Mate', 'Te', 'Jugo de fruta',
  'Tostadas integrales', 'Tostadas blancas', 'Galletitas dulces', 'Galletitas saladas',
  'Medialunas', 'Huevos', 'Yogur', 'Fruta fresca', 'Avena',
  'Cereales de caja', 'Granola', 'Licuados', 'Nada (ayuno)',
];

export const CHIPS_ALMUERZO_CENA = [
  'Carne vacuna', 'Pollo', 'Pescado', 'Cerdo', 'Huevos',
  'Pasta / Fideos', 'Arroz', 'Papas', 'Legumbres',
  'Ensalada cruda', 'Verduras cocidas', 'Sopas', 'Tartas',
  'Empanadas', 'Pizza', 'Hamburguesas', 'Sandwiches', 'Viandas', 'Delivery',
];

export const CHIPS_PICOTEO = [
  'Frutas', 'Frutos secos', 'Yogur', 'Galletitas', 'Chocolates',
  'Snacks salados', 'Barritas de cereal', 'Queso', 'Mate', 'Casi no picoteo',
];

export const NIVEL_COCINA = [
  { id: 'chef',      label: 'Cocino bien y tengo tiempo',  desc: 'Disfruto cocinar y puedo preparar recetas elaboradas' },
  { id: 'practico',  label: 'Cocino lo básico y rápido',   desc: 'Prefiero platos simples que no tomen más de 20 minutos' },
  { id: 'viandas',   label: 'Dependo de viandas / compras',desc: 'Compro comida hecha, viandas o me cocinan' },
  { id: 'delivery',  label: 'Pido mucho delivery',         desc: 'No tengo tiempo ni hábito de cocinar' },
];

export const ALIMENTOS_TORNEO = [
  { id: 'manzana',        nombre: 'Manzana',               grupo: 'Frutas',       img: '/img/manzana.png' },
  { id: 'banana',         nombre: 'Banana',                grupo: 'Frutas',       img: '/img/banana.png.jpg' },
  { id: 'naranja',        nombre: 'Naranja',               grupo: 'Frutas',       img: '/img/naranja.png.jpg' },
  { id: 'durazno',        nombre: 'Durazno',               grupo: 'Frutas',       img: '/img/durazno.png.jpg' },
  { id: 'brocoli',        nombre: 'Brócoli',               grupo: 'Verduras',     img: '/img/brocoli.png.jpg' },
  { id: 'espinaca',       nombre: 'Espinaca',              grupo: 'Verduras',     img: '/img/espinaca.png.jpg' },
  { id: 'tomate',         nombre: 'Tomate',                grupo: 'Verduras',     img: '/img/tomate.png.jpg' },
  { id: 'zanahoria',      nombre: 'Zanahoria',             grupo: 'Verduras',     img: '/img/zanahoria.png.jpg' },
  { id: 'pollo',          nombre: 'Pechuga de pollo',      grupo: 'Carnes',       img: '/img/ave.png' },
  { id: 'carne_vacuna',   nombre: 'Carne vacuna magra',    grupo: 'Carnes',       img: '/img/vacuna.png.jpg' },
  { id: 'pescado',        nombre: 'Filet de pescado',      grupo: 'Carnes',       img: '/img/pescado.png.jpg' },
  { id: 'huevo',          nombre: 'Huevos',                grupo: 'Huevos',       img: '/img/huevo_de_gallina.png.jpeg' },
  { id: 'leche',          nombre: 'Leche',                 grupo: 'Lácteos',      img: '/img/leche.png.jpg' },
  { id: 'yogur',          nombre: 'Yogur natural',         grupo: 'Lácteos',      img: '/img/yogurt.png.jpg' },
  { id: 'queso',          nombre: 'Queso',                 grupo: 'Lácteos',      img: '/img/queso.png.jpg' },
  { id: 'lentejas',       nombre: 'Lentejas',              grupo: 'Legumbres',    img: '/img/lenteja.png.jpg' },
  { id: 'garbanzos',      nombre: 'Garbanzos',             grupo: 'Legumbres',    img: '/img/garbanzo.png.jpg' },
  { id: 'arvejas',        nombre: 'Arvejas',               grupo: 'Legumbres',    img: '/img/arveja.png' },
  { id: 'avena',          nombre: 'Avena en copos',        grupo: 'Cereales',     img: '/img/avena.png' },
  { id: 'arroz_integral', nombre: 'Arroz integral',        grupo: 'Cereales',     img: '/img/arroz_integral.png' },
  { id: 'arroz_blanco',   nombre: 'Arroz blanco',          grupo: 'Cereales',     img: '/img/arroz_blanco.png' },
  { id: 'pasta',          nombre: 'Pastas',                grupo: 'Cereales',     img: '/img/fideo_crudo.png.jpg' },
  { id: 'papa',           nombre: 'Papa hervida',          grupo: 'Tubérculos',   img: '/img/papa_hervida.png.jpg' },
  { id: 'zapallo',        nombre: 'Zapallo / Calabaza',    grupo: 'Tubérculos',   img: '/img/zapallo.png.jpg' },
  { id: 'palta',          nombre: 'Palta',                 grupo: 'Grasas',       img: '/img/palta.png' },
  { id: 'aceite_oliva',   nombre: 'Aceite de oliva',       grupo: 'Grasas',       img: '/img/aceite_de_oliva.png' },
  { id: 'almendras',      nombre: 'Almendras',             grupo: 'Frutos secos', img: '/img/almendra.png' },
];
