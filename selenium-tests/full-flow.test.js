const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Flow from Table Reservation to Payment Flow', function() {
  let driver;
  this.timeout(60000); // Tăng timeout cho toàn bộ test

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    if (driver) await driver.quit();
  });

  it('should navigate from Table Reservation to Payment and complete payment flow', async function() {
    // 1. Mở trang Table Reservation
    const tableReservationUrl = "http://localhost:3000/admin-reservation/";
    await driver.get(tableReservationUrl);

    // 2. Đợi DataGrid load
    await driver.wait(
      until.elementLocated(By.xpath("//div[contains(text(),'Customer')]")),
      10000
    );

    // 3. Tìm và click nút "detail"
    const detailLink = await driver.wait(
      until.elementLocated(
        By.xpath("//a[contains(@href, '/admin-reservation/customer-order')]")
      ),
      10000
    );
    await detailLink.click();

    // 4. Ở trang Customer Order
    await driver.wait(until.urlContains('/admin-reservation/customer-order'), 10000);

    const paymentButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(),'Payment')]")),
      10000
    );
    await paymentButton.click();

    // 5. Ở trang Payment
    await driver.wait(until.urlContains('/admin-reservation/payment'), 10000);

    // --- Step 0: Checkout ---
    const customerNameField = await driver.wait(
      until.elementLocated(
        By.xpath("//label[contains(text(),'Customer Name')]/following-sibling::div//input")
      ),
      10000
    );
    const customerNameValue = await customerNameField.getAttribute('value');
    console.log("Customer Name:", customerNameValue);

    const totalPriceField = await driver.wait(
      until.elementLocated(
        By.xpath("//label[contains(text(),'Total Price')]/following-sibling::div//input")
      ),
      10000
    );
    const totalPriceValue = await totalPriceField.getAttribute('value');
    console.log("Total Price:", totalPriceValue);

    const nextButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(),'Next')]")),
      5000
    );
    await nextButton.click();

    // --- Step 1: Payment ---
    const radioCash = await driver.wait(
      until.elementLocated(By.xpath("//input[@type='radio' and @value='Cash']")),
      5000
    );
    await radioCash.click();

    const finishButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(),'Finish')]")),
      5000
    );
    await finishButton.click();

    // Nếu giao diện chuyển sang URL khác ở bước 3, hãy chờ
    // (Ví dụ /admin-reservation/payment-success)
    // await driver.wait(until.urlContains('/admin-reservation/payment-success'), 10000);

    // --- Step 2: Complete ---
    // Tăng thời gian chờ lên 10 giây
    const successMsg = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(),'Payment Successful!')]")),
      10000
    );
    const isDisplayed = await successMsg.isDisplayed();
    assert.ok(isDisplayed, "Payment Successful message not displayed");
  });
});
