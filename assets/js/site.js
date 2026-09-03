/* =========================================================================
 * 사단법인 한반도 양식 기술보급협회 — 공통 스크립트
 * -------------------------------------------------------------------------
 * 이 파일 하나로 아래 기능을 모두 처리합니다.
 *   1) 사이트 기본 정보(연락처·주소 등) — SITE 객체만 고치면 전 페이지 반영
 *   2) 헤더 / 푸터 자동 삽입 (메뉴 수정도 여기 한 곳에서)
 *   3) 한국어 / 영어 전환
 *   4) 모바일 메뉴, 아코디언(FAQ), 갤러리 라이트박스
 *   5) 숫자 카운트업, 스크롤 등장 효과, 맨 위로 버튼
 *   6) 게시판 검색 (문의·신청은 전화·문자로 받습니다)
 * ========================================================================= */

/* =========================================================
 * 1. 사이트 기본 정보  ← 연락처·주소가 바뀌면 여기만 수정
 * ========================================================= */
const SITE = {
  nameKo: '사단법인 한반도양식기술보급협회',
  nameEn: 'Korea Peninsula Aquaculture Technology Association',
  shortKo: '한반도양식기술보급협회',
  shortEn: 'KPATA',
  ceoKo: '김창운',
  ceoEn: 'Kim Chang-woon',
  tel: '02-780-3880',
  telHref: '027803880',
  mobile: '010-2600-2608',
  mobileHref: '01026002608',
  fax: '02-780-3870',
  email: 'seoul4624@naver.com',
  // ※ 주소는 사업자등록증(국세청) 기재 기준입니다.
  addressKo: '서울특별시 영등포구 국회대로 800, 604호 (여의도동, 여의도 파라곤)',
  addressEn: '#604 Yeouido Paragon, 800 Gukhoe-daero, Yeongdeungpo-gu, Seoul, Korea',
  siteKo: '사업 부지 : 인천광역시 강화군 삼산면 상리 619',
  siteEn: 'Project site: 619 Sang-ri, Samsan-myeon, Ganghwa-gun, Incheon',
  labKo: '한반도해안천여의도연구소',
  labEn: 'Hanbando Coastal Stream Yeouido Research Institute',
  bizNo: '444-82-00341',            // 사업자등록번호
  regNo: '해양수산부 산하 제278호',   // 법인 등록
  copyrightNo: '제C-2016-017641호',  // 엠블럼 저작등록
  hoursKo: '평일 09:00 – 18:00 / 점심 12:00 – 13:00 (주말·공휴일 휴무)',
  hoursEn: 'Weekdays 09:00 – 18:00 (Closed on weekends & holidays)',
  bankKo: '수협',
  accountNo: '1010-1884-2957',
  accountOwnerKo: '한반도양식기술보급협회',
  sns: {
    youtube: '#',
    instagram: '#',
    facebook: '#',
    blog: '#'
  }
};

/* =========================================================
 * 2. 메뉴 구성  ← 메뉴를 추가/삭제하려면 이 배열만 수정
 * ========================================================= */
const NAV_ITEMS = [
  { href: 'index.html',    ko: '홈',          en: 'Home' },
  { href: 'about.html',    ko: '소개·인사말',  en: 'About' },
  { href: 'business.html', ko: '사업 안내',    en: 'Programs' },
  { href: 'news.html',     ko: '공지·소식',    en: 'News' },
  { href: 'gallery.html',  ko: '갤러리',       en: 'Gallery' },
  { href: 'location.html', ko: '오시는 길',    en: 'Location' },
  { href: 'apply.html',    ko: '신청·예약',    en: 'Apply' },
  { href: 'support.html',  ko: '후원',         en: 'Support' },
  { href: 'faq.html',      ko: 'FAQ',         en: 'FAQ' },
  { href: 'contact.html',  ko: '문의하기',     en: 'Contact' }
];

/* =========================================================
 * 3. 아이콘 (인라인 SVG)
 * ========================================================= */
