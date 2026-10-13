/* ===== Cấu hình ===== */
const SCRIPT_URL='https://script.google.com/macros/s/AKfycbwQcZziB3ZNhAOQL6-bqsxTtRougBqdimRfTXBe798pf6WXDffpwBgnEKenvUD69c4W/exec';
const PAGE=document.body.dataset.page||'';

/* ===== Header / Footer / Liên hệ ===== */
const header=`<div class="in"><a class="logo" href="index.html"><i></i>VIZONE</a>
<nav><div class="dd"><a href="index.html#giai-phap" class="${/ekyc|faceid|ocr|camera|home/.test(PAGE)?'on':''}">Sản phẩm</a>
<div class="dd-menu"><a href="ekyc.html">eKYC – Xác thực danh tính</a><a href="faceid.html">FaceID – Kiểm soát ra vào</a><a href="smart-ocr.html">Smart OCR – Số hóa tài liệu</a><a href="camera-surveillance.html">Camera Surveillance</a></div></div>
<a href="blog.html" class="${PAGE==='blog'?'on':''}">Blog</a><a href="#">Demo Tools</a><a href="#">Về chúng tôi</a></nav>
<div class="nav-r"><a class="btn btn-green btn-sm" href="#lien-he">Liên hệ</a><span>VN</span></div></div>`;
const contact=`<div class="wrap"><h2>Liên hệ với<br>chúng tôi</h2>
<form id="contact-form"><div><label for="dv">Đơn vị / Công ty</label><input id="dv" placeholder="Tên đơn vị của bạn" required></div>
<div><label for="em">E-mail</label><input id="em" type="email" placeholder="example@vingroup.net" required></div>
<div><label for="nd">Nội dung</label><textarea id="nd" placeholder="Bạn muốn tìm hiểu sản phẩm nào"></textarea></div>
<label class="chkrow"><input type="checkbox" required>Tôi đồng ý nhận thông tin sản phẩm và cập nhật từ Vizone theo Chính sách Bảo mật. Thông tin sẽ chỉ được sử dụng để liên hệ tư vấn.</label>
<div><button class="btn btn-dark" type="submit" id="send-btn">Gửi thông tin →</button><p id="form-msg" style="font-size:12px;margin-top:10px" role="status"></p></div></form></div>`;
const footer=`<div class="wrap"><div><h5>Demo Tools</h5><a href="ekyc.html">eKYC</a><a href="faceid.html">Kiểm soát ra vào &amp; chấm công</a><a href="smart-ocr.html">Smart OCR</a><a href="camera-surveillance.html">Camera An ninh</a><a href="camera-surveillance.html">Heatmap</a></div>
<div><h5>Công ty</h5><a href="#">Về chúng tôi</a><a href="blog.html">Tin tức</a><a href="#lien-he">Liên hệ chúng tôi</a></div>
<div><a class="logo" href="index.html" style="color:var(--ink)"><i style="background:var(--navy)"></i>VIZONE</a><p>Chúng tôi ứng dụng công nghệ AI Vision để mang lại giá trị thiết thực cho hàng triệu người dùng trong hệ sinh thái Vingroup.</p></div>
<div class="copy">© 2026 VSF AI. All rights reserved.</div></div>`;
const put=(sel,html)=>{const el=document.querySelector(sel);if(el)el.innerHTML=html};
put('header',header);put('#lien-he',contact);put('footer',footer);
if(!document.getElementById('lien-he'))document.querySelectorAll('a[href="#lien-he"]').forEach(a=>a.href='index.html#lien-he');

/* ===== Form gửi về Google Sheet + Email ===== */
const form=document.getElementById('contact-form');
if(form)form.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=document.getElementById('send-btn'),msg=document.getElementById('form-msg');
  btn.disabled=true;msg.textContent='Đang gửi...';
  try{
    await fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',body:JSON.stringify({
      donvi:document.getElementById('dv').value,email:document.getElementById('em').value,noidung:document.getElementById('nd').value})});
    msg.textContent='Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.';form.reset();
  }catch(err){msg.textContent='Gửi chưa được, vui lòng thử lại.'}
  btn.disabled=false;
});

