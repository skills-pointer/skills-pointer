class TestSuite {
  constructor(selector,title) {
    this.$root = $(selector);
    this.$root.append(`<div style="border-bottom: 1px solid grey; font-weight: bold; margin-top: 25px;">${title}</div>`);
  }

  test(title, boolOrFunc) {
    let success;
    try {
      success = typeof boolOrFunc === 'function' ? boolOrFunc() : boolOrFunc;
    } catch (e) {
      console.log(e);
      success = false;
    }
    let style = success ? 'green' : 'red';
    let top=typeof boolOrFunc === 'function' ? 5 : 0;
    this.$root.append(`<div style="color: ${style}; margin-top: ${top}px">${title}</div>`);
  }
}
