const { AUTH_URL } = require("../../../utils/constants");
const puppeteer = require("puppeteer");

class Registration {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async launchBrowser() {
    console.log("Запуск браузера");
    this.browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async navigateToAuthPage() {
    console.log("Переход на главную страницу");
    await this.page.goto(AUTH_URL);
  }

  async clickRegisterButton() {
    console.log("Шаг 1: нажать на кнопку 'Регистрация'");
    const registerButton = await this.page.$(
      '[data-test-id="simple-signup-button"]'
    );
    if (registerButton) {
      await registerButton.click();
    } else {
      console.error("Кнопка 'Регистрация' не найдена");
      await this.page.screenshot({
        path: "error_step_2_registration_button.png",
      });
      throw new Error("Кнопка 'Регистрация' не найдена");
    }
  }

  async fillEmail(email) {
    console.log("Шаг 2: ввод email");
    try {
      await this.page.waitForSelector("#email", { timeout: 5000 });
      const emailInput = await this.page.$("#email");
      await emailInput.click({ clickCount: 3 });
      await emailInput.press("Backspace");
      await emailInput.type(email, { delay: 100 });
    } catch (error) {
      console.error("Поле для ввода email не найдено");
      await this.page.screenshot({ path: "error_email_input_not_found.png" });
      throw new Error("Поле для ввода email не найдено");
    }
  }

  async fillPassword(password) {
    console.log("Шаг 2: ввод пароля");
    const passwordInput = await this.page.$("#password");
    if (passwordInput) {
      await passwordInput.click({ clickCount: 3 });
      await passwordInput.press("Backspace");
      await passwordInput.type(password, { delay: 100 });
    } else {
      console.error("Поле для ввода пароля не найдено");
      throw new Error("Поле для ввода пароля не найдено");
    }
  }

  async fillBirthdate(birthdate) {
    console.log("Шаг 2: ввод даты рождения");
    const birthdateInput = await this.page.$("#birthdate");
    if (birthdateInput) {
      await birthdateInput.click({ clickCount: 3 });
      await birthdateInput.press("Backspace");
      await birthdateInput.type(birthdate, { delay: 100 });
    } else {
      console.error("Поле для ввода даты рождения не найдено");
      throw new Error("Поле для ввода даты рождения не найдено");
    }
  }

  async clickContinueButton() {
    console.log("Шаг 3: нажать на кнопку 'Продолжить создание аккаунта'");
    const continueButton = await this.page.$(
      'button[aria-label="Продолжить создание аккаунта Pinterest"]'
    );
    if (continueButton) {
      await continueButton.click();
    } else {
      console.error("Кнопка 'Продолжить создание аккаунта' не найдена");
      throw new Error("Кнопка 'Продолжить создание аккаунта' не найдена");
    }
  }

  async clearFields() {
    console.log("Очистка полей email, password и birthdate");
    await this.page.evaluate(() => {
      document.querySelector("#email").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#birthdate").value = "";
    });
  }
}

module.exports = Registration;
