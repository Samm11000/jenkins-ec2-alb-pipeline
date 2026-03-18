const express = require('express');
const app = express();
const PORT = 3000;

const homePage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Apple</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --white: #ffffff;
      --black: #1d1d1f;
      --gray: #6e6e73;
      --light: #f5f5f7;
      --blue: #0071e3;
      --blue-hover: #0077ed;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--white);
      color: var(--black);
      overflow-x: hidden;
    }

    /* NAV */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(255,255,255,0.85);
      backdrop-filter: saturate(180%) blur(20px);
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid rgba(0,0,0,0.08);
      height: 48px;
      display: flex; align-items: center; justify-content: center;
    }
    .nav-inner {
      max-width: 1024px; width: 100%;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 24px;
    }
    .nav-logo {
      font-size: 20px; font-weight: 300; letter-spacing: -0.5px;
      color: var(--black); text-decoration: none;
    }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a {
      font-size: 13px; color: var(--black); text-decoration: none;
      opacity: 0.8; transition: opacity 0.2s;
    }
    .nav-links a:hover { opacity: 1; }

    /* HERO */
    .hero {
      min-height: 100vh;
      background: var(--light);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center;
      padding: 100px 24px 60px;
      position: relative; overflow: hidden;
    }
    .hero-eyebrow {
      font-size: 17px; font-weight: 600; color: var(--blue);
      letter-spacing: 0.01em; margin-bottom: 12px;
      opacity: 0; transform: translateY(20px);
      animation: fadeUp 0.7s ease forwards 0.2s;
    }
    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(52px, 8vw, 96px);
      font-weight: 700; line-height: 1.04;
      letter-spacing: -0.025em;
      color: var(--black); margin-bottom: 20px;
      opacity: 0; transform: translateY(24px);
      animation: fadeUp 0.7s ease forwards 0.35s;
    }
    .hero-sub {
      font-size: clamp(19px, 2.5vw, 28px);
      font-weight: 300; color: var(--gray);
      letter-spacing: -0.01em; line-height: 1.4;
      max-width: 560px; margin-bottom: 40px;
      opacity: 0; transform: translateY(24px);
      animation: fadeUp 0.7s ease forwards 0.5s;
    }
    .hero-cta {
      display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
      opacity: 0; transform: translateY(20px);
      animation: fadeUp 0.7s ease forwards 0.65s;
    }
    .btn-primary {
      background: var(--blue); color: white;
      padding: 14px 28px; border-radius: 980px;
      font-size: 15px; font-weight: 500;
      text-decoration: none; transition: background 0.2s, transform 0.15s;
      display: inline-block;
    }
    .btn-primary:hover { background: var(--blue-hover); transform: scale(1.02); }
    .btn-secondary {
      background: transparent; color: var(--blue);
      padding: 14px 28px; border-radius: 980px;
      font-size: 15px; font-weight: 500;
      text-decoration: none; border: 1.5px solid var(--blue);
      transition: background 0.2s, transform 0.15s; display: inline-block;
    }
    .btn-secondary:hover { background: rgba(0,113,227,0.06); transform: scale(1.02); }
    .hero-image-wrap {
      margin-top: 64px; width: 100%; max-width: 700px;
      opacity: 0; transform: translateY(32px) scale(0.97);
      animation: fadeUp 0.9s ease forwards 0.8s;
    }
    .hero-product {
      width: 100%; border-radius: 28px;
      background: linear-gradient(135deg, #e8e8ed 0%, #d1d1d6 100%);
      aspect-ratio: 16/9;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    .product-glow {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 60% 40%, rgba(0,113,227,0.12), transparent 65%);
    }
    .product-label {
      font-family: 'Playfair Display', serif;
      font-size: 48px; font-weight: 700;
      color: rgba(29,29,31,0.18); letter-spacing: -1px;
      position: relative; z-index: 1;
    }

    /* SECTION common */
    section { padding: 100px 24px; }
    .section-inner { max-width: 1024px; margin: 0 auto; }
    .section-tag {
      font-size: 13px; font-weight: 600; color: var(--blue);
      letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 5vw, 56px); font-weight: 700;
      letter-spacing: -0.02em; line-height: 1.08; margin-bottom: 18px;
    }
    .section-body {
      font-size: 17px; color: var(--gray); line-height: 1.7;
      max-width: 560px; font-weight: 300;
    }

    /* PRODUCT GRID */
    .products { background: var(--white); }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px; margin-top: 60px;
    }
    .product-card {
      background: var(--light);
      border-radius: 20px; padding: 44px 32px 36px;
      display: flex; flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer; position: relative; overflow: hidden;
    }
    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    }
    .card-new {
      position: absolute; top: 20px; right: 20px;
      background: var(--blue); color: white;
      font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
      padding: 4px 10px; border-radius: 980px;
    }
    .card-icon {
      font-size: 48px; margin-bottom: 28px; display: block;
      line-height: 1;
    }
    .card-name {
      font-family: 'Playfair Display', serif;
      font-size: 28px; font-weight: 700;
      letter-spacing: -0.02em; margin-bottom: 8px;
    }
    .card-tagline {
      font-size: 15px; color: var(--gray);
      font-weight: 300; line-height: 1.5; margin-bottom: 28px; flex: 1;
    }
    .card-price { font-size: 13px; color: var(--gray); margin-bottom: 16px; }
    .card-link {
      font-size: 15px; color: var(--blue); font-weight: 500;
      text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
      transition: gap 0.2s;
    }
    .card-link:hover { gap: 8px; }

    /* FEATURE STRIP */
    .features { background: var(--black); color: white; }
    .features .section-title { color: white; }
    .features .section-body { color: rgba(255,255,255,0.55); }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2px; margin-top: 60px;
      border-radius: 18px; overflow: hidden;
    }
    .feature-item {
      background: rgba(255,255,255,0.04);
      padding: 36px 28px;
      transition: background 0.25s;
    }
    .feature-item:hover { background: rgba(255,255,255,0.08); }
    .feature-num {
      font-family: 'Playfair Display', serif;
      font-size: 44px; font-weight: 700;
      color: var(--blue); line-height: 1; margin-bottom: 10px;
    }
    .feature-label {
      font-size: 14px; color: rgba(255,255,255,0.6);
      font-weight: 300; line-height: 1.5;
    }

    /* TESTIMONIAL */
    .testimonial {
      background: var(--light);
      text-align: center;
    }
    .quote {
      font-family: 'Playfair Display', serif;
      font-size: clamp(24px, 3.5vw, 40px);
      font-weight: 400; font-style: italic;
      line-height: 1.35; letter-spacing: -0.01em;
      color: var(--black); max-width: 780px;
      margin: 0 auto 28px; padding-top: 20px;
    }
    .quote-author {
      font-size: 14px; color: var(--gray); font-weight: 500;
      letter-spacing: 0.04em; text-transform: uppercase;
    }

    /* FOOTER */
    footer {
      background: var(--light);
      border-top: 1px solid rgba(0,0,0,0.08);
      padding: 40px 24px;
    }
    .footer-inner {
      max-width: 1024px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 16px;
    }
    .footer-copy { font-size: 13px; color: var(--gray); }
    .footer-links { display: flex; gap: 20px; }
    .footer-links a { font-size: 13px; color: var(--gray); text-decoration: none; }
    .footer-links a:hover { color: var(--black); }

    /* ANIMATIONS */
    @keyframes fadeUp {
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .reveal {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    @media (max-width: 640px) {
      .nav-links { display: none; }
      .product-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <div class="nav-inner">
      <a class="nav-logo" href="#">&#63743;</a>
      <ul class="nav-links">
        <li><a href="#products">Store</a></li>
        <li><a href="#products">Mac</a></li>
        <li><a href="#products">iPhone</a></li>
        <li><a href="#products">iPad</a></li>
        <li><a href="#features">About</a></li>
        <li><a href="/check">Status</a></li>
      </ul>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <p class="hero-eyebrow">Introducing iPhone 16 Pro</p>
    <h1 class="hero-title">Think different.<br>Again.</h1>
    <p class="hero-sub">The most powerful chip we've ever built. A camera system that rewrites the rules. A design that endures.</p>
    <div class="hero-cta">
      <a href="#products" class="btn-primary">Shop now</a>
      <a href="#features" class="btn-secondary">Learn more</a>
    </div>
    <div class="hero-image-wrap">
      <div class="hero-product">
        <div class="product-glow"></div>
        <span class="product-label">iPhone 16 Pro</span>
      </div>
    </div>
  </section>

  <!-- PRODUCTS -->
  <section class="products" id="products">
    <div class="section-inner">
      <p class="section-tag reveal">Our lineup</p>
      <h2 class="section-title reveal">The best.<br>For every one.</h2>
      <p class="section-body reveal">From the most powerful Mac to the most personal iPhone — every product is designed to work beautifully together.</p>

      <div class="product-grid">

        <div class="product-card reveal">
          <span class="card-new">New</span>
          <span class="card-icon">📱</span>
          <h3 class="card-name">iPhone 16 Pro</h3>
          <p class="card-tagline">A18 Pro chip. 48 MP Fusion camera. Titanium design that feels impossible to put down.</p>
          <p class="card-price">From ₹1,19,900</p>
          <a href="#" class="card-link">Buy ›</a>
        </div>

        <div class="product-card reveal">
          <span class="card-icon">💻</span>
          <h3 class="card-name">MacBook Pro</h3>
          <p class="card-tagline">M4 Pro or M4 Max. Up to 24 hours battery. The most capable Mac laptop ever built.</p>
          <p class="card-price">From ₹1,99,900</p>
          <a href="#" class="card-link">Buy ›</a>
        </div>

        <div class="product-card reveal">
          <span class="card-new">New</span>
          <span class="card-icon">🎧</span>
          <h3 class="card-name">AirPods Pro</h3>
          <p class="card-tagline">Adaptive Audio. Personalised Spatial Audio. The hearing aid feature that changes everything.</p>
          <p class="card-price">From ₹24,900</p>
          <a href="#" class="card-link">Buy ›</a>
        </div>

        <div class="product-card reveal">
          <span class="card-icon">⌚</span>
          <h3 class="card-name">Apple Watch</h3>
          <p class="card-tagline">The most powerful health and fitness companion. Series 10 — thinnest Apple Watch ever.</p>
          <p class="card-price">From ₹46,900</p>
          <a href="#" class="card-link">Buy ›</a>
        </div>

        <div class="product-card reveal">
          <span class="card-icon">📟</span>
          <h3 class="card-name">iPad Pro</h3>
          <p class="card-tagline">M4 chip. Ultra Retina XDR OLED display. The thinnest Apple product ever made.</p>
          <p class="card-price">From ₹99,900</p>
          <a href="#" class="card-link">Buy ›</a>
        </div>

        <div class="product-card reveal">
          <span class="card-icon">🖥️</span>
          <h3 class="card-name">Mac Studio</h3>
          <p class="card-tagline">M4 Max or M4 Ultra. Up to 32-core CPU. Pro performance in an impossibly compact design.</p>
          <p class="card-price">From ₹2,29,900</p>
          <a href="#" class="card-link">Buy ›</a>
        </div>

      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="features" id="features">
    <div class="section-inner">
      <p class="section-tag reveal" style="color: #409cff;">By the numbers</p>
      <h2 class="section-title reveal">Built different<br>at every level.</h2>
      <p class="section-body reveal">Years of relentless engineering distilled into products that simply work — beautifully, reliably, intuitively.</p>

      <div class="feature-grid reveal">
        <div class="feature-item">
          <div class="feature-num">2B+</div>
          <div class="feature-label">Active devices worldwide</div>
        </div>
        <div class="feature-item">
          <div class="feature-num">M4</div>
          <div class="feature-label">Most powerful chip ever built</div>
        </div>
        <div class="feature-item">
          <div class="feature-num">26hr</div>
          <div class="feature-label">MacBook Pro battery life</div>
        </div>
        <div class="feature-item">
          <div class="feature-num">4K</div>
          <div class="feature-label">ProRes video on iPhone</div>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIAL -->
  <section class="testimonial">
    <div class="section-inner">
      <p class="quote reveal">"Once you've used an Apple product, everything else feels like a compromise."</p>
      <p class="quote-author reveal">— A customer, somewhere</p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-inner">
      <p class="footer-copy">Copyright &copy; 2025 Apple Clone Inc. All rights reserved.</p>
      <div class="footer-links">
        <a href="/check">API Status</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
    </div>
  </footer>

  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>

</body>
</html>`;

app.get('/', (req, res) => {
  res.send(homePage);
});

app.get('/check', (req, res) => {
  res.json({
    status: 'OK',
    message: 'App is running fine!',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Server chal raha hai port ${PORT} pe`);
});