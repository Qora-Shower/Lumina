// haptic.js

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("mousedown", createHaptic);
  document.body.addEventListener("mouseup", removeHaptic);
});

let ripple = null;

function createHaptic(e) {
  ripple = document.createElement("div");
  ripple.style.position = "fixed";
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  ripple.style.width = "0px";
  ripple.style.height = "0px";
  ripple.style.borderRadius = "50%";
  ripple.style.background = "rgba(255,255,255,0.5)";
  ripple.style.transform = "translate(-50%, -50%) scale(0)";
  ripple.style.pointerEvents = "none";
  ripple.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out";
  ripple.style.zIndex = "9999";

  document.body.appendChild(ripple);

  // Animation: wächst auf eine große Größe
  requestAnimationFrame(() => {
    ripple.style.width = "200px";
    ripple.style.height = "200px";
    ripple.style.transform = "translate(-50%, -50%) scale(1)";
  });

  // optional: leichter Vibrations-Effekt auf Mobilgeräten
  if (navigator.vibrate) {
    navigator.vibrate(20);
  }
}

function removeHaptic() {
  if (!ripple) return;
  ripple.style.opacity = "0";
  ripple.style.transform = "translate(-50%, -50%) scale(0)";
  setTimeout(() => {
    if (ripple && ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
      ripple = null;
    }
  }, 400);
}