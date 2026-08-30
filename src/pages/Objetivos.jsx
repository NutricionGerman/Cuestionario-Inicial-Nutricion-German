import { motion } from 'framer-motion';
import { SectionHeader, Card, Textarea, NavButtons } from '../components/UI';
import { OBJETIVOS } from '../data/data';

function IconoObjetivo({ id, className = "w-4 h-4" }) {
  switch (id) {
    case 'perdida_grasa':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9.879z" />
        </svg>
      );
    case 'masa_muscular':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2a1 1 0 011 1v2a1 1 0 01-1 1H3m18-4h-2a1 1 0 00-1 1v2a1 1 0 001 1h2M6 8h2a1 1 0 011 1v6a1 1 0 01-1 1H6m12-8h-2a1 1 0 00-1 1v6a1 1 0 001 1h2M9 12h6" />
        </svg>
      );
    case 'rendimiento':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'longevidad':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Objetivos({ form, set, onNext, onPrev }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <SectionHeader
          title="Tu Objetivo Principal"
          subtitle="Elegí la meta prioritaria que querés que trabajemos juntos"
        />

        {/* Tarjetas de objetivos */}
        <div className="grid grid-cols-2 gap-2.5">
          {OBJETIVOS.map(obj => {
            const sel = form.objetivo === obj.id;
            return (
              <motion.div
                key={obj.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => set({ objetivo: obj.id })}
                className={`relative rounded-2xl p-3.5 cursor-pointer transition-all border-2 flex flex-col justify-between min-h-[115px] ${
                  sel
                    ? 'bg-green-900 border-green-800 text-white shadow-md'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-green-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      sel ? 'bg-amber-400 text-green-950 shadow-sm' : 'bg-stone-100 text-stone-600'
                    }`}>
                      <IconoObjetivo id={obj.id} className="w-4 h-4" />
                    </div>

                    {sel ? (
                      <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shadow-sm">
                        <svg className="w-3 h-3 text-green-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-stone-300" />
                    )}
                  </div>

                  <h3 className={`font-bold text-sm leading-snug ${sel ? 'text-white' : 'text-stone-800'}`}>
                    {obj.titulo}
                  </h3>
                </div>

                <p className={`text-[11px] leading-snug mt-1.5 ${sel ? 'text-green-100' : 'text-stone-500'}`}>
                  {obj.subtitulo}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Preguntas guiadas de enfoque */}
        <Card>
          <div className="space-y-4">
            <Textarea
              label="¿Qué intentaste antes para alcanzar este objetivo?"
              hint="Contame si seguiste otras dietas, planes o cambios de hábitos, y qué sentís que te costó sostener o qué no te funcionó..."
              value={form.intentosPrevios}
              onChange={v => set({ intentosPrevios: v })}
              rows={3}
            />

            <div className="border-t border-stone-100 pt-3">
              <Textarea
                label="¿Por qué es importante para vos lograr este cambio ahora?"
                hint="¿Qué te motiva en este momento de tu vida a dar este paso? (Salud, energía, sentirte mejor con tu cuerpo, etc.)"
                value={form.motivacion}
                onChange={v => set({ motivacion: v })}
                rows={3}
              />
            </div>
          </div>
        </Card>

        <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Continuar a Antecedentes de Salud" />
      </div>
    </motion.div>
  );
}
