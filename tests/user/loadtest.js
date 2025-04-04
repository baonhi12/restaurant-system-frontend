import http from 'k6/http';
import { check, sleep } from 'k6';

// Cấu hình kịch bản (stages) mô phỏng tăng dần - giữ tải - giảm tải
export let options = {
  stages: [
    { duration: '30s', target: 50 }, // Tăng dần lên 50 người dùng ảo trong 30 giây
    { duration: '1m',  target: 50 }, // Giữ 50 VUs trong 1 phút
    { duration: '30s', target: 0 }, // Giảm dần về 0 trong 30 giây
    ]  
};

export default function () {
  // Danh sách các đường dẫn cần test
  const pages = ['/', '/reservation', '/menu'];

  // Lấy ngẫu nhiên 1 đường dẫn
  const randomPage = pages[Math.floor(Math.random() * pages.length)];

  // Gửi request GET đến trang tương ứng
  const res = http.get(`http://localhost:3000${randomPage}`);

  // Kiểm tra status code
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Nghỉ 1 giây giữa các lần request
  sleep(1);
}