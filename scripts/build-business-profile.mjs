import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entry = path.join(root, 'global/index.html');
const source = fs.readFileSync(entry, 'utf8');
const check = process.argv.includes('--check');
const base = 'https://www.innovaqsolution.com';
const url = `${base}/global/empresa/`;
const updated = '2026-11-14';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Read only the existing declarative catalog, in a bounded context with no I/O.
function readCatalog(name, next) {
  const match = source.match(new RegExp(`const ${name} = ([\\s\\S]*?);\\s*const ${next} =`));
  if (!match) throw new Error(`Cannot locate catalog ${name}`);
  return vm.runInNewContext(`(${match[1]})`, {B:{green:'#7AB648',orange:'#F1912B',blue:'#126695'}}, {timeout:1000});
}
const products = readCatalog('PRODUCTS', 'SERVICES').map(p => ({id:p.code, name:p.name, description:p.sub.es, url:`${url}#${p.code.toLowerCase()}`}));
const services = readCatalog('SERVICES', 'SECTORS').map(s => s.title.es);
const profile = {
  name:'INNOVAQ Solutions', legalName:'INNOVAQ SOLUTIONS SAC',
  website:`${base}/global/`, informationUrl:url,
  description:'Software empresarial y consultoría en sistemas de gestión, auditoría, capacitación, desarrollo de software y automatización con inteligencia artificial.',
  email:'contacto@innovaqsolution.com',
  location:{city:'Trujillo',region:'La Libertad',country:'Perú',countryCode:'PE'},
  logo:`${base}/1000608638.jpg`, products, services,
  commercialInformation:'Consultar precios, alcance, disponibilidad y condiciones en la página comercial o solicitar una propuesta al equipo de INNOVAQ.',
  sourceUrl:`${base}/global/`, lastReviewed:updated
};
const faqs = [
  ['¿Qué ofrece INNOVAQ Solutions?', profile.description],
  ['¿Qué soluciones puedo consultar?', 'El catálogo incluye '+products.map(p=>p.name).join(', ')+'. El equipo comercial puede ayudar a definir el alcance adecuado para su empresa.'],
  ['¿Cómo solicito una demostración o cotización?', 'Escriba a '+profile.email+' indicando el sector, el proceso que desea mejorar y la cantidad aproximada de usuarios y sedes. También puede usar la sección Contacto de nuestra página comercial.'],
  ['¿Dónde consulto precios y condiciones?', 'Consulte la sección Planes y Precios de la página comercial. Confirme con el equipo de INNOVAQ la moneda, periodicidad, impuestos, implementación, soporte y condiciones aplicables antes de contratar.'],
  ['¿Una plataforma equivale a una certificación ISO?', 'No. El software y la consultoría apoyan la gestión. Una certificación requiere el proceso de evaluación correspondiente; no se obtiene automáticamente por usar una plataforma.']
];
const org = {
  '@type':'Organization','@id':`${base}/#organization`, name:profile.name, legalName:profile.legalName,
  url:profile.website, logo:profile.logo, description:profile.description,email:profile.email,
  address:{'@type':'PostalAddress',addressLocality:'Trujillo',addressRegion:'La Libertad',addressCountry:'PE'},
  contactPoint:{'@type':'ContactPoint',contactType:'sales',email:profile.email}
};
const mainSchema = {'@context':'https://schema.org','@graph':[
  org, {'@type':'WebSite','@id':`${base}/#website`,url:profile.website,name:profile.name,publisher:{'@id':org['@id']}},
  {'@type':'WebPage','@id':`${profile.website}#webpage`,url:profile.website,name:'INNOVAQ Solutions | Software empresarial y consultoría',about:{'@id':org['@id']},isPartOf:{'@id':`${base}/#website`}}
]};
const schema = {'@context':'https://schema.org','@graph':[
  org,
  {'@type':'AboutPage','@id':`${url}#webpage`,url,name:'INNOVAQ Solutions · Empresa y catálogo',inLanguage:'es-PE',about:{'@id':org['@id']},dateModified:updated},
  {'@type':'ItemList',name:'Catálogo de software INNOVAQ',itemListElement:products.map((p,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'SoftwareApplication',name:p.name,description:p.description,url:p.url,applicationCategory:'BusinessApplication',publisher:{'@id':org['@id']}}}))},
  {'@type':'FAQPage',mainEntity:faqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}
]};
const json = data => JSON.stringify(data,null,2).replace(/</g,'\\u003c');
const cards = products.map((p,i)=>`<article class="product" id="${p.id.toLowerCase()}"><span class="number">${String(i+1).padStart(2,'0')}</span><h3>${escape(p.name)}</h3><p>${escape(p.description)}</p><a href="mailto:${profile.email}?subject=${encodeURIComponent('Consulta sobre '+p.name)}">Consultar solución</a></article>`).join('\n');
const html = `<!doctype html>
<html lang="es-PE"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>INNOVAQ Solutions · Empresa, software y consultoría</title>
<meta name="description" content="${escape(profile.description)}">
<link rel="canonical" href="${url}"><link rel="icon" href="/1000608638.jpg">
<meta property="og:title" content="INNOVAQ Solutions · Empresa y catálogo">
<meta property="og:description" content="${escape(profile.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${url}"><meta property="og:image" content="${profile.logo}">
<script type="application/ld+json">${json(schema)}</script>
<style>
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}body{margin:0;background:#fbfbf9;color:#21323c;font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}a{color:#126695;text-underline-offset:4px}a:hover{text-decoration-thickness:2px}a:focus-visible,summary:focus-visible{outline:3px solid #d4741a;outline-offset:5px}.wrap{max-width:1160px;margin:auto;padding:0 28px}.skip{position:absolute;top:-100px;background:#fff;padding:12px;z-index:10}.skip:focus{top:8px}header{border-bottom:1px solid #e2e2dc;background:#fff}header .wrap{min-height:88px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:flex;align-items:center;gap:12px;text-decoration:none;font-weight:800;letter-spacing:.08em}.brand img{width:64px;height:54px;object-fit:contain}nav{display:flex;gap:24px;flex-wrap:wrap}nav a{font-size:14px;text-decoration:none;font-weight:600}.hero{padding:76px 0 64px}.eyebrow{color:#126695;letter-spacing:.16em;text-transform:uppercase;font-size:12px;font-weight:800;margin:0 0 20px}.hero-grid{display:grid;grid-template-columns:1.6fr 1fr;gap:60px;align-items:center}h1{font-size:clamp(36px,5vw,60px);letter-spacing:-.045em;line-height:1.1;margin:0 0 24px;color:#0d4a6e;max-width:760px}.lead{font-size:19px;max-width:650px;color:#526573}.actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:28px}.button{display:inline-block;background:#126695;color:#fff;padding:13px 22px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px}.button.secondary{background:transparent;border:1px solid #b5c3c9;color:#0d4a6e}.company{border:1px solid #dce3e4;border-top:4px solid #f1912b;border-radius:8px;background:#fff;padding:28px}.company h2{font-size:19px;margin:0 0 18px;color:#0d4a6e}.company dl{margin:0}.company dt{font-size:11px;letter-spacing:.1em;color:#647781;text-transform:uppercase;margin-top:16px}.company dd{margin:4px 0;font-size:14px;overflow-wrap:anywhere}.section{padding:60px 0;border-top:1px solid #e2e2dc}.section h2{font-size:32px;line-height:1.2;letter-spacing:-.025em;margin:0 0 14px;color:#0d4a6e}.intro{color:#526573;max-width:700px;margin-bottom:32px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.product{border:1px solid #e2e2dc;border-radius:9px;padding:25px;background:#fff;display:flex;flex-direction:column;align-items:flex-start}.number{color:#66808c;font-size:11px;font-weight:700;letter-spacing:.1em}.product h3{color:#0d4a6e;font-size:21px;margin:14px 0 4px}.product p{margin:0 0 24px;color:#526573;font-size:14px}.product a{font-size:13px;font-weight:700;margin-top:auto}.services{display:grid;grid-template-columns:repeat(3,1fr);list-style:none;margin:28px 0 0;padding:0;gap:12px}.services li{padding:18px 20px;border-left:3px solid #7ab648;background:#f0f4ed;font-size:15px;font-weight:600}.questions{max-width:850px}details{border-bottom:1px solid #dce3e4;padding:18px 0}summary{cursor:pointer;font-weight:650;color:#0d4a6e}details p{color:#526573;margin-bottom:4px}.contact{background:#0d4a6e;color:#fff;border-radius:12px;padding:40px;margin:0 0 64px;display:flex;justify-content:space-between;gap:30px;align-items:center}.contact h2{font-size:28px;line-height:1.2;margin:0 0 10px}.contact p{margin:0;color:#d0e0e8;max-width:600px}.contact .button{background:#fff;color:#0d4a6e;white-space:nowrap}footer{border-top:1px solid #e2e2dc;font-size:12px;color:#526573;padding:24px 0}footer .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}@media(max-width:760px){.wrap{padding:0 20px}header .wrap{padding-top:16px;padding-bottom:16px;align-items:flex-start;flex-direction:column;gap:12px}nav{gap:18px}.hero{padding:42px 0}.hero-grid{grid-template-columns:1fr;gap:30px}.lead{font-size:17px}.grid{grid-template-columns:repeat(2,1fr)}.services{grid-template-columns:1fr 1fr}.section{padding:40px 0}.contact{padding:28px;flex-direction:column;align-items:flex-start}.section h2{font-size:28px}}@media(max-width:430px){.grid,.services{grid-template-columns:1fr}.actions{flex-direction:column}.button{text-align:center}.brand{font-size:14px}h1{font-size:38px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style></head><body>
<a href="#contenido" class="skip">Saltar al contenido</a>
<header><div class="wrap"><a class="brand" href="/global/"><img src="/1000608638.jpg" alt="" width="64" height="54">INNOVAQ SOLUTIONS</a><nav aria-label="Navegación de empresa"><a href="#soluciones">Soluciones</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a></nav></div></header>
<main id="contenido"><section class="hero"><div class="wrap hero-grid"><div><p class="eyebrow">Empresa y catálogo</p><h1>Tecnología y gestión para su empresa.</h1><p class="lead">${escape(profile.description)}</p><div class="actions"><a class="button" href="#soluciones">Explorar soluciones</a><a class="button secondary" href="/global/">Visitar página comercial</a></div></div><aside class="company" aria-label="Información de la empresa"><h2>INNOVAQ Solutions</h2><dl><dt>Razón social</dt><dd>${escape(profile.legalName)}</dd><dt>Ubicación</dt><dd>Trujillo, La Libertad, Perú</dd><dt>Contacto comercial</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd><dt>Sitio web</dt><dd><a href="${profile.website}">www.innovaqsolution.com/global/</a></dd></dl></aside></div></section>
<section class="section" id="soluciones"><div class="wrap"><p class="eyebrow">Software empresarial</p><h2>Una solución para cada proceso.</h2><p class="intro">Explore nuestro catálogo y consulte con el equipo de INNOVAQ el alcance adecuado para su operación.</p><div class="grid">${cards}</div><p class="intro" style="font-size:13px;margin-top:24px">Precios, alcance, disponibilidad y condiciones: consulte la página comercial o solicite una propuesta.</p></div></section>
<section class="section" id="servicios"><div class="wrap"><p class="eyebrow">Consultoría y acompañamiento</p><h2>Conectamos herramientas y gestión.</h2><p class="intro">Servicios para implementar sistemas de gestión, desarrollar competencias y mejorar procesos.</p><ul class="services">${services.map(s=>`<li>${escape(s)}</li>`).join('')}</ul></div></section>
<section class="section"><div class="wrap"><h2>Antes de empezar.</h2><div class="questions">${faqs.map(([q,a])=>`<details><summary>${escape(q)}</summary><p>${escape(a)}</p></details>`).join('')}</div></div></section>
<div class="wrap"><section class="contact" id="contacto"><div><h2>Cuéntenos qué necesita mejorar.</h2><p>Indique su sector, el proceso y el número aproximado de usuarios o sedes. El equipo comercial revisará su consulta.</p></div><a class="button" href="mailto:${profile.email}?subject=Consulta%20comercial%20INNOVAQ">Escribir a INNOVAQ</a></section></div></main>
<footer><div class="wrap"><span>INNOVAQ SOLUTIONS SAC · Trujillo, Perú</span><span>Información revisada: 14 de noviembre de 2026 · <a href="/global/business-profile.json">Ficha en JSON</a></span></div></footer>
</body></html>
`;
const fallback = `<div id="root">
      <main style="font-family:system-ui,sans-serif;max-width:1080px;margin:48px auto;padding:24px;color:#0d4a6e">
        <h1>INNOVAQ Solutions · Software empresarial y consultoría</h1>
        <p>${escape(profile.description)}</p>
        <p>Catálogo: ${products.map(p=>escape(p.name)).join(', ')}.</p>
        <p>Trujillo, La Libertad, Perú · <a href="mailto:${profile.email}">${profile.email}</a></p>
        <p><a href="/global/empresa/">Ver información de la empresa y catálogo completo</a></p>
      </main>
    </div>`;
