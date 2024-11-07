const {
  INVALID_EMAILS,
  INVALID_PASSWORDS,
  INVALID_BIRTHDATES,
  VALID_PASSWORD,
  VALID_EMAIL,
  BIRTHDATE_VALUE,
} = require("../../../enums/enums");
const Registration = require("./Registration");

class NegativeTests extends Registration {
  async performInvalidEmailTests() {
    console.log("Запуск тестов с невалидными значениями email");
    for (const email of INVALID_EMAILS) {
      console.log(`Тест с email: ${email}`);
      try {
        await this.navigateToAuthPage();
        await this.clickRegisterButton();
        await this.fillEmail(email);
        await this.fillPassword(VALID_PASSWORD);
        await this.fillBirthdate(BIRTHDATE_VALUE);
        await this.clickContinueButton();
        await this.checkEmailError();
      } catch (error) {
        console.error(`Ошибка при проверке email: ${email}`, error);
        await this.page.screenshot({ path: `error_email_${email}.png` });
      } finally {
        await this.clearFields();
      }
    }
  }

  async performInvalidPasswordTests() {
    console.log("Запуск тестов с невалидными значениями пароля");
    for (const password of INVALID_PASSWORDS) {
      console.log(`Тест с паролем: ${password}`);
      try {
        await this.navigateToAuthPage();
        await this.clickRegisterButton();
        await this.fillEmail(VALID_EMAIL);
        await this.fillPassword(password);
        await this.fillBirthdate(BIRTHDATE_VALUE);
        await this.clickContinueButton();
        await this.checkPasswordError();
      } catch (error) {
        console.error(`Ошибка при проверке пароля: ${password}`, error);
        await this.page.screenshot({ path: `error_password_${password}.png` });
      } finally {
        await this.clearFields();
      }
    }
  }

  async performInvalidBirthdateTests() {
    console.log("Запуск тестов с невалидными значениями даты рождения");
    for (const birthdate of INVALID_BIRTHDATES) {
      console.log(`Тест с датой рождения: ${birthdate}`);
      try {
        await this.navigateToAuthPage();
        await this.clickRegisterButton();
        await this.fillEmail(VALID_EMAIL);
        await this.fillPassword(VALID_PASSWORD);
        await this.fillBirthdate(birthdate);
        await this.clickContinueButton();
        await this.checkBirthdateError();
      } catch (error) {
        console.error(`Ошибка при проверке даты рождения: ${birthdate}`, error);
        await this.page.screenshot({
          path: `error_birthdate_${birthdate}.png`,
        });
      } finally {
        await this.clearFields();
      }
    }
  }
  async performEmptyTests() {
    console.log("Запуск тестов с пустыми значениями");
    try {
      await this.navigateToAuthPage();
      await this.clickRegisterButton();
      await this.fillEmail('');
      await this.fillPassword('');
      await this.fillBirthdate('');
      await this.clickContinueButton();
      
      await this.checkEmailError();
      await this.checkPasswordError();
      await this.checkBirthdateError();
  
    } catch (error) {
      console.error(`Ошибка при проверке пустых значений`, error);
      await this.page.screenshot({
        path: `error_empty.png`,
      });
    } finally {
      await this.clearFields();
    }
  }
  

  async checkEmailError() {
    try {
      await this.page.waitForSelector("#email-error", { timeout: 5000 });
      console.log("Сообщение об ошибке для email отображено");
    } catch (error) {
      console.error("Сообщение об ошибке для email не отображено");
      await this.page.screenshot({ path: "error_email_format.png" });
    }
  }

  async checkPasswordError() {
    try {
      await this.page.waitForSelector("#password-error", { timeout: 5000 });
      console.log("Сообщение об ошибке для пароля отображено");
    } catch (error) {
      console.error("Сообщение об ошибке для пароля не отображено");
      await this.page.screenshot({ path: "error_password_format.png" });
    }
  }

  async checkBirthdateError() {
    try {
      await this.page.waitForSelector("#birthdate-error", { timeout: 5000 });
      console.log("Сообщение об ошибке для даты рождения отображено");
    } catch (error) {
      console.error("Сообщение об ошибке для даты рождения не отображено");
      await this.page.screenshot({ path: "error_birthdate_format.png" });
    }
  }
}

module.exports = NegativeTests;
