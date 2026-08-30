import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALIMENTOS_TORNEO, OBJETIVOS } from '../data/data';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function PantallaIntro({ onStart, objetivoNombre }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between pt-16 pb-10 px-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto w-full text-center">
        <div className="w-16 h-16 bg-green-800 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block mb-3">
          Batalla Triangular de Alimentos
        </span>

        <h1 className="text-2xl font-black text-stone-800 mb-2">Batalla de Alimentos</h1>
        <p className="text-stone-500 text-sm mb-6 leading-relaxed">
          En cada ronda vas a comparar <strong>3 alimentos a la vez</strong>. Elegí cuál de los tres considerás que <strong>mejor se alinea con tu objetivo ({objetivoNombre})</strong>. 27 alimentos compiten hasta descubrir tu <strong>Top 5 clave</strong>.
        </p>

        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm text-left space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="text-sm font-bold text-stone-800">3 Alimentos frente a frente</div>
              <div className="text-xs text-stone-500">En cada pantalla elegís el que considerás más conveniente y estratégico para tu objetivo ({objetivoNombre}).</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="text-sm font-bold text-stone-800">27 Alimentos reales</div>
              <div className="text-xs text-stone-500">Frutas, verduras, carnes, huevos, legumbres, cereales, tubérculos, lácteos y grasas se cruzan de forma aleatoria.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="text-sm font-bold text-stone-800">Clasificación al Podio Top 5</div>
              <div className="text-xs text-stone-500">Los mejores avanzan por rondas hasta coronar el 1º, 2º, 3º, 4º y 5º puesto de tu plan.</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center -space-x-2 mb-6">
          {ALIMENTOS_TORNEO.slice(0, 6).map((a, i) => (
            <img key={i} src={a.img} alt={a.nombre} className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
          ))}
          <div className="w-10 h-10 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-xs font-bold text-stone-600">
            +21
          </div>
        </div>

        <motion.button
          onClick={onStart}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-green-800 hover:bg-green-700 text-amber-50 font-bold py-4 rounded-2xl text-base shadow-md transition-colors"
        >
          Comenzar la Batalla
        </motion.button>
      </motion.div>
    </div>
  );
}

