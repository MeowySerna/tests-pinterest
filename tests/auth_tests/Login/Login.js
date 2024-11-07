const { AUTH_URL } = require("../../../utils/constants");
const puppeteer = require("puppeteer");

class Login {
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

  async clickLoginButton() {
    console.log("Шаг 1: нажать на кнопку 'Вход'");
    const loginButton = await this.page.$('[data-test-id="simple-login-button"]');
    if (loginButton) {
      await loginButton.click();
    } else {
      console.error("Кнопка 'Вход' не найдена");
      await this.page.screenshot({ path: "error_step_1_login_button.png" });
      throw new Error("Кнопка 'Вход' не найдена");
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
    try {
      const passwordInput = await this.page.$("#password");
      if (passwordInput) {
        await passwordInput.click({ clickCount: 3 });
        await passwordInput.press("Backspace");
        await passwordInput.type(password, { delay: 100 });
      } else {
        throw new Error("Поле для ввода пароля не найдено");
      }
    } catch (error) {
      console.error(error.message);
      await this.page.screenshot({ path: "error_password_input_not_found.png" });
      throw error;
    }
  }

  async clickContinueButton() {
    console.log("Шаг 3: нажать на кнопку 'Продолжить вход'");
    const continueButton = await this.page.$('div[data-test-id="registerFormSubmitButton"]');
    if (continueButton) {
      await continueButton.click();
    } else {
      console.error("Кнопка 'Продолжить вход' не найдена");
      await this.page.screenshot({ path: "error_step_3_continue_button.png" });
      throw new Error("Кнопка 'Продолжить вход' не найдена");
    }
  }

  async checkSuccessfulLogin() {
    console.log("Ожидание перенаправления на страницу");
    try {
      await this.page.waitForNavigation({ timeout: 5000 });
      console.log("Вход прошел успешно и произошло перенаправление!");
    } catch (error) {
      console.log("Перенаправление не произошло");
      await this.page.screenshot({ path: "error_no_navigation.png" });
      throw error;
    }
  }
}

module.exports = Login;
