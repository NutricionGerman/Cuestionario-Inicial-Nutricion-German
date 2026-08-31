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

const BASE = import.meta.env.BASE_URL || '/';
const getImg = (file) => `${BASE.endsWith('/') ? BASE : BASE + '/'}img/${file}`;

export const ALIMENTOS_TORNEO = [
  { id: 'manzana',        nombre: 'Manzana',               grupo: 'Frutas',       img: getImg('manzana.png') },
  { id: 'banana',         nombre: 'Banana',                grupo: 'Frutas',       img: getImg('banana.png.jpg') },
  { id: 'naranja',        nombre: 'Naranja',               grupo: 'Frutas',       img: getImg('naranja.png.jpg') },
  { id: 'durazno',        nombre: 'Durazno',               grupo: 'Frutas',       img: getImg('durazno.png.jpg') },
  { id: 'brocoli',        nombre: 'Brócoli',               grupo: 'Verduras',     img: getImg('brocoli.png.jpg') },
  { id: 'espinaca',       nombre: 'Espinaca',              grupo: 'Verduras',     img: getImg('espinaca.png.jpg') },
  { id: 'tomate',         nombre: 'Tomate',                grupo: 'Verduras',     img: getImg('tomate.png.jpg') },
  { id: 'zanahoria',      nombre: 'Zanahoria',             grupo: 'Verduras',     img: getImg('zanahoria.png.jpg') },
  { id: 'pollo',          nombre: 'Pechuga de pollo',      grupo: 'Carnes',       img: getImg('ave.png') },
  { id: 'carne_vacuna',   nombre: 'Carne vacuna magra',    grupo: 'Carnes',       img: getImg('vacuna.png.jpg') },
  { id: 'pescado',        nombre: 'Filet de pescado',      grupo: 'Carnes',       img: getImg('pescado.png.jpg') },
  { id: 'huevo',          nombre: 'Huevos',                grupo: 'Huevos',       img: getImg('huevo_de_gallina.png.jpeg') },
  { id: 'leche',          nombre: 'Leche',                 grupo: 'Lácteos',      img: getImg('leche.png.jpg') },
  { id: 'yogur',          nombre: 'Yogur natural',         grupo: 'Lácteos',      img: getImg('yogurt.png.jpg') },
  { id: 'queso',          nombre: 'Queso',                 grupo: 'Lácteos',      img: getImg('queso.png.jpg') },
  { id: 'lentejas',       nombre: 'Lentejas',              grupo: 'Legumbres',    img: getImg('lenteja.png.jpg') },
  { id: 'garbanzos',      nombre: 'Garbanzos',             grupo: 'Legumbres',    img: getImg('garbanzo.png.jpg') },
  { id: 'arvejas',        nombre: 'Arvejas',               grupo: 'Legumbres',    img: getImg('arveja.png') },
  { id: 'avena',          nombre: 'Avena en copos',        grupo: 'Cereales',     img: getImg('avena.png') },
  { id: 'arroz_integral', nombre: 'Arroz integral',        grupo: 'Cereales',     img: getImg('arroz_integral.png') },
  { id: 'arroz_blanco',   nombre: 'Arroz blanco',          grupo: 'Cereales',     img: getImg('arroz_blanco.png') },
  { id: 'pasta',          nombre: 'Pastas',                grupo: 'Cereales',     img: getImg('fideo_crudo.png.jpg') },
  { id: 'papa',           nombre: 'Papa hervida',          grupo: 'Tubérculos',   img: getImg('papa_hervida.png.jpg') },
  { id: 'zapallo',        nombre: 'Zapallo / Calabaza',    grupo: 'Tubérculos',   img: getImg('zapallo.png.jpg') },
  { id: 'palta',          nombre: 'Palta',                 grupo: 'Grasas',       img: getImg('palta.png') },
  { id: 'aceite_oliva',   nombre: 'Aceite de oliva',       grupo: 'Grasas',       img: getImg('aceite_de_oliva.png') },
  { id: 'almendras',      nombre: 'Almendras',             grupo: 'Frutos secos', img: getImg('almendra.png') },
];
