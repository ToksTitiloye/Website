// faq.js
// Make FAQ <details> allow multiple open, and ensure any previous single-accordion listeners are removed.
(function(){
const acc = document.querySelector('[data-accordion]');
if (!acc) return;


// Strip any existing event listeners by cloning the node
const accClone = acc.cloneNode(true);
acc.parentNode.replaceChild(accClone, acc);


// Now wire up independent toggles + ARIA
const summaries = accClone.querySelectorAll('details > summary');
summaries.forEach(summary => {
summary.addEventListener('click', () => {
const d = summary.parentElement;
const willBeOpen = !d.hasAttribute('open');
// after <details> toggles, reflect state for screen readers
requestAnimationFrame(() => summary.setAttribute('aria-expanded', String(willBeOpen)));
});
summary.setAttribute('aria-expanded', summary.parentElement.hasAttribute('open') ? 'true' : 'false');
});
})();