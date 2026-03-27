// ============================================================
//  js/app.js — LOGIC ỨNG DỤNG
//  Không cần sửa file này
// ============================================================

// ── GA4 Tracking ────────────────────────────────────────────
function trackAR(ten, bienThe) {
if (typeof gtag === 'undefined') return;
gtag('event', 'ar_view_click', { event_label: ten + ' | ' + bienThe });
}
function trackChon(ten, loai, giaTri) {
if (typeof gtag === 'undefined') return;
gtag('event', 'variant_select', { event_label: ten + ' | ' + loai + ': ' + giaTri });
}

// ── Chuẩn hóa dữ liệu thô từ data.js ───────────────────────
// “Sofa N Believa 3” → id = “sofa-n-believa-3”
function chuanHoaSanPham(raw) {
return raw.map(function(sp) {
var id = sp.ten.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
return {
id:   id,
name: sp.ten,
sub:  sp.moTa,
img:  sp.anh,
variants: sp.bienThe.map(function(bt) {
return {
material:    bt[0],
size:        bt[1],
color:       bt[2],
ar_url:      bt[3],
product_url: bt[4],
img:         bt[5] || sp.anh,
label:       bt[0] + ' / ' + bt[1] + ' / ' + bt[2]
};
})
};
});
}

// ── Trạng thái ứng dụng ─────────────────────────────────────
var state = {
products:         [],
currentProduct:   null,
selectedMaterial: null,
selectedSize:     null,
selectedColor:    null,
lookFrom:         null,
};

function getMatchedVariant() {
if (!state.currentProduct) return null;
return state.currentProduct.variants.find(function(v) {
return v.material === state.selectedMaterial &&
v.size     === state.selectedSize     &&
v.color    === state.selectedColor;
}) || null;
}

// ── Điều hướng ──────────────────────────────────────────────
var ALL_PAGES = ['page-list','page-variant','page-ar','page-looks','page-look-detail'];

function showPage(pageId) {
ALL_PAGES.forEach(function(id) {
document.getElementById(id).style.display = (id === pageId) ? 'block' : 'none';
});
window.scrollTo(0, 0);
var stepMap = { 'page-list': 0, 'page-variant': 1, 'page-ar': 2 };
document.querySelectorAll('.step-item').forEach(function(el, i) {
el.classList.toggle('active', i === stepMap[pageId]);
});
}

// ── Trang 1: Danh sách sofa ─────────────────────────────────
function renderDanhSach() {
var listEl = document.getElementById('list');
var arIcon = '<svg viewBox="0 0 24 24" style="width:10px;height:10px;fill:var(--green)"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5l-8 4-8-4 8-3.82zM4 10.18l7 3.5V19.5l-7-3.5v-5.82zm9 9.32v-5.82l7-3.5v5.82l-7 3.5z"/></svg>';
listEl.innerHTML = '';
state.products.forEach(function(p) {
var div = document.createElement('div');
div.className = 'card';
div.innerHTML =
'<div class="card-img">' +
'<img src=”' + p.img + '” alt=”' + p.name + '” loading=“lazy”' +
' onerror=“this.src='https://placehold.co/200x150?text=No+Image'”/>' +
'</div>' +
'<div class="card-body">' +
'<div>' +
'<div class="card-name">' + p.name + '</div>' +
'<div class="card-sub">'  + p.sub  + '</div>' +
'</div>' +
'<div class="card-bottom">' +
'<span class="card-variant-count">' + p.variants.length + ' lựa chọn</span>' +
'<div style="display:flex;align-items:center;gap:.3rem">' +
'<span class="card-ar-pill">' + arIcon + ' AR</span>' +
'<span class="card-chevron">›</span>' +
'</div>' +
'</div>' +
'</div>';
div.addEventListener('click', function() { openVariantPage(p); });
listEl.appendChild(div);
});
}

