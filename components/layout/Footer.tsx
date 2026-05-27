import Link from "next/link"

const aboutLinks = [
  { label: "Giới thiệu về công ty", href: "/gioi-thieu" },
  { label: "Liên hệ hợp tác kinh doanh (B2B)", href: "/b2b" },
  { label: "Ưu đãi dành cho giáo giục", href: "/giao-duc" },
  { label: "Danh sách cửa hàng", href: "/stores" },
  { label: "Tuyển dụng mới nhất", href: "/tuyen-dung" },
  { label: "Hướng dẫn mua hàng online", href: "/huong-dan" },
  { label: "Hướng dẫn mua trả góp", href: "/tra-gop" },
  { label: "Hướng dẫn thanh toán VN Pay", href: "/vnpay" },
]

const policyLinks = [
  { label: "Chính sách bảo hành", href: "/bao-hanh" },
  { label: "Chính sách bán hàng", href: "/ban-hang" },
  { label: "Chính sách bảo mật", href: "/bao-mat" },
  { label: "Chính sách kiểm hàng", href: "/kiem-hang" },
  { label: "Trung tâm bảo hành apple tại VN", href: "/apple-service" },
]

const hotlines = [
  { label: "Mua ngay:", phone: "1800.6018", time: "(07:30 - 21:30)" },
  { label: "Bảo hành tại Viện Di Động:", phone: "1800.6018", time: "(08:00 - 21:00)" },
  { label: "Góp ý:", phone: "1800.6018", time: "(08:30 - 21:30)" },
]

const productCategories = [
  {
    title: "Điện thoại iPhone",
    links: ["iPhone 17", "iPhone Air", "iPhone 16"],
  },
  {
    title: "Điện thoại Samsung Galaxy",
    links: ["Samsung Galaxy S25", "Samsung Z Fold 7", "Samsung Z Flip 7"],
  },
  {
    title: "Điện thoại Xiaomi | Điện thoại Oppo",
    links: ["Điện thoại Realme", "Điện thoại Tecno", "Xiaomi 15"],
  },
  {
    title: "MacBook | MacBook Pro | MacBook Air",
    links: ["Máy tính bảng iPad", "Tai nghe Airpods"],
  },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy section */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Chính sách</h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hotline section */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Tổng đài hỗ trợ miễn phí</h3>
            <ul className="space-y-3">
              {hotlines.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <a href={`tel:${item.phone}`} className="font-bold text-primary">
                    {item.phone}
                  </a>
                  <span className="text-muted-foreground text-xs">{item.time}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-medium text-foreground mb-3">Phương thức thanh toán</h4>
              <div className="flex flex-wrap gap-2">
                {["SePay", "VNPay", "Momo", "OnePay", "ZaloPay"].map((method) => (
                  <div
                    key={method}
                    className="bg-gray-100 px-3 py-1 rounded text-xs text-muted-foreground"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social & App section */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Kết nối với Di Động Việt</h3>
            <div className="flex gap-2 mb-6">
              {["Zalo", "FB", "IG", "YT", "TT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-muted-foreground hover:bg-gray-200 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>

            <h4 className="font-medium text-foreground mb-3">Đối tác với Di Động Việt</h4>
            <div className="flex gap-2 mb-6">
              <div className="bg-gray-100 px-4 py-2 rounded text-xs">viendidong</div>
              <div className="bg-gray-100 px-4 py-2 rounded text-xs font-bold">VERTU</div>
            </div>

            <p className="text-xs text-muted-foreground mb-3">
              Tải ngay ứng dụng để nhận được nhiều ưu đãi
            </p>
            <div className="flex gap-2">
              <div className="bg-black text-white px-3 py-2 rounded text-xs">App Store</div>
              <div className="bg-black text-white px-3 py-2 rounded text-xs">Google Play</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product categories */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category, index) => (
              <div key={index}>
                <h4 className="font-medium text-sm text-foreground mb-2">{category.title}</h4>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {category.links.map((link, linkIndex) => (
                    <span key={linkIndex}>
                      <Link
                        href="#"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </Link>
                      {linkIndex < category.links.length - 1 && (
                        <span className="text-muted-foreground mx-1">|</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground text-center md:text-left">
              <p>
                {"Công Ty Cổ phần Công Nghệ Di Động Việt - 77 Trần Quang Khải, P. Tân Định, TP. Hồ Chí Minh."}
              </p>
              <p>
                {"MST: 0312193244. Đại diện theo pháp luật: Nguyễn Ngọc Đạt - Điện thoại: 1800.6018 (miễn phí) - Email: lienhe@didongviet.vn"}
              </p>
            </div>
            <div className="flex gap-3">
              {["NCSC", "DMCA", "BCT"].map((cert) => (
                <div
                  key={cert}
                  className="bg-gray-200 px-3 py-1 rounded text-xs text-muted-foreground"
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
