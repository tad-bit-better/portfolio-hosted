# pushpendra.dev

My portfolio, in two modes:

- **Read** (`/`): a quiet, fast page. Static HTML and CSS with **no JavaScript**. Key phrases get a highlighter mark that draws in as you scroll.
- **Play** (`/play`): a 90s CRT in a warm corner room, running _Staff Quest_, a small 8-bit platformer across five stages. Bump the code blocks to collect pieces of my résumé. It's a React island, so its JavaScript only loads on this page.

Play mode works with the mouse, touch or keyboard: **Space** switches the TV on and then acts as the A button, **← →** change stage and **M** mutes.

## Running it

Needs Node 22.12 or newer (`.nvmrc` pins 22).

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                           |
| `npm run build`   | Type-checks (`astro check`), then builds to `dist/`  |
| `npm run preview` | Serves the production build locally                  |
| `npm run format`  | Runs Prettier over the project                       |

## Where things live

```
src/
  data/profile.ts            All content: work, experience, principles, game stages and items
  layouts/Base.astro         <head>, fonts, meta, page transitions and prerendering
  components/
    TopBar.astro             Name, nav and the Read/Play switch
    Marked.astro             Turns ==phrase== into a highlighter mark
    play/StaffQuest.tsx      The room, TV, console, game state and player's guide
    play/sound.ts            8-bit sound effects with the Web Audio API (no audio files)
  pages/
    index.astro              Read mode
    play.astro               Play mode
  styles/
    base.css                 Resets, focus ring, view-transition rules
    shared.css               Top bar and mode switch
    read.css                 Read mode and the highlighter
    play.css                 Room, lighting, TV, console, game world and sprites
public/
  resume.pdf                 Linked from the Read page
```

Content changes only need `src/data/profile.ts`. Wrap a phrase in `==double equals==` to highlight it. Each game stage has a `theme` (`island`, `city`, `sunset`, `snow`, `space`) and a list of `items`; the item total updates itself.

## Notes on the build

- **Astro 7** with static output. **React 19 + TypeScript** only for the Play island.
- **Fonts** are self-hosted with Fontsource (Geist, Geist Mono, VT323, Press Start 2P), so there are no third-party requests.
- **Switching modes** uses CSS cross-document View Transitions, and the other mode is prerendered on hover with Speculation Rules. Both work without JavaScript; older browsers just navigate normally.
- **The room in Play mode** is drawn entirely in CSS, and it sizes itself so the TV and controller fit on one screen.
- **Motion** respects `prefers-reduced-motion`.

## Deploying

The output is plain static files in `dist/`, so any static host works. Build command `npm run build`, output directory `dist`, Node 22.

## Licence

Code is [MIT](LICENSE). Written content and the résumé © Pushpendra Yadav.
