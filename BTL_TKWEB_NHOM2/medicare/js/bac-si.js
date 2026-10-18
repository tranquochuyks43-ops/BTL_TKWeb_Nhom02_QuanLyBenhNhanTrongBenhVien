
const select = document.getElementById('bsKhoa');
const cards = document.querySelectorAll('.bs-card');

select.onchange = () =>
  cards.forEach(c => c.hidden = select.value && c.dataset.khoa !== select.value);
