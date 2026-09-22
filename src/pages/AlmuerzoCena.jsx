import { motion } from 'framer-motion';
import { SectionHeader, Card, Textarea, NavButtons } from '../components/UI';
import { CHIPS_ALACENA } from '../data/data';

export default function AlmuerzoCena({ form, set, toggle, onNext, onPrev }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <SectionHeader
          title="Almuerzo, Cena y Alacena"
          subtitle="Contame cuáles son tus preparaciones habituales y qué tenés en tu cocina"
        />

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-sm font-bold text-stone-800">Almuerzos y Cenas habituales</h3>
          </div>
          <p className="text-xs text-stone-400 mb-3 leading-relaxed">
            ¿Qué platos preparás con mayor frecuencia? ¿Cocinás vos o alguien más? ¿Usás viandas, delivery o repetís comida de un día para el otro?
          </p>
          <Textarea
            hint="Ej: Al mediodía suelo almorzar en el trabajo vianda de pollo con ensalada o tarta; a la noche ceno más relajado en casa carne con arroz o pastas..."
            value={form.almuerzoCenaTexto}
            onChange={v => set({ almuerzoCenaTexto: v })}
            rows={4}
          />
        </Card>

        {/* Alacena y Heladera */}
        <Card>
          <h3 className="text-sm font-bold text-stone-800 mb-1">Tu alacena y heladera</h3>
          <p className="text-xs text-stone-400 mb-3 leading-relaxed">
            ¿Qué tipo de alimentos e ingredientes suelen predominar en tu cocina? Podés marcar varios:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CHIPS_ALACENA.map(op => {
              const sel = (form.chipsAlacena || []).includes(op);
              return (
                <button
                  key={op}
                  type="button"
                  onClick={() => toggle('chipsAlacena', op)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    sel ? 'bg-green-800 border-green-800 text-white shadow-sm' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-white'
                  }`}
                >
                  {op}
                </button>
              );
            })}
          </div>
        </Card>

        <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Continuar a Hábitos y Emociones" />
      </div>
    </motion.div>
  );
}
