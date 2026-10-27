// Web Audio API ambient soundscape generator
// Completely self-contained, lightweight, zero external asset dependencies

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private currentScene: number = 1;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private chimeTimer: ReturnType<typeof setInterval> | null = null;
  private isInitialized: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.ambientGain = this.ctx.createGain();
      
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.ambientGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      
      this.ambientGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean): boolean {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0.35, this.ctx.currentTime, 0.5);
        if (!this.isInitialized) {
          this.startSceneAmbience(this.currentScene);
          this.isInitialized = true;
        }
      }
    } else {
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      }
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setScene(sceneId: number) {
    this.currentScene = sceneId;
    if (!this.isMuted && this.ctx) {
      this.startSceneAmbience(sceneId);
    }
  }

  private stopCurrentAmbience() {
    if (this.chimeTimer) {
      clearInterval(this.chimeTimer);
      this.chimeTimer = null;
    }
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeOscillators = [];
  }

  private startSceneAmbience(sceneId: number) {
    if (!this.ctx || !this.ambientGain) return;
    this.stopCurrentAmbience();

    const t = this.ctx.currentTime;

    let chordFreqs = [73.42, 110.0, 174.61, 261.63]; // D minor default

    if (sceneId === 2) {
      chordFreqs = [98.0, 146.83, 246.94, 392.0]; // G major
    } else if (sceneId === 3) {
      chordFreqs = [110.0, 164.81, 261.63, 329.63]; // A minor
    } else if (sceneId === 5) {
      chordFreqs = [87.31, 130.81, 220.0, 329.63]; // F major7
    } else if (sceneId === 6) {
      chordFreqs = [65.41, 98.0, 164.81, 246.94]; // C major
    }

    chordFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(idx === 0 ? 180 : 380 + idx * 80, t);

      const targetGain = idx === 0 ? 0.22 : 0.08 / idx;
      oscGain.gain.setValueAtTime(0, t);
      oscGain.gain.setTargetAtTime(targetGain, t, 1.5);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.ambientGain);

      osc.start(t);
      this.activeOscillators.push(osc);
    });

    const chimeScale = sceneId === 2 
      ? [392.0, 440.0, 493.88, 587.33, 659.25, 783.99]
      : [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

    this.chimeTimer = setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      const randomNote = chimeScale[Math.floor(Math.random() * chimeScale.length)];
      this.playDelicateChime(randomNote, 0.04);
    }, 4500);
  }

  public playDelicateChime(freq = 880, gainVol = 0.08) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(gainVol, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 2.3);
  }

  public playStarTap() {
    this.playDelicateChime(1046.5, 0.12);
    setTimeout(() => this.playDelicateChime(1318.5, 0.09), 120);
    setTimeout(() => this.playDelicateChime(1567.98, 0.08), 240);
  }

  public playParchmentOpen() {
    this.playDelicateChime(659.25, 0.07);
    setTimeout(() => this.playDelicateChime(880.0, 0.06), 140);
  }

  public playPathFollow() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playDelicateChime(n, 0.08), idx * 100);
    });
  }

  public fadeOutEnding(durationSec = 6) {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    this.masterGain.gain.setTargetAtTime(0, t, durationSec / 3);
  }
}

export const soundEngine = new SoundscapeEngine();
