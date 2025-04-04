# Pizza-Restaurant (Frontend)

Dự án **Pizza-Restaurant** là phần frontend (React) cho hệ thống quản lý và đặt món pizza, được xây dựng theo yêu cầu từ tài liệu SRS. Hệ thống bao gồm 3 giao diện chính: Giao diện người dùng (user), Giao diện quản trị (admin), và Giao diện di động (mobile).

## **Mục Lục**
1. [Giới thiệu](#giới-thiệu)
2. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
3. [Cấu trúc thư mục](#cập-nhật-cấu-trúc-thư-mục-đầy-đủ)
4. [Cài đặt và chạy](#cài-đặt-và-chạy)
5. [Giao diện người dùng](#giao-diện-người-dùng-user)
6. [Giao diện quản trị (Admin)](#giao-diện-quản-trị-admin-interface)
7. [Giao diện Mobile](#giao-diện-mobile--responsive)
8. [Thiết kế giao diện](#thiết-kế-giao-diện)
9. [Quản lý công việc](#quản-lý-công-việc)
10. [Thông tin liên hệ](#thông-tin-liên-hệ)
11. [License](#license)

---

## **Giới thiệu**
Dự án này được xây dựng bằng **React.js**, cung cấp giao diện cho khách hàng truy cập website để đặt món, xem thông tin, và cho quản trị viên quản lý. Ngoài ra, tích hợp tính năng quét mã QR tại bàn để khách hàng tự order nhanh chóng. Giao diện thân thiện, hỗ trợ responsive cho mọi thiết bị.

---

## **Công nghệ sử dụng**
- **React** (create-react-app)
- **React Router** (điều hướng)
- **Tailwind CSS** hoặc **SCSS**
- **Axios** (gọi API)
- **Redux Toolkit** (state management)
- **Ant Design**, **react-icons**, v.v.

---

## 📁 Cập nhật cấu trúc thư mục đầy đủ:
```plaintext
pizza-restaurant-frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/images/            # Logo, ảnh, icon
│   ├── components/               # Common components
│   ├── admincomponent/           # Component cho quản trị viên
│   ├── usercomponent/            # Component cho khách hàng
│   ├── mobilecomponent/          # Component hiển thị mobile
│   ├── pages/
│   │   ├── adminpage/            # Trang dành cho admin
│   │   ├── userpage/             # Trang dành cho khách hàng
│   │   └── mobilepage/           # Trang di động
│   ├── routes/                   # Cấu hình route React
│   ├── services/                 # API service (Axios)
│   ├── unittest/                 # Unit test
│   ├── App.js                    # Layout chính
│   └── index.js                  # Entry point
├── tests/                        # Tự động kiểm thử
├── .env
├── package.json
└── README.md
```

---

## **Cài đặt và chạy**

```bash
git clone https://github.com/your-username/pizza-restaurant-frontend.git
cd pizza-restaurant-frontend
npm install
npm start
```
Ứng dụng chạy tại [http://localhost:3000](http://localhost:3000)

### Build (triển khai production):
```bash
npm run build
```

---

## 👤 Giao diện người dùng (User)
![image](https://github.com/user-attachments/assets/cd0461c2-be66-495f-b439-937ab4114dee)

### ✔️ Tính năng:
- Đặt bàn trực tuyến, chọn thời gian, số người
- Quét mã QR tại bàn để truy cập thực đơn
- Xem món ăn, chọn món, thêm vào giỏ, xác nhận đặt hàng
- Nhận thông báo xác nhận, trạng thái đơn hàng
- Thanh toán bằng các phương thức: tiền mặt, thẻ, ví điện tử

### 🔗 Dựa trên các Use Case:
- UC.01: Đặt bàn
- UC.02: Đặt món

**Thư mục liên quan**:
```
├── src/usercomponent/
├── src/pages/userpage/
```

---

## ✨ Giao diện quản trị (Admin Interface)
![image](https://github.com/user-attachments/assets/84dbd178-e32c-4d79-be34-4d9a938e6d15)

### ✔️ Tính năng chính:
- Dashboard tổng quan: doanh thu, đơn hàng, khách, trạng thái bàn
- Quản lý thực đơn: thêm/sửa/xóa món
- Thanh toán: xác nhận hóa đơn, in hóa đơn, cập nhật trạng thái bàn
- Xem và xuất báo cáo PDF/Excel

### 🔗 Dựa trên các Use Case:
- UC.03: Quản lý thực đơn
- UC.04: Thanh toán hóa đơn
- UC.05: Báo cáo thống kê

**Thư mục liên quan**:
```
├── src/admincomponent/
├── src/pages/adminpage/
```

---

## 📱 Giao diện Mobile / Responsive
![image](https://github.com/user-attachments/assets/0973af57-956f-4c48-86d7-b32a07d484aa)

### ✔️ Tính năng hỗ trợ mobile:
- Hỗ trợ QR Code scanning từ thiết bị di động
- Thao tác mượt mà qua touch UI
- Navigation bar cố định cho thao tác nhanh
- Responsive cho mọi độ phân giải, tối ưu UX

**Thư mục liên quan**:
```
├── src/mobilecomponent/
├── src/pages/mobilepage/
```

---

## 🎨 Thiết kế giao diện
Thiết kế chuẩn UX/UI trên Figma:
👉 [Figma Pizza-Restaurant](https://www.figma.com/design/ODcT2cvfSKL1ezbZoHvfiL/Pizza-Restaurant?node-id=168-1215&p=f&t=lPywaF4B5OzUny2Q-0)

---

## 📌 Quản lý công việc
Dự án được theo dõi qua Jira:
👉 [Jira Pizza-Restaurant](https://nguyendminh025.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?selectedIssue=SCRUM-4)

---

## 📧 Thông tin liên hệ
- **Tác giả**: Phạm Bảo Nhi / Nguyễn Duy Minh  
- **Email**: contact@pizza-restaurant.com

---

## 📄 License
Dự án thuộc quyền sở hữu cá nhân. Có thể áp dụng license MIT hoặc private tùy vào mục đích sử dụng.