const ICON = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.8-.5-5.6a3 3 0 0 0-2.1-2.1C18.6 3.8 12 3.8 12 3.8s-6.6 0-8.4.5a3 3 0 0 0-2.1 2.1C1 8.2 1 12 1 12s0 3.8.5 5.6a3 3 0 0 0 2.1 2.1c1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5a3 3 0 0 0 2.1-2.1C23 15.8 23 12 23 12ZM9.8 15.4V8.6l5.9 3.4-5.9 3.4Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.3 3 10.3 4.5 10.3 7v2H8v3h2.3v9H14v-9h2.7l.3-3H14Z"/></svg>',
  blog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h5"/></svg>',
  top: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg>'
};

/* 로고 마크 (실제 로고 이미지를 받으면 <img>로 교체하세요) */
const LOGO_MARK = `
<svg class="brand__mark" viewBox="0 0 64 64" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2=".4" y2="1">
      <stop offset="0" stop-color="#1d4356"/>
      <stop offset="1" stop-color="#0b1a24"/>
    </linearGradient>
  </defs>
  <!-- 방패형 인장 -->
  <path d="M32 2 58 10v24c0 15-11 24-26 28C17 58 6 49 6 34V10L32 2Z" fill="url(#lg)"/>
  <path d="M32 6 54 12.8V34c0 12.6-9.2 20.4-22 24-12.8-3.6-22-11.4-22-24V12.8L32 6Z" fill="none" stroke="#c4ac74" stroke-width="1.2" opacity=".8"/>
  <!-- 지하 수평선 -->
  <path d="M13 34h38" stroke="#c4ac74" stroke-width="1.4" opacity=".55"/>
  <!-- 물결 -->
  <path d="M14 41c4.5-4 8-4 12.5 0s8 4 12.5 0 8-4 11-1.6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".92"/>
  <path d="M14 48.5c4.5-4 8-4 12.5 0s8 4 12.5 0 8-4 11-1.6" fill="none" stroke="#c4ac74" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>
  <!-- 해 -->
  <circle cx="32" cy="23" r="7.5" fill="none" stroke="#fff" stroke-width="2.2" opacity=".9"/>
  <path d="M32 15.5v15" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>
</svg>`;

/* =========================================================
 * 4. 헤더 / 푸터 만들기
 * ========================================================= */
function currentPage() {
  const path = location.pathname.split('/').pop();
  return !path || path === '' ? 'index.html' : path;
}

function buildHeader() {
  const here = currentPage();
  const links = NAV_ITEMS.map(function (item) {
    const active = item.href === here ? ' is-active' : '';
    const aria = item.href === here ? ' aria-current="page"' : '';
    return `<li><a class="nav__link${active}" href="${item.href}"${aria}>
      <span data-lang="ko">${item.ko}</span><span data-lang="en">${item.en}</span>
    </a></li>`;
  }).join('');

  return `
<div class="topbar">
  <div class="wrap">
    <div class="topbar__info">
      <span>${ICON.phone}<a href="tel:${SITE.telHref}">${SITE.tel}</a></span>
      <span>${ICON.phone}<a href="tel:${SITE.mobileHref}">${SITE.mobile}</a></span>
      <span>${ICON.mail}<a href="mailto:${SITE.email}">${SITE.email}</a></span>
    </div>
    <div class="topbar__links">
      <a href="apply.html"><span data-lang="ko">교육 신청</span><span data-lang="en">Apply</span></a>
      <a href="support.html"><span data-lang="ko">후원 안내</span><span data-lang="en">Support</span></a>
    </div>
  </div>
</div>
<header class="site-header" id="siteHeader">
  <div class="wrap">
    <a class="brand" href="index.html">
      ${LOGO_MARK}
      <span class="brand__text">
        <span class="brand__ko"><span data-lang="ko">한반도양식기술보급협회</span><span data-lang="en">KPATA</span></span>
        <span class="brand__en"><span data-lang="ko">Korea Peninsula Aquaculture Tech.</span><span data-lang="en">Aquaculture Technology Association</span></span>
      </span>
    </a>

    <nav class="nav" id="mainNav" aria-label="주 메뉴">
      <ul style="display:contents">${links}</ul>
      <div class="nav__extra">
        <div class="lang-toggle" role="group" aria-label="언어 선택">
          <button type="button" data-set-lang="ko">KOR</button>
          <button type="button" data-set-lang="en">ENG</button>
        </div>
        <a class="btn btn--primary btn--sm" href="contact.html">
          <span data-lang="ko">문의하기</span><span data-lang="en">Contact</span>
        </a>
      </div>
    </nav>

    <div class="header__actions">
      <div class="lang-toggle" role="group" aria-label="언어 선택">
        <button type="button" data-set-lang="ko">KOR</button>
        <button type="button" data-set-lang="en">ENG</button>
      </div>
      <a class="btn btn--primary btn--sm" href="contact.html">
        <span data-lang="ko">문의하기</span><span data-lang="en">Contact</span>
      </a>
      <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="mainNav" aria-label="메뉴 열기">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`;
}

