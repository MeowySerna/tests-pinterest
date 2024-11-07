const NegativeTests = require("./NegativeTests");

(async () => {
  console.log("Запуск негативных тестов на логин");
  const negativeTests = new NegativeTests();
  await negativeTests.performInvalidEmailTests();
  await negativeTests.performInvalidPasswordTests();
})();