/* ===== Dữ liệu bài viết triển khai thực tế (sửa nội dung & ảnh ở đây) =====
   img: đường dẫn ảnh thumbnail, ví dụ 'images/vinpearl-thumb.webp' (để '' nếu chưa có)
   url: link tới trang bài viết chi tiết, ví dụ 'cases/vinpearl-faceid.html' */
const C={
 pearl:{loc:'HCM / Vui chơi giải trí',h:'Vinpearl triển khai FaceID xác thực không cần chạm cho khách hàng',lg:'VCR',bg:'#2a1311',img:'',url:'blog.html'},
 homes:{loc:'Hà Nội / Bất động sản',h:'VinHomes triển khai Camera AI kiểm soát ra vào tại 12 khu đô thị thông minh',lg:'VH',bg:'#12301e',img:'',url:'blog.html'},
 lao:{loc:'Qatar / Y tế',h:'Viện dưỡng lão Mỹ Lâm ứng dụng Camera Surveillance giám sát an ninh và nhận diện bệnh nhân',lg:'VP',bg:'#14123a',img:'',url:'blog.html'},
 ocrHomes:{loc:'HN / Bất động sản',h:'VinHomes tự động hóa ký hợp đồng và xử lý hồ sơ căn hộ quy mô lớn',lg:'VH',bg:'#241344',img:'',url:'blog.html'},
 vinmec:{loc:'HCM / Y tế',h:'Vinmec số hóa 100.000 hồ sơ bệnh nhân với Smart OCR Freeform',lg:'VM',bg:'#1a2410',img:'',url:'blog.html'},
 vinfast:{loc:'HCM / Ô tô điện',h:'VinFast tự động xử lý hồ sơ đăng ký mua xe và giấy tờ khách hàng',lg:'VF',bg:'#101c38',img:'',url:'blog.html'},
 sv:{loc:'HN / Bất động sản',h:'VinHomes triển khai SmartView giám sát 500+ camera tại 12 khu đô thị thông minh toàn quốc',lg:'VH',bg:'#101c38',img:'',url:'blog.html'},
 heat:{loc:'HCM / Bán lẻ',h:'Vincom Retail ứng dụng HeatMap phân tích hành vi mua sắm tại 80 trung tâm thương mại',lg:'VCR',bg:'#12301e',img:'',url:'blog.html'},
 agent:{loc:'HCM / Y tế',h:'Vinmec triển khai AI Agent phát hiện tự động ngã/té ngã bệnh nhân và xâm nhập khu vực vô khuẩn',lg:'VM',bg:'#14123a',img:'',url:'blog.html'}
};
const SETS={
 home:[['pearl',['FACEID']],['homes',['CAMERA AI']],['lao',['CAMERA AI','FACEID']]],
 ekyc:[['pearl',['EKYC']],['homes',['EKYC']],['lao',['EKYC']]],
 faceid:[['pearl',['FACEID']],['homes',['FACEID']],['lao',['FACEID']]],
 ocr:[['ocrHomes',['SMART OCR']],['vinmec',['SMART OCR']],['vinfast',['SMART OCR']]],
 cam:[['sv',['CAMERA AI']],['heat',['CAMERA AI']],['agent',['CAMERA AI']]]
};
const TAGC={'FACEID':'FACEID','EKYC':'EKYC','SMART OCR':'OCR','CAMERA AI':'CAM','CÔNG NGHỆ':'TECH'};
document.querySelectorAll('[data-cases]').forEach(el=>{
  el.innerHTML=(SETS[el.dataset.cases]||[]).map(([k,tags])=>{const c=C[k];
    return `<article class="case"><div class="img" style="background:${c.bg}">${c.img?`<img src="${c.img}" alt="${c.h}" loading="lazy">`:''}${tags.map(t=>`<span class="tag ${TAGC[t]}">${t}</span>`).join('')}<span class="lg">${c.lg}</span></div>
    <div class="body">${c.loc}<h4>${c.h}</h4><a class="more" href="${c.url}">Xem chi tiết</a></div></article>`}).join('');
});