function PantallaPodio({ top5, onContinuar, objetivoNombre }) {
  const medallas = [
    { rank: 1, tag: '1er Lugar', color: 'bg-amber-400 text-stone-900 border-amber-300', icon: 'ORO', desc: 'Tu alimento estrella absoluto' },
    { rank: 2, tag: '2do Lugar', color: 'bg-stone-200 text-stone-800 border-stone-300', icon: 'PLATA', desc: 'Pilar secundario fundamental' },
    { rank: 3, tag: '3er Lugar', color: 'bg-amber-700 text-amber-50 border-amber-600', icon: 'BRONCE', desc: 'Excelente elección constante' },
    { rank: 4, tag: '4to Lugar', color: 'bg-green-100 text-green-900 border-green-200', icon: '4º', desc: 'Alimento prioritario de tu día a día' },
    { rank: 5, tag: '5to Lugar', color: 'bg-stone-100 text-stone-700 border-stone-200', icon: '5º', desc: 'Ganador de la batalla de repechaje' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-16 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-green-800 bg-green-100 px-3 py-1 rounded-full inline-block mb-2">
            Resultado Oficial
          </span>
          <h2 className="text-2xl font-black text-stone-800">Tu Top 5 para {objetivoNombre}</h2>
          <p className="text-xs text-stone-500 mt-1">Estos son los 5 alimentos que considerás clave para alcanzar tu objetivo</p>
        </div>

        {top5[0] && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-4">
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-400 text-green-950 text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                  CAMPEÓN 1º LUGAR
                </span>
                <span className="text-xs text-green-200">{top5[0].grupo}</span>
              </div>
              <div className="flex items-center gap-4">
                <img src={top5[0].img} alt={top5[0].nombre} className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400/50 shadow-md bg-white" />
                <div className="flex-1">
                  <h3 className="text-xl font-black leading-tight text-amber-200">{top5[0].nombre}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-2.5 mb-6">
          {top5.slice(1).map((alim, i) => {
            const med = medallas[i + 1];
            return (
              <motion.div
                key={alim.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (i + 1) * 0.1 }}
                className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-sm flex items-center gap-3.5"
              >
                <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center flex-shrink-0 border ${med.color}`}>
                  {med.icon}
                </div>
                <img src={alim.img} alt={alim.nombre} className="w-12 h-12 rounded-xl object-cover border border-stone-200 flex-shrink-0 bg-stone-50" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-800 truncate">{alim.nombre}</span>
                    <span className="text-[10px] font-semibold text-stone-400 uppercase bg-stone-100 px-1.5 py-0.5 rounded">
                      {alim.grupo}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          onClick={onContinuar}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-green-800 hover:bg-green-700 text-amber-50 font-bold py-4 rounded-2xl text-base shadow-md transition-colors"
        >
          Ver mi Pasaporte Nutricional
        </motion.button>
      </div>
    </div>
  );
}

export default function Duelo({ form, set, onNext }) {
  const objSeleccionado = OBJETIVOS.find(o => o.id === form.objetivo);
  const objetivoNombre = objSeleccionado ? objSeleccionado.titulo : 'tu objetivo';

  const [fase, setFase] = useState('intro'); // 'intro', 'torneo', 'podio'
  const [etapa, setEtapa] = useState('fase1'); // 'fase1', 'semis', 'repechaje_p4', 'repechaje_p5', 'final_p1', 'final_p2'
  const [matchIdx, setMatchIdx] = useState(0);

  // Contendientes
  const [participantes, setParticipantes] = useState(() => shuffleArray(ALIMENTOS_TORNEO));
  const [ganadoresFase1, setGanadoresFase1] = useState([]);
  const [segundosFase1, setSegundosFase1] = useState([]);

  const [finalistas, setFinalistas] = useState([]);
  const [segundosSemis, setSegundosSemis] = useState([]);

  // Puestos
  const [puesto1, setPuesto1] = useState(null);
  const [puesto2, setPuesto2] = useState(null);
  const [puesto3, setPuesto3] = useState(null);
  const [puesto4, setPuesto4] = useState(null);
  const [puesto5, setPuesto5] = useState(null);

  const [top5Final, setTop5Final] = useState([]);

  const iniciarTorneo = () => {
    setParticipantes(shuffleArray(ALIMENTOS_TORNEO));
    setGanadoresFase1([]);
    setSegundosFase1([]);
    setFinalistas([]);
    setSegundosSemis([]);
    setPuesto1(null);
    setPuesto2(null);
    setPuesto3(null);
    setPuesto4(null);
    setPuesto5(null);
    setEtapa('fase1');
    setMatchIdx(0);
    setFase('torneo');
  };

  // Match actual según etapa
  const matchActual = useMemo(() => {
    if (etapa === 'fase1') {
      const a = participantes[matchIdx * 3];
      const b = participantes[matchIdx * 3 + 1];
      const c = participantes[matchIdx * 3 + 2];
      return {
        items: [a, b, c].filter(Boolean),
        titulo: 'Fase Clasificatoria',
        subtitulo: `Terna ${matchIdx + 1} de 9`,
        totalEnEtapa: 9,
        pregunta: `¿Cuál de los 3 se alinea mejor con tu objetivo?`
      };
    }
    if (etapa === 'semis') {
      const a = ganadoresFase1[matchIdx * 3];
      const b = ganadoresFase1[matchIdx * 3 + 1];
      const c = ganadoresFase1[matchIdx * 3 + 2];
      return {
        items: [a, b, c].filter(Boolean),
        titulo: 'Semifinales',
        subtitulo: `Semifinal ${matchIdx + 1} de 3`,
        totalEnEtapa: 3,
        pregunta: `Elegí el alimento que pasa directo a la Gran Final`
      };
    }
    if (etapa === 'repechaje_p4') {
      return {
        items: segundosSemis,
        titulo: 'Batalla de Repechaje',
        subtitulo: 'Definición del 4º puesto',
        totalEnEtapa: 1,
        pregunta: '¿Cuál de estos 3 merece el 4º Puesto?'
      };
    }
    if (etapa === 'repechaje_p5') {
      const restantes = segundosSemis.filter(x => x.id !== puesto4?.id);
      return {
        items: restantes,
        titulo: 'Batalla de Repechaje',
        subtitulo: 'Definición del 5º puesto',
        totalEnEtapa: 1,
        pregunta: '¿Cuál de los dos se queda con el 5º Puesto?'
      };
    }
    if (etapa === 'final_p1') {
      return {
        items: finalistas,
        titulo: 'Gran Final por el Podio',
        subtitulo: 'Elección del Campeón Absoluto (1º Puesto)',
        totalEnEtapa: 1,
        pregunta: 'Elegí el Campeón: el alimento rey para tu objetivo'
      };
    }
    if (etapa === 'final_p2') {
      const restantes = finalistas.filter(x => x.id !== puesto1?.id);
      return {
        items: restantes,
        titulo: 'Gran Final por el Podio',
        subtitulo: 'Definición de Plata (2º) y Bronce (3º)',
        totalEnEtapa: 1,
        pregunta: 'Elegí cuál se queda con el 2º Puesto (Plata)'
      };
    }
    return null;
  }, [etapa, matchIdx, participantes, ganadoresFase1, segundosSemis, finalistas, puesto1, puesto4]);

  const elegirAlimento = (elegido) => {
    if (etapa === 'fase1') {
      const itemsDeEstaTerna = [participantes[matchIdx * 3], participantes[matchIdx * 3 + 1], participantes[matchIdx * 3 + 2]];
      const descartados = itemsDeEstaTerna.filter(x => x.id !== elegido.id);

      const nuevosGanadores = [...ganadoresFase1, elegido];
      const nuevosSegundos = [...segundosFase1, descartados[0]]; // Guardar para contexto
      setGanadoresFase1(nuevosGanadores);
      setSegundosFase1(nuevosSegundos);

      if (matchIdx + 1 < 9) {
        setMatchIdx(matchIdx + 1);
      } else {
        // Fin de fase 1 -> pasa a Semis (9 clasificados)
        setEtapa('semis');
        setMatchIdx(0);
      }
      return;
    }

    if (etapa === 'semis') {
      const itemsDeEstaSemi = [ganadoresFase1[matchIdx * 3], ganadoresFase1[matchIdx * 3 + 1], ganadoresFase1[matchIdx * 3 + 2]];
      const descartados = itemsDeEstaSemi.filter(x => x.id !== elegido.id);

      const nuevosFinalistas = [...finalistas, elegido];
      const nuevosSegundosSemis = [...segundosSemis, descartados[0]];
      setFinalistas(nuevosFinalistas);
      setSegundosSemis(nuevosSegundosSemis);

      if (matchIdx + 1 < 3) {
        setMatchIdx(matchIdx + 1);
      } else {
        // Fin de semis -> ir a repechaje por 4to puesto con los 3 segundos de semis
        setEtapa('repechaje_p4');
        setMatchIdx(0);
      }
      return;
    }

    if (etapa === 'repechaje_p4') {
      setPuesto4(elegido);
      setEtapa('repechaje_p5');
      return;
    }

    if (etapa === 'repechaje_p5') {
      setPuesto5(elegido);
      // Ahora pasamos a la Gran Final (1er puesto entre los 3 finalistas)
      setEtapa('final_p1');
      return;
    }

    if (etapa === 'final_p1') {
      setPuesto1(elegido);
      setEtapa('final_p2');
      return;
    }

    if (etapa === 'final_p2') {
      const p2 = elegido;
      const restantes = finalistas.filter(x => x.id !== puesto1?.id);
      const p3 = restantes.find(x => x.id !== p2.id);

      setPuesto2(p2);
      setPuesto3(p3);

      const definitivo = [puesto1, p2, p3, puesto4, puesto5];
      setTop5Final(definitivo);
      set({ top5Alimentos: definitivo });
      setFase('podio');
    }
  };

  if (fase === 'intro') {
    return <PantallaIntro onStart={iniciarTorneo} objetivoNombre={objetivoNombre} />;
  }

  if (fase === 'podio') {
    return <PantallaPodio top5={top5Final} onContinuar={onNext} objetivoNombre={objetivoNombre} />;
  }

  if (!matchActual || !matchActual.items || matchActual.items.length === 0) {
    return null;
  }

  const { items, titulo, subtitulo, totalEnEtapa, pregunta } = matchActual;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between pt-14 pb-6 px-4">
      {/* Header superior */}
      <div className="max-w-md mx-auto w-full mb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1 font-semibold">
          <span className="text-green-800 uppercase tracking-wider">{titulo}</span>
          <span>{subtitulo}</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-green-700 transition-all duration-300 rounded-full"
            style={{ width: `${((matchIdx + 1) / totalEnEtapa) * 100}%` }}
          />
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl py-2 px-3 text-center border border-stone-200 shadow-sm">
          <p className="text-xs text-stone-700 font-semibold">
            🎯 Meta: <span className="text-green-800 font-bold">{objetivoNombre}</span>
          </p>
          <p className="text-[11px] text-stone-500 mt-0.5">{pregunta}</p>
        </div>
      </div>

      {/* Las 3 tarjetas de alimentos (o 2 en desempate final) */}
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center gap-2.5">
        {items.map((item, idx) => (
          <motion.button
            key={`${item.id}-${matchIdx}-${idx}`}
            onClick={() => elegirAlimento(item)}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl p-3 border-2 border-stone-200 hover:border-green-700 active:border-green-700 shadow-sm text-left transition-all flex items-center gap-3.5 group active:bg-green-50"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
              <img src={item.img} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md mb-1">
                {item.grupo}
              </span>
              <h3 className="text-base font-black text-stone-800 leading-snug truncate">
                {item.nombre}
              </h3>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-stone-100 group-hover:bg-green-800 group-hover:text-white flex items-center justify-center text-xs font-bold text-stone-600 transition-colors flex-shrink-0">
              Elegir
            </div>
          </motion.button>
        ))}
      </div>

      {/* Pie de pantalla */}
      <div className="text-center mt-3">
        <p className="text-[11px] text-stone-500 font-medium">
          Tocá el alimento que considerás más estratégico para <span className="text-green-800 font-bold">{objetivoNombre.toLowerCase()}</span>
        </p>
      </div>
    </div>
  );
}
