const chargeButton = document.querySelector('#charge-toggle');
const chargeTarget = document.querySelector('#tg');
const chargeStatus = document.querySelector('#st');
const chargeBar = document.querySelector('#bf');
const chargeDeadline = document.querySelector('#chip');
let higherTarget = false;
chargeButton.addEventListener('click', () => {
  higherTarget = !higherTarget;
  chargeTarget.textContent = higherTarget ? '70%' : '50%';
  chargeStatus.textContent = higherTarget ? 'Rescheduled' : 'Paused';
  chargeBar.style.width = chargeTarget.textContent;
  chargeDeadline.classList.toggle('on', higherTarget);
  chargeButton.textContent = higherTarget ? 'Set target to 50%' : 'Set target to 70%';
});
chargeButton.hidden = false;

if (window.gsap && window.SplitText) {
  gsap.registerPlugin(SplitText);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const heading = document.querySelector('.hero h1');
    const split = SplitText.create(heading, {type: 'lines', mask: 'lines'});
    const reveal = gsap.from(split.lines, {
      yPercent: 38, duration: .68, stagger: .08, ease: 'power3.out',
      onComplete: () => split.revert()
    });
    return () => { reveal.kill(); split.revert(); };
  });
}

if (window.Lenis) {
  const desktopMotion = matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)');
  let lenis;
  function updateScrolling() {
    lenis?.destroy();
    lenis = desktopMotion.matches ? new Lenis({autoRaf: true, anchors: true}) : undefined;
  }
  desktopMotion.addEventListener('change', updateScrolling);
  updateScrolling();
}
