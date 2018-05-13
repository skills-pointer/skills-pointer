class TestSuite {
  constructor(selector,title) {
    this.$root = $(selector);
    this.$root.append(`<div>${title}</div>`);
  }

  init() {
    this.$root.empty();
  }

  test(title, boolOrFunc) {
    let success;
    try {
      success = typeof boolOrFunc === 'function' ? boolOrFunc() : boolOrFunc;
    } catch (e) {
      console.log(e);
      success = false;
    }
    if (typeof boolOrFunc === 'function') {
      this.$root.append(`<br>`);
    }
    let style = success ? 'green' : 'red';
    this.$root.append(`<div style="color: ${style}">${title}</div>`);
  }
}
