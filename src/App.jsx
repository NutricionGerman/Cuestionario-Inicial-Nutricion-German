import { AnimatePresence } from 'framer-motion';
import { useStore } from './hooks/useStore';
import { ProgressBar } from './components/UI';
import Welcome          from './pages/Welcome';
import DatosPersonales  from './pages/DatosPersonales';
import Objetivos        from './pages/Objetivos';
import Salud            from './pages/Salud';
import EstiloVida        from './pages/EstiloVida';
import DesayunoMerienda from './pages/DesayunoMerienda';
import AlmuerzoCena      from './pages/AlmuerzoCena';
import HabitosEmociones from './pages/HabitosEmociones';
import Duelo            from './pages/Duelo';
import Resumen          from './pages/Resumen';

const TOTAL = 9;

export default function App() {
  const { form, set, toggle, reset } = useStore();
  const next = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    set({ paso: Math.min(form.paso + 1, TOTAL) });
  };
  const prev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    set({ paso: Math.max(form.paso - 1, 0) });
  };
  const props = { form, set, toggle, onNext: next, onPrev: prev };

  return (
    <div className="font-sans antialiased text-stone-800">
      {form.paso > 0 && form.paso < TOTAL && <ProgressBar paso={form.paso} total={TOTAL} />}
      <AnimatePresence mode="wait">
        {form.paso === 0 && <Welcome          key="w" onNext={next} />}
        {form.paso === 1 && <DatosPersonales  key="d" {...props} />}
        {form.paso === 2 && <Objetivos        key="o" {...props} />}
        {form.paso === 3 && <Salud            key="s" {...props} />}
        {form.paso === 4 && <EstiloVida       key="v" {...props} />}
        {form.paso === 5 && <DesayunoMerienda key="dm" {...props} />}
        {form.paso === 6 && <AlmuerzoCena     key="ac" {...props} />}
        {form.paso === 7 && <HabitosEmociones key="he" {...props} />}
        {form.paso === 8 && <Duelo            key="j"  {...props} />}
        {form.paso === 9 && <Resumen          key="r"  form={form} reset={reset} />}
      </AnimatePresence>
    </div>
  );
}
