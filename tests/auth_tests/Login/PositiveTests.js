const { VALID_EMAIL, VALID_PASSWORD } = require("../../../enums/enums");
const Login = require("./Login");

class PositiveTests extends Login {
  async performValidLoginTest() {
    console.log("Запуск позитивного теста на логин");

    try {
      await this.launchBrowser();
      await this.navigateToAuthPage();
      await this.clickLoginButton();
      await this.fillEmail(VALID_EMAIL);
      await this.fillPassword(VALID_PASSWORD);
      await this.clickContinueButton();
      await this.checkSuccessfulLogin();
    } catch (error) {
      console.error("Ошибка при выполнении позитивного теста на логин", error);
      await this.page.screenshot({ path: "error_positive_login.png" });
    } finally {
      await this.closeBrowser();
    }
  }
}

module.exports = PositiveTests;
