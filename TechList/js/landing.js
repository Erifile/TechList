(function () {
  var slides = document.getElementById('slides');
  var dots = document.querySelectorAll('#dots span');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var total = 3;
  var current = 0;
  var timer = null;

  function goTo(index) {
    current = (index + total) % total;
    slides.style.transform = 'translateX(-' + (current * (100 / total)) + '%)';
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, 5000);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  nextBtn.addEventListener('click', function () { next(); startAuto(); });
  prevBtn.addEventListener('click', function () { prev(); startAuto(); });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.dataset.index, 10));
      startAuto();
    });
  });

  var slider = document.getElementById('slider');
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  startAuto();
})();