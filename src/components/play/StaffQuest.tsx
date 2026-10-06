import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { stages, totalItems, person, type Theme } from '../../data/profile';
import { Chiptune } from './sound';

type Screen = 'title' | 'intro' | 'play' | 'end';
interface Found { stage: number; index: number }
interface State {
  power: boolean;
  booting: boolean;
  shutdown: boolean;
  screen: Screen;
  stage: number; // 1-based
  idx: number; // -1 = at start, items.length = walked off right
  walking: boolean;
  jumping: boolean;
  bump: number;
  spark: boolean;
  busy: boolean;
  found: Record<string, true>;
  last: Found | null;
  muted: boolean;
}

const initial: State = {
  power: false, booting: false, shutdown: false, screen: 'title', stage: 1, idx: -1,
  walking: false, jumping: false, bump: -1, spark: false, busy: false, found: {}, last: null, muted: false,
};

const pad = (n: number) => String(n).padStart(2, '0');
const key = (stage: number, i: number) => `${stage}-${i}`;
// Next block after `from` that hasn't been opened yet, or -1 if the rest of the stage is done.
const nextUnfound = (found: Record<string, true>, stage: number, from: number) => {
  const n = stages[stage - 1].items.length;
  for (let i = from + 1; i < n; i++) if (!found[key(stage, i)]) return i;
  return -1;
};

