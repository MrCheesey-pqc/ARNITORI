// ============================================================
//  js/data.js — FILE DUY NHẤT CẦN CHỈNH SỬA
//  Thêm/bớt sản phẩm và phòng mẫu tại đây
// ============================================================
//
//  SAU KHI SỬA: upload file này lên GitHub ghi đè là xong
//  Không cần đụng vào index.html, style.css, hay app.js
//
// ============================================================

// ════════════════════════════════════════════════════════════
//  PHẦN 1 — SẢN PHẨM SOFA
//
//  Mỗi sản phẩm gồm:
//    ten   → tên hiển thị
//    moTa  → mô tả ngắn
//    anh   → URL ảnh đại diện (hiện ở trang danh sách)
//
//  bienThe: mỗi dòng là 1 biến thể, theo thứ tự:
//    [0] Chất liệu
//    [1] Kích thước
//    [2] Màu
//    [3] Link AR  (rittai-service.com)
//    [4] Link SP  (nitori.com.vn)
//    [5] Ảnh riêng (để "" nếu dùng chung ảnh đại diện)
//
//  CÁCH THÊM SẢN PHẨM MỚI:
//    Copy 1 khối { ten, moTa, anh, bienThe:[…] }
//    Paste trước dấu ]; ở cuối PRODUCTS
//
//  CÁCH THÊM BIẾN THỂ:
//    Thêm 1 dòng vào bienThe[] của sản phẩm đó
// ════════════════════════════════════════════════════════════

var PRODUCTS = [

// ── SẢN PHẨM 1 ──────────────────────────────────────────
{
ten:  "Sofa N Believa 3",
moTa: "Sofa điện 3 chỗ",
anh:  "https://www.nitori.com.vn/cdn/shop/files/imgi_229_219030002979001_1200x1200.jpg?v=1753154102",


bienThe: [
  ["Da",         "3 chỗ", "Mocha", "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3p-electric-sofa-n-believa-3-leather-mo",  "https://www.nitori.com.vn/cdn/shop/files/imgi_221_219030002924001_695x695.jpg?v=1753154073"],
  ["Da",         "3 chỗ", "Đen",   "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3-electric-3p-sofa-n-believa-3-leather-bk", "https://www.nitori.com.vn/cdn/shop/files/imgi_220_219030002952312_289x289.jpg?v=1753154885"],
  ["Da",         "3 chỗ", "Nâu",   "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3p-electric-sofa-n-believa-3-leather-br",   "https://www.nitori.com.vn/cdn/shop/files/imgi_218_219030002935601_289x289.jpg?v=1753154071"],
  ["Da N-Shield","3 chỗ", "IV",    "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3p-electric-sofa-n-believa-3-n-shield-iv",  "https://www.nitori.com.vn/cdn/shop/files/imgi_229_219030002979001_695x695.jpg?v=1753154102"],
  ["Da N-Shield","3 chỗ", "Beige", "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3p-electric-sofa-n-believa-3-n-shield-be",  "https://www.nitori.com.vn/cdn/shop/files/imgi_229_219030002990501_695x695.jpg?v=1753154096"],
  ["Da N-Shield","3 chỗ", "Xám",   "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3p-electric-sofa-n-believa-3-n-shield-gy",  "https://www.nitori.com.vn/cdn/shop/files/imgi_227_219030003001701_695x695.jpg?v=1753154101"],
  ["Vải",        "3 chỗ", "Nâu",   "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3-electric-3p-sofa-n-believa-3-microfiber-br","https://www.nitori.com.vn/cdn/shop/files/imgi_228_219030003023915_695x695.jpg?v=1753154079"],
  ["Vải",        "3 chỗ", "Xám",   "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3-electric-3p-sofa-n-believa-3-microfiber-gy","https://www.nitori.com.vn/cdn/shop/files/imgi_229_219030003012315_ac615c3c-ef53-4850-9a68-200ee4a89f13_695x695.jpg?v=1753154078"],
]


},

// ── SẢN PHẨM 2 ──────────────────────────────────────────
{
ten:  "Graze",
moTa: "Sofa da thật",
anh:  "https://www.nitori.com.vn/cdn/shop/files/114642001_570x570.jpg?v=1708076044",


bienThe: [
  ["Da thật", "2 chỗ", "Đen", "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/2p-electric-sofa-graze-bk",              "https://www.nitori.com.vn/cdn/shop/files/114566002_289x289.jpg?v=1708075874"],
  ["Da thật", "3 chỗ", "Đen", "https://rittai-service.com/index.html?item=item_dZA_nfvvxSy22IHoAwVmq&cp=cp_qvXK-38WCxPr_blank", "https://www.nitori.com.vn/products/3p-electric-sofa-with-table-graze2-bk",   "https://www.nitori.com.vn/cdn/shop/files/114642001_570x570.jpg?v=1708076044"],
]


},

// Thêm sản phẩm mới vào đây ↓

]; // ← KHÔNG XÓA DÒNG NÀY

// ════════════════════════════════════════════════════════════
//  PHẦN 2 — PHÒNG MẪU (LOOKS)
//
//  Mỗi look gồm:
//    id      → mã định danh (không dấu, không khoảng trắng)
//    ten     → tên hiển thị
//    anh     → URL ảnh phòng
//    sofaId  → id sofa trong PRODUCTS để nút "Xem phối hợp" hoạt động
//              Cách tính sofaId từ tên sofa:
//              "Sofa N Believa 3" → "sofa-n-believa-3"
//              "Graze"            → "graze"
//              (viết thường, thay khoảng trắng bằng dấu -)
//
//  sanPham: danh sách SP có trong ảnh, mỗi SP gồm:
//    ten         → tên SP
//    anh         → URL ảnh SP nhỏ
//    loai        → "sofa"   = hiện popup chọn AR/Xem SP
//                  "thuong" = mở trang nitori.com.vn luôn
//    sofaId      → nếu loai="sofa", điền id sofa tương ứng
//    product_url → link trang SP trên nitori.com.vn
//
//  CÁCH THÊM LOOK MỚI:
//    Copy 1 khối { id, ten, anh, sofaId, sanPham:[…] }
//    Paste trước dấu ]; ở cuối LOOKS
// ════════════════════════════════════════════════════════════

var LOOKS = [

// ── PHÒNG MẪU 1 ──────────────────────────────────────────
{
id:     "look-1",
ten:    "Phòng khách Bắc Âu",
anh:    "https://www.nitori-net.jp/ecstatic/include/feature/img25/favorite-style/warm_sub01.jpg",
sofaId: "sofa-n-believa-3",


sanPham: [
  {
    ten:        "N Believa 3",
    anh:        "https://www.nitori.com.vn/cdn/shop/files/imgi_227_219030003023914_695x695.jpg?v=1753154080",
    loai:       "sofa",
    sofaId:     "sofa-n-believa-3",
    product_url:"https://www.nitori.com.vn/products/3-electric-3p-sofa-n-believa-3-microfiber-br"
  },
  {
    ten:        "Bàn cà phê PH02",
    anh:        "https://www.nitori.com.vn/cdn/shop/files/imgi_182_211030004631318_289x289.jpg?v=1769155337",
    loai:       "thuong",
    sofaId:     "",
    product_url:"https://www.nitori.com.vn/products/center-table-ph02-100lbr"
  },
]


},

// Thêm phòng mẫu mới vào đây ↓

]; // ← KHÔNG XÓA DÒNG NÀY