// ── Trang 2: Chọn biến thể ──────────────────────────────────
function openVariantPage(product) {
state.currentProduct   = product;
state.selectedMaterial = null;
state.selectedSize     = null;
state.selectedColor    = null;
document.getElementById('variant-page-title').textContent     = product.name;
document.getElementById('variant-img').src                    = product.img;
document.getElementById('variant-img').alt                    = product.name;
document.getElementById('variant-name').textContent           = product.name;
document.getElementById('variant-selected-label').textContent = 'Chọn chất liệu, kích thước và màu sắc';
renderFilters();
updateVariantButtons();
showPage('page-variant');
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
var okM = field==='material' ? v.material===value : (!state.selectedMaterial || v.material===state.selectedMaterial);
var okS = field==='size'     ? v.size    ===value : (!state.selectedSize     || v.size    ===state.selectedSize);
var okC = field==='color'    ? v.color   ===value : (!state.selectedColor    || v.color   ===state.selectedColor);
return okM && okS && okC;
});
}

function renderFilters() {
renderFilterGroup('filter-material', 'material', getUniqueValues('material'), state.selectedMaterial);
renderFilterGroup('filter-size',     'size',     getUniqueValues('size'),     state.selectedSize);
renderFilterGroup('filter-color',    'color',    getUniqueValues('color'),    state.selectedColor);
}

function renderFilterGroup(containerId, field, values, selectedValue) {
var container = document.getElementById(containerId);
container.innerHTML = '';
values.forEach(function(val) {
var btn = document.createElement('button');
btn.className   = 'filter-btn';
btn.textContent = val;
if (val === selectedValue)    btn.classList.add('selected');
if (!isAvailable(field, val)) btn.classList.add('disabled');
btn.addEventListener('click', function() {
if (btn.classList.contains('disabled')) return;
onFilterSelect(field, val);
});
container.appendChild(btn);
});
}

function onFilterSelect(field, value) {
var keyMap = { material:'selectedMaterial', size:'selectedSize', color:'selectedColor' };
var key = keyMap[field];
state[key] = (state[key] === value) ? null : value;
trackChon(state.currentProduct.name, field, value);
renderFilters();
var matched = getMatchedVariant();
var imgEl   = document.getElementById('variant-img');
if (matched) {
imgEl.style.opacity = '0';
setTimeout(function() { imgEl.src = matched.img; imgEl.style.opacity = '1'; }, 200);
document.getElementById('variant-selected-label').textContent = '✓ ' + matched.label;
} else {
var parts = [];
if (state.selectedMaterial) parts.push('Chất liệu: ' + state.selectedMaterial);
if (state.selectedSize)     parts.push('Kích thước: ' + state.selectedSize);
if (state.selectedColor)    parts.push('Màu: ' + state.selectedColor);
document.getElementById('variant-selected-label').textContent =
parts.length ? parts.join(' · ') : 'Chọn chất liệu, kích thước và màu sắc';
}
updateVariantButtons();
}

function updateVariantButtons() {
var btn     = document.getElementById('btn-next-ar');
var matched = getMatchedVariant();
if (matched) {
btn.classList.remove('disabled');
btn.onclick = function() { openARPage(matched); };
} else {
btn.classList.add('disabled');
btn.onclick = null;
}
}

// ── Trang 3: Xem AR ─────────────────────────────────────────
function openARPage(variant) {
trackAR(state.currentProduct.name, variant.label);
document.getElementById('ar-page-title').textContent = state.currentProduct.name;
document.getElementById('ar-img').src                = variant.img;
document.getElementById('ar-img').alt                = state.currentProduct.name;
document.getElementById('ar-name').textContent       = state.currentProduct.name;
document.getElementById('ar-sub').textContent        = variant.label;
document.getElementById('product-link').href         = variant.product_url;
document.getElementById('ar-link').href              = variant.ar_url;
showPage('page-ar');
}

