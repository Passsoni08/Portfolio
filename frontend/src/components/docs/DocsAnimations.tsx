import CodeBlock from './CodeBlock';

export default function DocsAnimations() {
  return (
    <section id="animations">
      <h2>Animations &amp; Interactions</h2>

      <h3>Why GSAP + ScrollTrigger</h3>
      <p>
        GSAP was chosen over Framer Motion for its precise timeline control, scroll-linked animations
        (ScrollTrigger pinning, scrub), and clip-path support. The three reference sites
        (siemprericc.com, landonorris.com, sozo21.co) all use GSAP.
      </p>

      <h3>Smooth Scrolling — Lenis</h3>
      <p>
        Lenis provides momentum-based smooth scrolling. It integrates with GSAP's ticker so
        ScrollTrigger respects Lenis's virtual scroll position:
      </p>
      <CodeBlock code={`
// SmoothScroll.tsx — Lenis + GSAP integration
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
      `} />

      <h3>Custom SplitText Component</h3>
      <p>
        GSAP's SplitText plugin is paid. We built a custom React component that wraps each
        character, word, or line in a <code>&lt;span&gt;</code> and animates them with standard GSAP tweens:
      </p>
      <CodeBlock code={`
// Splits text into spans, then GSAP animates with stagger
<SplitText as="h1" type="chars" stagger={0.04} trigger={false}>
  RAFAEL PASSONI
</SplitText>
      `} />

      <h3>Animation Components</h3>
      <ul>
        <li><strong>RevealOnScroll</strong> — Wraps any content with opacity + Y/X translation triggered by scroll position</li>
        <li><strong>ParallaxImage</strong> — Image with scroll-driven Y translation (configurable speed factor)</li>
        <li><strong>MagneticButton</strong> — Button that follows cursor within a configurable strength radius, with elastic return</li>
      </ul>

      <h3>Performance</h3>
      <p>
        Every animation effect cleans up on component unmount via <code>ScrollTrigger.kill()</code>
        in <code>useEffect</code> return functions. This prevents memory leaks and stale scroll listeners
        during navigation.
      </p>
    </section>
  );
}
