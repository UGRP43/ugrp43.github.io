
const ZONE_MED = {circle:"132 127×122 · 315 129×127",
                  rectangle:"132 136×126 · 315 119×120",
                  triangle:"132 114×131 · 315 109×129"};
const ZONE_KO = {circle:"원", rectangle:"사각형", triangle:"삼각형"};
function setZone(s){
  if (!Object.hasOwn(ZONE_KO, s)) return;
  const zoneImg=document.getElementById("zoneImg"), zoneCap=document.getElementById("zoneCap");
  const zA=document.getElementById("zA"), zB=document.getElementById("zB"), zC=document.getElementById("zC");
  zoneImg.src = "img/zones-" + s + ".jpg";
  zoneCap.textContent = ZONE_KO[s] + " — 흰 점은 315에만 있는 위치(도형당 61개), 빨간 점은 132 실제 위치(44개). "
    + "파랑 실선이 315의 2행×3열, 빨강 점선이 132의 2행×2열입니다. "
    + "median 크기 " + ZONE_MED[s] + " px.";
  zA.setAttribute("aria-pressed", s==="circle");
  zB.setAttribute("aria-pressed", s==="rectangle");
  zC.setAttribute("aria-pressed", s==="triangle");
}
const D = {"132_base":{"er":[0.815,0.694,0.754,0.404,0.396,0.649,0.273,0.583,0.627,0.0,0.704,0.008,0.701,0.554,0.579,0.888,0.429,0.198,0.0,0.0,0.0,0.368,0.366,0.751,0.535,0.83,0.002,0.75,0.541,0.391,0.772,0.689,0.834,0.324,0.866,0.406,0.0,0.002,0.0,0.622,0.511,0.279,0.843,0.71,0.478,0.802,0.777,0.723,0.807,0.779,0.57,0.294,0.429,0.266],"ok":0,"med":0.548,"avg":0.492,"cut":13,"rel":27.5},"132_hamlet":{"er":[0.065,0.263,0.73,0.015,0.492,0.0,0.473,0.307,0.448,0.5,0.156,0.021,0.004,0.215,0.809,0.557,0.623,0.006,0.471,0.003,0.044,0.486,0.012,0.153,0.0,0.327,0.024,0.0,0.021,0.211,0.021,0.0,0.673,0.001,0.039,0.118,0.612,0.013,0.753,0.896,0.007,0.533,0.751,0.022,0.067,0.436,0.0,0.62,0.663,0.43,0.267,0.0,0.112,0.171],"ok":0,"med":0.164,"avg":0.271,"cut":3,"rel":21.7},"315_base":{"er":[0.956,0.62,1.0,0.811,0.614,0.7,0.904,0.945,0.989,0.833,0.838,0.938,0.837,0.835,0.952,1.0,0.822,0.841,0.707,0.686,0.653,0.016,0.889,0.626,0.942,0.942,0.834,0.738,0.755,0.861,0.732,0.732,0.77,0.705,0.614,0.716,0.964,0.958,0.729,0.697,0.938,0.923,0.938,0.923,0.872,0.902,0.743,0.734,0.734,0.821,0.68,0.771,0.803,0.847],"ok":17,"med":0.827,"avg":0.802,"cut":7,"rel":28.7},"315_hamlet":{"er":[0.598,0.558,0.396,0.763,0.536,0.686,0.405,0.855,0.41,0.836,0.633,0.564,0.602,0.27,0.599,0.586,0.532,0.349,0.362,0.685,0.524,0.497,0.398,0.58,0.455,0.564,0.274,0.509,0.304,0.542,0.585,0.484,0.399,0.55,0.55,0.928,0.75,0.481,0.699,0.602,0.937,0.555,0.437,0.907,0.826,0.674,0.49,0.863,0.756,0.948,0.725,0.457,0.265,0.507],"ok":4,"med":0.556,"avg":0.579,"cut":1,"rel":23.1}};
(function strip(){
  const svg=document.getElementById("strip");
  const W=400,H=200,L=62,R=12,T=14,B=26;
  const rows=[["132_base","132 순정"],["132_hamlet","132 +H"],
              ["315_base","315 순정"],["315_hamlet","315 +H"]];
  const iw=W-L-R, rh=(H-T-B)/rows.length, x=v=>L+v*iw;
  let s="";
  for(const t of [0,0.5,0.9,1]){
    s+=`<line x1="${x(t)}" y1="${T-4}" x2="${x(t)}" y2="${H-B+2}"
          stroke="${t===0.9?'var(--red)':'var(--line)'}" stroke-width="${t===0.9?1.4:1}"
          ${t===0.9?'stroke-dasharray="3 3"':''}/>`;
    s+=`<text x="${x(t)}" y="${H-B+16}" font-size="9.5" text-anchor="middle"
          fill="var(--ink3)" font-family="IBM Plex Mono,monospace">${t}</text>`;
  }
  s+=`<text x="${x(0.9)}" y="${T-6}" font-size="9" text-anchor="middle"
        fill="var(--red)" font-family="IBM Plex Mono,monospace">임계 0.90</text>`;
  rows.forEach(([k,label],ri)=>{
    const cy=T+rh*ri+rh/2, d=D[k];
    s+=`<text x="${L-8}" y="${cy+3.5}" font-size="10.5" text-anchor="end"
          fill="var(--ink2)" font-family="IBM Plex Mono,monospace">${label}</text>`;
    d.er.forEach((v,i)=>{
      const j=((i*37)%11-5)*(rh*0.055), ok=v>=0.9;
      s+=`<circle cx="${x(v).toFixed(1)}" cy="${(cy+j).toFixed(1)}" r="2.6"
            fill="${ok?'var(--green)':'var(--navy)'}" opacity="${ok?.95:.4}"/>`;
    });
    s+=`<line x1="${x(d.med)}" y1="${cy-rh*0.34}" x2="${x(d.med)}" y2="${cy+rh*0.34}"
          stroke="var(--ink)" stroke-width="2"/>`;
  });
  svg.innerHTML=s;
})();
setZone("circle");
