import { useState, useEffect } from 'react';

const KEY = 'nutri_german_v4';

const init = {
  paso: 0,
  nombreCompleto: '',
  fechaNacimiento: '',
  ocupacion: '',
  horarioTrabajo: '',
  convivencia: [],
  objetivo: '',
  objetivoTexto: '',
  intentosPrevios: '',
  motivacion: '',
  alergias: '',
  patologias: '',
  medicacion: '',
  suplementacion: '',
  actividadFisicaDetalle: '',
  nivelEsfuerzo: 5,
  horasSueno: 7,
  calidadSueno: 6,
  nivelEstres: 4,
  vasosAgua: 6,
  chipsDesayuno: [],
  desayunoTexto: '',
  chipsMerienda: [],
  meriendaTexto: '',
  chipsAlmuerzo: [],
  almuerzoCenaTexto: '',
  chipsPicoteo: [],
  ansiedadMoments: [],
  nivelCocina: '',
  relacionComida: 4,
  comidaEmocional: '',
  top5Alimentos: [],
};

export function useStore() {
  const [form, setFormState] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY);
      return saved ? { ...init, ...JSON.parse(saved) } : init;
    } catch { return init; }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(form));
  }, [form]);

  const set = (updates) => setFormState(p => ({ ...p, ...updates }));

  const toggle = (field, value) =>
    setFormState(p => ({
      ...p,
      [field]: (p[field] || []).includes(value)
        ? (p[field] || []).filter(v => v !== value)
        : [...(p[field] || []), value],
    }));

  const reset = () => { localStorage.removeItem(KEY); setFormState(init); };

  return { form, set, toggle, reset };
}
