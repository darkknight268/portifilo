(function () {
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0.55';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var COLORS = ['220,20,60', '200,206,216'];
  var parts = [];
  var mouse = { x: -9999, y: -9999 };
  var running = true;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var COUNT = window.innerWidth < 768 ? 34 : 64;
  for (var i = 0; i < COUNT; i++) {
    parts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.1 + Math.random() * 1.8,
      col: COLORS[i % 2]
    });
  }

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', function () {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
  });

  var LINK = 130;
  function frame() {
    if (running) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var i, j, dx, dy, d;
      for (i = 0; i < parts.length; i++) {
        var p = parts[i];
        var mdx = p.x - mouse.x;
        var mdy = p.y - mouse.y;
        var md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 110 && md > 0.01) {
          p.vx += (mdx / md) * 0.03;
          p.vy += (mdy / md) * 0.03;
        }
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy));
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.col + ',0.55)';
        ctx.fill();
      }
      for (i = 0; i < parts.length; i++) {
        for (j = i + 1; j < parts.length; j++) {
          dx = parts[i].x - parts[j].x;
          dy = parts[i].y - parts[j].y;
          d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(' + parts[i].col + ',' + (0.14 * (1 - d / LINK)) + ')';
            ctx.lineWidth = 1;
            ctx.moveTo(parts[i].x, parts[i].y);
            ctx.lineTo(parts[j].x, parts[j].y);
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();
