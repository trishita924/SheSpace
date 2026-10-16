  return (
    <section className="card page-card placeholder">
      <div className="placeholder-icon"><Icon name={view} size={30} /></div>
      <span className="eyebrow">YOUR SPACE</span>
      <h2>{item.label}</h2>
      <p>
        This space is ready for your personalized {item.label.toLowerCase()} experience.
      </p>
      <button className="primary">Explore {item.label}</button>
    </section>
  );
}

export default function App() {
  const [active, setActive] = useState<View>("overview");
  const navigate = (view: View) => {
    setActive(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const title =
    active === "overview"
      ? "Welcome back, Maya"
      : nav.find((n) => n.id === active)?.label;

  return (
    <div className="app-shell">
      <aside>
        <div className="logo">
          <span>S</span>
          <div>
            She Space
            <small>WELLNESS, YOUR WAY</small>
          </div>
        </div>
        <nav>
          {nav.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? "active" : ""}
              onClick={() => navigate(item.id)}
            >
              <Icon name={item.id} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-quote">
          <Icon name="sparkle" />
          <p>Small steps count.</p>
          <span>Be gentle with yourself today.</span>
        </div>
      </aside>

      <main>
        <header>
          <div>
            <span>{active === "overview" ? "THURSDAY, MAY 15" : "SHE SPACE"}</span>
            <h1>{title}</h1>
            {active === "overview" && (
              <p>Here's what's happening with your body today.</p>
            )}
          </div>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifications">
              <Icon name="bell" />
              <i />
            </button>
            <button className="profile-button">
              <span>M</span>
              <div>
                <b>Maya Singh</b>
                <small>View profile</small>
              </div>
              <Icon name="arrow" size={15} />
            </button>
          </div>
        </header>

        <div className="content">
          {active === "overview" && <Overview onView={navigate} />}
          {active === "calendar" && <CalendarView />}
          {active === "mood" && <MoodView />}
          {active === "ai" && <AiView />}
          {!["overview", "calendar", "mood", "ai"].includes(active) && (
            <Placeholder view={active} />
          )}
        </div>
      </main>

      <nav className="bottom-nav">
        {nav.slice(0, 5).map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "active" : ""}
            onClick={() => navigate(item.id)}
          >
            <Icon name={item.id} />
            <span>
              {item.id === "calendar"
                ? "Calendar"
                : item.id === "mood"
                  ? "Check-in"
                  : item.id === "learn"
                    ? "Learn"
                    : item.label.replace("SheSpace ", "")}
            </span>
          </button>