const schemaBlock = `<!-- business-schema:start -->\n    <script type="application/ld+json">${json(mainSchema)}</script>\n    <!-- business-schema:end -->`;
let index = source;
if (index.includes('<!-- business-schema:start -->')) index = index.replace(/<!-- business-schema:start -->[\s\S]*?<!-- business-schema:end -->/,schemaBlock);
else index = index.replace('</head>',`    ${schemaBlock}\n</head>`);
if (index.includes('<!-- business-fallback:start -->')) index = index.replace(/<!-- business-fallback:start -->[\s\S]*?<!-- business-fallback:end -->/,`<!-- business-fallback:start -->\n    ${fallback}\n    <!-- business-fallback:end -->`);
else index = index.replace('<div id="root"></div>',`<!-- business-fallback:start -->\n    ${fallback}\n    <!-- business-fallback:end -->`);

const outputs = new Map([
  ['global/empresa/index.html',html],
  ['global/business-profile.json',json(profile)+'\n'],
  ['global/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${profile.website}</loc><lastmod>${updated}</lastmod></url>\n  <url><loc>${url}</loc><lastmod>${updated}</lastmod></url>\n</urlset>\n`],
  ['global/index.html',index]
]);
let stale=false;
for(const [name,content] of outputs){
  const file=path.join(root,name);
  if(check){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==content){console.error(`Out of date: ${name}`);stale=true;}}
  else{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);console.log(`Built ${name}`);}
}
if(stale) process.exitCode=1;
else console.log(`${check?'Verified':'Prepared'} ${products.length} products and ${services.length} services.`);
