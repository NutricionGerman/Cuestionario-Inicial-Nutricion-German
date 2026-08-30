import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, SectionHeader, Card, NavButtons } from '../components/UI';

const CONVIVENCIA = ['Solo/a', 'En pareja', 'Con hijos', 'Con amigos / companeros', 'Con padres / familia'];
const HORARIOS    = ['Oficina (9-18h)', 'Mañana', 'Tarde', 'Noche', 'Rotativo', 'Home office', 'Flexible'];

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function BirthdaySelector({ value, onChange }) {
  let diaIni = '';
  let mesIni = '';
  let anioIni = '';

  if (value) {
    const partes = value.split(' ');
    if (partes[0] && !isNaN(partes[0])) diaIni = partes[0];
    const foundMes = MESES.find(m => value.toLowerCase().includes(m.toLowerCase()));
    if (foundMes) mesIni = foundMes;
    const anioMatch = value.match(/\b(19\d\d|20\d\d)\b/);
    if (anioMatch) anioIni = anioMatch[1];
  }

  const [dia, setDia] = useState(diaIni);
  const [mes, setMes] = useState(mesIni);
  const [anio, setAnio] = useState(anioIni);

  const actualizar = (nuevoDia, nuevoMes, nuevoAnio) => {
    setDia(nuevoDia);
    setMes(nuevoMes);
    setAnio(nuevoAnio);
    if (!nuevoDia && !nuevoMes) {
      onChange('');
      return;
    }
    const texto = `${nuevoDia || ''} ${nuevoMes ? 'de ' + nuevoMes : ''} ${nuevoAnio ? 'de ' + nuevoAnio : ''}`.trim();
    onChange(texto);
  };

  const anioActual = new Date().getFullYear();
  const anios = Array.from({ length: 75 }, (_, i) => anioActual - 10 - i);

  return (
    <div>
      <label className="block text-sm font-semibold text-stone-700 mb-1">
        Fecha de cumpleaños
      </label>
      <p className="text-xs text-stone-400 mb-2">
        Elegí día, mes y año fácilmente con las listas desplegables:
      </p>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Día</label>
          <select
            value={dia}
            onChange={e => actualizar(e.target.value, mes, anio)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm font-semibold text-stone-700 focus:outline-none focus:border-green-600 shadow-sm"
          >
            <option value="">Día</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Mes</label>
          <select
            value={mes}
            onChange={e => actualizar(dia, e.target.value, anio)}
            className="w-full bg-white border border-stone-200 rounded-xl px-2 py-2 text-sm font-semibold text-stone-700 focus:outline-none focus:border-green-600 shadow-sm"
          >
            <option value="">Mes</option>
            {MESES.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Año</label>
          <select
            value={anio}
            onChange={e => actualizar(dia, mes, e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-2 py-2 text-sm font-semibold text-stone-700 focus:outline-none focus:border-green-600 shadow-sm"
          >
            <option value="">Año</option>
            {anios.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      {value && (
        <div className="mt-2 text-xs text-green-800 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 flex items-center gap-1.5 font-medium">
          <span>🎂 Cumpleaños:</span>
          <span className="font-bold">{value}</span>
        </div>
      )}
    </div>
  );
}

export default function DatosPersonales({ form, set, toggle, onNext }) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="min-h-screen bg-stone-50 pt-14 pb-10 px-4">
      <div className="max-w-lg mx-auto space-y-4">
        <SectionHeader title="Tus Datos Básicos" subtitle="Quiero conocerte un poco antes de que tengamos nuestra consulta" />

        <Card>
          <div className="space-y-3.5">
            <Input
              label="Nombre y Apellido"
              placeholder="¿Cómo te llamás?"
              value={form.nombreCompleto}
              onChange={v => set({ nombreCompleto: v })}
            />
            <BirthdaySelector
              value={form.fechaNacimiento}
              onChange={v => set({ fechaNacimiento: v })}
            />
            <Input
              label="Ocupación o profesión"
              placeholder="¿A qué te dedicás en tu día a día?"
              value={form.ocupacion}
              onChange={v => set({ ocupacion: v })}
            />
          </div>
        </Card>

        {/* Horario en pastillas compactas */}
        <Card>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Horario de trabajo habitual</label>
          <div className="flex flex-wrap gap-1.5">
            {HORARIOS.map(op => {
              const sel = form.horarioTrabajo === op;
              return (
                <button
                  key={op}
                  type="button"
                  onClick={() => set({ horarioTrabajo: op })}
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

        {/* Convivencia en pastillas compactas */}
        <Card>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">¿Con quién convivís?</label>
          <div className="flex flex-wrap gap-1.5">
            {CONVIVENCIA.map(op => {
              const sel = (form.convivencia || []).includes(op);
              return (
                <button
                  key={op}
                  type="button"
                  onClick={() => toggle('convivencia', op)}
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

        <NavButtons onNext={onNext} hidePrev />
      </div>
    </motion.div>
  );
}
