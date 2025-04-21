// tests/reservation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Reservation Process Test', () => {
  test('should complete the reservation process successfully', async ({ page }) => {
    // BẮT API CHECK AVAILABILITY: Giả lập phản hồi trả về danh sách bàn có sẵn
    await page.route('https://localhost/api/Reservation/check-availability', async (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          statusCode: 'Success',
          message: 'Tables available',
          data: {
            success: true,
            data: [
              { tbiId: 1, tbiTableNumber: 1 },
              { tbiId: 2, tbiTableNumber: 2 }
            ]
          }
        }),
      });
    });

    // BẮT API CREATE RESERVATION: Giả lập phản hồi thành công sau khi đặt bàn
    await page.route('https://localhost/api/Reservation/create-reservation', async (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          statusCode: 'Success',
          message: 'Reservation created successfully!',
          data: { success: true }
        }),
      });
    });

    // 1. Truy cập trang đặt bàn (Reservation Page)
    await page.goto('http://localhost:3000/reservation');

    // 2. STEP 1: Kiểm tra tình trạng bàn
    // - Điền Start Date (ví dụ: 30/03/2025 18:00)
    const startDateInput = page.locator('input[type="datetime-local"]').nth(0);
    await startDateInput.fill('2025-03-30T18:00');

    // - Điền End Date (ví dụ: 30/03/2025 20:00)
    const endDateInput = page.locator('input[type="datetime-local"]').nth(1);
    await endDateInput.fill('2025-03-30T20:00');

    // - Điền số lượng khách (ví dụ: 4)
    const guestInput = page.locator('input[type="number"]');
    await guestInput.fill('4');

    // - Nhấn nút "CHECK AVAILABILITY"
    await page.click('button:has-text("CHECK AVAILABILITY")');

    // Chờ đợi giao diện hiển thị danh sách bàn (step 2)
    // Kiểm tra có sự hiện diện của các nút bàn (ví dụ "Table 1", "Table 2")
    await expect(page.locator('button', { hasText: /Table/ })).toHaveCount(2);

    // 3. STEP 2: Chọn bàn
    // - Nhấn chọn bàn "Table 1"
    await page.click('button:has-text("Table 1")');

    // 4. STEP 3: Tạo đặt bàn
    // - Điền họ tên (ví dụ: "john doe", hệ thống sẽ tự động chuyển đổi chữ hoa chữ thường)
    await page.fill('input[placeholder="Full Name"]', 'john doe');

    // - Điền số điện thoại (ví dụ: "0123456789")
    await page.fill('input[placeholder="Phone No"]', '0123456789');

    // - Điền ghi chú (tùy chọn)
    await page.fill('textarea[placeholder="Note"]', 'This is a test reservation');

    // - Nhấn nút "BOOK NOW"
    await page.click('button:has-text("BOOK NOW")');
    
    // Chờ hiển thị modal của SweetAlert2 và click nút "OK"
    await page.waitForSelector('.swal2-confirm', { timeout: 5000 });
    await page.click('.swal2-confirm');

    // Chờ chuyển hướng tới trang '/thank-you'
    await page.waitForURL('**/thank-you');
    expect(page.url()).toContain('/thank-you');
  });
});
