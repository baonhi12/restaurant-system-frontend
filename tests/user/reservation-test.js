import { Selector, ClientFunction } from 'testcafe';

// ClientFunction để xóa nội dung của input và dispatch sự kiện 'input'
const clearInputAndDispatchEvent = ClientFunction(selector => {
    const input = document.querySelector(selector);
    if (input) {
        input.value = '';
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
    }
});

fixture `Reservation Test`
    .page `http://localhost:3000/reservation`; // Đảm bảo URL đúng với route của trang Reservation

// Test case 1: Check Availability - Success
test('Check Availability - Success', async t => {
    const startDate = Selector('#startDate');
    const endDate = Selector('#endDate');
    const countGuests = Selector('#countGuests');
    const checkBtn = Selector('#btnCheckAvailability');
    const tableButtons = Selector('.table-button');

    await t
        .typeText(startDate, '2025-03-28T18:00', { replace: true })
        .typeText(endDate, '2025-03-28T20:00', { replace: true })
        .typeText(countGuests, '4', { replace: true })
        .click(checkBtn)
        .wait(2000);

    await t.expect(tableButtons.count).gt(0, 'Không tìm thấy bàn trống nào!');
});

// Test case 2: Check Availability - Invalid Time Range
test('Check Availability - Invalid Time Range', async t => {
    const startDate = Selector('#startDate');
    const endDate = Selector('#endDate');
    const countGuests = Selector('#countGuests');
    const checkBtn = Selector('#btnCheckAvailability');
    const errorAlert = Selector('.swal2-popup');

    await t
        .typeText(startDate, '2025-03-28T20:00', { replace: true })
        .typeText(endDate, '2025-03-28T18:00', { replace: true })
        .typeText(countGuests, '4', { replace: true })
        .click(checkBtn)
        .wait(2000);

    await t.expect(errorAlert.exists).ok({ timeout: 5000 }, 'Không hiển thị thông báo lỗi khi thời gian không hợp lệ!');
});

// Test case 3: Check Availability - Zero Guests
test('Check Availability - Zero Guests', async t => {
    const startDate = Selector('#startDate');
    const endDate = Selector('#endDate');
    const countGuests = Selector('#countGuests');
    const checkBtn = Selector('#btnCheckAvailability');
    const errorAlert = Selector('.swal2-popup');

    await t
        .typeText(startDate, '2025-03-28T18:00', { replace: true })
        .typeText(endDate, '2025-03-28T20:00', { replace: true })
        .typeText(countGuests, '0', { replace: true })
        .click(checkBtn)
        .wait(2000);

    await t.expect(errorAlert.exists).ok({ timeout: 5000 }, 'Không hiển thị thông báo lỗi khi số khách bằng 0!');
});

// Test case 4: Table Selection - Navigate to Reservation Step 3
test('Table Selection - Navigate to Reservation Step 3', async t => {
    const startDate = Selector('#startDate');
    const endDate = Selector('#endDate');
    const countGuests = Selector('#countGuests');
    const checkBtn = Selector('#btnCheckAvailability');
    const tableButtons = Selector('.table-button');
    const fullNameInput = Selector('input[placeholder="Full Name"]'); // Giả sử input Full Name có placeholder này

    // Nhập thông tin hợp lệ và kiểm tra bàn trống
    await t
        .typeText(startDate, '2025-03-28T18:00', { replace: true })
        .typeText(endDate, '2025-03-28T20:00', { replace: true })
        .typeText(countGuests, '4', { replace: true })
        .click(checkBtn)
        .wait(2000);

    await t.expect(tableButtons.count).gt(0, 'Không tìm thấy bàn trống nào!');

    // Chọn bàn đầu tiên
    await t.click(tableButtons.nth(0)).wait(1000);

    // Kiểm tra chuyển sang bước nhập thông tin khách (input Full Name xuất hiện)
    await t.expect(fullNameInput.exists).ok({ timeout: 5000 }, 'Không chuyển sang bước nhập thông tin khách sau khi chọn bàn!');
});
