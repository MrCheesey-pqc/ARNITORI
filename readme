# NITORI AR Experience

Trang web hiển thị sofa hỗ trợ AR — chạy trên GitHub Pages.

-----

## Cấu trúc thư mục

```
nitori-ar/
│
├── index.html          ← Cấu trúc HTML (3 trang: danh sách / chọn tùy chọn / xem AR)
│
├── css/
│   └── style.css       ← Toàn bộ giao diện (màu sắc, layout, nút bấm)
│
├── js/
│   └── app.js          ← Logic: chuyển trang, bộ lọc, tracking GA4
│
├── data/
│   └── products.js     ← Dữ liệu sản phẩm + link AR + link trang SP
│
└── README.md           ← File này
```

-----

## Luồng 3 trang

```
Trang 1              Trang 2                    Trang 3
Danh sách  →  Chọn chất liệu/kích thước/màu  →  Xem AR
```

-----

## Thao tác thường gặp

### Thêm sản phẩm mới

Mở `data/products.js`, copy 1 object trong mảng `PRODUCTS` và paste vào cuối:

```js
{
  id:   "sofa-ten-moi",       // mã duy nhất, không dấu, không khoảng trắng
  name: "Sofa Tên Mới",
  sub:  "Mô tả ngắn",
  img:  "https://...",        // ảnh đại diện

  variants: [
    {
      label:       "Vải / 2 chỗ / Be",
      material:    "Vải",
      size:        "2 chỗ",
      color:       "Be",
      img:         "https://...",
      ar_url:      "https://rittai-service.com/...",   // link AR thật
      product_url: "https://www.nitori.com.vn/..."     // link SP thật
    }
  ]
}
```

### Thêm biến thể cho sản phẩm đã có

Tìm sản phẩm trong `data/products.js`, thêm vào mảng `variants[]`:

```js
{
  label:       "Da / 3 chỗ / Đen",
  material:    "Da tổng hợp",
  size:        "3 chỗ",
  color:       "Đen",
  img:         "https://...",
  ar_url:      "https://rittai-service.com/...",
  product_url: "https://www.nitori.com.vn/..."
}
```

### Thay link AR / link sản phẩm

Tìm đúng sản phẩm và biến thể trong `data/products.js`, sửa `ar_url` và `product_url`.

### Đổi màu giao diện

Mở `css/style.css`, tìm phần `:root` ở đầu file, sửa giá trị `--green`.

### Cài Google Analytics

Mở `index.html`, tìm `G-XXXXXXXXXX` (2 chỗ), thay bằng Measurement ID thật.

-----

## Deploy lên GitHub Pages

1. Tạo repo mới trên GitHub
1. Upload toàn bộ thư mục `nitori-ar/` vào nhánh `main`
1. Vào **Settings → Pages → Source: Deploy from branch → main / root**
1. Truy cập: `https://[username].github.io/[tên-repo]/`

-----

## Tracking GA4

Mỗi khi khách nhấn “Bắt đầu AR”, hệ thống gửi event:

|Event name      |Mô tả                            |
|----------------|---------------------------------|
|`ar_view_click` |Nhấn nút Bắt đầu AR              |
|`variant_select`|Chọn chất liệu / kích thước / màu|

Xem tại: **GA4 → Reports → Engagement → Events**