/* ===== Blog ===== */
const POSTS=[
 {t:'EKYC',cat:['EKYC','TT'],bg:'#12213f',lg:'VF',meta:'HCM · Ô tô điện · 15 tháng 5, 2025',h:'VinFast triển khai eKYC xác thực khách hàng đặt cọc xe điện toàn quốc',p:'Rút ngắn 80% thời gian xử lý hồ sơ, loại bỏ hoàn toàn nhập liệu thủ công trong quy trình onboarding khách hàng mới.'},
 {t:'FACEID',cat:['FACEID','TT'],bg:'#2a1311',lg:'VCR',meta:'HCM · Vui chơi giải trí · 8 tháng 5, 2025',h:'Vinpearl triển khai FaceID xác thực không điểm chạm cho khách hàng',p:'Hệ thống FaceID server-side xử lý đồng thời hàng nghìn lượt nhận diện mỗi ngày tại các khu nghỉ dưỡng Vinpearl.'},
 {t:'FACEID',cat:['FACEID','TT'],bg:'#1b1d36',lg:'VH',meta:'HN · Bất động sản · 2 tháng 5, 2025',h:'VinHomes triển khai FaceID kiểm soát ra vào tại 12 khu đô thị thông minh',p:'Không cần thẻ từ, không cần chạm — cư dân được nhận diện trong 0.3 giây tại mọi cổng vào.'},
 {t:'SMART OCR',cat:['OCR','TT'],bg:'#241344',lg:'VM',meta:'HCM · Y tế · 25 tháng 4, 2025',h:'Vinmec số hóa 100.000 hồ sơ bệnh nhân với Smart OCR Freeform',p:'Trích xuất tự động từ giấy tờ đa dạng định dạng — không cần template cứng, độ chính xác 98.5%.'},
 {t:'CAMERA AI',cat:['CAMERA','TT'],bg:'#0f2518',lg:'VC',meta:'HN · Bán lẻ · 18 tháng 4, 2025',h:'Vincom triển khai Camera AI phân tích hành vi khách hàng toàn hệ thống',p:'Phát hiện hành vi bất thường, đếm người realtime và cảnh báo tức thì cho đội bảo vệ trên toàn chuỗi.'},
 {t:'CÔNG NGHỆ',cat:['TECH'],bg:'#12213f',lg:'',meta:'Kỹ thuật · AI · 10 tháng 4, 2025',h:'So sánh On-device vs Server-side: Chọn mô hình triển khai FaceID nào?',p:'Phân tích ưu nhược điểm từng mô hình — latency, chi phí phần cứng và khả năng scale cho doanh nghiệp lớn.'},
 {t:'SMART OCR',cat:['OCR','TECH'],bg:'#151530',lg:'',meta:'Hướng dẫn · API · 3 tháng 4, 2025',h:'Tích hợp Smart OCR Freeform vào hệ thống quản lý hồ sơ trong 1 ngày',p:'Hướng dẫn step-by-step từ setup môi trường, gọi API đến xử lý kết quả và edge cases thường gặp.'},
 {t:'CAMERA AI',cat:['CAMERA','TECH'],bg:'#0f2518',lg:'',meta:'Công nghệ · AI · 28 tháng 3, 2025',h:'Phát hiện hành vi bất thường: Thuật toán và ứng dụng thực tế trong giám sát',p:'Deep dive vào các model AI phát hiện anomaly — từ rule-based đến deep learning và trade-off trong production.'}
];
const pg=document.getElementById('post-grid');
if(pg){
  const card=p=>`<article class="case"><div class="img" style="background:${p.bg};height:160px"><span class="tag ${TAGC[p.t]}">${p.t}</span>${p.lg?`<span class="lg">${p.lg}</span>`:''}</div>
  <div class="body">${p.meta}<h4>${p.h}</h4><p>${p.p}</p><a class="more" href="#">Xem chi tiết →</a></div></article>`;
  const collect=`<div class="collect"><div class="img"></div><div class="body"><small>Bộ sưu tập chuyên đề</small><h4>AI Vision trong hệ sinh thái Vingroup</h4><p>Khám phá cách các đơn vị Vingroup ứng dụng công nghệ AI Vision để chuyển đổi số vận hành.</p><a class="btn btn-green btn-sm" href="#">Xem tất cả bài viết</a></div></div>`;
  const render=f=>{const list=POSTS.filter(p=>f==='ALL'||p.cat.includes(f));
    pg.innerHTML=list.map((p,i)=>(i===1&&f==='ALL'?collect:'')+card(p)).join('')};
  render('ALL');
  document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{
    document.querySelectorAll('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');render(c.dataset.f);pg.classList.add('again');[...pg.children].forEach((k,i)=>k.style.setProperty('--i',i))}));
}