function buildFooter() {
  const col1 = NAV_ITEMS.slice(1, 6);
  const col2 = NAV_ITEMS.slice(6);
  const linkList = (arr) => arr.map(function (i) {
    return `<a href="${i.href}"><span data-lang="ko">${i.ko}</span><span data-lang="en">${i.en}</span></a>`;
  }).join('');

  return `
<footer class="site-footer">
  <div class="wrap footer__top">
    <div class="footer__brand">
      <div class="brand">
        ${LOGO_MARK}
        <span class="brand__text">
          <span class="brand__ko">${SITE.shortKo}</span>
          <span class="brand__en">${SITE.shortEn}</span>
        </span>
      </div>
      <p class="footer__desc">
        <span data-lang="ko">친환경 무동력 터널형 스마트 양식 플랜트와 에너지 자립형 스마트 염전 기술로 기후 위기 시대의 식량 안보 해법을 만들어 갑니다.</span>
        <span data-lang="en">Building food-security solutions for the climate era through power-free tunnel aquaculture plants and energy-independent smart salt farms.</span>
      </p>
      <div class="sns">
        <a href="${SITE.sns.youtube}" aria-label="YouTube" target="_blank" rel="noopener">${ICON.youtube}</a>
        <a href="${SITE.sns.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${ICON.instagram}</a>
        <a href="${SITE.sns.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${ICON.facebook}</a>
        <a href="${SITE.sns.blog}" aria-label="Blog" target="_blank" rel="noopener">${ICON.blog}</a>
      </div>
    </div>

    <div>
      <h4><span data-lang="ko">바로가기</span><span data-lang="en">Menu</span></h4>
      <nav class="footer__links">${linkList(col1)}</nav>
    </div>

    <div>
      <h4><span data-lang="ko">참여하기</span><span data-lang="en">Get Involved</span></h4>
      <nav class="footer__links">${linkList(col2)}</nav>
    </div>

    <div>
      <h4><span data-lang="ko">연락처</span><span data-lang="en">Contact</span></h4>
      <div class="footer__contact">
        <span><strong>T.</strong> <a href="tel:${SITE.telHref}">${SITE.tel}</a> · <a href="tel:${SITE.mobileHref}">${SITE.mobile}</a></span>
        <span><strong>F.</strong> ${SITE.fax}</span>
        <span><strong>E.</strong> <a href="mailto:${SITE.email}">${SITE.email}</a></span>
        <span data-lang="ko"><strong>주소.</strong> ${SITE.addressKo}</span>
        <span data-lang="en"><strong>Address.</strong> ${SITE.addressEn}</span>
        <span data-lang="ko"><strong>부지.</strong> 인천광역시 강화군 삼산면 상리 619</span>
        <span data-lang="en"><strong>Site.</strong> 619 Sang-ri, Samsan-myeon, Ganghwa-gun, Incheon</span>
        <span data-lang="ko"><strong>운영.</strong> ${SITE.hoursKo}</span>
        <span data-lang="en"><strong>Hours.</strong> ${SITE.hoursEn}</span>
      </div>
    </div>
  </div>

  <div class="wrap footer__bottom">
    <p>
      <span data-lang="ko">© ${new Date().getFullYear()} ${SITE.nameKo}. All rights reserved. · 대표 ${SITE.ceoKo}</span>
      <span data-lang="en">© ${new Date().getFullYear()} ${SITE.nameEn}. All rights reserved. · CEO ${SITE.ceoEn}</span>
    </p>
    <nav>
      <a href="#"><span data-lang="ko">개인정보처리방침</span><span data-lang="en">Privacy Policy</span></a>
      <a href="#"><span data-lang="ko">이용약관</span><span data-lang="en">Terms</span></a>
      <a href="contact.html"><span data-lang="ko">문의</span><span data-lang="en">Contact</span></a>
    </nav>
  </div>
</footer>

<div class="quick">
  <a href="tel:${SITE.telHref}" aria-label="전화 문의">${ICON.phone}</a>
  <a href="location.html" aria-label="오시는 길">${ICON.pin}</a>
  <button type="button" class="quick__top" id="toTop" aria-label="맨 위로">${ICON.top}</button>
</div>`;
}

