import { useEffect, useRef } from 'react';
import type { AmbientSound } from '../types';
import { AmbientAudioEngine } from '../lib/ambientAudio';

/** Plays cabin hum when activeSound is 'cabin'. */
export function useAmbientSound(activeSound: AmbientSound) {
  const engineRef = useRef<AmbientAudioEngine | null>(null);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new AmbientAudioEngine();
    }
    const engine = engineRef.current;

    if (activeSound !== 'cabin') {
      void engine.stop();
      return;
    }

    void engine.play();

    return () => {
      void engine.stop();
    };
  }, [activeSound]);

  useEffect(() => {
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);
}
