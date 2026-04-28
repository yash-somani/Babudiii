import { useState, useEffect, useRef, useCallback } from 'react';
import { breathingSteps, groundingSteps } from '../data';

const PHASES = ['inhale', 'hold', 'exhale'];
const TOTAL_CYCLE = Object.values(breathingSteps).reduce((s, p) => s + p.duration, 0);

export default function BreathingGuide() {
  const [mode, setMode] = useState(null); // 'breathing' | 'grounding' | null
  const [phase, setPhase] = useState(0); // 0=inhale, 1=hold, 2=exhale
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [groundingStep, setGroundingStep] = useState(0);
  const intervalRef = useRef(null);

  const startBreathing = useCallback(() => {
    setMode('breathing');
    setPhase(0);
    setCountdown(breathingSteps.inhale.duration);
    setIsRunning(true);
  }, []);

  const stopBreathing = useCallback(() => {
    setIsRunning(false);
    setMode(null);
    setPhase(0);
    setCountdown(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!isRunning || mode !== 'breathing') return;

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Move to next phase
          setPhase((p) => {
            const next = (p + 1) % 3;
            const nextKey = PHASES[next];
            setCountdown(breathingSteps[nextKey].duration);
            return next;
          });
          return 0; // will be overwritten by setCountdown above
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  const currentPhase = PHASES[phase];
  const currentStep = breathingSteps[currentPhase];

  // Grounding mode
  const startGrounding = () => {
    setMode('grounding');
    setGroundingStep(0);
  };

  const nextGroundingStep = () => {
    if (groundingStep < groundingSteps.length - 1) {
      setGroundingStep((s) => s + 1);
    } else {
      setMode(null);
      setGroundingStep(0);
    }
  };

  return (
    <section className="section" id="calm-corner">
      <div className="section-header">
        <h2>A quiet moment</h2>
        <p>When everything feels like too much, try one of these.</p>
      </div>

      {!mode && (
        <div className="calm-choices">
          <button className="calm-choice-btn" onClick={startBreathing}>
            <span className="calm-choice-icon">🌬️</span>
            <span className="calm-choice-label">Breathing exercise</span>
            <span className="calm-choice-desc">A gentle 4-4-4 breathing guide</span>
          </button>
          <button className="calm-choice-btn" onClick={startGrounding}>
            <span className="calm-choice-icon">🌿</span>
            <span className="calm-choice-label">Grounding reset</span>
            <span className="calm-choice-desc">A 1-minute 5-4-3-2-1 grounding exercise</span>
          </button>
        </div>
      )}

      {/* Breathing mode */}
      {mode === 'breathing' && (
        <div className="breathing-container">
          <div className={`breathing-circle breathing-circle--${currentPhase}`}>
            <div className="breathing-inner">
              <span className="breathing-label">{currentStep.label}</span>
              <span className="breathing-count">{countdown}</span>
            </div>
          </div>
          <button className="calm-stop-btn" onClick={stopBreathing}>
            I'm okay now
          </button>
        </div>
      )}

      {/* Grounding mode */}
      {mode === 'grounding' && (
        <div className="grounding-container" key={groundingStep}>
          <div className="grounding-step-number">
            {groundingSteps.length - groundingStep} of {groundingSteps.length}
          </div>
          <p className="grounding-instruction">
            {groundingSteps[groundingStep]}
          </p>
          <button className="calm-next-btn" onClick={nextGroundingStep}>
            {groundingStep < groundingSteps.length - 1 ? 'Next step →' : 'Done ✓'}
          </button>
        </div>
      )}
    </section>
  );
}
