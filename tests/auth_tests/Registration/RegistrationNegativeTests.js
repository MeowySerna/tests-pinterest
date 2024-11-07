const NegativeTests = require("./NegativeTests");

(async () => {
  const registration = new NegativeTests();
  await registration.launchBrowser();

  try {
    console.log("Запуск тестов для невалидных email");
    await registration.performInvalidEmailTests();

    console.log("Запуск тестов для невалидных паролей");
    await registration.performInvalidPasswordTests();

    console.log("Запуск тестов для невалидных дат рождения");
    await registration.performInvalidBirthdateTests();

    console.log("Запуск тестов для пустых значений");
    await registration.performEmptyTests();
    
  } catch (error) {
    console.error("Тест не пройден:", error);
  } finally {
    await registration.closeBrowser();
  }
})();
