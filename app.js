/*
════════════════════════════════════════════════════════════════
js/app.js — LOGIC CHÍNH CỦA ỨNG DỤNG
════════════════════════════════════════════════════════════════

Luồng 3 trang:
Trang 1 (page-list)    → Danh sách sản phẩm
Trang 2 (page-variant) → Chọn chất liệu / kích thước / màu
Trang 3 (page-ar)      → Xem AR + link trang sản phẩm

File này phụ thuộc vào:
- data/products.js   (biến PRODUCTS)
- css/style.css      (giao diện)
════════════════════════════════════════════════════════════════
*/

/* ════════════════════════════════════════════════════════════
PHẦN 1 — GOOGLE ANALYTICS 4
════════════════════════════════════════════════════════════ */

/*
trackAR(productId, variantLabel)
Gửi custom event lên GA4 khi khách nhấn “Bắt đầu AR”.

Xem kết quả tại GA4:
Reports → Engagement → Events → chọn “ar_view_click”
Dimension: event_label → thấy variant nào được xem nhiều nhất
*/
function trackAR(productId, variantLabel) {
if (typeof gtag === ‘undefined’) return; // Bỏ qua nếu GA4 chưa load
gtag(‘event’, ‘ar_view_click’, {
event_category: ‘AR’,
event_label:    variantLabel,
product_id:     productId
});
}

/*
trackVariantSelect(productId, filterType, value)
Gửi event khi khách chọn 1 bộ lọc (chất liệu / kích thước / màu).
Giúp biết khách quan tâm đến loại gì nhất.
*/
function trackVariantSelect(productId, filterType, value) {
if (typeof gtag === ‘undefined’) return;
gtag(‘event’, ‘variant_select’, {
event_category: ‘Variant’,
event_label:    `${productId} | ${filterType}: ${value}`,
product_id:     productId
});
}

/* ════════════════════════════════════════════════════════════
PHẦN 2 — TRẠNG THÁI ỨNG DỤNG (State)
Lưu thông tin hiện tại: đang ở trang nào, chọn gì rồi.
════════════════════════════════════════════════════════════ */
const state = {
currentProduct:  null,  // Object sản phẩm đang xem (từ PRODUCTS)
selectedMaterial: null, // Chất liệu đã chọn, vd: “Vải”
selectedSize:     null, // Kích thước đã chọn, vd: “3 chỗ”
selectedColor:    null, // Màu đã chọn, vd: “Be”
};

/*
getMatchedVariant()
Tìm biến thể khớp với bộ lọc hiện tại trong state.
Trả về object variant nếu tìm thấy, null nếu không.
*/
function getMatchedVariant() {
if (!state.currentProduct) return null;
return state.currentProduct.variants.find(v =>
v.material === state.selectedMaterial &&
v.size     === state.selectedSize     &&
v.color    === state.selectedColor
) || null;
}

/* ════════════════════════════════════════════════════════════
PHẦN 3 — ĐIỀU HƯỚNG GIỮA CÁC TRANG
════════════════════════════════════════════════════════════ */

/* Ẩn tất cả trang, chỉ hiện trang có id = pageId */
function showPage(pageId) {
[‘page-list’, ‘page-variant’, ‘page-ar’].forEach(id => {
document.getElementById(id).style.display = (id === pageId) ? ‘block’ : ‘none’;
});
window.scrollTo(0, 0);
updateStepIndicator(pageId);
}

/* Cập nhật bước active trên banner */
function updateStepIndicator(pageId) {
const map = { ‘page-list’: 0, ‘page-variant’: 1, ‘page-ar’: 2 };
const activeStep = map[pageId];
document.querySelectorAll(’.step-item’).forEach((el, i) => {
el.classList.toggle(‘active’, i === activeStep);
});
}

