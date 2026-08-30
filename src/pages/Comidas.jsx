import { motion } from 'framer-motion';
import { SectionHeader, Card, ChipGrid, Textarea, Slider, ListOption, NavButtons } from '../components/UI';
import { CHIPS_DESAYUNO, CHIPS_ALMUERZO_CENA, CHIPS_PICOTEO, NIVEL_COCINA } from '../data/data';

const ANSIEDAD = ['A media manana', 'A la tarde', 'Antes de dormir', 'Viendo TV / pantallas', 'Cuando estoy estresado/a', 'Cuando estoy aburrido/a', 'No siento ansiedad'];

export default function Comidas({ form, set, toggle, onNext, onPrev }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-5">
        <SectionHeader title="Tus Habitos Alimentarios" subtitle="Quiero saber como es un dia normal en tu alimentacion" />

        {/* Desayuno */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-1">Desayuno</h3>
          <p className="text-xs text-stone-400 mb-3">¿Que soles incluir habitualmente? (marca las opciones que apliquen)</p>
          <ChipGrid opciones={CHIPS_DESAYUNO} seleccionados={form.chipsDesayuno} onToggle={v => toggle('chipsDesayuno', v)} />
          <div className="mt-4">
            <Textarea hint="Describime un desayuno tipico para vos (cantidades aproximadas, que tomas, marcas o preparaciones)" value={form.desayunoTexto} onChange={v => set({ desayunoTexto: v })} rows={2} />
          </div>
        </Card>

        {/* Merienda */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-1">Merienda</h3>
          <p className="text-xs text-stone-400 mb-3">¿Que soles tomar o comer a la tarde?</p>
          <ChipGrid opciones={CHIPS_DESAYUNO} seleccionados={form.chipsMerienda} onToggle={v => toggle('chipsMerienda', v)} />
          <div className="mt-4">
            <Textarea hint="Describime una merienda habitual tuya" value={form.meriendaTexto} onChange={v => set({ meriendaTexto: v })} rows={2} />
          </div>
        </Card>

        {/* Almuerzo y Cena */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-1">Almuerzo y Cena</h3>
          <p className="text-xs text-stone-400 mb-3">¿Que preparaciones son mas frecuentes?</p>
          <ChipGrid opciones={CHIPS_ALMUERZO_CENA} seleccionados={form.chipsAlmuerzo} onToggle={v => toggle('chipsAlmuerzo', v)} />
          <div className="mt-4">
            <Textarea hint="Contame que preparaciones son las mas frecuentes para vos en el almuerzo y la cena. ¿Cocinas vos o alguien mas? ¿Repetis platos de un dia para el otro?" value={form.almuerzoCenaTexto} onChange={v => set({ almuerzoCenaTexto: v })} rows={4} />
          </div>
        </Card>

        {/* Picoteos */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-1">Picoteos entre comidas</h3>
          <p className="text-xs text-stone-400 mb-3">¿Que soles comer fuera de tus comidas principales?</p>
          <ChipGrid opciones={CHIPS_PICOTEO} seleccionados={form.chipsPicoteo} onToggle={v => toggle('chipsPicoteo', v)} />

          <div className="mt-4 border-t border-stone-100 pt-4">
            <label className="block text-sm font-semibold text-stone-700 mb-2">¿En que momentos sentis mayor apetito o ganas de picotear?</label>
            <div className="flex flex-wrap gap-2">
              {ANSIEDAD.map(op => (
                <motion.button key={op} type="button" whileTap={{ scale: 0.93 }}
                  onClick={() => toggle('ansiedadMoments', op)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    (form.ansiedadMoments || []).includes(op)
                      ? 'bg-amber-600 border-amber-600 text-white'
                      : 'bg-white border-stone-200 text-stone-600'
                  }`}
                >
                  {op}
                </motion.button>
              ))}
            </div>
          </div>
        </Card>

        {/* Cocina */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-3">Tu relacion con la cocina</h3>
          <div className="space-y-2">
            {NIVEL_COCINA.map(op => (
              <ListOption key={op.id} label={op.label} desc={op.desc} selected={form.nivelCocina === op.id} onSelect={() => set({ nivelCocina: op.id })} />
            ))}
          </div>
        </Card>

        {/* Relacion emocional */}
        <Card>
          <h3 className="text-sm font-bold text-stone-700 mb-4">Tu relacion con la comida</h3>
          <div className="space-y-4">
            <Slider label="¿Sentis culpa despues de comer algo fuera de lo planeado?" value={form.relacionComida} onChange={v => set({ relacionComida: v })} min={1} max={10} leftLabel="Nunca" rightLabel="Siempre" />
            <Textarea hint="Contame si sentis que comes por hambre real o mas bien por ansiedad, aburrimiento o emociones..." value={form.comidaEmocional} onChange={v => set({ comidaEmocional: v })} rows={3} />
          </div>
        </Card>

        <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Ir a la Batalla de Alimentos" />
      </div>
    </motion.div>
  );
}
