import { motion } from 'framer-motion';

const STATS = [
  { num: '5-7', label: 'minutos' },
  { num: '8',   label: 'pasos cortos' },
  { num: '1',   label: 'batalla' },
];

export default function Welcome({ onNext }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Hero */}
      <div className="bg-green-800 pt-16 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-amber-400 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg">
            <svg className="w-9 h-9 text-green-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.71.71M18.36 18.36l.71.71M1 12h2m18 0h2M4.22 19.78l.71-.71M18.36 5.64l.71-.71" />
              <circle cx="12" cy="12" r="4" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white leading-tight">
            Nutricion<br />
            <span className="text-amber-300">con German</span>
          </h1>
          <p className="text-green-200 text-sm mt-2">Cuestionario inicial</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-7 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-white border border-stone-100 rounded-2xl p-5 mb-5 shadow-sm">
            <p className="text-sm text-stone-600 leading-relaxed">
              Este cuestionario es el primer paso para que <strong>conozca tu situacion particular</strong> y juntos podamos <strong>establecer la mejor forma de trabajo</strong> para vos. Cuanto mas en detalle me cuentes, mejor te voy a poder orientar.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {STATS.map(s => (
              <div key={s.label} className="bg-white border border-stone-100 rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-black text-green-800">{s.num}</div>
                <div className="text-xs text-stone-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Caracteristicas */}
          {[
            ['Confidencial', 'Solo yo tendré acceso a tus respuestas'],
            ['Guardado automático', 'Si cerrás la app, no perdés el progreso'],
            ['Batalla de alimentos', 'Elegí los 5 alimentos que mejor se alinean con tu objetivo'],
          ].map(([t, d]) => (
            <div key={t} className="flex items-start gap-3 mb-3">
              <div className="w-5 h-5 rounded-full bg-green-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-700">{t}</div>
                <div className="text-xs text-stone-400">{d}</div>
              </div>
            </div>
          ))}

          <motion.button
            onClick={onNext} whileTap={{ scale: 0.97 }}
            className="w-full mt-8 bg-green-800 hover:bg-green-700 text-amber-50 font-bold py-4 rounded-2xl text-base transition-colors shadow-md"
          >
            Comenzar
          </motion.button>
          <p className="text-center text-stone-400 text-xs mt-3">Tus datos estan protegidos</p>
        </motion.div>
      </div>
    </div>
  );
}
