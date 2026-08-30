import { motion } from 'framer-motion';
import { SectionHeader, Card, Textarea, Slider, NavButtons } from '../components/UI';

export default function EstiloVida({ form, set, onNext, onPrev }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-5">
        <SectionHeader
          title="Movimiento y Estilo de Vida"
          subtitle="Quiero conocer tu nivel de actividad física, descanso y hábitos diarios"
        />

        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-2">Actividad física</h3>
          <p className="text-xs text-stone-400 mb-4">¿Cómo te movés en tu semana habitual?</p>
          <div className="space-y-4">
            <Textarea
              label="Contame qué tipo de actividad física hacés"
              hint="¿Entrenás en gimnasio, salís a correr, hacés deportes, caminás o actualmente no estás haciendo nada? Detallame qué disciplinas, cuántos días y cómo te sentís..."
              value={form.actividadFisicaDetalle}
              onChange={v => set({ actividadFisicaDetalle: v })}
              rows={3}
            />
            <Slider label="Nivel de esfuerzo percibido cuando entrenás" value={form.nivelEsfuerzo} onChange={v => set({ nivelEsfuerzo: v })} min={1} max={10} leftLabel="Muy suave" rightLabel="Al límite" />
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-4">Descanso, estrés e hidratación</h3>
          <div className="space-y-5">
            <Slider label="Horas de sueño promedio por noche" value={form.horasSueno} onChange={v => set({ horasSueno: v })} min={3} max={12} leftLabel="3 horas" rightLabel="12 horas" />
            <Slider label="¿Cómo sentís la calidad de tu descanso?" value={form.calidadSueno} onChange={v => set({ calidadSueno: v })} min={1} max={10} leftLabel="Me despierto agotado/a" rightLabel="Reparador y excelente" />
            <Slider label="Nivel de estrés o exigencia en tu día a día" value={form.nivelEstres} onChange={v => set({ nivelEstres: v })} min={1} max={10} leftLabel="Muy relajado" rightLabel="Estrés muy alto" />
            <Slider label="Vasos o botellas de agua que tomás al día" value={form.vasosAgua} onChange={v => set({ vasosAgua: v })} min={1} max={15} leftLabel="1 vaso" rightLabel="15 vasos o más" />
          </div>
        </Card>

        <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Continuar a Desayuno y Merienda" />
      </div>
    </motion.div>
  );
}
