// ===== Chuyển qua lại giữa Đăng nhập và Đăng ký =====
var tabLogin = document.getElementById('tabLogin');
var tabReg = document.getElementById('tabReg');
var formLogin = document.getElementById('formLogin');
var formReg = document.getElementById('formReg');

function showTab(isLogin) {
  formLogin.style.display = isLogin ? 'block' : 'none';
  formReg.style.display = isLogin ? 'none' : 'block';
  tabLogin.classList.toggle('active', isLogin);
  tabReg.classList.toggle('active', !isLogin);
}
tabLogin.onclick = function () { showTab(true); };
tabReg.onclick = function () { showTab(false); };

// ===== Đăng ký =====
document.getElementById('btnReg').onclick = function () {
  var name = document.getElementById('rgName').value.trim();
  var user = document.getElementById('rgUser').value.trim();
  var pass = document.getElementById('rgPass').value;
  var pass2 = document.getElementById('rgPass2').value;
  var msg = document.getElementById('rgMsg');
  msg.className = 'msg error';

  if (!name || !user || !pass) { msg.textContent = 'Vui lòng nhập đủ thông tin'; return; }
  if (pass.length < 6) { msg.textContent = 'Mật khẩu phải có ít nhất 6 ký tự'; return; }
  if (pass !== pass2) { msg.textContent = 'Mật khẩu nhập lại không khớp'; return; }

  var accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
  if (user === 'admin' || accounts.some(function (a) { return a.user === user; })) {
    msg.textContent = 'Tên đăng nhập đã tồn tại'; return;
  }
  accounts.push({ name: name, user: user, pass: pass });
  localStorage.setItem('accounts', JSON.stringify(accounts));

  msg.className = 'msg ok';
  msg.textContent = 'Đăng ký thành công! Mời bạn đăng nhập.';
  setTimeout(function () {
    document.getElementById('lgUser').value = user;
    showTab(true);
  }, 1000);
};

// KIỂM TRA EMAIL

btnReg.addEventListener("click", function() {
    const email = rgEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        rgMsg.textContent = "Email không đúng định dạng!";
        rgMsg.classList.add("error");

        return;
    }
});

// ===== Đăng nhập =====
document.getElementById('btnLogin').onclick = function () {
  var user = document.getElementById('lgUser').value.trim();
  var pass = document.getElementById('lgPass').value;
  var msg = document.getElementById('lgMsg');

  if (!user || !pass) { msg.textContent = 'Vui lòng nhập đủ thông tin'; return; }
  var accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
  accounts.push({ user: 'admin', pass: '123456' });   // tài khoản mặc định

  var found = accounts.some(function (a) { return a.user === user && a.pass === pass; });
  if (found) {
    localStorage.setItem('loginUser', user);
    window.location.href = 'trang-chu.html';
  } else {
    msg.textContent = 'Sai tên đăng nhập hoặc mật khẩu';
  }
};

// ===== Mở đúng tab khi đi từ Trang chủ (dang-ky.html#dang-ky hoặc #dang-nhap) =====
if (location.hash === '#dang-ky') showTab(false);
else showTab(true);
