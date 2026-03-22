/*
════════════════════════════════════════════════════════════════
app.js — LOGIC CHÍNH
Đọc dữ liệu từ products.csv → render 3 trang
════════════════════════════════════════════════════════════════
*/

/* ════════════════════════════════════════════════════════════
PHẦN 1 — ĐỌC VÀ PARSE FILE products.csv
════════════════════════════════════════════════════════════ */

/*
parseCSV(text)
Chuyển nội dung file CSV thành mảng object JS.

CSV có dạng:
id,name,sub,…
sofa-hana,Sofa Hana,…

→ Trả về mảng rows:
[{ id:“sofa-hana”, name:“Sofa Hana”, … }, …]
*/
function parseCSV(text) {
const lines = text.trim().split(’\n’);
const headers = lines[0].split(’,’).map(h => h.trim());
return lines.slice(1).map(line => {
// Tách theo dấu phẩy, nhưng bỏ qua dấu phẩy trong dấu ngoặc kép
const values = line.match(/(”.*?”|[^,]+|(?<=,)(?=,)|^(?=,)|(?<=,)$)/g) || [];
const obj = {};
headers.forEach((h, i) => {
obj[h] = (values[i] || ‘’).replace(/^”|”$/g, ‘’).trim();
});
return obj;
});
}

/*
groupByProduct(rows)
Gom các hàng có cùng id thành 1 sản phẩm với mảng variants.

Input (rows từ CSV):
[
{ id:“sofa-hana”, name:“Sofa Hana”, material:“Vải”, size:“2 chỗ”, color:“Be”, … },
{ id:“sofa-hana”, name:“Sofa Hana”, material:“Vải”, size:“3 chỗ”, color:“Xám”, … },
{ id:“sofa-nori”, name:“Sofa Nori”, … },
]

Output (PRODUCTS):
[
{
id: “sofa-hana”, name: “Sofa Hana”, img: “…”,
variants: [
{ material:“Vải”, size:“2 chỗ”, color:“Be”, ar_url:”…”, … },
{ material:“Vải”, size:“3 chỗ”, color:“Xám”, ar_url:”…”, … },
]
},
{ id: “sofa-nori”, … }
]
*/
function groupByProduct(rows) {
const map = {};
rows.forEach(row => {
if (!map[row.id]) {
map[row.id] = {
id:   row.id,
name: row.name,
sub:  row.sub,
img:  row.img,
variants: []
};
}
map[row.id].variants.push({
label:       `${row.material} / ${row.size} / ${row.color}`,
material:    row.material,
size:        row.size,
color:       row.color,
img:         row.variant_img || row.img,
ar_url:      row.ar_url,
product_url: row.product_url
});
});
return Object.values(map);
}

/*
loadProducts()
Fetch file products.csv từ cùng thư mục, parse và khởi động app.
Hiển thị loading khi đang tải, lỗi nếu không tìm thấy file.
*/
async function loadProducts() {
try {
showLoading(true);
const res = await fetch(‘products.csv’);
if (!res.ok) throw new Error(`Không tìm thấy products.csv (${res.status})`);
const text = await res.text();
const rows = parseCSV(text);
const products = groupByProduct(rows);
showLoading(false);
initApp(products);
} catch (err) {
showLoading(false);
showError(err.message);
}
}

function showLoading(show) {
document.getElementById(‘loading’).style.display = show ? ‘flex’ : ‘none’;
}

function showError(msg) {
const el = document.getElementById(‘load-error’);
el.style.display = ‘block’;
el.textContent = ’⚠️ ’ + msg;
}

/* ════════════════════════════════════════════════════════════
PHẦN 2 — GOOGLE ANALYTICS 4
════════════════════════════════════════════════════════════ */
function trackAR(productId, variantLabel) {
if (typeof gtag === ‘undefined’) return;
gtag(‘event’, ‘ar_view_click’, {
event_category: ‘AR’,
event_label:    variantLabel,
product_id:     productId
});
}
function trackVariantSelect(productId, filterType, value) {
if (typeof gtag === ‘undefined’) return;
gtag(‘event’, ‘variant_select’, {
event_category: ‘Variant’,
event_label:    `${productId} | ${filterType}: ${value}`,
product_id:     productId
});
}

