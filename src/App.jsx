import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

// ====== CHANGE THIS to the Gmail address that should receive messages ======
const RECEIVER_EMAIL = "junzfundador142@gmail.com";
// ===========================================================================

const TYPES = [
  { title: "Verbal", text: "Name-calling, teasing, insults, and threats." },
  { title: "Physical", text: "Hitting, pushing, or taking and breaking someone's things." },
  { title: "Social", text: "Leaving people out, spreading rumors, or turning friends against someone." },
  { title: "Cyberbullying", text: "Mean messages, embarrassing posts or photos, and fake accounts." },
];

const ROLES = [
  {
    title: "If it's happening to you",
    tips: [
      "It is not your fault. You did nothing to deserve it.",
      "Tell a professor, guidance counselor, CASSO officer, or someone you trust.",
      "Keep screenshots or notes of what happened and when.",
      "Stay near friends and safe adults.",
    ],
  },
  {
    title: "If you see it happen",
    tips: [
      "Don't laugh, cheer, or share the post.",
      "Check in with the person afterward and be kind.",
      "Tell an adult. Reporting is not \"snitching.\"",
      "Invite them to sit with you.",
    ],
  },
  {
    title: "If you've been the bully",
    tips: [
      "Stop, and think about how the other person feels.",
      "Apologize and mean it.",
      "Talk to someone about why it happened.",
      "You can change. Start today.",
    ],
  },
];

const NAV = [
  { href: "#top", label: "About" },
  { href: "#what", label: "Bullying" },
  { href: "#help", label: "What to do" },
  { href: "#message", label: "Contact" },
];

const pill =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition duration-300 hover:-translate-y-0.5";

const glass = "glass dark:glass-dark";

/* Fades its children up the first time they scroll into view */
function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={(shown ? "animate-rise " : "opacity-0 ") + className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Slow-moving blurred color behind glass panels */
function Blob({ className }) {
  return (
    <div
      aria-hidden="true"
      className={"pointer-events-none absolute animate-drift rounded-full blur-3xl " + className}
    />
  );
}

function Header({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/60 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 sm:px-6">
        <a href="#top" className="text-xl font-bold tracking-tight no-underline">
          speak up<span className="text-leaf">.</span>
        </a>
        <nav aria-label="Main" className="order-3 -mx-1 flex w-full items-center gap-5 overflow-x-auto px-1 text-sm sm:order-2 sm:ml-auto sm:w-auto">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="shrink-0 py-1.5 font-medium text-muted no-underline transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={isDark}
          className="order-2 shrink-0 cursor-pointer rounded-full border border-line px-4 py-1.5 text-sm font-medium transition-colors hover:border-neon hover:bg-neon hover:text-black sm:order-3"
        >
          {isDark ? "Light theme" : "Dark theme"}
        </button>
      </div>
    </header>
  );
}

/* Example conversation shown on the hero phone */
const CHAT = [
  { from: "me", text: "Hi. Some classmates keep leaving me out and posting about me." },
  { from: "team", text: "Thank you for telling us. That's not okay, and it's not your fault." },
  { from: "me", text: "I didn't know who else to talk to." },
  { from: "team", text: "You did the right thing. Can we talk with your adviser tomorrow?" },
  { from: "me", text: "Okay. Thank you." },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-1">
      {[0, 150, 300].map((d) => (
        <span key={d} style={{ animationDelay: `${d}ms` }} className="size-1.5 animate-bounce rounded-full bg-current opacity-60" />
      ))}
    </span>
  );
}