/* =========================================================
 * 5. 언어 전환
 * ========================================================= */
function setLang(lang) {
  const value = lang === 'en' ? 'en' : 'ko';
  document.documentElement.setAttribute('lang', value);
  try { localStorage.setItem('kpata-lang', value); } catch (e) { /* 무시 */ }

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.classList.toggle('is-active', btn.dataset.setLang === value);
  });
  // placeholder 등 속성 번역
  document.querySelectorAll('[data-ko-placeholder]').forEach(function (el) {
    el.setAttribute('placeholder', value === 'en'
      ? (el.dataset.enPlaceholder || el.dataset.koPlaceholder)
      : el.dataset.koPlaceholder);
  });
}

function initLang() {
  let saved = 'ko';
  try { saved = localStorage.getItem('kpata-lang') || 'ko'; } catch (e) { /* 무시 */ }
  setLang(saved);
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-set-lang]');
    if (btn) setLang(btn.dataset.setLang);
  });
}

/* =========================================================
 * 6. 모바일 메뉴
 * ========================================================= */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* =========================================================
 * 7. 헤더 그림자 + 맨 위로 버튼
 * ========================================================= */
function initScrollUI() {
  const header = document.getElementById('siteHeader');
  const toTop = document.getElementById('toTop');

  // 화면 맨 위에 읽은 만큼 채워지는 가는 막대
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 500);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* =========================================================
 * 8. 스크롤 등장 효과
 * ========================================================= */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  items.forEach(function (el) { io.observe(el); });
}

/* =========================================================
 * 9. 숫자 카운트업 (data-count="1200")
 * ========================================================= */
/* 숫자는 애니메이션 없이 바로 표시합니다 (기관 자료는 값이 먼저 보이는 편이 낫습니다) */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(function (el) {
    el.textContent = Number(el.dataset.count).toLocaleString('ko-KR');
  });
}

/* =========================================================
 * 10. 아코디언 (FAQ)
 * ========================================================= */
function initAccordion() {
  document.querySelectorAll('.accordion__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.accordion__item');
      const open = item.classList.contains('is-open');
      item.classList.toggle('is-open', !open);
      btn.setAttribute('aria-expanded', String(!open));
    });
  });
}

/* =========================================================
 * 11. 탭 필터 (게시판·갤러리)
 * ========================================================= */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    const targetSel = group.dataset.tabs;
    group.addEventListener('click', function (e) {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      group.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');

      const filter = tab.dataset.filter;
      document.querySelectorAll(targetSel + ' [data-cat]').forEach(function (row) {
        const show = filter === 'all' || row.dataset.cat === filter;
        row.style.display = show ? '' : 'none';
      });
    });
  });
}

