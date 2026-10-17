import { Icon } from "@/components/Icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__in">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <div className="site-footer__brandrow">
              <span className="brand__mark" aria-hidden="true">
                <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </span>
              <p className="site-footer__name">Relay</p>
            </div>
            <p className="site-footer__tag">
              Alat pengiriman pesan Discord melalui Bot API resmi.
            </p>
          </div>

          <p className="site-footer__text">
            Relay adalah alat independen dan tidak berafiliasi dengan Discord Inc. Discord adalah
            merek dagang milik Discord Inc.
          </p>

          <p className="site-footer__text">
            Bot Token dan isi pesan tidak disimpan di database Relay. Informasi diproses melalui
            aplikasi dan Discord Bot API untuk menjalankan fitur pengiriman.
          </p>
        </div>
        <div className="site-footer__bar">
          <span>&copy; 2026 Relay</span>
          <span>Discord Bot API resmi</span>
        </div>
      </div>
    </footer>
  );
}
