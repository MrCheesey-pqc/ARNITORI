// ============================================================
//  products.js — FILE DỮ LIỆU SẢN PHẨM
//  Chỉ cần sửa file này khi thêm / bớt / đổi sản phẩm
// ============================================================
//
//  CÁCH THÊM SẢN PHẨM MỚI:
//  Copy 1 khối { … } bên dưới, paste vào trước dấu ];
//  rồi đổi thông tin.
//
//  CÁCH THÊM BIẾN THỂ (màu / size / chất liệu):
//  Thêm 1 dòng vào phần “bienThe” của sản phẩm đó.
//  Mỗi dòng là: [“Chất liệu”, “Kích thước”, “Màu”, “Link AR”, “Link SP”, “URL ảnh”]
//
//  LƯU Ý:
//  - Sau khi sửa xong, upload file này lên GitHub ghi đè file cũ
//  - Không xóa dòng đầu “var PRODUCTS = [” và dòng cuối “];”
// ============================================================

const PRODUCTS = [

// ── SẢN PHẨM 1 ──────────────────────────────────────────
{
ten:  “Sofa Hana”,
moTa: “Sofa phòng khách”,
anh:  “https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600”,

```
// Mỗi dòng: ["Chất liệu", "Kích thước", "Màu", "Link AR", "Link SP", "Ảnh biến thể"]
bienThe: [
  ["Vải", "2 chỗ", "Be",  "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
  ["Vải", "3 chỗ", "Be",  "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
  ["Vải", "3 chỗ", "Xám", "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"],
  ["Da",  "3 chỗ", "Nâu", "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
]
```

},

// ── SẢN PHẨM 2 ──────────────────────────────────────────
{
ten:  “Sofa Nori L-Shape”,
moTa: “Sofa góc chữ L”,
anh:  “https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600”,

```
bienThe: [
  ["Da tổng hợp", "L-Shape", "Kem",  "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
  ["Da tổng hợp", "L-Shape", "Đen",  "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600"],
]
```

},

// ── SẢN PHẨM 3 ──────────────────────────────────────────
{
ten:  “Sofa Yuki”,
moTa: “Sofa nỉ mềm”,
anh:  “https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600”,

```
bienThe: [
  ["Nỉ", "2 chỗ", "Xanh rêu", "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
  ["Nỉ", "2 chỗ", "Hồng",     "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
  ["Nỉ", "3 chỗ", "Xanh rêu", "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
]
```

},

// ── SẢN PHẨM 4 ──────────────────────────────────────────
{
ten:  “Sofa Kaze Recline”,
moTa: “Sofa ngả lưng điều chỉnh”,
anh:  “https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600”,

```
bienThe: [
  ["Da tổng hợp", "3 chỗ", "Nâu", "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
  ["Da tổng hợp", "3 chỗ", "Đen", "https://rittai-service.com/LINK_AR", "https://www.nitori.com.vn/LINK_SP", ""],
]
```

},

]; // ← KHÔNG XÓA DÒNG NÀY
// app.js — Logic chính. Không cần sửa file này.

// ── GA4 Tracking ────────────────────────────────────────────
function trackAR(ten, bienThe) {
if (typeof gtag === ‘undefined’) return;
gtag(‘event’, ‘ar_view_click’, { event_label: ten + ’ | ’ + bienThe });
}
function trackChon(ten, loai, gia_tri) {
if (typeof gtag === ‘undefined’) return;
gtag(‘event’, ‘variant_select’, { event_label: ten + ’ | ’ + loai + ’: ’ + gia_tri });
}

// ── Chuyển đổi dữ liệu từ products.js sang định dạng dùng được ──
function chuanHoaSanPham(raw) {
return raw.map((sp, idx) => ({
id:       ‘sp-’ + idx,
name:     sp.ten,
sub:      sp.moTa,
img:      sp.anh,
variants: sp.bienThe.map(bt => ({
material:    bt[0],
size:        bt[1],
color:       bt[2],
ar_url:      bt[3],
product_url: bt[4],
img:         bt[5] || sp.anh,
label:       bt[0] + ’ / ’ + bt[1] + ’ / ’ + bt[2]
}))
}));
}

