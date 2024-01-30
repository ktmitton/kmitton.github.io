document.addEventListener("click", ({target}) => {
  const toggle = target.closest(".toggle");

  if (toggle) {
      const toggleOn = toggle.classList.contains("off");

      toggle.classList.toggle("off", !toggleOn);
      toggle.classList.toggle("on", toggleOn);
  }
});
