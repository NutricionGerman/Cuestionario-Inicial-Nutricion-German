import { motion } from 'framer-motion';
import { SectionHeader, Card, Textarea, NavButtons } from '../components/UI';

export default function DesayunoMerienda({ form, set, onNext, onPrev }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <SectionHeader
          title="Desayuno y Merienda"
          subtitle="Contame cómo empezás tus mañanas y cómo transitás las tardes"
        />

        {/* Desayuno */}
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">☕</span>
            <h3 className="text-sm font-bold text-stone-800">Tu Desayuno habitual</h3>
          </div>
          <p className="text-xs text-stone-400 mb-3">¿A qué hora solés desayunar y qué comés o tomás?</p>
          <Textarea
            hint="Ej: Café solo o con leche descremada, 2 tostadas integrales con queso y huevo revuelto a eso de las 8:30 (o si solés hacer ayuno)..."
            value={form.desayunoTexto}
            onChange={v => set({ desayunoTexto: v })}
            rows={3}
          />
        </Card>

        {/* Merienda */}
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🥪</span>
            <h3 className="text-sm font-bold text-stone-800">Tu Merienda habitual</h3>
          </div>
          <p className="text-xs text-stone-400 mb-3">¿Qué solés merendar o tomar a la tarde?</p>
          <Textarea
            hint="Ej: Mate con tostadas o galletitas, fruta fresca con yogur o frutos secos a las 17:30 (o si pasás de largo)..."
            value={form.meriendaTexto}
            onChange={v => set({ meriendaTexto: v })}
            rows={3}
          />
        </Card>

        <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Continuar a Almuerzo y Cena" />
      </div>
    </motion.div>
  );
}
