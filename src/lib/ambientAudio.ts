const CABIN_AUDIO_FILE = '/audio/cabin.mp3';

interface ActiveNodes {
  sources: AudioNode[];
  gain: GainNode;
  htmlAudio?: HTMLAudioElement;
}

/**
 * Plays looping cabin hum via Web Audio (built-in) or optional MP3 in public/audio/cabin.mp3.
 */
export class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private active: ActiveNodes | null = null;
  private playing = false;

  private async getContext(): Promise<AudioContext> {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    return this.ctx;
  }

  async play(): Promise<void> {
    if (this.playing && this.active) return;

    await this.fadeOut(0.25);
    this.disconnectActive();

    const usedFile = await this.tryPlayFile();
    if (!usedFile) {
      await this.playProcedural();
    }

    this.playing = true;
    await this.fadeIn(0.6);
  }

  async stop(): Promise<void> {
    await this.fadeOut(0.3);
    this.disconnectActive();
    this.playing = false;
  }

  dispose(): void {
    void this.stop();
    void this.ctx?.close();
    this.ctx = null;
    this.masterGain = null;
  }

  private async tryPlayFile(): Promise<boolean> {
    const audio = new Audio(CABIN_AUDIO_FILE);
    audio.loop = true;
    audio.volume = 0;

    try {
      await audio.play();
    } catch {
      return false;
    }

    const ctx = await this.getContext();
    const track = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    gain.gain.value = 0.35;
    track.connect(gain);
    gain.connect(this.masterGain!);

    this.active = { sources: [track], gain, htmlAudio: audio };
    return true;
  }

  private async playProcedural(): Promise<void> {
    const ctx = await this.getContext();
    const gain = ctx.createGain();
    gain.gain.value = 0.35;
    gain.connect(this.masterGain!);

    const sources: AudioNode[] = [
      this.loopBrownNoise(ctx, gain),
      this.tone(ctx, 72, 0.04, gain),
      this.tone(ctx, 108, 0.02, gain),
    ];

    this.active = { sources, gain };
  }

  private loopBrownNoise(ctx: AudioContext, dest: AudioNode): AudioBufferSourceNode {
    const length = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    source.connect(filter);
    filter.connect(dest);
    source.start();
    return source;
  }

  private tone(ctx: AudioContext, freq: number, vol: number, dest: AudioNode): OscillatorNode {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = vol;
    osc.connect(g);
    g.connect(dest);
    osc.start();
    return osc;
  }

  private async fadeIn(duration: number): Promise<void> {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
    this.masterGain.gain.linearRampToValueAtTime(1, t + duration);
    if (this.active?.htmlAudio) {
      this.active.htmlAudio.volume = 0.35;
    }
  }

  private async fadeOut(duration: number): Promise<void> {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, t);
    this.masterGain.gain.linearRampToValueAtTime(0, t + duration);
    await new Promise((r) => setTimeout(r, duration * 1000 + 50));
  }

  private disconnectActive(): void {
    if (!this.active) return;
    const { sources, htmlAudio } = this.active;
    sources.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          (node as AudioBufferSourceNode).stop();
        }
        if ('disconnect' in node) node.disconnect();
      } catch {
        /* already stopped */
      }
    });
    htmlAudio?.pause();
    if (htmlAudio) htmlAudio.src = '';
    this.active = null;
  }
}
