import { Selector } from 'testcafe';

fixture `Reservation Test`
    .page `http://localhost:3000/reservation`; // Đường dẫn trang cần test

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