function Phone() {
  const [reduced] = useState(prefersReducedMotion);
  const [count, setCount] = useState(() => (reduced ? CHAT.length : 0));

  // Reveal one message at a time, then start the conversation over
  useEffect(() => {
    if (reduced) return;
    const delay = count === 0 ? 900 : count < CHAT.length ? 1700 : 5000;
    const t = setTimeout(() => setCount((c) => (c < CHAT.length ? c + 1 : 0)), delay);
    return () => clearTimeout(t);
  }, [count, reduced]);

  const next = CHAT[count];

  return (
    <div className="relative w-[272px] sm:w-[290px]">
      <p className="sr-only">An example conversation between a student and CASSO.</p>
      <div aria-hidden="true" className="rounded-[3.2rem] bg-[#0e110e] p-[10px] shadow-[0_40px_80px_-20px_rgb(14_40_14/0.45)] ring-1 ring-black/40 dark:ring-white/15">
        <div className="relative isolate flex h-[560px] flex-col overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white via-[#f6faf6] to-[#e9f5e9] text-[#0e110e] sm:h-[590px]">
          <Blob className="top-24 -left-10 -z-10 size-48 bg-neon/45" />
          <Blob className="top-72 -right-12 -z-10 size-52 bg-mint/80 [animation-delay:-6s]" />
          <div className="absolute top-3 left-1/2 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* chat header */}
          <div className="flex items-center gap-3 border-b border-black/5 px-5 pt-14 pb-3">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-leaf to-forest text-xs font-bold text-white">
              CA
            </span>
            <div>
              <p className="text-sm font-semibold">CASSO</p>
              <p className="text-[11px] text-[#5d665d]">Example conversation</p>
            </div>
          </div>

          {/* messages */}
          <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-4 pb-3">
            {CHAT.slice(0, count).map((m) => (
              <div
                key={m.text}
                className={
                  "max-w-[82%] animate-[rise_0.45s_cubic-bezier(0.2,0.7,0.2,1)_backwards] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug " +
                  (m.from === "me"
                    ? "self-end rounded-br-md bg-[#0e110e] text-white"
                    : "glass self-start rounded-bl-md")
                }
              >
                {m.text}
              </div>
            ))}
            {next && (
              <div
                className={
                  "rounded-2xl px-3.5 py-2 " +
                  (next.from === "me"
                    ? "self-end rounded-br-md bg-[#0e110e] text-white"
                    : "glass self-start rounded-bl-md text-[#0e110e]")
                }
              >
                <TypingDots />
              </div>
            )}
          </div>

          {/* composer */}
          <div className="glass mx-4 mb-6 flex items-center gap-2 rounded-full py-2 pr-2 pl-4 text-[12px] text-[#5d665d]">
            <span className="flex-1">Write a message…</span>
            <span className="grid size-8 place-items-center rounded-full bg-neon text-black">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const letters = "speakup".split("");

  return (
    <section className="relative overflow-hidden">
      {/* drifting green light the glass panels blur */}
      <Blob className="top-1/3 left-[38%] size-[34rem] bg-mint/50 dark:bg-forest/30" />
      <Blob className="top-[55%] left-[55%] size-[22rem] bg-neon/25 [animation-delay:-7s] dark:bg-leaf/20" />
      <Blob className="top-20 -right-24 size-[20rem] bg-leaf/15 [animation-delay:-12s]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:pt-6 lg:pb-12">
        <h1 className="select-none text-[clamp(4.5rem,min(22vw,34vh),20rem)] leading-[0.82] font-extralight tracking-[-0.065em]">
          <span className="sr-only">Speak Up</span>
          <span aria-hidden="true">
            {letters.map((ch, i) => (
              <span
                key={i}
                style={{ animationDelay: `${i * 70}ms` }}
                className={
                  "inline-block animate-letter " +
                  (i >= 5 ? "bg-gradient-to-br from-leaf via-forest to-sage bg-clip-text pr-[0.02em] text-transparent" : "")
                }
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-8 grid items-center gap-12 lg:-mt-[min(7vw,11vh)] lg:grid-cols-2 lg:gap-8 xl:grid-cols-[1fr_auto_1fr] xl:gap-10">
          <div className="max-w-sm animate-rise [animation-delay:500ms] lg:justify-self-end lg:pt-40 lg:text-right">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-forest uppercase dark:text-mint">
              CASSO · College of Arts and Sciences Student Officers
            </p>
            <p className="text-lg leading-snug font-light sm:text-xl">
              Bullying is never okay, and nobody has to face it alone. Learn how to spot it, how to
              stop it, and how to tell someone who can help.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 lg:justify-end">
              <a href="#help" className={pill + " " + glass + " no-underline hover:border-neon hover:bg-neon hover:text-black"}>
                What you can do
              </a>
            </div>
          </div>

          <div className="relative justify-self-center lg:mr-20 lg:rotate-[7deg] xl:mr-0">
            <div className="animate-phone-in [animation-delay:250ms]">
              <div className="animate-float">
                <Phone />
              </div>
            </div>

            {/* floating glass labels */}
            <div className="absolute top-28 -left-2 animate-rise [animation-delay:1100ms] sm:-left-24">
              <div className={glass + " flex animate-float items-center gap-2.5 rounded-2xl px-4 py-3 dark:bg-[#0b100b]/60 [animation-delay:-2s]"}>
                <span className="relative flex size-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-neon/70" />
                  <span className="relative size-2.5 rounded-full bg-neon" />
                </span>
                <span className="text-sm font-semibold">You're not alone</span>
              </div>
            </div>
            <div className="absolute top-60 -right-2 animate-rise [animation-delay:1300ms] sm:-right-24 lg:-right-10 xl:-right-24">
              <div className={glass + " flex animate-float items-center gap-2.5 rounded-2xl px-4 py-3 dark:bg-[#0b100b]/60 [animation-delay:-4s]"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-forest dark:text-mint">
                  <path d="M4 5h16v11H9l-4 3.5V16H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-semibold">A real person reads it</span>
              </div>
            </div>
          </div>

          <div className="hidden animate-rise self-end [animation-delay:800ms] xl:block">
            <p className="max-w-[14rem] text-sm text-muted">
              This is the kind of conversation you can have with us. Nothing you share is too small.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, children, dark }) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-2 md:items-end">
      <div>
        <p className={"mb-3 text-xs font-semibold tracking-[0.2em] uppercase " + (dark ? "text-mint" : "text-forest dark:text-mint")}>
          {eyebrow}
        </p>
        <h2 className="text-5xl leading-[0.95] font-extralight tracking-[-0.04em] sm:text-6xl lg:text-7xl">{title}</h2>
      </div>
      <p className={"max-w-md text-lg leading-relaxed font-light " + (dark ? "text-white/80" : "text-muted")}>
        {children}
      </p>
    </Reveal>
  );
}

function WhatIsBullying() {
  return (
    <section id="what" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHead eyebrow="01 — Learn" title="What counts as bullying?">
        Bullying is when someone hurts, scares, or leaves out another person again and again, on
        purpose. It can happen on campus, online, or anywhere.
      </SectionHead>

      <ul className="mt-14 border-t border-line">
        {TYPES.map((t, i) => (
          <Reveal
            as="li"
            key={t.title}
            delay={i * 100}
            className="group grid gap-2 border-b border-line py-7 transition-colors md:grid-cols-[6rem_1fr_1.4fr] md:items-baseline md:gap-8 md:px-4 md:hover:bg-mint/30 dark:md:hover:bg-forest/20"
          >
            <span className="text-sm text-muted tabular-nums">0{i + 1}</span>
            <h3 className="text-3xl font-light tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">{t.title}</h3>
            <p className="text-lg text-muted">{t.text}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function WhatToDo() {
  return (
    <section id="help" className="relative overflow-hidden bg-forest py-20 text-white lg:py-28 dark:bg-[#0f2a0f]">
      <Blob className="top-1/2 -left-20 size-[26rem] bg-neon/30" />
      <Blob className="right-0 -bottom-20 size-[30rem] bg-mint/25 [animation-delay:-9s]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead eyebrow="02 — Act" title="What you can do" dark>
          Everyone has a part to play, whether you are being bullied, you see it happen, or you are
          the one who has been hurting others.
        </SectionHead>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ROLES.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 120}
              className="glass-dark rounded-[2rem] p-7 transition duration-300 hover:-translate-y-1.5 hover:bg-white/[0.13]"
            >
              <span className="grid size-10 place-items-center rounded-full bg-neon text-sm font-semibold text-black">
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl font-normal tracking-tight">{r.title}</h3>
              <ul className="mt-5 space-y-3">
                {r.tips.map((tip) => (
                  <li key={tip} className="flex gap-3 text-white/85">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mint" />
                    {tip}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-sm text-white/75">
          In the Philippines, the Anti-Bullying Act of 2013 (Republic Act 10627) requires schools to
          have policies that protect students and respond to bullying reports.
        </p>
      </div>
    </section>
  );
}

const fieldClass =
  "w-full rounded-2xl border-0 bg-white/80 px-4 py-3 text-[#0e110e] ring-1 ring-black/10 outline-none transition placeholder:text-black/35 focus:ring-2 focus:ring-forest";
const labelClass = "mb-1.5 block text-sm font-semibold";

function MessageForm() {
  const [name, setName] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");

    if (!name.trim()) {
      setStatus("Please enter your name.");
      return;
    }
    if (!yearLevel.trim()) {
      setStatus("Please enter your year level and section.");
      return;
    }
    if (!message.trim()) {
      setStatus("Please write a message before sending.");
      return;
    }
    if (honey) return; // bot trap

    setSending(true);
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/" + encodeURIComponent(RECEIVER_EMAIL),
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            message: message.trim(),
            name: name.trim(),
            year_level_and_section: yearLevel.trim(),
            _subject: "New message from the CASSO Speak Up website",
            _captcha: "false",
            _template: "table",
          }),
        }
      );
      const result = await res.json();
      if (res.ok && (result.success === true || result.success === "true")) {
        setName("");
        setYearLevel("");
        setMessage("");
        setStatus("Message sent. Thank you for speaking up.");
      } else {
        throw new Error(result.message || "Send failed");
      }
    } catch (err) {
      setStatus("Message not sent: " + err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="message" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <Blob className="top-24 right-1/4 size-[26rem] bg-neon/40 dark:bg-leaf/25" />
      <Blob className="right-0 bottom-10 size-[22rem] bg-leaf/30 [animation-delay:-8s] dark:bg-forest/40" />
      <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-forest uppercase dark:text-mint">03 — Talk</p>
          <h2 className="text-5xl leading-[0.95] font-extralight tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Send us a message
          </h2>
          <p className="mt-6 max-w-md text-lg font-light text-muted">
            Ask a question, report a problem, or just tell us how you feel. A CASSO officer will read it.
          </p>
          <div className={glass + " mt-8 max-w-md rounded-3xl p-5"}>
            <p className="flex items-center gap-2 font-semibold">
              <span className="size-2.5 rounded-full bg-neon" aria-hidden="true" />
              In danger right now?
            </p>
            <p className="mt-1.5 text-muted">
              Please tell a professor, security guard, or another adult near you immediately, or call your local emergency
              number. This form is not checked instantly.
            </p>
          </div>
        </Reveal>

        <Reveal
          as="form"
          id="message-form"
          delay={150}
          onSubmit={handleSubmit}
          noValidate
          className="relative rounded-[2.25rem] border border-white/70 bg-mint/60 p-6 text-[#0e110e] shadow-[0_30px_60px_-30px_rgb(36_127_36/0.6),inset_0_1px_0_rgb(255_255_255/0.8)] backdrop-blur-2xl backdrop-saturate-150 sm:p-9 [&_:focus-visible]:outline-[#0e110e]"
        >
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="honey">Leave this empty</label>
            <input
              type="text"
              id="honey"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>Your name</label>
              <input
                type="text"
                id="name"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="year" className={labelClass}>Year level and section</label>
              <input type="text" id="year" required value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} className={fieldClass} />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="msg" className={labelClass}>Your message</label>
            <textarea
              id="msg"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={fieldClass + " min-h-44 resize-y"}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className={pill + " mt-6 w-full cursor-pointer bg-[#0e110e] text-white hover:bg-forest disabled:cursor-wait disabled:opacity-60 sm:w-auto"}
          >
            {sending ? "Sending…" : "Send message"}
          </button>
          <p id="status" role="status" aria-live="polite" className="mt-4 min-h-6 font-semibold">
            {status}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xl font-light">Be kind. Speak up. Look out for each other.</p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p aria-hidden="true" className="mt-10 pb-[0.12em] text-[clamp(4rem,19vw,17rem)] leading-[0.9] font-extralight tracking-[-0.065em] text-ink/10 select-none">
          speak up.
        </p>
        <p className="border-t border-line pt-5 pb-24 text-sm text-muted sm:pb-5">© 2026 Speak Up · College of Arts and Sciences Student Officers (CASSO)</p>
      </div>
    </footer>
  );
}

function FloatingMessageButton() {
  const [hidden, setHidden] = useState(false);

  // Hide the button while the message form is already on screen
  useEffect(() => {
    const target = document.getElementById("message-form");
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  function goToForm(e) {
    e.preventDefault();
    const target = document.getElementById("message");
    if (!target) return;
    target.scrollIntoView();
    setTimeout(() => {
      const box = document.getElementById("msg");
      if (box) box.focus({ preventScroll: true });
    }, 700);
  }

  return (
    <a
      href="#message"
      onClick={goToForm}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      className={
        "fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex items-center gap-2 rounded-full bg-neon px-4 py-3 font-semibold sm:px-5 sm:py-3.5 text-black no-underline shadow-[0_10px_30px_-8px_rgb(36_127_36/0.6)] transition duration-300 hover:-translate-y-1 hover:bg-mint " +
        (hidden ? "pointer-events-none translate-y-3.5 opacity-0" : "")
      }
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3.5V17H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sm:hidden">Message</span>
      <span className="hidden sm:inline">Send us a message</span>
    </a>
  );
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  // Reveal the new theme as a circle growing out of the toggle button
  function toggleTheme(e) {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      flushSync(() => setTheme(next));
      root.setAttribute("data-theme", next);
    };

    if (prefersReducedMotion()) {
      apply();
      return;
    }
    if (!document.startViewTransition) {
      root.classList.add("theme-fade");
      apply();
      setTimeout(() => root.classList.remove("theme-fade"), 500);
      return;
    }

    const box = e.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    document.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }

  return (
    <>
      <Header theme={theme} onToggle={toggleTheme} />
      <main id="top">
        <Hero />
        <WhatIsBullying />
        <WhatToDo />
        <MessageForm />
      </main>
      <Footer />
      <FloatingMessageButton />
    </>
  );
}
