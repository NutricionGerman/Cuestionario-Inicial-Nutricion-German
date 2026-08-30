import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Chip({ label, selected, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={() => onToggle(label)}
      whileTap={{ scale: 0.93 }}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
        selected
          ? 'bg-green-800 border-green-800 text-amber-100'
          : 'bg-white border-stone-200 text-stone-600 hover:border-green-700'
      }`}
    >
      {selected ? '+ ' : ''}{label}
    </motion.button>
  );
}

export function ChipGrid({ opciones, seleccionados, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opciones.map(op => (
        <Chip key={op} label={op} selected={seleccionados.includes(op)} onToggle={onToggle} />
      ))}
    </div>
  );
}

export function Textarea({ label, hint, value, onChange, rows = 3 }) {
  const [isListening, setIsListening] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info'); // 'info' | 'error' | 'success'
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const baseValueRef = useRef(value || '');

  const detenerDictado = () => {
    isListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    setMensajeEstado('');
  };

  const toggleDictado = () => {
    if (isListening) {
      detenerDictado();
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRec) {
      setTipoMensaje('error');
      setMensajeEstado('Este navegador no soporta dictado directo. Podés usar el micrófono de tu teclado para hablar.');
      return;
    }

    // Verificar contexto seguro (HTTPS o localhost)
    const esSeguro = window.isSecureContext || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!esSeguro) {
      setTipoMensaje('error');
      setMensajeEstado('Para usar el micrófono el navegador exige conexión HTTPS. Mientras tanto podés usar el micrófono que viene en tu teclado.');
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = navigator.language && navigator.language.startsWith('es') ? navigator.language : 'es-ES';
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      baseValueRef.current = value ? value.trim() + ' ' : '';
      let confirmedText = '';

      rec.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
        setTipoMensaje('success');
        setMensajeEstado('Escuchando... Podés hablar normalmente.');
      };

      rec.onresult = (event) => {
        let interim = '';
        let newFinal = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            newFinal += item[0].transcript + ' ';
          } else {
            interim += item[0].transcript;
          }
        }
        if (newFinal) {
          confirmedText += newFinal;
        }
        const textoTotal = (baseValueRef.current + confirmedText + interim).trimStart();
        onChange(textoTotal);
      };

      rec.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setTipoMensaje('error');
          setMensajeEstado('Permiso de micrófono denegado. Habilitalo en los permisos del navegador.');
        } else if (event.error === 'no-speech') {
          setTipoMensaje('info');
          setMensajeEstado('No se detectó sonido. Tocá Dictar nuevamente para continuar.');
        } else if (event.error === 'network') {
          setTipoMensaje('error');
          setMensajeEstado('Se necesita conexión a internet para transcribir la voz.');
        } else {
          setTipoMensaje('info');
          setMensajeEstado(`Aviso (${event.error}). Podés usar también el micrófono de tu teclado.`);
        }
        isListeningRef.current = false;
        setIsListening(false);
      };

      rec.onend = () => {
        // En algunos móviles el reconocimiento finaliza al pausar la voz; si el usuario no tocó detener, intentamos reconectar
        if (isListeningRef.current) {
          try {
            rec.start();
          } catch (e) {
            isListeningRef.current = false;
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.error('Error al iniciar micrófono:', err);
      setTipoMensaje('error');
      setMensajeEstado('No se pudo acceder al micrófono. Podés dictar usando el micrófono de tu teclado.');
      isListeningRef.current = false;
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-stone-850 leading-snug">{label}</label>}
      {hint && <p className="text-xs text-stone-400 leading-relaxed">{hint}</p>}

      <div className="relative">
        <textarea
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={isListening ? "Escuchando... hablá con naturalidad, se transcribe solo..." : "Escribí acá o tocá 'Dictar' para hablar..."}
          className={`w-full px-3.5 pt-2.5 pb-9 border rounded-xl text-sm text-stone-700 focus:outline-none resize-none bg-white placeholder:text-stone-300 transition-all ${
            isListening
              ? 'border-red-400 ring-2 ring-red-100 bg-red-50/10'
              : 'border-stone-200 focus:border-green-600'
          }`}
        />

        {/* Botón de dictado compacto en la esquina inferior */}
        <div className="absolute right-2 bottom-2 z-10">
          <button
            type="button"
            onClick={toggleDictado}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all select-none shadow-sm ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-stone-50 hover:bg-green-50 text-stone-600 hover:text-green-800 border border-stone-200'
            }`}
            title={isListening ? "Toca para detener la grabación" : "Hablá y dictá tu respuesta"}
          >
            {isListening ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Detener</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 02-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span>Dictar</span>
              </>
            )}
          </button>
        </div>

        {mensajeEstado && (
          <div className={`flex items-center gap-1.5 mt-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border ${
            tipoMensaje === 'error'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : tipoMensaje === 'success'
              ? 'bg-green-50 text-green-800 border-green-200'
              : 'bg-stone-50 text-stone-600 border-stone-200'
          }`}>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {tipoMensaje === 'error' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            <span>{mensajeEstado}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function Input({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-semibold text-stone-700">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-700 focus:outline-none focus:border-green-600 bg-white placeholder:text-stone-300 transition-colors"
      />
    </div>
  );
}

export function Slider({ label, value, onChange, min = 1, max = 10, leftLabel, rightLabel }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-stone-700">{label}</label>
        <span className="text-base font-bold text-green-800 min-w-8 text-right">{value}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full accent-green-700 cursor-pointer"
      />
      <div className="flex justify-between text-xs text-stone-400">
        <span>{leftLabel}</span><span>{rightLabel}</span>
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-stone-800">{title}</h2>
      {subtitle && <p className="text-sm text-stone-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-100 shadow-sm p-5 ${className}`}>
      {children}
    </div>
  );
}

export function NavButtons({ onPrev, onNext, nextLabel = 'Continuar', hidePrev = false }) {
  return (
    <div className={`flex gap-3 pt-6 ${hidePrev ? 'justify-center' : ''}`}>
      {!hidePrev && (
        <button
          type="button" onClick={onPrev}
          className="px-5 py-3 rounded-xl border border-stone-200 text-stone-500 font-medium text-sm hover:bg-stone-50 transition-colors"
        >
          Atras
        </button>
      )}
      <motion.button
        type="button" onClick={onNext} whileTap={{ scale: 0.97 }}
        className="flex-1 bg-green-800 hover:bg-green-700 text-amber-50 font-bold py-3 rounded-xl text-sm transition-colors shadow-md"
      >
        {nextLabel}
      </motion.button>
    </div>
  );
}

export function ProgressBar({ paso, total }) {
  const pct = Math.round((paso / total) * 100);
  const labels = ['Inicio', 'Datos', 'Objetivo', 'Salud', 'Estilo de vida', 'Desayuno/Merienda', 'Almuerzos/Cenas', 'Hábitos y emociones', 'Batalla', 'Listo'];
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-lg mx-auto px-4 py-2">
        <div className="flex justify-between text-xs text-stone-500 mb-1.5">
          <span className="font-semibold text-green-800">{labels[Math.min(paso, labels.length - 1)]}</span>
          <span>{pct}% completado</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-700 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}

export function ListOption({ label, desc, selected, onSelect }) {
  return (
    <motion.button
      type="button" onClick={onSelect} whileTap={{ scale: 0.98 }}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
        selected
          ? 'border-green-700 bg-green-50'
          : 'border-stone-100 bg-white hover:border-stone-200'
      }`}
    >
      <div className={`text-sm font-semibold ${selected ? 'text-green-800' : 'text-stone-700'}`}>{label}</div>
      {desc && <div className="text-xs text-stone-400 mt-0.5">{desc}</div>}
    </motion.button>
  );
}