/* ════════════════════════════════════════════════════════════
PHẦN 4 — TRANG 1: RENDER DANH SÁCH SẢN PHẨM
════════════════════════════════════════════════════════════ */
function renderProductList() {
const listEl = document.getElementById(‘list’);
listEl.innerHTML = ‘’;

const arIconSVG = `<svg viewBox="0 0 24 24" style="width:10px;height:10px;fill:var(--green)"> <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5l-8 4-8-4 8-3.82zM4 10.18l7 3.5V19.5l-7-3.5v-5.82zm9 9.32v-5.82l7-3.5v5.82l-7 3.5z"/> </svg>`;

PRODUCTS.forEach(p => {
const div = document.createElement(‘div’);
div.className = ‘card’;
div.innerHTML = ` <div class="card-img"> <img src="${p.img}" alt="${p.name}" loading="lazy"/> </div> <div class="card-body"> <div> <div class="card-name">${p.name}</div> <div class="card-sub">${p.sub}</div> </div> <div class="card-bottom"> <span class="card-variant-count">${p.variants.length} lựa chọn</span> <div style="display:flex;align-items:center;gap:.3rem"> <span class="card-ar-pill">${arIconSVG} AR</span> <span class="card-chevron">›</span> </div> </div> </div>`;

```
/* Khi nhấn card → mở trang chọn biến thể */
div.addEventListener('click', () => openVariantPage(p));
listEl.appendChild(div);
```

});
}

/* ════════════════════════════════════════════════════════════
PHẦN 5 — TRANG 2: CHỌN BIẾN THỂ
════════════════════════════════════════════════════════════ */

/*
openVariantPage(product)
Mở trang 2 cho sản phẩm được chọn.
Reset bộ lọc về chưa chọn gì.
*/
function openVariantPage(product) {
state.currentProduct   = product;
state.selectedMaterial = null;
state.selectedSize     = null;
state.selectedColor    = null;

/* Điền tên sản phẩm lên page header */
document.getElementById(‘variant-page-title’).textContent = product.name;

/* Ảnh mặc định = ảnh đại diện sản phẩm */
const img = document.getElementById(‘variant-img’);
img.src = product.img;
img.alt = product.name;

/* Tên sản phẩm */
document.getElementById(‘variant-name’).textContent = product.name;
document.getElementById(‘variant-selected-label’).textContent = ‘Chọn chất liệu, kích thước và màu sắc’;

/* Render 3 nhóm bộ lọc */
renderFilters();

/* Cập nhật trạng thái nút */
updateVariantButtons();

showPage(‘page-variant’);
}

/*
getUniqueValues(field)
Lấy danh sách giá trị không trùng của 1 trường trong variants.
Vd: getUniqueValues(‘material’) → [“Vải”, “Da tổng hợp”]
*/
function getUniqueValues(field) {
const set = new Set(state.currentProduct.variants.map(v => v[field]));
return […set];
}

/*
isAvailable(field, value)
Kiểm tra xem nút bộ lọc này có khả dụng không,
dựa trên những gì đã chọn ở các bộ lọc khác.

Vd: Đã chọn material=“Da tổng hợp”, size=“3 chỗ”
→ color=“Be” không khả dụng nếu không có variant nào khớp cả 3.
*/
function isAvailable(field, value) {
return state.currentProduct.variants.some(v => {
const matchMaterial = field === ‘material’ ? v.material === value
: (!state.selectedMaterial || v.material === state.selectedMaterial);
const matchSize     = field === ‘size’     ? v.size     === value
: (!state.selectedSize     || v.size     === state.selectedSize);
const matchColor    = field === ‘color’    ? v.color    === value
: (!state.selectedColor    || v.color    === state.selectedColor);
return matchMaterial && matchSize && matchColor;
});
}

/*
renderFilters()
Vẽ lại 3 nhóm nút bộ lọc (Chất liệu / Kích thước / Màu).
Được gọi lại mỗi khi người dùng nhấn 1 nút bộ lọc.
*/
function renderFilters() {
renderFilterGroup(‘filter-material’, ‘material’, getUniqueValues(‘material’), state.selectedMaterial);
renderFilterGroup(‘filter-size’,     ‘size’,     getUniqueValues(‘size’),     state.selectedSize);
renderFilterGroup(‘filter-color’,    ‘color’,    getUniqueValues(‘color’),    state.selectedColor);
}

