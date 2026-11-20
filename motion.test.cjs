const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const elements = new Map(['#charge-toggle', '#tg', '#st', '#bf', '#chip'].map(id => [id, {
  hidden: true, style: {}, classList: {toggle() {}}, addEventListener(_, listener) { this.click = listener; }
}]));
vm.runInNewContext(fs.readFileSync(`${__dirname}/motion.js`, 'utf8'), {
  window: {}, document: {querySelector: id => elements.get(id)}
});
const button = elements.get('#charge-toggle');
assert.equal(button.hidden, false);
for (const [target, status, next] of [['70%', 'Rescheduled', '50%'], ['50%', 'Paused', '70%']]) {
  button.click();
  assert.equal(elements.get('#tg').textContent, target);
  assert.equal(elements.get('#st').textContent, status);
  assert.equal(elements.get('#bf').style.width, target);
  assert.equal(button.textContent, `Set target to ${next}`);
}
