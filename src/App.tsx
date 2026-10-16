import { useState, type ReactNode } from "react";

type View = "overview" | "calendar" | "mood" | "learn" | "ai" | "profile" | "settings";

const icons: Record<View | "bell" | "sparkle" | "arrow" | "drop" | "send", ReactNode> = {
  overview: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></>,
  calendar: <><path d="M5 3v3M19 3v3M4 8h16M4 5h16v16H4z" /><path d="M8 12h2M14 12h2M8 16h2M14 16h2" /></>,
  mood: <><path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" /></>,
  learn: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v18H7.5A3.5 3.5 0 0 0 4 23zM20 5.5A3.5 3.5 0 0 0 16.5 2H12v18h4.5A3.5 3.5 0 0 1 20 23z" /></>,
  ai: <><path d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4zM18.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></>,
  profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  sparkle: <><path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" /></>,
  arrow: <><path d="m9 18 6-6-6-6" /></>,
  drop: <><path d="M12 3s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12Z" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4zM22 2 11 13" /></>,
};

function Icon({ name, size = 20 }: { name: keyof typeof icons; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

const nav: { id: View; label: string }[] = [
  { id: "overview", label: "Overview" }, { id: "calendar", label: "Cycle Calendar" },
  { id: "mood", label: "Mood & Symptoms" }, { id: "learn", label: "Ask & Learn" },
  { id: "ai", label: "SheSpace AI" }, { id: "profile", label: "My Profile" },
  { id: "settings", label: "Settings" },
];

const days = Array.from({ length: 35 }, (_, i) => i - 2);
const monthDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function Calendar({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? "mini-calendar" : "calendar-full"}>
    <div className="calendar-head"><button aria-label="Previous month">‹</button><strong>May 2025</strong><button aria-label="Next month">›</button></div>
    <div className="calendar-grid weekdays">{monthDays.map(d => <span key={d}>{d}</span>)}</div>
    <div className="calendar-grid">
      {days.map((day, i) => {
        const valid = day > 0 && day <= 31;
        return <button key={i} disabled={!valid} className={`${day >= 5 && day <= 9 ? "period" : ""} ${day === 16 ? "today" : ""} ${day === 19 ? "ovulation" : ""}`}>
          {valid ? day : ""}
          {day === 19 && <i />}
        </button>;
      })}
    </div>
  </div>;
}

function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="section-title"><div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2></div>{children}</div>;
}

function Overview({ onView }: { onView: (view: View) => void }) {
  return <div className="view-grid">
    <section className="cycle-card">
      <div className="cycle-copy">
        <span className="eyebrow">YOUR CYCLE</span>
        <h2>Day 12</h2>
        <p>Follicular phase</p>
        <div className="phase-track"><i /><i /><i className="active" /><i /></div>
        <div className="phase-labels"><span>Period</span><span>Follicular</span><span>Ovulation</span><span>Luteal</span></div>
        <div className="cycle-stats">
          <div><Icon name="drop" /><span><b>16 days</b>Next period</span></div>
          <div><Icon name="sparkle" /><span><b>7 days</b>Ovulation</span></div>
        </div>
      </div>
      <div className="cycle-orbit"><div className="orbit-inner"><small>CYCLE LENGTH</small><b>28</b><span>days</span></div></div>
    </section>
    <section className="card calendar-card">
      <SectionTitle title="Cycle calendar"><button className="text-button" onClick={() => onView("calendar")}>View full calendar <Icon name="arrow" size={16} /></button></SectionTitle>
      <Calendar compact />
      <div className="legend"><span><i className="l-period" />Period</span><span><i className="l-fertile" />Fertile window</span><span><i className="l-ovulation" />Ovulation</span></div>
    </section>
    <section className="card checkin-card">
      <SectionTitle eyebrow="DAILY CHECK-IN" title="How are you feeling?" />
      <p>Take a moment to check in with your body.</p>
      <div className="moods">{[["😣","Rough"],["😕","Low"],["😌","Okay"],["🙂","Good"],["😊","Great"]].map(([face, label]) => <button key={label}><span>{face}</span>{label}</button>)}</div>
      <button className="primary" onClick={() => onView("mood")}>Log mood & symptoms</button>
    </section>
    <section className="ai-card">
      <div className="ai-glow"><Icon name="sparkle" size={28} /></div>
      <span className="eyebrow">SHESPACE AI</span><h2>Questions about your body?</h2>
      <p>Get thoughtful, personalized answers in a private space.</p>
      <button onClick={() => onView("ai")}>Start a conversation <Icon name="arrow" size={17} /></button>
    </section>
    <section className="card insights-card">
      <SectionTitle eyebrow="JUST FOR YOU" title="Personalized insights"><button className="circle-button" aria-label="Next insight"><Icon name="arrow" size={18} /></button></SectionTitle>
      <div className="insight-content">
        <div className="insight-visual"><span>✦</span></div>
        <div><span className="tag">CYCLE INSIGHT</span><h3>Your energy may be rising</h3><p>Estrogen is increasing during your follicular phase. You may notice better focus and feel ready to take on something new.</p><button className="text-button">Learn about this phase <Icon name="arrow" size={15} /></button></div>
      </div>
    </section>
  </div>;
}

function CalendarView() {
  return <section className="card page-card"><SectionTitle eyebrow="CYCLE TRACKING" title="Your cycle calendar"><button className="primary small">Log period</button></SectionTitle><p className="lede">Your next period is predicted to begin in 16 days.</p><Calendar /><div className="phase-summary"><div><span className="dot rose" /><b>Period</b><small>May 5–9</small></div><div><span className="dot peach" /><b>Fertile window</b><small>May 16–21</small></div><div><span className="dot dark" /><b>Ovulation</b><small>May 19</small></div></div></section>;
}

function MoodView() {
  const [selected, setSelected] = useState("Good");
  return <section className="card page-card mood-page"><SectionTitle eyebrow="DAILY CHECK-IN" title="How are you feeling today?" /><p className="lede">Your feelings matter. Choose the option that feels closest right now.</p><div className="big-moods">{[["😣","Rough"],["😕","Low"],["😌","Okay"],["🙂","Good"],["😊","Great"]].map(([face,label]) => <button className={selected === label ? "selected" : ""} onClick={() => setSelected(label)} key={label}><span>{face}</span><b>{label}</b></button>)}</div><h3>Any symptoms today?</h3><div className="chips">{["Cramps","Headache","Bloating","Fatigue","Tender breasts","Backache","Cravings","Acne"].map(x => <button key={x}>{x}</button>)}</div><label className="notes">Anything else you'd like to note?<textarea placeholder="Add a private note..." /></label><button className="primary save">Save check-in</button></section>;
}

function AiView() {
  return <section className="ai-page"><div className="ai-page-head"><div className="ai-glow"><Icon name="sparkle" size={28} /></div><div><span className="eyebrow">PRIVATE & PERSONALIZED</span><h2>SheSpace AI</h2><p>Ask anything about your cycle, symptoms, or wellbeing.</p></div></div><div className="chat-card"><div className="message bot"><b>SheSpace AI</b><p>Hi Maya, I’m here to help you understand your body a little better. What’s on your mind today?</p></div><div className="suggestions"><span>You could ask</span><button>Why am I so tired this week?</button><button>What can help with cramps?</button><button>Tell me about my current phase</button></div><div className="chat-input"><input aria-label="Message" placeholder="Ask SheSpace anything..." /><button aria-label="Send"><Icon name="send" /></button></div><small>SheSpace AI provides general wellness information, not medical advice.</small></div></section>;
}

function Placeholder({ view }: { view: View }) {
  const item = nav.find(n => n.id === view)!;
  return <section className="card page-card placeholder"><div className="placeholder-icon"><Icon name={view} size={30} /></div><span className="eyebrow">YOUR SPACE</span><h2>{item.label}</h2><p>This space is ready for your personalized {item.label.toLowerCase()} experience.</p><button className="primary">Explore {item.label}</button></section>;
}

export default function App() {
  const [active, setActive] = useState<View>("overview");
  const navigate = (view: View) => { setActive(view); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const title = active === "overview" ? "Welcome back, Maya" : nav.find(n => n.id === active)?.label;

  return <div className="app-shell">
    <aside>
      <div className="logo"><span>S</span><div>She Space<small>WELLNESS, YOUR WAY</small></div></div>
      <nav>{nav.map(item => <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => navigate(item.id)}><Icon name={item.id} /><span>{item.label}</span></button>)}</nav>
      <div className="sidebar-quote"><Icon name="sparkle" /><p>Small steps count.</p><span>Be gentle with yourself today.</span></div>
    </aside>
    <main>
      <header>
        <div><span>{active === "overview" ? "THURSDAY, MAY 15" : "SHE SPACE"}</span><h1>{title}</h1>{active === "overview" && <p>Here's what's happening with your body today.</p>}</div>
        <div className="header-actions"><button className="icon-button" aria-label="Notifications"><Icon name="bell" /><i /></button><button className="profile-button"><span>M</span><div><b>Maya Singh</b><small>View profile</small></div><Icon name="arrow" size={15} /></button></div>
      </header>
      <div className="content">
        {active === "overview" && <Overview onView={navigate} />}
        {active === "calendar" && <CalendarView />}
        {active === "mood" && <MoodView />}
        {active === "ai" && <AiView />}
        {!["overview","calendar","mood","ai"].includes(active) && <Placeholder view={active} />}
      </div>
    </main>
    <nav className="bottom-nav">{nav.slice(0,5).map(item => <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => navigate(item.id)}><Icon name={item.id} /><span>{item.id === "calendar" ? "Calendar" : item.id === "mood" ? "Check-in" : item.id === "learn" ? "Learn" : item.label.replace("SheSpace ", "")}</span></button>)}</nav>
  </div>;
}
