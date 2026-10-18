var danhSachBenhNhan = [
  { id: 'BN001', ten: "Nguyễn Việt An", gioiTinh: "Nam", tuoi: 19, sdt: "0337953582", queQuan: "Hà Nội", cccd: "001206123456" },
  { id: 'BN002', ten: "Trần Quốc Huy", gioiTinh: "Nam", tuoi: 19, sdt: "0938776655", queQuan: "Ninh Bình", cccd: "034185001122" },
  { id: 'BN003', ten: "Phạm Gia Hưng", gioiTinh: "Nam", tuoi: 19, sdt: "0980112323", queQuan: "Hà Nội", cccd: "001170099887" },
  { id: 'BN004', ten: "Lê Xuân Hưởng", gioiTinh: "Nam", tuoi: 19, sdt: "0356464795", queQuan: "Nam Định", cccd: "036200011555" },
  { id: 'BN005', ten: "Nguyễn Quang Hưng", gioiTinh: "Nam", tuoi: 19, sdt: "0378424525", queQuan: "Hà Nội", cccd: "036200011555" }
];
var soMa = 5;   
function lay(id) { return document.getElementById(id).value.trim(); }
function hienThi() {
  var tuKhoa = lay('bnSearch').toLowerCase();
  var html = '';
  for (var i = 0; i < danhSachBenhNhan.length; i++) {
    var p = danhSachBenhNhan[i];
    if ((p.id + ' ' + p.ten).toLowerCase().indexOf(tuKhoa) == -1) continue;
    html += '<tr><td>' + p.id + '</td><td>' + p.ten + '</td><td>' + p.gioiTinh + '</td><td>' + p.tuoi + '</td><td>' + p.sdt +
      '</td><td>' + p.cccd + '</td><td>' + p.queQuan + '</td><td><button class="btn btn-red" onclick="xoa(' + i + ')">Xóa</button></td></tr>';
  }
  if (html == '') html = '<tr><td colspan="8" class="bn-empty">Không có bệnh nhân</td></tr>';
  document.getElementById('bnList').innerHTML = html;
}
// Thêm bệnh nhân 
function them() {
  var ten = lay('bnName'), tuoi = lay('bnAge'), sdt = lay('bnPhone'), cccd = lay('bnCCCD'), que = lay('bnQue');
  var msg = document.getElementById('bnMsg');

  if (ten == '' || tuoi == '' || sdt == '' || cccd == '' || que == '') { msg.textContent = 'Vui lòng nhập đủ thông tin'; return; }
  if (ten.length < 2 || ten.length > 50 || /[0-9]/.test(ten)) { msg.textContent = 'Họ tên từ 2 đến 50 ký tự và không chứa chữ số'; return; }
  if (tuoi < 0 || tuoi > 120) { 
    msg.textContent = 'Tuổi phải từ 0 đến 120'; 
    return; }
  if (!/^0[0-9]{9}$/.test(sdt)) { 
    msg.textContent = 'SĐT phải gồm 10 chữ số và bắt đầu bằng 0'; 
    return; }
  if (!/^[0-9]{12}$/.test(cccd)) { 
    msg.textContent = 'CCCD phải gồm đúng 12 chữ số'; 
    return; }
  for (var i = 0; i < danhSachBenhNhan.length; i++) {
    if (danhSachBenhNhan[i].cccd == cccd) { msg.textContent = 'Số CCCD này đã tồn tại'; 
      return; }
  }
  soMa++;
  danhSachBenhNhan.push({ id: 'BN' + (soMa < 10 ? '00' : '0') + soMa, ten: ten, gioiTinh: lay('bnGender'), tuoi: tuoi, sdt: sdt, queQuan: que, cccd: cccd });
  var cacO = ['bnName', 'bnAge', 'bnPhone', 'bnCCCD', 'bnQue'];
  for (var j = 0; j < cacO.length; j++) document.getElementById(cacO[j]).value = '';
  msg.textContent = '';
  hienThi();
}
// Xóa bệnh nhân
function xoa(i) {
  if (confirm('Xóa bệnh nhân ' + danhSachBenhNhan[i].id + '?')) { danhSachBenhNhan.splice(i, 1); hienThi(); }
}

document.getElementById('bnSave').onclick = them;
document.getElementById('bnSearch').oninput = hienThi;
hienThi();
