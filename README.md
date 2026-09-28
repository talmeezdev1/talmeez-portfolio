# Talmeez Ur Rehman — Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion

## Run it

1. Install Node.js 20 or newer.
2. In this folder: `npm install`
3. Start it: `npm run dev`, then open http://localhost:3000
4. Production check: `npm run build`

## Add your real content

All text is in **`lib/content.ts`**. Search it for `YOUR ` and `[ADD` to find every placeholder.

| What | Where |
| --- | --- |
| Email, LinkedIn, Instagram | `site.contact` in `lib/content.ts` (set `label` and `href`) |
| Your photo | Save as `public/images/talmeez.jpg`, then set `hasPortrait: true` |
| Project screenshots | Save in `public/images/projects/` and set `image: "/images/projects/luckybiz.jpg"` on each project |
| Project video | Set `video: "/images/projects/x.mp4"` and `poster: "/images/projects/x.jpg"` |
| Project results | Replace `"[ADD REAL RESULT]"` with a real number, or empty the array to hide the column |
| Creative Lab | Save images in `public/images/lab/` and set each item's `src` and `title` |
| Video ads | Save MP4s in `public/videos/`, set `video`, `poster`, `title` and `meta` on the `v1`–`v3` items in `labItems` |

Keep images under ~400 KB (export WebP or JPG at 1600–2000px wide).

### Video ads

- Export as **MP4 (H.264)**, 720p, ideally under 8 MB each. GitHub rejects any single file over 100 MB.
- Use `ratio: "9/16"` for Reels/Stories, `"4/5"` for feed ads, `"1/1"` for square.
- Add a still frame as the poster (JPG, same name): it shows before the video loads.
- Previews play muted on hover (desktop) or when on screen (phones). Clicking opens a full-screen player with sound.
- To add more than three, copy a `v` line and give it a new `id`.

## Structure

```
app/            layout, page, global design tokens (globals.css)
components/     one folder per section (Hero, Intro, About, Skills, Work, ...)
components/ui/  Reveal, TextReveal, MagneticButton, SectionHeading, Media, ScrollProgress
lib/content.ts  all copy and data
lib/hooks.ts    pointer + reduced-motion hooks
```

## Deploy (free)

1. Push this folder to a GitHub repository.
2. Go to vercel.com, sign in with GitHub, click **Add New → Project**, pick the repo, click **Deploy**.
3. Optional: add your own domain under **Settings → Domains**.

## Notes

- The custom cursor only runs on desktop with a mouse. Touch devices keep the normal cursor.
- With "reduce motion" turned on in the OS, heavy animations are switched off and the loader is near-instant.
- The loader shows once per browser session. Click or press any key to skip it.
