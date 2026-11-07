import { useEffect, useState } from "react";
import { PHONE, PHONE_HREF, ORDER_URL, nav, stats, services, advantages, clients, docs } from "./data.js";

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Фантон">
      ФАН
      <svg className="sw" viewBox="0 0 20 32" aria-hidden="true">
        <circle cx="10" cy="3" r="2.4" />
        <rect x="8.7" y="5" width="2.6" height="4.5" />
        <rect x="1.5" y="9" width="17" height="3.2" rx="1.6" />
        <polygon points="7.3,12.2 12.7,12.2 12.7,25.5 10,31.5 7.3,25.5" />
      </svg>
      ОН
    </a>
  );
}

function Header() {
  return (
    <header>
      <div className="wrap">
        <Logo />
        <nav>{nav.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
        <a className="btn" href={PHONE_HREF}>{PHONE}</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="wrap">
        <h1>Надёжная охрана вашего бизнеса в Екатеринбурге</h1>
        <p>Частное охранное предприятие «Фантон» более 10 лет обеспечивает безопасность объектов, мероприятий и частных лиц в Екатеринбурге и Свердловской области.</p>
        <div className="row">
          <a className="btn" href="#contact">Оформить заявку</a>
          <a className="btn ghost" href="#services">Наши услуги</a>
        </div>
        <div className="stats">
          {stats.map(([b, t]) => <div key={b}><b>{b}</b><span>{t}</span></div>)}
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, lead, alt, children }) {
  return (
    <section id={id} className={alt ? "alt" : undefined}>
      <div className="wrap">
        <h2>{title}</h2>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </section>
  );
}

function Docs() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <Section id="docs" alt title="Документы" lead="Лицензии и подтверждающие документы предприятия. Открываются в полном размере.">
      <div className="grid">
        {docs.map((d) => (
          <button key={d.n} className="card doc" onClick={() => setOpen(d.src)}>
            <span className="thumb"><img src={d.src} alt={`Документ ${d.n}`} loading="lazy" /></span>
            <p>Открыть скан →</p>
          </button>
        ))}
      </div>
      <div className={"lb" + (open ? " on" : "")} role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        <button className="lb-x" aria-label="Закрыть" onClick={() => setOpen(null)}>×</button>
        {open && <img src={open} alt="" />}
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Section id="services" title="Услуги" lead="Вооружённая и невооружённая охрана, технические средства и консультации — всё в одном месте.">
          <div className="grid">
            {services.map(([t, d]) => (
              <div className="card" key={t}><i /><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </Section>
        <Section id="why" alt title="Почему нам доверяют" lead="Надёжность и профессионализм — основа нашей работы.">
          <ul className="adv">{advantages.map((a) => <li key={a}>{a}</li>)}</ul>
        </Section>
        <Section id="clients" title="Нам доверяют" lead="Среди постоянных клиентов — малый бизнес и крупные предприятия.">
          <div className="chips">{clients.map((c) => <span key={c}>{c}</span>)}</div>
        </Section>
        <Docs />
        <section id="contact" className="cta">
          <div className="wrap">
            <h2>Обсудим охрану вашего объекта</h2>
            <p>Коммерческий отдел — по вопросам сотрудничества. Подберём решение и рассчитаем стоимость.</p>
            <a className="phone" href={PHONE_HREF}>{PHONE}</a>
            <p style={{ marginTop: 0 }}>Звоните в любое время</p>
            <a className="btn" href={ORDER_URL}>Оформить заявку</a>
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap">
          <span>© ЧОП «Фантон», Екатеринбург</span>
          <span>Охрана объектов · Телохранители · Видеонаблюдение</span>
        </div>
      </footer>
    </>
  );
}
