const { INVALID_EMAILS, INVALID_PASSWORDS,VALID_EMAIL } = require("../../../enums/enums");
const Login = require("./Login");

class NegativeTests extends Login {
  async performInvalidEmailTests() {
    console.log("Запуск тестов с невалидными значениями email");
    for (const email of INVALID_EMAILS) {
      console.log(`Тест с email: ${email}`);
      try {
        await this.launchBrowser();
        await this.navigateToAuthPage();
        await this.clickLoginButton();
        await this.fillEmail(email);
        await this.fillPassword("ValidPassword123");
        await this.clickContinueButton();
        await this.checkEmailError();
      } catch (error) {
        console.error(`Ошибка при проверке email: ${email}`, error);
        await this.page.screenshot({
          path: `error_invalid_email_${email}.png`,
        });
      } finally {
        await this.closeBrowser();
      }
    }
  }

  async performInvalidPasswordTests() {
    console.log("Запуск тестов с невалидными значениями пароля");
    for (const password of INVALID_PASSWORDS) {
      console.log(`Тест с паролем: ${password}`);
      try {
        await this.launchBrowser();
        await this.navigateToAuthPage();
        await this.clickLoginButton();
        await this.fillEmail(VALID_EMAIL);
        await this.fillPassword(password);
        await this.clickContinueButton();
        await this.checkPasswordError();
      } catch (error) {
        console.error(`Ошибка при проверке пароля: ${password}`, error);
        await this.page.screenshot({
          path: `error_invalid_password_${password}.png`,
        });
      } finally {
        await this.closeBrowser();
      }
    }
  }

  async checkEmailError() {
    try {
      await this.page.waitForSelector("#email-error", { timeout: 5000 });
      console.log("Сообщение об ошибке для email отображено");
    } catch (error) {
      console.error("Сообщение об ошибке для email не отображено");
      await this.page.screenshot({ path: "error_email_not_found.png" });
    }
  }

  async checkPasswordError() {
    try {
      await this.page.waitForSelector("#password-error", { timeout: 5000 });
      console.log("Сообщение об ошибке для пароля отображено");
    } catch (error) {
      console.error("Сообщение об ошибке для пароля не отображено");
      await this.page.screenshot({ path: "error_password_not_found.png" });
    }
  }
}

module.exports = NegativeTests;
