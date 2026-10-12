import { Icon } from './Icon'

export function LandingHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__surface">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              TOOLING UNTUK ROBLOX STUDIO
            </p>

            <h2 className="hero__title" id="hero-title">
              Dari data avatar mentah menjadi <span>kode Lua yang rapi.</span>
            </h2>

            <p className="hero__description">
              Tempel daftar ID atau data JSON avatar Roblox. RigForge menyusun script Lua secara
              otomatis, langsung di browser—tanpa akun dan tanpa mengunggah datamu.
            </p>

            <div className="hero__actions">
              <a className="hero__cta hero__cta--primary" href="#konverter">
                Mulai konversi <Icon name="arrow" size={18} />
              </a>
              <a className="hero__cta hero__cta--secondary" href="#format-input">
                Lihat format input
              </a>
            </div>

            <div className="hero__proof" aria-label="Keunggulan RigForge">
              <span className="hero__proof-item">
                <span className="hero__proof-icon"><Icon name="check" size={14} /></span>
                Diproses lokal
              </span>
              <span className="hero__proof-item">
                <span className="hero__proof-icon"><Icon name="check" size={14} /></span>
                Tanpa login
              </span>
              <span className="hero__proof-item">
                <span className="hero__proof-icon"><Icon name="check" size={14} /></span>
                Siap salin ke Studio
              </span>
            </div>
          </div>

          <div
            className="hero__visual"
            role="img"
            aria-label="Ilustrasi proses data avatar diubah menjadi kode Lua, seluruhnya di browser"
          >
            <div className="hero__window">
              <div className="hero__window-top">
                <div className="hero__window-brand">
                  <span className="hero__window-mark"><Icon name="brackets" size={16} /></span>
                  <span>RIGFORGE <span className="hero__window-slash">/</span> WORKSPACE</span>
                </div>
                <span className="hero__local-pill"><span /> LOCAL</span>
              </div>

              <div className="hero__preview-flow">
                <div className="hero__mini-card hero__mini-card--input">
                  <div className="hero__mini-head">
                    <span className="hero__mini-icon"><Icon name="prompt" size={15} /></span>
                    <div>
                      <span className="hero__mini-label">01 / INPUT</span>
                      <strong>Data avatar</strong>
                    </div>
                    <span className="hero__mini-tag">RAW</span>
                  </div>
                  <div className="hero__data-list">
                    <div><span>Head</span><code>7825…2204</code></div>
                    <div><span>Torso</span><code>1142…7907</code></div>
                    <div><span>TShirt</span><code>7444…0125</code></div>
                    <div><span>Pants</span><code>1239…3652</code></div>
                  </div>
                  <div className="hero__mini-foot"><span className="hero__tiny-dot" /> Data siap dibaca</div>
                </div>

                <div className="hero__flow-arrow" aria-hidden="true">
                  <Icon name="arrow" size={20} />
                </div>

                <div className="hero__mini-card hero__mini-card--output">
                  <div className="hero__mini-head">
                    <span className="hero__mini-icon"><Icon name="brackets" size={15} /></span>
                    <div>
                      <span className="hero__mini-label">02 / OUTPUT</span>
                      <strong>Script Lua</strong>
                    </div>
                    <span className="hero__mini-tag">LUA</span>
                  </div>
                  <pre className="hero__code"><code>{`return {
  Body = {
    Head = 7825...,
    Torso = 1142...,
  },
  SkinTone = "#F2D7CD",
  Clothes = { ... }
}`}</code></pre>
                  <div className="hero__mini-foot"><span className="hero__tiny-dot" /> Siap disalin</div>
                </div>
              </div>

              <div className="hero__window-bottom">
                <span>AVATAR DATA <span>→</span> LUA MODULE</span>
                <span className="hero__window-status"><Icon name="check" size={12} /> CONVERSION READY</span>
              </div>
            </div>
            <div className="hero__visual-note"><span /> Contoh tampilan · data ilustratif</div>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    number: '01',
    icon: 'prompt' as const,
    title: 'Tempel data avatar',
    description: 'Gunakan daftar token seperti Head: 123 atau data JSON dari sumber avatarmu.',
  },
  {
    number: '02',
    icon: 'refresh' as const,
    title: 'Konversi otomatis',
    description: 'RigForge memetakan ID ke template Lua dan memperbarui hasil saat input berubah.',
  },
  {
    number: '03',
    icon: 'copy' as const,
    title: 'Salin ke Studio',
    description: 'Tinjau hasilnya, lalu salin seluruh script untuk digunakan di Roblox Studio.',
  },
]

export function HowItWorks() {
  return (
    <section className="how-it-works" id="cara-kerja" aria-labelledby="how-title">
      <div className="container">
        <div className="how-it-works__heading">
          <p className="section-kicker">ALUR SINGKAT</p>
          <h2 id="how-title">Dari input ke Lua dalam tiga langkah.</h2>
          <p>Tanpa instalasi, tanpa akun, dan tanpa mengirim data ke server.</p>
        </div>

        <div className="how-it-works__grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <div className="step-card__top">
                <span className="step-card__icon"><Icon name={step.icon} size={20} /></span>
                <span className="step-card__number">{step.number}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="privacy-note">
          <span className="privacy-note__icon"><Icon name="check" size={16} /></span>
          <p><strong>Privasi sejak awal.</strong> Data yang ditempel diproses di browser perangkatmu dan tidak dikirim ke server.</p>
        </div>
      </div>
    </section>
  )
}