/* ════════════════════════════════════════════════════════════
PHẦN 3 — TRẠNG THÁI ỨNG DỤNG
════════════════════════════════════════════════════════════ */
const state = {
products:         [],
currentProduct:   null,
selectedMaterial: null,
selectedSize:     null,
selectedColor:    null,
};

function getMatchedVariant() {
if (!state.currentProduct) return null;
return state.currentProduct.variants.find(v =>
v.material === state.selectedMaterial &&
v.size     === state.selectedSize     &&
v.color    === state.selectedColor
) || null;
}

/* ════════════════════════════════════════════════════════════
PHẦN 4 — ĐIỀU HƯỚNG
════════════════════════════════════════════════════════════ */
function showPage(pageId) {
[‘page-list’, ‘page-variant’, ‘page-ar’].forEach(id => {
document.getElementById(id).style.display = (id === pageId) ? ‘block’ : ‘none’;
});
window.scrollTo(0, 0);
updateStepIndicator(pageId);
}

function updateStepIndicator(pageId) {
const map = { ‘page-list’: 0, ‘page-variant’: 1, ‘page-ar’: 2 };
document.querySelectorAll(’.step-item’).forEach((el, i) => {
el.classList.toggle(‘active’, i === map[pageId]);
});
}

/* ════════════════════════════════════════════════════════════
PHẦN 5 — TRANG 1: DANH SÁCH
════════════════════════════════════════════════════════════ */
function renderProductList() {
const listEl = document.getElementById(‘list’);
listEl.innerHTML = ‘’;
const arIcon = `<svg viewBox="0 0 24 24" style="width:10px;height:10px;fill:var(--green)"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5l-8 4-8-4 8-3.82zM4 10.18l7 3.5V19.5l-7-3.5v-5.82zm9 9.32v-5.82l7-3.5v5.82l-7 3.5z"/></svg>`;

state.products.forEach(p => {
const div = document.createElement(‘div’);
div.className = ‘card’;
div.innerHTML = ` <div class="card-img"> <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/200x150?text=No+Image'"/> </div> <div class="card-body"> <div> <div class="card-name">${p.name}</div> <div class="card-sub">${p.sub}</div> </div> <div class="card-bottom"> <span class="card-variant-count">${p.variants.length} lựa chọn</span> <div style="display:flex;align-items:center;gap:.3rem"> <span class="card-ar-pill">${arIcon} AR</span> <span class="card-chevron">›</span> </div> </div> </div>`;
div.addEventListener(‘click’, () => openVariantPage(p));
listEl.appendChild(div);
});
}

/* ════════════════════════════════════════════════════════════
PHẦN 6 — TRANG 2: CHỌN BIẾN THỂ
════════════════════════════════════════════════════════════ */
function openVariantPage(product) {
state.currentProduct   = product;
state.selectedMaterial = null;
state.selectedSize     = null;
state.selectedColor    = null;

document.getElementById(‘variant-page-title’).textContent = product.name;
document.getElementById(‘variant-img’).src                = product.img;
document.getElementById(‘variant-img’).alt                = product.name;
document.getElementById(‘variant-name’).textContent       = product.name;
document.getElementById(‘variant-selected-label’).textContent = ‘Chọn chất liệu, kích thước và màu sắc’;

renderFilters();
updateVariantButtons();
showPage(‘page-variant’);
}

function getUniqueValues(field) {
return […new Set(state.currentProduct.variants.map(v => v[field]))];
}

