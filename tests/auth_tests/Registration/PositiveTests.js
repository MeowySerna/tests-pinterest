const { VALID_EMAIL, VALID_PASSWORD, BIRTHDATE_VALUE } = require("../../../enums/enums");
const Registration = require("./Registration");

class PositiveTests extends Registration {
  async performValidRegistrationTest() {
    console.log("Запуск позитивного теста регистрации");

    try {
      await this.launchBrowser();
      await this.navigateToAuthPage();
      await this.clickRegisterButton();
      await this.fillEmail(VALID_EMAIL);
      await this.fillPassword(VALID_PASSWORD);
      await this.fillBirthdate(BIRTHDATE_VALUE);
      await this.clickContinueButton();
      
     
      await this.checkSuccessfulRegistration();
    } catch (error) {
      console.error("Ошибка при выполнении позитивного теста регистрации", error);
      await this.page.screenshot({ path: "error_positive_registration.png" });
      throw error;
    } finally {
      await this.closeBrowser();
    }
  }

  async checkSuccessfulRegistration() {
    console.log('Ожидание перенаправления');
    try {
      await this.page.waitForNavigation({ timeout: 5000 }); 
      console.log("Вход прошел успешно и произошло перенаправление!");
    } catch (error) {
      console.log("Вход не прошел: перенаправление не произошло");
      await this.page.screenshot({ path: "error_no_navigation.png" });
    }
  }
}

module.exports = PositiveTests;
