import { motion } from 'framer-motion';
import { SectionHeader, Card, Textarea, NavButtons } from '../components/UI';

export default function AlmuerzoCena({ form, set, onNext, onPrev }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <SectionHeader
          title="Almuerzo y Cena"
          subtitle="Contame cuáles son tus preparaciones y platos más frecuentes"
        />

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🥗</span>
            <h3 className="text-sm font-bold text-stone-800">Almuerzos y Cenas habituales</h3>
          </div>
          <p className="text-xs text-stone-400 mb-3 leading-relaxed">
            ¿Qué platos preparás con mayor frecuencia? ¿Cocinás vos o alguien más? ¿Usás viandas, delivery o repetís comida de un día para el otro?
          </p>
          <Textarea
            hint="Ej: Al mediodía suelo almorzar en el trabajo vianda de pollo con ensalada o tarta; a la noche ceno más relajado en casa carne con arroz o pastas..."
            value={form.almuerzoCenaTexto}
            onChange={v => set({ almuerzoCenaTexto: v })}
            rows={5}
          />
        </Card>

        <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Continuar a Hábitos y Emociones" />
      </div>
    </motion.div>
  );
}