function isAvailable(field, value) {
return state.currentProduct.variants.some(v => {
const okMaterial = field === ‘material’ ? v.material === value : (!state.selectedMaterial || v.material === state.selectedMaterial);
const okSize     = field === ‘size’     ? v.size     === value : (!state.selectedSize     || v.size     === state.selectedSize);
const okColor    = field === ‘color’    ? v.color    === value : (!state.selectedColor    || v.color    === state.selectedColor);
return okMaterial && okSize && okColor;
});
}

function renderFilters() {
renderFilterGroup(‘filter-material’, ‘material’, getUniqueValues(‘material’), state.selectedMaterial);
renderFilterGroup(‘filter-size’,     ‘size’,     getUniqueValues(‘size’),     state.selectedSize);
renderFilterGroup(‘filter-color’,    ‘color’,    getUniqueValues(‘color’),    state.selectedColor);
}

function renderFilterGroup(containerId, field, values, selectedValue) {
const container = document.getElementById(containerId);
container.innerHTML = ‘’;
values.forEach(val => {
const btn = document.createElement(‘button’);
btn.className   = ‘filter-btn’;
btn.textContent = val;
if (val === selectedValue)        btn.classList.add(‘selected’);
if (!isAvailable(field, val))     btn.classList.add(‘disabled’);
btn.addEventListener(‘click’, () => {
if (btn.classList.contains(‘disabled’)) return;
onFilterSelect(field, val);
});
container.appendChild(btn);
});
}

function onFilterSelect(field, value) {
const key = `selected${field.charAt(0).toUpperCase() + field.slice(1)}`;
state[key] = (state[key] === value) ? null : value;
trackVariantSelect(state.currentProduct.id, field, value);
renderFilters();

const matched = getMatchedVariant();
const imgEl   = document.getElementById(‘variant-img’);
if (matched) {
imgEl.style.opacity = ‘0’;
setTimeout(() => { imgEl.src = matched.img; imgEl.style.opacity = ‘1’; }, 200);
document.getElementById(‘variant-selected-label’).textContent = `✓ ${matched.label}`;
} else {
const parts = [
state.selectedMaterial && `Chất liệu: ${state.selectedMaterial}`,
state.selectedSize     && `Kích thước: ${state.selectedSize}`,
state.selectedColor    && `Màu: ${state.selectedColor}`
].filter(Boolean);
document.getElementById(‘variant-selected-label’).textContent =
parts.length ? parts.join(’ · ’) : ‘Chọn chất liệu, kích thước và màu sắc’;
}
updateVariantButtons();
}

function updateVariantButtons() {
const btn     = document.getElementById(‘btn-next-ar’);
const matched = getMatchedVariant();
if (matched) {
btn.classList.remove(‘disabled’);
btn.onclick = () => openARPage(matched);
} else {
btn.classList.add(‘disabled’);
btn.onclick = null;
}
}

/* ════════════════════════════════════════════════════════════
PHẦN 7 — TRANG 3: XEM AR
════════════════════════════════════════════════════════════ */
function openARPage(variant) {
trackAR(state.currentProduct.id, variant.label);
document.getElementById(‘ar-page-title’).textContent = state.currentProduct.name;
document.getElementById(‘ar-img’).src                = variant.img;
document.getElementById(‘ar-img’).alt                = state.currentProduct.name;
document.getElementById(‘ar-name’).textContent       = state.currentProduct.name;
document.getElementById(‘ar-sub’).textContent        = variant.label;
document.getElementById(‘product-link’).href         = variant.product_url;
document.getElementById(‘ar-link’).href              = variant.ar_url;
showPage(‘page-ar’);
}

/* ════════════════════════════════════════════════════════════
PHẦN 8 — KHỞI ĐỘNG
════════════════════════════════════════════════════════════ */
function initApp(products) {
state.products = products;
renderProductList();
showPage(‘page-list’);

document.getElementById(‘btn-back-to-list’).addEventListener(‘click’,    () => showPage(‘page-list’));
document.getElementById(‘btn-back-to-variant’).addEventListener(‘click’, () => showPage(‘page-variant’));
}

document.addEventListener(‘DOMContentLoaded’, loadProducts);