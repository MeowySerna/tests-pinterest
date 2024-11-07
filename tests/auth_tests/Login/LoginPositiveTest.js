const PositiveTests = require("./PositiveTests");


(async () => {
  console.log("Запуск позитивных тестов на логин");
  const positiveTests = new PositiveTests();
  await positiveTests.performValidLoginTest();
})();