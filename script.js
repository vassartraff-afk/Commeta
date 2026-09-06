const CHANNELS=[
 {id:1,cat:"Технологии",title:"Код и кофе",desc:"О разработке, продуктивности и жизни в IT",subs:24800,views:6200,price:280000,icon:"💻",tone:"t-blue"},
 {id:2,cat:"Образование",title:"Учиться проще",desc:"Полезные материалы, курсы и лайфхаки для саморазвития",subs:18400,views:4100,price:190000,icon:"🎓",tone:"t-green"},
 {id:3,cat:"Хобби",title:"Дом и хобби",desc:"Идеи для уютного дома, рукоделие и вдохновение",subs:31200,views:7800,price:350000,icon:"🏠",tone:"t-amber"}
];
const I={
 check:'<svg width="14" height="14" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M8 12.5l2.7 2.7L16 9.5" stroke="#fff" stroke-width="2.4" fill="none"/></svg>',
 bm:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
 dollar:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M14.5 9.2c-.5-.9-1.4-1.4-2.5-1.4-1.5 0-2.6 1-2.6 2.2 0 3 5.2 1.6 5.2 4.6 0 1.2-1.1 2.2-2.6 2.2-1.1 0-2-.5-2.5-1.4"/></svg>'
};
const $=s=>document.querySelector(s);
const fmt=n=>n.toLocaleString("ru-RU");
let applied={cats:[],verified:true,price:["",""],subs:["",""]};
const inR=(v,[a,b])=>(!a||v>=+a)&&(!b||v<=+b);

function card(c){return `
<article class="card">
  <div class="top"><span class="ava ${c.tone}">${c.icon}</span><button class="bm" title="В закладки">${I.bm}</button></div>
  <p class="cat">${c.cat}</p><h3>${c.title}</h3><p class="desc">${c.desc}</p>
  <span class="ok">${I.check} Владение подтверждено</span>
  <div class="stats"><div><b>${fmt(c.subs)}</b><span>подписчиков</span></div><div><b>${fmt(c.views)}</b><span>просмотров</span></div></div>
  <p class="income">${I.dollar} Доход заявлен продавцом</p>
  <p class="price">${fmt(c.price)} ₽</p>
  <button class="btn btn-blue w">Подробнее</button>
</article>`}

function render(){
  const q=$("#q").value.trim().toLowerCase(), sort=$("#sort").value;
  let list=CHANNELS.filter(c=>
    (!q||(c.title+" "+c.cat+" "+c.desc).toLowerCase().includes(q))&&
    (!applied.cats.length||applied.cats.includes(c.cat))&&
    inR(c.price,applied.price)&&inR(c.subs,applied.subs));
  if(sort==="cheap")list.sort((a,b)=>a.price-b.price);
  if(sort==="exp")list.sort((a,b)=>b.price-a.price);
  if(sort==="subs")list.sort((a,b)=>b.subs-a.subs);
  $("#cards").innerHTML=list.map(card).join("")||'<p class="empty">Ничего не найдено — попробуйте смягчить фильтры.</p>';
}
$("#q").oninput=render; $("#sort").onchange=render;
$("#apply").onclick=()=>{
  applied={
    cats:[...document.querySelectorAll("[data-cat]:checked")].map(i=>i.dataset.cat),
    verified:$("#verified").checked,
    price:[$("#pf").value,$("#pt").value],
    subs:[$("#sf").value,$("#st").value]
  };
  render();
};
$("#reset").onclick=()=>{
  document.querySelectorAll("[data-cat]").forEach(i=>i.checked=false);
  $("#verified").checked=true;
  ["pf","pt","sf","st"].forEach(id=>$("#"+id).value="");
  applied={cats:[],verified:true,price:["",""],subs:["",""]};
  render();
};
render();
