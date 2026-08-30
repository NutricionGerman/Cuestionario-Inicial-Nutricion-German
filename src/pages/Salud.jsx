import { motion } from 'framer-motion';
import { SectionHeader, Card, Textarea, NavButtons } from '../components/UI';

export default function Salud({ form, set, onNext, onPrev }) {
  const ponerNinguna = (campo) => set({ [campo]: 'Ninguna' });
  const limpiarCampo = (campo) => set({ [campo]: '' });

  const todoSano = form.alergias === 'Ninguna' && form.patologias === 'Ninguna' && form.medicacion === 'Ninguna' && form.suplementacion === 'Ninguna';

  const toggleTodoSano = () => {
    if (todoSano) {
      set({
        alergias: '',
        patologias: '',
        medicacion: '',
        suplementacion: ''
      });
    } else {
      set({
        alergias: 'Ninguna',
        patologias: 'Ninguna',
        medicacion: 'Ninguna',
        suplementacion: 'Ninguna'
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <SectionHeader
          title="Antecedentes de Salud"
          subtitle="Datos médicos fundamentales para que pueda cuidar tu salud y adaptar mi trabajo a vos"
        />

        {/* Botón Maestro Rápido Toggleable (Cero emojis) */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={toggleTodoSano}
          className={`w-full py-3 px-4 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            todoSano
              ? 'bg-green-100 border-green-700 text-green-900 shadow-sm'
              : 'bg-white border-green-600/40 text-green-900 hover:bg-green-50 shadow-sm'
          }`}
        >
          {todoSano ? (
            <svg className="w-4 h-4 text-green-800 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          <span>{todoSano ? 'Todo marcado como Ninguna (Tocá acá para desmarcar)' : 'Tocá acá si no tenés alergias, patologías ni tomás medicación'}</span>
        </motion.button>

        <Card>
          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">Alergias o intolerancias alimentarias</label>
                {form.alergias === 'Ninguna' ? (
                  <button type="button" onClick={() => limpiarCampo('alergias')} className="text-[11px] text-stone-500 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded font-medium transition-colors">
                    Deshacer
                  </button>
                ) : (
                  <button type="button" onClick={() => ponerNinguna('alergias')} className="text-[11px] text-green-800 bg-green-50 hover:bg-green-100 px-2 py-0.5 rounded font-medium transition-colors">
                    + Marcar Ninguna
                  </button>
                )}
              </div>
              <Textarea hint="Lactosa, gluten, maní, mariscos... o 'Ninguna'" value={form.alergias} onChange={v => set({ alergias: v })} rows={2} />
            </div>

            <div className="border-t border-stone-100 pt-3">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">Patologías diagnosticadas</label>
                {form.patologias === 'Ninguna' ? (
                  <button type="button" onClick={() => limpiarCampo('patologias')} className="text-[11px] text-stone-500 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded font-medium transition-colors">
                    Deshacer
                  </button>
                ) : (
                  <button type="button" onClick={() => ponerNinguna('patologias')} className="text-[11px] text-green-800 bg-green-50 hover:bg-green-100 px-2 py-0.5 rounded font-medium transition-colors">
                    + Marcar Ninguna
                  </button>
                )}
              </div>
              <Textarea hint="Hipotiroidismo, resistencia a la insulina, hipertensión... o 'Ninguna'" value={form.patologias} onChange={v => set({ patologias: v })} rows={2} />
            </div>

            <div className="border-t border-stone-100 pt-3">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">Medicación habitual</label>
                {form.medicacion === 'Ninguna' ? (
                  <button type="button" onClick={() => limpiarCampo('medicacion')} className="text-[11px] text-stone-500 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded font-medium transition-colors">
                    Deshacer
                  </button>
                ) : (
                  <button type="button" onClick={() => ponerNinguna('medicacion')} className="text-[11px] text-green-800 bg-green-50 hover:bg-green-100 px-2 py-0.5 rounded font-medium transition-colors">
                    + Marcar Ninguna
                  </button>
                )}
              </div>
              <Textarea hint="Nombre o dosis de lo que tomes a diario, o 'Ninguna'" value={form.medicacion} onChange={v => set({ medicacion: v })} rows={2} />
            </div>

            <div className="border-t border-stone-100 pt-3">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-stone-700">Suplementación actual</label>
                {form.suplementacion === 'Ninguna' ? (
                  <button type="button" onClick={() => limpiarCampo('suplementacion')} className="text-[11px] text-stone-500 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded font-medium transition-colors">
                    Deshacer
                  </button>
                ) : (
                  <button type="button" onClick={() => ponerNinguna('suplementacion')} className="text-[11px] text-green-800 bg-green-50 hover:bg-green-100 px-2 py-0.5 rounded font-medium transition-colors">
                    + Marcar Ninguna
                  </button>
                )}
              </div>
              <Textarea hint="Proteínas, creatina, vitaminas, magnesio, etc., o 'Ninguna'" value={form.suplementacion} onChange={v => set({ suplementacion: v })} rows={2} />
            </div>
          </div>
        </Card>

        <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Continuar a Estilo de Vida" />
      </div>
    </motion.div>
  );
}