/*
renderFilterGroup(containerId, field, values, selectedValue)
Vẽ 1 nhóm nút bộ lọc.

Tham số:
containerId   → id của thẻ div chứa các nút
field         → tên trường: ‘material’ | ‘size’ | ‘color’
values        → mảng giá trị để tạo nút, vd: [“Vải”, “Da tổng hợp”]
selectedValue → giá trị đang được chọn (null nếu chưa chọn)
*/
function renderFilterGroup(containerId, field, values, selectedValue) {
const container = document.getElementById(containerId);
container.innerHTML = ‘’;

values.forEach(val => {
const btn = document.createElement(‘button’);
btn.className  = ‘filter-btn’;
btn.textContent = val;

```
/* Đánh dấu đã chọn */
if (val === selectedValue) btn.classList.add('selected');

/* Đánh dấu không khả dụng */
if (!isAvailable(field, val)) btn.classList.add('disabled');

btn.addEventListener('click', () => {
  if (btn.classList.contains('disabled')) return; // Bỏ qua nút disabled
  onFilterSelect(field, val);
});

container.appendChild(btn);
```

});
}

/*
onFilterSelect(field, value)
Xử lý khi người dùng nhấn 1 nút bộ lọc.
Cập nhật state, vẽ lại bộ lọc, cập nhật ảnh và nút.
*/
function onFilterSelect(field, value) {
/* Toggle: nhấn lại nút đã chọn → bỏ chọn */
if (state[`selected${capitalize(field)}`] === value) {
state[`selected${capitalize(field)}`] = null;
} else {
state[`selected${capitalize(field)}`] = value;
}

/* Tracking GA4 */
trackVariantSelect(state.currentProduct.id, field, value);

/* Vẽ lại bộ lọc để cập nhật disabled/selected */
renderFilters();

/* Cập nhật ảnh nếu tìm được variant khớp */
const matched = getMatchedVariant();
if (matched) {
const img = document.getElementById(‘variant-img’);
img.style.opacity = ‘0’;
setTimeout(() => { img.src = matched.img; img.style.opacity = ‘1’; }, 200);

```
/* Hiển thị nhãn biến thể đã chọn */
document.getElementById('variant-selected-label').textContent = `✓ ${matched.label}`;
```

} else {
/* Chưa khớp đủ → hiện trạng thái đã chọn */
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

/*
updateVariantButtons()
Cập nhật trạng thái nút “Tiếp theo → Xem AR”:

- Nếu đã chọn đủ và tìm được variant → nút xanh, có thể nhấn
- Nếu chưa đủ → nút xám, disabled
  */
  function updateVariantButtons() {
  const btn = document.getElementById(‘btn-next-ar’);
  const matched = getMatchedVariant();

if (matched) {
btn.classList.remove(‘disabled’);
btn.onclick = () => openARPage(matched);
} else {
btn.classList.add(‘disabled’);
btn.onclick = null;
}
}

/* Tiện ích: viết hoa chữ cái đầu */
function capitalize(str) {
return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ════════════════════════════════════════════════════════════
PHẦN 6 — TRANG 3: XEM AR
════════════════════════════════════════════════════════════ */

/*
openARPage(variant)
Mở trang 3 với thông tin của biến thể đã chọn.
*/
function openARPage(variant) {
/* Tracking GA4 */
trackAR(state.currentProduct.id, variant.label);

/* Ảnh */
const img = document.getElementById(‘ar-img’);
img.src = variant.img;
img.alt = state.currentProduct.name;

/* Tên + biến thể */
document.getElementById(‘ar-page-title’).textContent = state.currentProduct.name;
document.getElementById(‘ar-name’).textContent       = state.currentProduct.name;
document.getElementById(‘ar-sub’).textContent        = variant.label;

/* Gán link cho 2 nút */
document.getElementById(‘product-link’).href = variant.product_url;
document.getElementById(‘ar-link’).href      = variant.ar_url;

showPage(‘page-ar’);
}

/* ════════════════════════════════════════════════════════════
PHẦN 7 — KHỞI ĐỘNG
════════════════════════════════════════════════════════════ */
document.addEventListener(‘DOMContentLoaded’, () => {
/* Render danh sách sản phẩm */
renderProductList();

/* Trang mặc định = trang 1 */
showPage(‘page-list’);

/* Nút quay lại trang 1 */
document.getElementById(‘btn-back-to-list’).addEventListener(‘click’, () => {
showPage(‘page-list’);
});

/* Nút quay lại trang 2 từ trang 3 */
document.getElementById(‘btn-back-to-variant’).addEventListener(‘click’, () => {
showPage(‘page-variant’);
});
});
