const PositiveTests = require("./PositiveTests"); 

(async () => {
  let registration; 
  try {
    console.log("Запуск позитивных тестов");
    registration = new PositiveTests(); 
    await registration.performValidRegistrationTest();
  } catch (error) {
    console.error("Тест не пройден", error);
  } finally {
    if (registration) { 
      await registration.closeBrowser();
    }
  }
})();