/* ===== Hiệu ứng chuyển động khi cuộn ===== */
(()=>{
  const hdr=document.querySelector('header');
  const bar=document.createElement('div');bar.id='prog';document.body.appendChild(bar);
  const onScroll=()=>{const h=document.documentElement;
    hdr&&hdr.classList.toggle('scrolled',scrollY>12);
    bar.style.transform='scaleX('+(scrollY/Math.max(1,h.scrollHeight-innerHeight))+')'};
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  if(!document.documentElement.classList.contains('js'))return; // không hỗ trợ / người dùng tắt chuyển động

  const GRIDS='.g2,.g3,.g4,.cases,.pgrid,.cmp,.badges,.logos,.ticks,.feat,.fl,.awards,.flist';
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target;io.unobserve(el);el.classList.add('in');
    const d=parseFloat(el.style.getPropertyValue('--d'))||0;
    setTimeout(()=>{el.classList.remove('rv','in','l','r');el.style.removeProperty('--d');
      if(el.classList.contains('mock'))el.classList.add('float')},(d+0.9)*1000);
  }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  const queue=[];
  const add=(el,i=0,cls)=>{if(el.classList.contains('rv'))return;el.classList.add('rv');cls&&el.classList.add(cls);
    el.style.setProperty('--d',Math.min(i*.09,.45)+'s');queue.push(el)};

  document.querySelectorAll('.hero .wrap>div:first-child>*').forEach((e,i)=>add(e,i+1));
  document.querySelectorAll('.hero .mock').forEach(e=>add(e,3,'r'));
  document.querySelectorAll('section:not(.hero)>.wrap>*,footer>.wrap>*:not(.copy)').forEach(el=>{
    if(el.matches(GRIDS))[...el.children].forEach((c,i)=>add(c,i));
    else if(el.matches('.split')){const rev=el.classList.contains('rev');
      [...el.children].forEach((c,i)=>add(c,i,(i===0)!==rev?'l':'r'))}
    else add(el,0);
  });

  // bật hiệu ứng sau khung hình đầu tiên để phần tử ẩn trước rồi mới chạy chuyển động
  requestAnimationFrame(()=>requestAnimationFrame(()=>{document.documentElement.classList.add('ready');queue.forEach(el=>io.observe(el))}));

  /* số liệu đếm lên */
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;cio.unobserve(e.target);
    const el=e.target,m=el.textContent.trim().match(/^(<?)([\d.]+)(.*)$/);if(!m)return;
    const end=parseFloat(m[2]),dec=(m[2].split('.')[1]||'').length,t0=performance.now(),T=1400;
    const step=t=>{const p=Math.min(1,(t-t0)/T),v=end*(1-Math.pow(1-p,3));
      el.textContent=m[1]+v.toFixed(dec)+m[3];if(p<1)requestAnimationFrame(step)};
    requestAnimationFrame(step);
  }),{threshold:.6});
  document.querySelectorAll('.big b').forEach(b=>cio.observe(b));
})();
