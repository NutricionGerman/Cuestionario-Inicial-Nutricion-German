import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { OBJETIVOS } from '../data/data';

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwAxBVnjR8EhQ1WE0aSDkd1qz_ymQsNhomzznTtqCCakM3VhpIWtTRgo3GM3YpKfVzR/exec';

export default function Resumen({ form, reset }) {
  const obj = OBJETIVOS.find(o => o.id === form.objetivo);
  const top5 = form.top5Alimentos || [];
  const hasSent = useRef(false);

  const [estadoEnvio, setEstadoEnvio] = useState('enviando'); // 'enviando', 'exito', 'error'

  const nombresTop5 = top5.map((a, i) => `${i + 1}. ${a.nombre}`).join(', ');

  useEffect(() => {
    if (hasSent.current) return;
    hasSent.current = true;
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#166534', '#d97706', '#fef3c7', '#fff']
    });

    const payload = {
      nombreCompleto: form.nombreCompleto || '',
      fechaNacimiento: form.fechaNacimiento || '',
      ocupacion: form.ocupacion || '',
      horarioTrabajo: form.horarioTrabajo || '',
      convivencia: form.convivencia || [],
      objetivo: obj ? obj.titulo : (form.objetivo || ''),
      intentosPrevios: form.intentosPrevios || '',
      motivacion: form.motivacion || '',
      alergias: form.alergias || '',
      patologias: form.patologias || '',
      medicacion: form.medicacion || '',
      suplementacion: form.suplementacion || '',
      actividadFisicaDetalle: form.actividadFisicaDetalle || '',
      nivelEsfuerzo: form.nivelEsfuerzo || '',
      horasSueno: form.horasSueno || '',
      calidadSueno: form.calidadSueno || '',
      nivelEstres: form.nivelEstres || '',
      vasosAgua: form.vasosAgua || '',
      desayunoTexto: form.desayunoTexto || '',
      meriendaTexto: form.meriendaTexto || '',
      almuerzoCenaTexto: form.almuerzoCenaTexto || '',
      chipsPicoteo: form.chipsPicoteo || [],
      ansiedadMoments: form.ansiedadMoments || [],
      nivelCocina: form.nivelCocina || '',
      relacionComida: form.relacionComida || '',
      comidaEmocional: form.comidaEmocional || '',
      top5Nombres: nombresTop5 || ''
    };

    fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setEstadoEnvio('exito');
      })
      .catch((err) => {
        console.error('Error al sincronizar con Google Sheets:', err);
        setEstadoEnvio('error');
      });
  }, []);

  const waMsg = encodeURIComponent(
    `Hola German! Ya complete mi cuestionario inicial.\n\n` +
    `Nombre: ${form.nombreCompleto || 'No especificado'}\n` +
    `Objetivo: ${obj ? obj.titulo : 'No especificado'}\n` +
    (nombresTop5 ? `Mi Top 5 de alimentos: ${nombresTop5}\n\n` : '\n') +
    `Quedo a la espera de tu mensaje para coordinar!`
  );

  const datos = [
    ['Nombre y Apellido', form.nombreCompleto || 'No especificado'],
    ['Objetivo', obj ? obj.titulo : 'No especificado'],
    ['Hidratación', `${form.vasosAgua || 6} vasos/día`],
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto">

        {/* Celebración */}
        <div className="text-center mb-5">
          <div className="w-16 h-16 bg-green-800 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg">
            <svg className="w-9 h-9 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-stone-800">¡Cuestionario completado!</h1>
          <p className="text-stone-500 text-xs mt-1">Voy a revisar toda tu información antes de que hablemos</p>
        </div>

        {/* Estado de sincronización con Google Sheets */}
        <div className="mb-4">
          {estadoEnvio === 'enviando' && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 flex items-center gap-2.5 text-xs font-semibold">
              <svg className="w-4 h-4 text-amber-700 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Guardando tus respuestas en mi planilla...</span>
            </div>
          )}

          {estadoEnvio === 'exito' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-300 text-green-900 rounded-xl p-3 flex items-center gap-2.5 text-xs font-semibold shadow-sm">
              <div className="w-4 h-4 rounded-full bg-green-800 flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Respuestas registradas con éxito en mi planilla</span>
            </motion.div>
          )}

          {estadoEnvio === 'error' && (
            <div className="bg-stone-100 border border-stone-300 text-stone-700 rounded-xl p-3 flex items-center gap-2.5 text-xs font-medium">
              <svg className="w-4 h-4 text-stone-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Tus respuestas quedaron guardadas. Podés confirmarme por WhatsApp.</span>
            </div>
          )}
        </div>

        {/* Pasaporte Nutricional */}
        <div className="bg-green-900 rounded-2xl p-5 mb-5 shadow-lg text-white">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3">Tu Pasaporte Inicial</div>
          <div className="space-y-2">
            {datos.map(([k, v]) => (
              <div key={k} className="flex justify-between items-center py-1.5 border-b border-white/10 last:border-0">
                <span className="text-green-200 text-xs">{k}</span>
                <span className="text-white text-xs font-semibold text-right max-w-[55%]">{v}</span>
              </div>
            ))}
          </div>

          {/* Top 5 integrado en el pasaporte */}
          {top5.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/15">
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2">
                Top 5 Alimentos Clave para tu Objetivo
              </div>
              <div className="grid grid-cols-5 gap-2">
                {top5.map((a, idx) => (
                  <div key={a.id} className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden border border-white/30 bg-white shadow-sm mb-1">
                      <img src={a.img} alt={a.nombre} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[10px] font-bold text-amber-200 truncate">{idx + 1}º {a.nombre}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Próximos pasos */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-5 shadow-sm">
          <h3 className="text-sm font-bold text-stone-700 mb-3">Qué pasa a partir de ahora</h3>
          {[
            ['Voy a analizar tus respuestas', 'Revisaré tu estilo de vida, tus hábitos y tu Top 5 de alimentos'],
            ['Te voy a escribir por WhatsApp', 'Para coordinar día y horario de nuestra consulta'],
            ['Vamos a definir la mejor estrategia', 'Pautas prácticas y sostenibles pensadas para tu día a día'],
          ].map(([t, d]) => (
            <div key={t} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-green-700" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-700">{t}</div>
                <div className="text-xs text-stone-400">{d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.a
          href={`https://wa.me/5493815649938?text=${waMsg}`}
          target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl text-sm mb-3 transition-colors shadow-md"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Avisarme por WhatsApp
        </motion.a>
        <p className="text-center text-stone-400 text-xs mb-6">Recomendado para confirmar la recepción</p>

        <button onClick={reset} className="w-full text-stone-400 text-xs py-2 hover:text-stone-600 transition-colors">
          Limpiar y empezar de nuevo
        </button>
      </div>
    </motion.div>
  );
}
