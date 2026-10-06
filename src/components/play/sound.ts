/**
 * Tiny 8-bit sound engine on the Web Audio API.
 * Every sound is synthesised on the fly: no audio files to download.
 * The AudioContext is created lazily on the first user gesture, as browsers require.
 */
export class Chiptune {
  private ctx: AudioContext | null = null;
  muted = false;

  private audio(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!this.ctx) {
      try {
        this.ctx = new AC();
      } catch {
        return null;
      }
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  tone(freq: number, dur: number, vol = 0.04, type: OscillatorType = 'square', at = 0) {
    const ac = this.audio();
    if (!ac) return;
    const t = ac.currentTime + at;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ac.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  sweep(from: number, to: number, dur: number, vol = 0.03) {
    const ac = this.audio();
    if (!ac) return;
    const t = ac.currentTime;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ac.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  hiss(dur: number, vol = 0.05) {
    const ac = this.audio();
    if (!ac) return;
    const n = Math.floor(ac.sampleRate * dur);
    const buf = ac.createBuffer(1, n, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = ac.createBufferSource();
    const hp = ac.createBiquadFilter();
    const g = ac.createGain();
    src.buffer = buf;
    hp.type = 'highpass';
    hp.frequency.value = 1400;
    g.gain.value = vol;
    src.connect(hp).connect(g).connect(ac.destination);
    src.start();
  }

  melody(notes: number[], step: number, type: OscillatorType = 'square', vol = 0.035) {
    notes.forEach((f, i) => this.tone(f, step * 1.6, vol, type, i * step));
  }

  click() {
    this.tone(2200, 0.018, 0.04);
  }

  dispose() {
    void this.ctx?.close();
    this.ctx = null;
  }
}