// ── Trang 4: Danh sách looks ─────────────────────────────────
function renderDanhSachLooks() {
var listEl = document.getElementById('looks-list');
listEl.innerHTML = '';
LOOKS.forEach(function(look) {
var soSofaAR = look.sanPham.filter(function(sp) { return sp.loai === 'sofa'; }).length;
var div = document.createElement('div');
div.className = 'card';
div.innerHTML =
'<div class="card-img">' +
'<img src=”' + look.anh + '” alt=”' + look.ten + '” loading=“lazy”' +
' onerror=“this.src='https://placehold.co/200x150?text=No+Image'”/>' +
'</div>' +
'<div class="card-body">' +
'<div>' +
'<div class="card-name">' + look.ten + '</div>' +
'<div class="card-sub">' + look.sanPham.length + ' sản phẩm trong ảnh</div>' +
'</div>' +
'<div class="card-bottom">' +
'<span class="card-variant-count">' + soSofaAR + ' sofa có AR</span>' +
'<span class="card-chevron">›</span>' +
'</div>' +
'</div>';
div.addEventListener('click', function() {
state.lookFrom = 'page-looks';
openLookDetail(look);
});
listEl.appendChild(div);
});
}

// ── Trang 5: Chi tiết look ───────────────────────────────────
function openLookDetail(look) {
document.getElementById('look-detail-title').textContent = look.ten;
document.getElementById('look-detail-img').src           = look.anh;
var container = document.getElementById('look-detail-products');
container.innerHTML = '';
look.sanPham.forEach(function(sp) {
var card = document.createElement('div');
card.className = 'look-product-card';
card.innerHTML =
'<div class="look-product-card-img">' +
'<img src=”' + sp.anh + '” alt=”' + sp.ten + '”' +
' onerror=“this.src='https://placehold.co/120x90?text=No+Image'”/>' +
'</div>' +
'<div class="look-product-card-name">' + sp.ten + '</div>' +
(sp.loai === 'sofa' ? '<div class="look-product-card-badge">● AR</div>' : '');
card.addEventListener('click', function() {
if (sp.loai === 'sofa') {
openPopup(sp);
} else {
window.open(sp.product_url, '_blank');
}
});
container.appendChild(card);
});
showPage('page-look-detail');
}

// ── Popup: chọn AR hoặc xem SP ──────────────────────────────
function openPopup(sp) {
document.getElementById('popup-title').textContent = sp.ten;
document.getElementById('popup-btn-sp').onclick = function() {
window.open(sp.product_url, '_blank');
closePopup();
};
document.getElementById('popup-btn-ar').onclick = function() {
closePopup();
var found = state.products.find(function(p) { return p.id === sp.sofaId; });
if (found) { openVariantPage(found); } else { showPage('page-list'); }
};
document.getElementById('popup-overlay').style.display = 'flex';
}

function closePopup() {
document.getElementById('popup-overlay').style.display = 'none';
}

// ── Khởi động ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
state.products = chuanHoaSanPham(PRODUCTS);
renderDanhSach();
renderDanhSachLooks();
showPage('page-list');

document.getElementById('btn-to-looks').addEventListener('click',             function() { showPage('page-looks'); });
document.getElementById('btn-back-to-list').addEventListener('click',         function() { showPage('page-list'); });
document.getElementById('btn-back-to-variant').addEventListener('click',      function() { showPage('page-variant'); });
document.getElementById('btn-back-from-looks').addEventListener('click',      function() { showPage('page-list'); });
document.getElementById('btn-back-from-look-detail').addEventListener('click',function() {
showPage(state.lookFrom === 'page-variant' ? 'page-variant' : 'page-looks');
});
document.getElementById('btn-to-look-from-variant').addEventListener('click', function() {
if (!state.currentProduct) return;
var look = LOOKS.find(function(l) { return l.sofaId === state.currentProduct.id; });
state.lookFrom = 'page-variant';
if (look) { openLookDetail(look); } else { showPage('page-looks'); }
});
document.getElementById('popup-overlay').addEventListener('click', function(e) {
if (e.target === this) closePopup();
});
});
