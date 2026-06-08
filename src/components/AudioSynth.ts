/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioSynth {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser security rules
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        console.warn("Web Audio API not supported", e);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  // A quick high-pitched click/beep for progress loaders
  public playClick() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Retro sci-fi sweep for scanning
  public playScan() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Red alert siren block for dangerous button / excess madness
  public playAlert() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(440, this.ctx.currentTime + 0.4);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(225, this.ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(445, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.4);
    osc2.stop(this.ctx.currentTime + 0.4);
  }

  // Funny heavy spring/boing sound for danger warning screen shake
  public playBoing() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.45);
  }

  // Dramatic suspense chord
  public playSuspense() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const oscs = [180, 220, 270, 330].map(freq => {
      const osc = this.ctx!.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * 1.05, t + 1.2);
      return osc;
    });

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    oscs.forEach(osc => {
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 1.2);
    });

    gain.connect(this.ctx.destination);
  }

  // Sparkly opening chime for the giftbox/presents
  public playChime() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    const t = this.ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const scaleOsc = this.ctx!.createOscillator();
      const scaleGain = this.ctx!.createGain();

      scaleOsc.type = "sine";
      scaleOsc.frequency.setValueAtTime(freq, t + idx * 0.1);

      scaleGain.gain.setValueAtTime(0.1, t + idx * 0.1);
      scaleGain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.1 + 0.4);

      scaleOsc.connect(scaleGain);
      scaleGain.connect(this.ctx!.destination);

      scaleOsc.start(t + idx * 0.1);
      scaleOsc.stop(t + idx * 0.1 + 0.4);
    });
  }

  // Explosive synth blast for countdown final reward
  public playExplosion() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Low frequency blast
    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.8);

    // High celebratory beep
    const chime = this.ctx.createOscillator();
    chime.type = "triangle";
    chime.frequency.setValueAtTime(600, t);
    chime.frequency.exponentialRampToValueAtTime(1200, t + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.85);

    osc.connect(gain);
    chime.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    chime.start(t);
    osc.stop(t + 0.85);
    chime.stop(t + 0.85);
  }

  // Joyful full chord for success/birthday final reveals
  public playTada() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // C Major Triad: C4 (261.63), E4 (329.63), G4 (392.00), C5 (523.25)
    const freqs = [261.63, 329.63, 392.00, 523.25];
    const oscities: OscillatorNode[] = [];

    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0.18, t);
    chordGain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

    freqs.forEach(f => {
      const o = this.ctx!.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(f, t);
      // add dynamic vibrato
      o.frequency.linearRampToValueAtTime(f * 1.01, t + 0.5);
      o.frequency.linearRampToValueAtTime(f * 0.99, t + 1.0);
      o.frequency.linearRampToValueAtTime(f, t + 1.5);

      o.connect(chordGain);
      o.start(t);
      o.stop(t + 1.5);
      oscities.push(o);
    });

    chordGain.connect(this.ctx.destination);
  }
}

export const synth = new AudioSynth();
