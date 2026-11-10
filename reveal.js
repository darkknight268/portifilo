(function () {
  var revealTargets = document.querySelectorAll('.reveal');
  if (revealTargets.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  var bars = document.querySelectorAll('.skill-bar-fill[data-level]');
  if (bars.length && 'IntersectionObserver' in window) {
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var f = entry.target;
          f.style.width = f.getAttribute('data-level') + '%';
          bio.unobserve(f);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { bio.observe(b); });
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var tiltEls = document.querySelectorAll('.card, .skill-box, .service-box, .contact-box, .writeup-card');
    tiltEls.forEach(function (el) {
      el.classList.add('tilt');
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      var glare = document.createElement('span');
      glare.className = 'glare';
      el.appendChild(glare);
      var max = 7;
      el.addEventListener('mousemove', function (ev) {
        var r = el.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - 0.5;
        var y = (ev.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        el.style.setProperty('--my', (ev.clientY - r.top) + 'px');
        el.style.transform = 'perspective(900px) rotateX(' + (-y * max) + 'deg) rotateY(' + (x * max) + 'deg) translateY(-8px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });

    var g1 = document.createElement('div');
    var g2 = document.createElement('div');
    g1.className = 'cursor-glow glow-crimson';
    g2.className = 'cursor-glow glow-green';
    document.body.appendChild(g1);
    document.body.appendChild(g2);

    var mx = -9999, my = -9999;
    var x1 = -9999, y1 = -9999, x2 = -9999, y2 = -9999;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
    });
    function animate() {
      x1 += (mx - x1) * 0.09;
      y1 += (my - y1) * 0.09;
      x2 += (mx - x2) * 0.045;
      y2 += (my - y2) * 0.045;
      g1.style.transform = 'translate(' + x1 + 'px,' + y1 + 'px) translate(-50%,-50%)';
      g2.style.transform = 'translate(' + x2 + 'px,' + y2 + 'px) translate(-50%,-50%)';
      requestAnimationFrame(animate);
    }
    animate();
  }
})();