// ── Trạng thái app ───────────────────────────────────────────
var state = {
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

// ── Điều hướng ───────────────────────────────────────────────
function showPage(pageId) {
[‘page-list’, ‘page-variant’, ‘page-ar’].forEach(function(id) {
document.getElementById(id).style.display = (id === pageId) ? ‘block’ : ‘none’;
});
window.scrollTo(0, 0);
// Cập nhật bước active
var map = { ‘page-list’: 0, ‘page-variant’: 1, ‘page-ar’: 2 };
document.querySelectorAll(’.step-item’).forEach(function(el, i) {
el.classList.toggle(‘active’, i === map[pageId]);
});
}

// ── Trang 1: Danh sách ───────────────────────────────────────
function renderDanhSach() {
var listEl = document.getElementById(‘list’);
listEl.innerHTML = ‘’;
var arIcon = ‘<svg viewBox="0 0 24 24" style="width:10px;height:10px;fill:var(--green)"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5l-8 4-8-4 8-3.82zM4 10.18l7 3.5V19.5l-7-3.5v-5.82zm9 9.32v-5.82l7-3.5v5.82l-7 3.5z"/></svg>’;

state.products.forEach(function(p) {
var div = document.createElement(‘div’);
div.className = ‘card’;
div.innerHTML =
‘<div class="card-img">’ +
‘<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" onerror="this.src=\'https://placehold.co/200x150?text=No+Image\'"/>’ +
‘</div>’ +
‘<div class="card-body">’ +
‘<div>’ +
‘<div class="card-name">’ + p.name + ‘</div>’ +
‘<div class="card-sub">’ + p.sub + ‘</div>’ +
‘</div>’ +
‘<div class="card-bottom">’ +
‘<span class="card-variant-count">’ + p.variants.length + ’ lựa chọn</span>’ +
‘<div style="display:flex;align-items:center;gap:.3rem">’ +
‘<span class="card-ar-pill">’ + arIcon + ’ AR</span>’ +
‘<span class="card-chevron">›</span>’ +
‘</div>’ +
‘</div>’ +
‘</div>’;
div.addEventListener(‘click’, function() { openVariantPage(p); });
listEl.appendChild(div);
});
}

// ── Trang 2: Chọn biến thể ───────────────────────────────────
function openVariantPage(product) {
state.currentProduct   = product;
state.selectedMaterial = null;
state.selectedSize     = null;
state.selectedColor    = null;

document.getElementById(‘variant-page-title’).textContent    = product.name;
document.getElementById(‘variant-img’).src                   = product.img;
document.getElementById(‘variant-img’).alt                   = product.name;
document.getElementById(‘variant-name’).textContent          = product.name;
document.getElementById(‘variant-selected-label’).textContent = ‘Chọn chất liệu, kích thước và màu sắc’;

renderFilters();
updateVariantButtons();
showPage(‘page-variant’);
}

function getUniqueValues(field) {
var seen = {}, result = [];
state.currentProduct.variants.forEach(function(v) {
if (!seen[v[field]]) { seen[v[field]] = true; result.push(v[field]); }
});
return result;
}

function isAvailable(field, value) {
return state.currentProduct.variants.some(function(v) {
var okM = field === ‘material’ ? v.material === value : (!state.selectedMaterial || v.material === state.selectedMaterial);
var okS = field === ‘size’     ? v.size     === value : (!state.selectedSize     || v.size     === state.selectedSize);
var okC = field === ‘color’    ? v.color    === value : (!state.selectedColor    || v.color    === state.selectedColor);
return okM && okS && okC;
});
}

function renderFilters() {
renderFilterGroup(‘filter-material’, ‘material’, getUniqueValues(‘material’), state.selectedMaterial);
renderFilterGroup(‘filter-size’,     ‘size’,     getUniqueValues(‘size’),     state.selectedSize);
renderFilterGroup(‘filter-color’,    ‘color’,    getUniqueValues(‘color’),    state.selectedColor);
}

function renderFilterGroup(containerId, field, values, selectedValue) {
var container = document.getElementById(containerId);
container.innerHTML = ‘’;
values.forEach(function(val) {
var btn = document.createElement(‘button’);
btn.className   = ‘filter-btn’;
btn.textContent = val;
if (val === selectedValue)    btn.classList.add(‘selected’);
if (!isAvailable(field, val)) btn.classList.add(‘disabled’);
btn.addEventListener(‘click’, function() {
if (btn.classList.contains(‘disabled’)) return;
onFilterSelect(field, val);
});
container.appendChild(btn);
});
}

function onFilterSelect(field, value) {
var keyMap = { material: ‘selectedMaterial’, size: ‘selectedSize’, color: ‘selectedColor’ };
var key = keyMap[field];
state[key] = (state[key] === value) ? null : value;
trackChon(state.currentProduct.name, field, value);
renderFilters();

var matched = getMatchedVariant();
var imgEl   = document.getElementById(‘variant-img’);
if (matched) {
imgEl.style.opacity = ‘0’;
setTimeout(function() { imgEl.src = matched.img; imgEl.style.opacity = ‘1’; }, 200);
document.getElementById(‘variant-selected-label’).textContent = ’✓ ’ + matched.label;
} else {
var parts = [];
if (state.selectedMaterial) parts.push(’Chất liệu: ’ + state.selectedMaterial);
if (state.selectedSize)     parts.push(’Kích thước: ’ + state.selectedSize);
if (state.selectedColor)    parts.push(‘Màu: ’ + state.selectedColor);
document.getElementById(‘variant-selected-label’).textContent =
parts.length ? parts.join(’ · ’) : ‘Chọn chất liệu, kích thước và màu sắc’;
}
updateVariantButtons();
}

function updateVariantButtons() {
var btn     = document.getElementById(‘btn-next-ar’);
var matched = getMatchedVariant();
if (matched) {
btn.classList.remove(‘disabled’);
btn.onclick = function() { openARPage(matched); };
} else {
btn.classList.add(‘disabled’);
btn.onclick = null;
}
}

// ── Trang 3: Xem AR ─────────────────────────────────────────
function openARPage(variant) {
trackAR(state.currentProduct.name, variant.label);
document.getElementById(‘ar-page-title’).textContent = state.currentProduct.name;
document.getElementById(‘ar-img’).src                = variant.img;
document.getElementById(‘ar-img’).alt                = state.currentProduct.name;
document.getElementById(‘ar-name’).textContent       = state.currentProduct.name;
document.getElementById(‘ar-sub’).textContent        = variant.label;
document.getElementById(‘product-link’).href         = variant.product_url;
document.getElementById(‘ar-link’).href              = variant.ar_url;
showPage(‘page-ar’);
}

// ── Khởi động ────────────────────────────────────────────────
document.addEventListener(‘DOMContentLoaded’, function() {
if (typeof PRODUCTS === ‘undefined’ || PRODUCTS.length === 0) {
document.getElementById(‘list’).innerHTML =
‘<p style="padding:2rem;color:#c0392b;font-size:.85rem">⚠️ Không tìm thấy dữ liệu. Kiểm tra file products.js đã upload chưa.</p>’;
return;
}
state.products = chuanHoaSanPham(PRODUCTS);
renderDanhSach();
showPage(‘page-list’);

document.getElementById(‘btn-back-to-list’).addEventListener(‘click’,    function() { showPage(‘page-list’); });
document.getElementById(‘btn-back-to-variant’).addEventListener(‘click’, function() { showPage(‘page-variant’); });
});
