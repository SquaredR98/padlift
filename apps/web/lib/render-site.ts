/**
 * Renders a published site as a full HTML document.
 * Shared by /s/[slug] (slug access) and /s/_custom-domain (custom domain access).
 */

interface SiteData {
  id: string;
  name: string;
  templateId?: string | null;
  ga4MeasurementId: string | null;
  gtmContainerId: string | null;
  clarityProjectId: string | null;
  defaultTheme?: 'dark' | 'light';
  headingFont?: string;
  bodyFont?: string;
  /** @deprecated Use headingFont + bodyFont */
  fontFamily?: string;
  showBadge?: boolean;
  analyticsEnabled?: boolean;
  pages: Array<{
    publishedHtml: string | null;
    publishedCss: string | null;
    publishedJs: string | null;
  }>;
}

export function renderSiteHtml(site: SiteData, pageIndex = 0): Response | null {
  const page = site.pages[pageIndex];
  if (!page?.publishedHtml) return null;

  const html = page.publishedHtml;
  const css = page.publishedCss ?? '';
  const js = page.publishedJs ?? '';
  const defaultTheme = site.defaultTheme || 'dark';
  const headingFont = site.headingFont || site.fontFamily || 'Inter';
  const bodyFont = site.bodyFont || site.fontFamily || 'Inter';

  const ga4Id = site.ga4MeasurementId;
  const gtmId = site.gtmContainerId;
  const clarityId = site.clarityProjectId;

  const analyticsHead = [
    ga4Id
      ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>
         <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');</script>`
      : '',
    gtmId
      ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`
      : '',
    clarityId
      ? `<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  const gtmNoscript = gtmId
    ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
    : '';

  // "Built with" badge (shown unless plan allows removeBranding)
  const badgeHtml = site.showBadge
    ? `<a href="https://padlift.dev" target="_blank" rel="noopener noreferrer" class="lp-badge">Built with Padlift</a>`
    : '';

  // Block builder and template sites use Tailwind classes — include CDN play script.
  const usesTailwind = !!site.templateId || html.includes('class="');
  const tailwindCdn = usesTailwind
    ? `<script src="https://cdn.tailwindcss.com"></script>`
    : '';

  // Google Fonts links — load heading + body fonts (deduplicated)
  const fontFamilies = [...new Set([headingFont, bodyFont, 'Inter'])];
  const fontLinks = fontFamilies
    .map((f) => `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}:wght@400;500;600;700&display=swap" />`)
    .join('\n  ');

  const fullHtml = `<!DOCTYPE html>
<html lang="en" data-site-theme="${defaultTheme}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(site.name)}</title>
  ${fontLinks}
  ${tailwindCdn}
  <style>
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; scroll-padding-top: 80px; }
    body { margin: 0; font-family: '${bodyFont}', 'Inter', system-ui, -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
    h1, h2, h3, h4, h5, h6 { font-family: '${headingFont}', 'Inter', system-ui, -apple-system, sans-serif; }
    img { max-width: 100%; }
    a { color: inherit; }

    /* ── Site Theme Variables ── */
    [data-site-theme="dark"] {
      --lp-site-bg: #030712;
      --lp-site-card: #111827;
      --lp-site-card-hover: #1f2937;
      --lp-site-heading: #ffffff;
      --lp-site-body: #94a3b8;
      --lp-site-muted: #64748b;
      --lp-site-dimmed: #475569;
      --lp-site-border: #1f2937;
      --lp-site-border-subtle: rgba(255, 255, 255, 0.05);
      --lp-site-input-bg: #111827;
      --lp-site-input-border: #1f2937;
      --lp-site-badge-bg: rgba(255, 255, 255, 0.05);
      --lp-site-badge-border: rgba(255, 255, 255, 0.1);
      --lp-site-badge-text: #e2e8f0;
      --lp-site-ghost-hover: rgba(255, 255, 255, 0.05);
      --lp-site-avatar-ring: #030712;
      --lp-site-check: #34d399;
      --lp-site-divider: #1f2937;
    }
    [data-site-theme="light"] {
      --lp-site-bg: #ffffff;
      --lp-site-card: #f8fafc;
      --lp-site-card-hover: #f1f5f9;
      --lp-site-heading: #0f172a;
      --lp-site-body: #334155;
      --lp-site-muted: #64748b;
      --lp-site-dimmed: #94a3b8;
      --lp-site-border: #e2e8f0;
      --lp-site-border-subtle: rgba(0, 0, 0, 0.06);
      --lp-site-input-bg: #f8fafc;
      --lp-site-input-border: #cbd5e1;
      --lp-site-badge-bg: rgba(0, 0, 0, 0.04);
      --lp-site-badge-border: rgba(0, 0, 0, 0.1);
      --lp-site-badge-text: #1e293b;
      --lp-site-ghost-hover: rgba(0, 0, 0, 0.04);
      --lp-site-avatar-ring: #ffffff;
      --lp-site-check: #059669;
      --lp-site-divider: #e2e8f0;
    }

    @keyframes lpFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    [data-lp-section]{opacity:0;transform:translateY(20px);transition:opacity 0.6s ease-out,transform 0.6s ease-out;}
    [data-lp-section][data-revealed]{opacity:1;transform:translateY(0);}
    [data-lp-section]:first-child{opacity:1;transform:none;}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .animate-shimmer{background-size:200% 100%;animation:shimmer 3s ease-in-out infinite;}
    @keyframes fade-in{from{opacity:0}to{opacity:1}}
    @keyframes slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scale-in{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
    @keyframes blur-in{from{opacity:0;filter:blur(8px)}to{opacity:1;filter:blur(0)}}
    @keyframes slide-left{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
    @keyframes slide-right{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
    @keyframes bounce-in{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{opacity:1;transform:scale(1)}}
    .animate-fade-in{animation:fade-in .6s ease-out both}
    .animate-slide-up{animation:slide-up .6s ease-out both}
    .animate-scale-in{animation:scale-in .5s ease-out both}
    .animate-blur-in{animation:blur-in .6s ease-out both}
    .animate-slide-left{animation:slide-left .6s ease-out both}
    .animate-slide-right{animation:slide-right .6s ease-out both}
    .animate-bounce-in{animation:bounce-in .6s cubic-bezier(.68,-.55,.265,1.55) both}

    /* Theme toggle button */
    .lp-theme-toggle{position:fixed;bottom:20px;right:20px;z-index:9999;width:40px;height:40px;border-radius:50%;border:1px solid var(--lp-site-border);background:var(--lp-site-card);color:var(--lp-site-body);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.2);transition:background .2s,color .2s,border-color .2s;}
    .lp-theme-toggle:hover{background:var(--lp-site-card-hover);color:var(--lp-site-heading);}
    .lp-theme-toggle svg{width:18px;height:18px;}
    /* Built-with badge */
    .lp-badge{position:fixed;bottom:20px;left:20px;z-index:9998;padding:6px 14px;border-radius:8px;background:var(--lp-site-card);color:var(--lp-site-muted);font-size:11px;font-family:system-ui,-apple-system,sans-serif;text-decoration:none;border:1px solid var(--lp-site-border);backdrop-filter:blur(8px);opacity:0.7;transition:opacity .2s,color .2s;}
    .lp-badge:hover{opacity:1;color:var(--lp-site-heading);}
    ${css}
  </style>
  ${analyticsHead}
</head>
<body>
  ${gtmNoscript}
  ${html}

  ${badgeHtml}
  <!-- Theme toggle -->
  <button class="lp-theme-toggle" id="lp-theme-toggle" aria-label="Toggle theme">
    <svg id="lp-sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="display:none"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    <svg id="lp-moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  </button>

  ${js ? `<script>${js}</script>` : ''}
  <script>
  (function(){
    var SITE_ID="${site.id}";
    var DEFAULT_THEME="${defaultTheme}";
    var API_BASE=location.origin.indexOf("localhost")!==-1?location.origin:"";

    // ── Theme toggle ──
    var root=document.documentElement;
    var stored=localStorage.getItem("lp-site-theme");
    if(stored&&(stored==="dark"||stored==="light")){root.setAttribute("data-site-theme",stored);}
    function updateToggleIcons(){
      var t=root.getAttribute("data-site-theme")||DEFAULT_THEME;
      var sun=document.getElementById("lp-sun-icon");
      var moon=document.getElementById("lp-moon-icon");
      if(sun)sun.style.display=t==="dark"?"block":"none";
      if(moon)moon.style.display=t==="light"?"block":"none";
    }
    updateToggleIcons();
    var toggleBtn=document.getElementById("lp-theme-toggle");
    if(toggleBtn){
      toggleBtn.addEventListener("click",function(){
        var cur=root.getAttribute("data-site-theme")||DEFAULT_THEME;
        var next=cur==="dark"?"light":"dark";
        root.setAttribute("data-site-theme",next);
        localStorage.setItem("lp-site-theme",next);
        updateToggleIcons();
      });
    }

    // ── Waitlist form handler ──
    document.querySelectorAll("[data-lp-waitlist-form]").forEach(function(form){
      form.addEventListener("submit",function(e){
        e.preventDefault();
        var input=form.querySelector('input[type="email"]');
        var btn=form.querySelector('button[type="submit"]');
        if(!input||!input.value)return;
        var email=input.value;
        var ref=new URLSearchParams(location.search).get("ref")||undefined;
        if(btn)btn.disabled=true;
        fetch((API_BASE||"")+"/api/waitlist/join",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({siteId:SITE_ID,email:email,ref:ref})
        }).then(function(r){return r.json()}).then(function(d){
          if(d.position){
            input.value="";
            var note=form.parentElement.querySelector(".lp-waitlist-note");
            if(note)note.textContent="You're #"+d.position+" on the waitlist!";
            if(btn){btn.textContent="Joined!";btn.disabled=true;}
            if(d.referralCode){
              var refUrl=location.origin+location.pathname+"?ref="+d.referralCode;
              var box=document.createElement("div");
              box.style.cssText="margin-top:16px;padding:16px;border-radius:12px;background:var(--lp-site-badge-bg);border:1px solid var(--lp-site-border-subtle);text-align:center;animation:lpFadeIn .3s ease";
              box.innerHTML='<p style="margin:0 0 8px;font-size:14px;color:var(--lp-site-body)">Share to move up the waitlist</p>'
                +'<div style="display:flex;gap:8px">'
                +'<input readonly id="lp-ref-input" value="'+refUrl+'" style="flex:1;padding:8px 12px;border-radius:8px;border:1px solid var(--lp-site-border-subtle);background:var(--lp-site-input-bg);color:var(--lp-site-heading);font-size:13px;outline:none" />'
                +'<button type="button" id="lp-copy-btn" style="padding:8px 16px;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap">Copy</button>'
                +'</div>'
                +'<p style="margin:8px 0 0;font-size:12px;color:var(--lp-site-muted)">'+(d.totalEntries||d.position)+' people on the waitlist</p>';
              form.parentElement.appendChild(box);
              var cpBtn=document.getElementById("lp-copy-btn");
              var cpIn=document.getElementById("lp-ref-input");
              if(cpBtn&&cpIn){cpBtn.onclick=function(){navigator.clipboard.writeText(cpIn.value);cpBtn.textContent="Copied!";setTimeout(function(){cpBtn.textContent="Copy"},2000)};}
            }
          }else if(d.error){
            if(btn){btn.textContent=d.error;btn.disabled=false;}
          }
        }).catch(function(){if(btn){btn.textContent="Try again";btn.disabled=false;}});
      });
    });
    // ── Countdown timer ──
    document.querySelectorAll("[data-lp-countdown]").forEach(function(section){
      var target=section.getAttribute("data-lp-countdown");
      if(!target)return;
      function tick(){
        var diff=new Date(target).getTime()-Date.now();
        if(diff<=0)diff=0;
        var d=Math.floor(diff/(1000*60*60*24));
        var h=Math.floor((diff/(1000*60*60))%24);
        var m=Math.floor((diff/(1000*60))%60);
        var s=Math.floor((diff/1000)%60);
        var vals={days:d,hours:h,minutes:m,seconds:s};
        for(var key in vals){
          var el=section.querySelector('[data-lp-countdown-unit="'+key+'"]');
          if(el)el.textContent=String(vals[key]).padStart(2,'0');
        }
      }
      tick();
      setInterval(tick,1000);
    });
    // Payment link handler
    document.querySelectorAll("[data-lp-payment-link]").forEach(function(el){
      el.addEventListener("click",function(e){
        var url=el.getAttribute("data-lp-payment-link");
        if(url)window.open(url,"_blank");
      });
    });
    // Scroll reveal (IntersectionObserver)
    if("IntersectionObserver" in window){
      var revealObs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){e.target.setAttribute("data-revealed","");revealObs.unobserve(e.target);}
        });
      },{threshold:0.1});
      document.querySelectorAll("[data-lp-section]").forEach(function(el,i){
        if(i===0){el.setAttribute("data-revealed","");}else{revealObs.observe(el);}
      });
    }else{
      document.querySelectorAll("[data-lp-section]").forEach(function(el){el.setAttribute("data-revealed","");});
    }
    ${site.analyticsEnabled ? `// ── Analytics beacon ──
    try{fetch((API_BASE||"")+"/api/analytics/collect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({siteId:SITE_ID,path:location.pathname,referrer:document.referrer,ua:navigator.userAgent}),keepalive:true});}catch(e){}` : ''}
  })();
  </script>
</body>
</html>`;

  return new Response(fullHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