/* =========================================================
 * 12. 갤러리 라이트박스
 * ========================================================= */
function initLightbox() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="닫기">✕</button>
    <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="이전">‹</button>
    <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="다음">›</button>
    <div>
      <img alt="">
      <p class="lightbox__caption"></p>
    </div>`;
  document.body.appendChild(box);

  const img = box.querySelector('img');
  const cap = box.querySelector('.lightbox__caption');
  let index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    const source = items[index].querySelector('img');
    img.src = source.getAttribute('src');
    img.alt = source.getAttribute('alt') || '';
    cap.textContent = source.getAttribute('alt') || '';
  }
  function open(i) { show(i); box.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function close() { box.classList.remove('is-open'); document.body.style.overflow = ''; }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
  });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}

/* =========================================================
 * 13. 문의 · 신청 접수 방식
 * ---------------------------------------------------------
 *   현재는 온라인 양식을 쓰지 않습니다.
 *   문의 · 신청 · 후원 모두 전화와 문자로 받고 있으며,
 *   각 페이지의 <a href="tel:..."> / <a href="sms:..."> 버튼이
 *   방문자의 통화 · 메시지 앱을 바로 엽니다. 별도 스크립트가 필요 없습니다.
 *
 *   ── 나중에 온라인 접수를 붙이고 싶다면 ──────────────────
 *   신청 내역을 표로 쌓아 관리하려면 저장할 곳이 필요합니다.
 *   Supabase를 붙일 경우 아래 형태로 이 자리에 추가하면 됩니다.
 *
 *   const SUPABASE_URL = '프로젝트 주소';
 *   const SUPABASE_KEY = '공개 키(anon key)';
 *
 *   function submitToSupabase(table, data) {
 *     return fetch(SUPABASE_URL + '/rest/v1/' + table, {
 *       method: 'POST',
 *       headers: {
 *         'Content-Type': 'application/json',
 *         apikey: SUPABASE_KEY,
 *         Authorization: 'Bearer ' + SUPABASE_KEY
 *       },
 *       body: JSON.stringify(data)
 *     });
 *   }
 *
 *   그리고 각 페이지에 <form> 을 되살린 뒤 submit 이벤트에서 호출합니다.
 *   ※ 공개 키는 브라우저에 노출되므로, Supabase 쪽에서 RLS(행 수준 보안)로
 *     '쓰기만 허용, 읽기 금지' 정책을 반드시 걸어야 합니다.
 * ========================================================= */

/* =========================================================
 * 13-B. 게시판 검색 (브라우저 안에서 바로 걸러냅니다)
 * ========================================================= */
function initBoardSearch() {
  const input = document.getElementById('searchWord');
  const board = document.getElementById('board');
  if (!input || !board) return;

  function run() {
    const q = input.value.trim().toLowerCase();
    let hit = 0;
    board.querySelectorAll('[data-cat]').forEach(function (row) {
      const text = row.textContent.toLowerCase();
      const show = !q || text.indexOf(q) > -1;
      row.style.display = show ? '' : 'none';
      if (show) hit++;
    });
    const empty = document.getElementById('boardEmpty');
    if (empty) empty.style.display = hit ? 'none' : '';
  }

  input.addEventListener('input', run);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); run(); } });
  const btn = input.parentElement.querySelector('button');
  if (btn) btn.addEventListener('click', run);
}

/* =========================================================
 * 14. 실행
 * ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  const headerSlot = document.getElementById('header-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (headerSlot) headerSlot.innerHTML = buildHeader();
  if (footerSlot) footerSlot.innerHTML = buildFooter();

  initLang();
  initNav();
  initScrollUI();
  initReveal();
  initCounters();
  initAccordion();
  initTabs();
  initLightbox();
  initBoardSearch();
});
