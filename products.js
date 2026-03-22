/*
════════════════════════════════════════════════════════════════
data/products.js — DỮ LIỆU SẢN PHẨM
════════════════════════════════════════════════════════════════

Cấu trúc mỗi sản phẩm:
id          → mã định danh duy nhất (dùng cho GA4 tracking)
name        → tên hiển thị
sub         → mô tả ngắn
img         → ảnh đại diện (ảnh mặc định trên danh sách)
variants    → mảng các biến thể (chất liệu × kích thước × màu)

Cấu trúc mỗi variant:
label       → tên hiển thị trên nút chọn, vd: “Vải / 2 chỗ / Be”
material    → chất liệu, vd: “Vải”, “Da tổng hợp”
size        → kích thước, vd: “2 chỗ”, “3 chỗ”, “L-Shape”
color       → màu sắc, vd: “Be”, “Xám”, “Nâu”
img         → ảnh riêng của biến thể này (để thay ảnh khi chọn)
ar_url      → link AR trên rittai-service.com cho biến thể này
product_url → link trang sản phẩm trên nitori.com.vn cho biến thể này

════════════════════════════════════════════════════════════════
⚠️  HƯỚNG DẪN THÊM / SỬA SẢN PHẨM:

- Thêm sản phẩm mới: copy 1 object { id, name, … } và paste vào cuối mảng
- Thêm biến thể:     copy 1 object trong variants[] và paste vào cuối
- Thay link AR:      sửa ar_url trong từng variant
- Thay link SP:      sửa product_url trong từng variant
  ════════════════════════════════════════════════════════════════
  */

var PRODUCTS = [

// ── SẢN PHẨM 1 ──────────────────────────────────────────────
{
id:   “sofa-hana”,
name: “Sofa Hana”,
sub:  “Sofa phòng khách”,
img:  “https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&auto=format&fit=crop”,

```
variants: [
  {
    label:       "Vải / 2 chỗ / Be",
    material:    "Vải",
    size:        "2 chỗ",
    color:       "Be",
    img:         "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_HANA_VAI_2CHO_BE",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_HANA_VAI_2CHO_BE"
  },
  {
    label:       "Vải / 3 chỗ / Be",
    material:    "Vải",
    size:        "3 chỗ",
    color:       "Be",
    img:         "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_HANA_VAI_3CHO_BE",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_HANA_VAI_3CHO_BE"
  },
  {
    label:       "Vải / 3 chỗ / Xám",
    material:    "Vải",
    size:        "3 chỗ",
    color:       "Xám",
    img:         "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_HANA_VAI_3CHO_XAM",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_HANA_VAI_3CHO_XAM"
  },
  {
    label:       "Da / 3 chỗ / Nâu",
    material:    "Da tổng hợp",
    size:        "3 chỗ",
    color:       "Nâu",
    img:         "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_HANA_DA_3CHO_NAU",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_HANA_DA_3CHO_NAU"
  }
]
```

},

// ── SẢN PHẨM 2 ──────────────────────────────────────────────
{
id:   “sofa-nori”,
name: “Sofa Nori L-Shape”,
sub:  “Sofa góc chữ L”,
img:  “https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop”,

```
variants: [
  {
    label:       "Da tổng hợp / L-Shape / Kem",
    material:    "Da tổng hợp",
    size:        "L-Shape",
    color:       "Kem",
    img:         "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_NORI_DA_L_KEM",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_NORI_DA_L_KEM"
  },
  {
    label:       "Da tổng hợp / L-Shape / Đen",
    material:    "Da tổng hợp",
    size:        "L-Shape",
    color:       "Đen",
    img:         "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_NORI_DA_L_DEN",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_NORI_DA_L_DEN"
  }
]
```

},

// ── SẢN PHẨM 3 ──────────────────────────────────────────────
{
id:   “sofa-yuki”,
name: “Sofa Yuki”,
sub:  “Sofa nỉ mềm”,
img:  “https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&auto=format&fit=crop”,

```
variants: [
  {
    label:       "Nỉ / 2 chỗ / Xanh rêu",
    material:    "Nỉ",
    size:        "2 chỗ",
    color:       "Xanh rêu",
    img:         "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_YUKI_NI_2CHO_XANHREU",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_YUKI_NI_2CHO_XANHREU"
  },
  {
    label:       "Nỉ / 2 chỗ / Hồng",
    material:    "Nỉ",
    size:        "2 chỗ",
    color:       "Hồng",
    img:         "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_YUKI_NI_2CHO_HONG",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_YUKI_NI_2CHO_HONG"
  },
  {
    label:       "Nỉ / 3 chỗ / Xanh rêu",
    material:    "Nỉ",
    size:        "3 chỗ",
    color:       "Xanh rêu",
    img:         "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_YUKI_NI_3CHO_XANHREU",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_YUKI_NI_3CHO_XANHREU"
  }
]
```

},

// ── SẢN PHẨM 4 ──────────────────────────────────────────────
{
id:   “sofa-kaze”,
name: “Sofa Kaze Recline”,
sub:  “Sofa ngả lưng điều chỉnh”,
img:  “https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&auto=format&fit=crop”,

```
variants: [
  {
    label:       "Da tổng hợp / 3 chỗ / Nâu",
    material:    "Da tổng hợp",
    size:        "3 chỗ",
    color:       "Nâu",
    img:         "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_KAZE_DA_3CHO_NAU",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_KAZE_DA_3CHO_NAU"
  },
  {
    label:       "Da tổng hợp / 3 chỗ / Đen",
    material:    "Da tổng hợp",
    size:        "3 chỗ",
    color:       "Đen",
    img:         "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&auto=format&fit=crop",
    ar_url:      "https://rittai-service.com/THAY_LINK_AR_KAZE_DA_3CHO_DEN",
    product_url: "https://www.nitori.com.vn/THAY_LINK_SP_KAZE_DA_3CHO_DEN"
  }
]
```

}

]; // end PRODUCTS
