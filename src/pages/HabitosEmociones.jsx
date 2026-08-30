import { motion } from 'framer-motion';
import { SectionHeader, Card, Textarea, Slider, ListOption, NavButtons } from '../components/UI';
import { NIVEL_COCINA } from '../data/data';

const OPCIONES_PICOTEO = [
  'Casi nunca picoteo',
  'Frutas o frutos secos',
  'Galletitas o cosas dulces',
  'Snacks salados, queso o pan',
  'Mate dulce continuo'
];

const ANSIEDAD = ['A media mañana', 'A la tarde', 'Antes de dormir', 'Viendo pantallas', 'Con estrés laboral', 'Por aburrimiento', 'Casi no siento ansiedad'];

export default function HabitosEmociones({ form, set, toggle, onNext, onPrev }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <SectionHeader
          title="Hábitos y Emociones"
          subtitle="Picoteos, tu tiempo para cocinar y tu relación con la comida"
        />

        {/* Picoteos en pastillas rápidas */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-1">Picoteos fuera de las comidas</h3>
          <p className="text-xs text-stone-400 mb-2.5">¿Qué solés picotear habitualmente?</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {OPCIONES_PICOTEO.map(op => {
              const sel = (form.chipsPicoteo || []).includes(op);
              return (
                <button
                  key={op}
                  type="button"
                  onClick={() => toggle('chipsPicoteo', op)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    sel ? 'bg-green-800 border-green-800 text-white shadow-sm' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-white'
                  }`}
                >
                  {op}
                </button>
              );
            })}
          </div>

          <div className="border-t border-stone-100 pt-3">
            <label className="block text-xs font-semibold text-stone-700 mb-2">¿En qué momentos sentís mayor apetito o ganas de picotear?</label>
            <div className="flex flex-wrap gap-1.5">
              {ANSIEDAD.map(op => {
                const sel = (form.ansiedadMoments || []).includes(op);
                return (
                  <button
                    key={op}
                    type="button"
                    onClick={() => toggle('ansiedadMoments', op)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      sel ? 'bg-amber-600 border-amber-600 text-white shadow-sm' : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {op}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Cocina */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-2.5">Tu relación con la cocina</h3>
          <div className="space-y-1.5">
            {NIVEL_COCINA.map(op => (
              <ListOption key={op.id} label={op.label} desc={op.desc} selected={form.nivelCocina === op.id} onSelect={() => set({ nivelCocina: op.id })} />
            ))}
          </div>
        </Card>

        {/* Relacion emocional */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-3">Tu relación con la comida</h3>
          <div className="space-y-3.5">
            <Slider label="¿Sentís culpa después de comer algo fuera de lo planeado?" value={form.relacionComida} onChange={v => set({ relacionComida: v })} min={1} max={10} leftLabel="Nunca" rightLabel="Siempre" />
            <Textarea
              label="Hambre real vs Hambre emocional"
              hint="Contame si sentís que comés por hambre física o más bien por ansiedad, aburrimiento o estados de ánimo..."
              value={form.comidaEmocional}
              onChange={v => set({ comidaEmocional: v })}
              rows={3}
            />
          </div>
        </Card>

        <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Ir a la Batalla de Alimentos" />
      </div>
    </motion.div>
  );
}