export default function StaffQuest() {
  const [s, setS] = useState<State>(initial);
  const ref = useRef<State>(initial);
  const timers = useRef<number[]>([]);
  const sound = useRef<Chiptune>(new Chiptune());

  // Keep a synchronous copy of state so timers and handlers never read a stale value.
  const set = useCallback((patch: Partial<State>) => {
    ref.current = { ...ref.current, ...patch };
    setS(ref.current);
  }, []);
  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  const clearLater = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => {
    const sfx = sound.current;
    return () => {
      clearLater();
      sfx.dispose();
    };
  }, [clearLater]);

  const sfx = sound.current;

  const startStage = (n: number) => {
    clearLater();
    set({ stage: n, screen: 'intro', idx: -1, walking: false, jumping: false, bump: -1, spark: false, busy: false });
    sfx.hiss(0.18, 0.04);
    sfx.melody([523, 659, 784, 1047], 0.08, 'square', 0.03);
    later(() => set({ screen: 'play' }), 1150);
  };

  const pressA = () => {
    const st = ref.current;
    if (!st.power || st.booting || st.shutdown) return sfx.click();
    if (st.screen === 'title') return startStage(1);
    if (st.screen === 'end') {
      set({ screen: 'title', stage: 1, idx: -1, found: {}, last: null });
      return sfx.melody([784, 659, 523], 0.07, 'square', 0.03);
    }
    if (st.screen !== 'play' || st.busy) return;

    const items = stages[st.stage - 1].items;
    // Opened blocks stay open: skip past them instead of bumping them again.
    const target = st.idx < items.length ? nextUnfound(st.found, st.stage, st.idx) : -1;
    if (target >= 0) {
      set({ idx: target, walking: true, busy: true, spark: false });
      later(() => {
        const cur = ref.current;
        set({
          walking: false, jumping: true, bump: target, spark: true,
          found: { ...cur.found, [key(cur.stage, target)]: true },
          last: { stage: cur.stage, index: target },
        });
        sfx.sweep(260, 640, 0.14, 0.03);
        sfx.melody([1047, 1319, 1568], 0.055, 'triangle', 0.06);
      }, 520);
      later(() => set({ jumping: false, bump: -1, busy: false }), 920);
    } else {
      set({ idx: items.length, walking: true, busy: true });
      sfx.tone(330, 0.08, 0.03);
      later(() => {
        if (ref.current.stage < stages.length) startStage(ref.current.stage + 1);
        else {
          set({ screen: 'end', walking: false, busy: false });
          sfx.melody([784, 988, 1175, 1568, 1175, 1568], 0.1, 'square', 0.035);
        }
      }, 620);
    }
  };

  const goStage = (n: number) => {
    sfx.click();
    const st = ref.current;
    if (!st.power || st.booting || st.shutdown) return;
    startStage(n);
  };
  const stageStep = (dir: 1 | -1) => goStage(((ref.current.stage - 1 + dir + stages.length) % stages.length) + 1);

  const togglePower = () => {
    const st = ref.current;
    if (st.shutdown || st.booting) return;
    clearLater();
    if (!st.power) {
      set({ power: true, booting: true, screen: 'title', stage: 1, idx: -1, busy: false, walking: false, jumping: false });
      sfx.click();
      sfx.sweep(90, 1600, 0.42, 0.03);
      sfx.hiss(0.5, 0.03);
      later(() => {
        set({ booting: false });
        sfx.melody([392, 523, 659, 784], 0.09, 'square', 0.03);
      }, 780);
    } else {
      set({ power: false, shutdown: true, busy: false });
      sfx.click();
      sfx.sweep(1500, 70, 0.34, 0.03);
      later(() => set({ shutdown: false }), 440);
    }
  };

  const toggleMute = () => {
    const m = !sfx.muted;
    if (m) sfx.click();
    sfx.muted = m;
    set({ muted: m });
    if (!m) sfx.click();
  };

  // Keyboard: Space powers on, then acts as A; ←/→ change stage; M mutes.
  const keysRef = useRef({ pressA, togglePower, stageStep, toggleMute });
  keysRef.current = { pressA, togglePower, stageStep, toggleMute };
  const aBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
      // Focused controls already handle their own keys; don't double-fire.
      if ((e.target as Element | null)?.closest?.('button, a, input, textarea, select, [contenteditable]')) return;
      const k = keysRef.current;
      if (e.code === 'Space') {
        e.preventDefault();
        if (!ref.current.power) return k.togglePower();
        aBtn.current?.classList.add('pressed');
        window.setTimeout(() => aBtn.current?.classList.remove('pressed'), 120);
        k.pressA();
      } else if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault();
        k.stageStep(e.code === 'ArrowLeft' ? -1 : 1);
      } else if (e.code === 'KeyM') {
        k.toggleMute();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ---------- derived view values ---------- */
  const stage = stages[s.stage - 1];
  const items = stage.items;
  const n = items.length;
  const leftOf = (i: number) => (n === 1 ? 50 : 22 + i * (58 / (n - 1)));
  const heroPct = s.idx < 0 ? 7 : s.idx >= n ? 110 : leftOf(s.idx);
  const onItem = s.idx >= 0 && s.idx < n;
  const onFoundBlock = onItem && !!s.found[key(s.stage, s.idx)];
  const bubblePct = onItem ? Math.min(74, Math.max(26, leftOf(s.idx))) : 50;
  const foundCount = Object.keys(s.found).length;
  const foundTxt = `${pad(foundCount)}/${totalItems}`;
  const screenState = s.shutdown ? 'shutdown' : !s.power ? 'off' : s.booting ? 'boot' : 'on';
  const allDone = s.idx < n && nextUnfound(s.found, s.stage, s.idx) < 0;
  const inLevel = s.screen === 'play' || s.screen === 'intro';
  const stageFound = (k: number) => stages[k].items.filter((_, i) => s.found[key(k + 1, i)]).length;

  let guide: { kicker: string; title: string; body: string };
  if (!s.power) {
    guide = {
      kicker: 'Before you play',
      title: 'Five stages, one engineer',
      body: 'Press Space (or POWER) to switch on, then Space or A to start. A walks to the next code block and bumps it; each one drops a piece of the résumé, and the full story lands here.',
    };
  } else if (s.last) {
    const item = stages[s.last.stage - 1].items[s.last.index];
    guide = { kicker: `Item found · Stage ${pad(s.last.stage)}`, title: item.title, body: item.body };
  } else {
    guide = {
      kicker: `Stage ${pad(s.stage)} · ${stage.guide}`,
      title: 'Press A to begin',
      body: 'Bump the glowing </> blocks to collect items. Stage select works any time with ← → or the list above.',
    };
  }

  const pct = (v: number): CSSProperties => ({ left: `${v}%` });

  return (
    <main className={`room glow-${stage.theme}${s.power ? ' room-on' : ''}`}>
      <div className="room-inner">
        <div className="tv-wrap">
          <div className="wall-side" aria-hidden="true" />
          <div className="sunbeams" aria-hidden="true"><span className="dust" /></div>
          <div className="tv-zone">
            <div className="window" aria-hidden="true">
              <span className="curtain-rod" />
              <span className="curtain curtain-l" />
              <span className="curtain curtain-r" />
              <div className="glass"><span className="panes" /></div>
            </div>
            <div className="tv">
              <div className="bezel">
                <div className={`screen ${screenState}`}>
                  {(s.power || s.shutdown) && (
                    <div className={`game theme-${stage.theme}`} aria-live="polite">
                      <Scenery theme={stage.theme} />
                      <div className="ground" aria-hidden="true" />

                      <div className="hud">
                        <div><div>PUSHPENDRA</div><div className="hud-k">XP 12YRS</div></div>
                        <div><div>ITEMS</div><div className="hud-k">◆ {foundTxt}</div></div>
                        <div><div>STAGE</div><div className="hud-k">1-{s.stage}</div></div>
                        <div style={{ textAlign: 'right' }}><div>SINCE</div><div className="hud-k">2014</div></div>
                      </div>

                      {inLevel && (
                        <>
                          <div className="banner">
                            {stage.name}
                            <br />
                            <span className="blinky">{allDone ? 'Ⓐ → NEXT STAGE' : 'PRESS Ⓐ'}</span>
                          </div>
                          {items.map((_, i) => {
                            const used = !!s.found[key(s.stage, i)];
                            return (
                              <div
                                key={i}
                                className={`blk${used ? ' used' : ''}${s.bump === i ? ' bump' : ''}`}
                                style={pct(leftOf(i))}
                              >
                                {'</>'}
                              </div>
                            );
                          })}
                          {s.spark && s.jumping && <div className="spark" style={pct(bubblePct)} />}
                          {onFoundBlock && !s.walking && (
                            <div className="bubble" style={pct(bubblePct)}>{items[s.idx].label}</div>
                          )}
                          <div
                            className={`hero${s.walking ? ' walk' : ''}${s.jumping ? ' jump' : ''}`}
                            style={pct(heroPct)}
                          >
                            <div className="hero-body">
                              <span className="hero-shadow" />
                              <span className="px" />
                            </div>
                          </div>
                        </>
                      )}

                      {s.screen === 'title' && (
                        <div className="overlay ov-dim">
                          <div className="logo">PUSHPENDRA</div>
                          <div className="logo-sub">STAFF QUEST</div>
                          <div className="mini-hero" aria-hidden="true"><span className="px" /></div>
                          <div className="blinky">PRESS Ⓐ TO START</div>
                          <div className="ov-dim-t">{stages.length} STAGES · {totalItems} ITEMS · NO BOSSES</div>
                        </div>
                      )}

                      {s.screen === 'intro' && (
                        <div className="overlay ov-solid">
                          <div className="ov-dim-t">STAGE {s.stage} OF {stages.length}</div>
                          <div className="ov-big">{stage.name}</div>
                          <div className="zone">ZONE · {stage.zone}</div>
                          <div>◆ × {pad(n)} ITEMS</div>
                        </div>
                      )}

                      {s.screen === 'end' && (
                        <div className="overlay ov-dim">
                          <div className="logo" style={{ fontSize: 'clamp(12px, 5.4cqw, 28px)' }}>QUEST COMPLETE</div>
                          <div>ITEMS ◆ {foundTxt}</div>
                          <div className="ov-dim-t">NEXT LEVEL: YOUR TEAM?</div>
                          <div>
                            <a className="ov-link" href={`mailto:${person.email}`}>{person.email.toUpperCase()}</a>
                          </div>
                          <div className="blinky">PRESS Ⓐ TO PLAY AGAIN</div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="glare" aria-hidden="true" />
                </div>
              </div>
              <div className="tv-strip">
                <span className="cap">Color · Model 12</span>
                <span className="cap">Est. 2014</span>
              </div>
              <div className="tv-panel">
                <span className="speaker" aria-hidden="true" />
                <div className="tv-controls">
                  <button
                    type="button"
                    className={s.power ? 'power latched' : 'power'}
                    aria-label="Power"
                    aria-pressed={s.power}
                    onClick={togglePower}
                  >
                    <span className={s.power ? 'led lit' : 'led'} />
                    POWER
                  </button>
                  <div className="dialwin">
                    <span className="cap">Stage</span>
                    <div className="chwin" aria-label="Current stage">{s.power ? `1-${s.stage}` : '- -'}</div>
                  </div>
                  <div className="keys">
                    <button type="button" className="key" aria-label="Previous stage" onClick={() => stageStep(-1)}>◀ STG</button>
                    <button type="button" className="key" aria-label="Next stage" onClick={() => stageStep(1)}>STG ▶</button>
                  </div>
                  <button type="button" className="slide" aria-label="Mute sound" aria-pressed={s.muted} onClick={toggleMute}>
                    <span className="slide-track">
                      <span className="slide-knob" style={{ transform: `translateX(${s.muted ? 22 : 0}px)` }} />
                    </span>
                    <span className="cap">{s.muted ? 'Muted' : 'Sound'}</span>
                  </button>
                </div>
                <span className="speaker" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="stand" aria-hidden="true">
            <span className="floor" />
            <span className="skirting" />
            <span className="skirting-side" />
            <span className="sunpatch" />
            <div className="plant">
              {[[-38, 96], [-18, 128], [4, 150], [22, 120], [42, 92], [-58, 70], [60, 74]].map(([r, h], i) => (
                <span key={i} className="leaf" style={{ height: h, transform: `rotate(${r}deg)` }} />
              ))}
              <span className="pot" />
            </div>
            <div className="stand-top" />
            <div className="stand-body">
              <div className="cubby">
                <div className="vcr"><span className="vcr-slot" /><span className="vcr-clock">12:00</span></div>
              </div>
              <div className="cubby tapes">
                {Array.from({ length: 8 }, (_, i) => <span key={i} className="tape" />)}
              </div>
            </div>
            <div className="stand-feet"><span /><span /></div>
          </div>
          <div className="console-set">
            <div className="console" aria-hidden="true">
              <span className="cart"><span className="cart-label" /></span>
              <span className="console-vent" />
              <span className={s.power ? 'console-led lit' : 'console-led'} />
            </div>
            <div className="pad" role="group" aria-label="Game controller">
              <svg className="cord" width="1" height="1" aria-hidden="true">
                <path d="M 40 4 C 26 -34, -8 -8, -10 34 S -30 81, -52 81" />
              </svg>
              <div className="dpad">
                <span className="dpad-x" aria-hidden="true" />
                <span className="dpad-y" aria-hidden="true" />
                <button type="button" className="dpad-btn dpad-l" aria-label="Previous stage" onClick={() => stageStep(-1)}>◀</button>
                <button type="button" className="dpad-btn dpad-r" aria-label="Next stage" onClick={() => stageStep(1)}>▶</button>
              </div>
              <div className="pad-mid" aria-hidden="true">
                <span className="pad-pills"><span /><span /></span>
                <span className="pad-cap">SELECT START</span>
              </div>
              <div className="pad-btns">
                <span className="bbtn" aria-hidden="true">B</span>
                <button ref={aBtn} type="button" className="abtn" aria-label="A button: start, jump (Space)" onClick={pressA}>A</button>
              </div>
            </div>
          </div>
          <p className="sticker">Space to switch on, Space again for Ⓐ. Every code block you bump drops a piece of the résumé.</p>
        </div>

        <aside className="guide" aria-label="Player's guide">
          <div className="guide-head">
            <div className="guide-t">PLAYER'S<br />GUIDE</div>
            <div className="guide-meta">Staff Quest<br />Official</div>
          </div>
          <div style={{ marginTop: 6 }}>
            {stages.map((stg, k) => {
              const active = s.power && s.stage === k + 1 && inLevel;
              return (
                <button key={stg.name} type="button" className={active ? 'g-row active' : 'g-row'} onClick={() => goStage(k + 1)}>
                  <span className="g-code">1-{k + 1}</span>
                  <span>{stg.guide}</span>
                  <span className="g-slot">{stageFound(k)}/{stg.items.length}</span>
                </button>
              );
            })}
          </div>
          <div className="g-now">
            <div className="g-kick">{guide.kicker}</div>
            <h2 className="g-title">{guide.title}</h2>
            <p className="g-body">{guide.body}</p>
          </div>
          <div className="g-prog">
            <div className="g-prog-row"><span>Items found</span><span>{foundTxt}</span></div>
            <div className="g-track"><div className="g-fill" style={{ width: `${Math.round((foundCount / totalItems) * 100)}%` }} /></div>
          </div>
          <div className="g-legend"><span>Space · Ⓐ jump / start</span><span>← → stage</span><span>M · mute for meetings</span></div>
        </aside>
      </div>
    </main>
  );
}

/* ---------- per-stage scenery (pure CSS art) ---------- */
function Scenery({ theme }: { theme: Theme }) {
  switch (theme) {
    case 'island':
      return (
        <div aria-hidden="true">
          <div className="sun" />
          <div className="cloud" style={{ top: '30%', left: '8%', animationDuration: '38s' }} />
          <div className="cloud" style={{ top: '22%', left: '46%', transform: 'scale(.8)', animationDuration: '52s' }} />
          <div className="cloud" style={{ top: '36%', left: '70%', animationDuration: '44s' }} />
          <div className="sea" />
          <div className="isle" />
          <div className="jungle" />
          <Palm left="4%" height="34%" />
          <Palm left="90%" height="42%" />
          <Palm left="62%" height="26%" />
        </div>
      );
    case 'sunset':
      return (
        <div aria-hidden="true">
          <div className="bigsun" />
          <div className="gull" style={{ top: '30%', left: '18%' }} />
          <div className="gull" style={{ top: '26%', left: '24%', animationDelay: '-.3s', scale: '.8' }} />
          <div className="gull" style={{ top: '34%', left: '68%', animationDelay: '-.6s' }} />
          <div className="sea sea-dusk"><span className="glint" /></div>
          <div className="boat"><span className="sail" /><span className="hull" /></div>
          <Palm left="6%" height="36%" silhouette />
          <Palm left="92%" height="30%" silhouette />
          <div className="shells" />
        </div>
      );
    case 'snow':
      return (
        <div aria-hidden="true">
          <div className="stars" style={{ opacity: 0.4 }} />
          <div className="aurora" />
          <div className="aurora a2" />
          <div className="peaks peaks-far" />
          <div className="peaks peaks-near" />
          <div className="pine" style={{ left: '8%' }} />
          <div className="pine" style={{ left: '14%', transform: 'scale(.8)' }} />
          <div className="pine" style={{ left: '91%' }} />
          <div className="snowfall" />
        </div>
      );
    case 'space':
      return (
        <div aria-hidden="true">
          <div className="stars stars-dense" />
          <div className="shooting" />
          <div className="earth">
            <span className="land l1" />
            <span className="land l2" />
            <span className="land l3" />
            <span className="cloudband" />
          </div>
          <div className="sat" />
        </div>
      );
    case 'city':
    default:
      return (
        <div aria-hidden="true">
          <div className="stars" />
          <div className="moon" />
          <div className="skyline">
            {[['far', 42], ['', 70], ['far', 55], ['', 92], ['far', 38], ['', 64], ['far', 80], ['', 48], ['far', 72]].map(
              ([cls, h], i) => (
                <div key={i} className={`bldg ${cls}`} style={{ height: `${h}%` }} />
              ),
            )}
          </div>
        </div>
      );
  }
}

function Palm({ left, height, silhouette = false }: { left: string; height: string; silhouette?: boolean }) {
  return (
    <div className={silhouette ? 'palm palm-sil' : 'palm'} style={{ left, height }}>
      <span className="frond" />
    </div>
  );
}
