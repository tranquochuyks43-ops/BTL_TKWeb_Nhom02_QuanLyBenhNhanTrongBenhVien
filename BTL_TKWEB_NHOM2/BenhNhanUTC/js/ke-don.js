// 1. Danh sách bệnh nhân
var danhSachBenhNhan = [
  { ten: "Nguyễn Việt An", gioiTinh: "Nam", ngaySinh: "10/05/2007", tuoi: 19, danToc: "Kinh", sdt: "0337953582", queQuan: "Hà Nội", cccd: "001206123456", nhipTim: "80 bpm", huyetAp: "120/80 mmHg", chuanDoan: "Viêm mũi dị ứng" },
  { ten: "Trần Quốc Huy", gioiTinh: "Nam", ngaySinh: "20/10/2007", tuoi: 19, danToc: "Kinh", sdt: "0938776655", queQuan: "Ninh Bình", cccd: "034185001122", nhipTim: "90 bpm", huyetAp: "135/90 mmHg", chuanDoan: "Lãng Tai"},
  { ten: "Phạm Gia Hưng", gioiTinh: "Nam", ngaySinh: "02/02/2007", tuoi: 19, danToc: "Kinh", sdt: "0980112323", queQuan: "Hà Nội", cccd: "001170099887", nhipTim: "75 bpm", huyetAp: "140/95 mmHg", chuanDoan: "Cao huyết áp"},
  { ten: "Lê Xuân Hưởng", gioiTinh: "Nam", ngaySinh: "12/09/2007", tuoi: 19, danToc: "Kinh", sdt: "0356464795", queQuan: "Nam Định", cccd: "036200011555", nhipTim: "82 bpm", huyetAp: "110/70 mmHg", chuanDoan: "Sốt xuất huyết" },
  { ten: "Nguyễn Quang Hưng", gioiTinh: "Nam", ngaySinh: "12/09/2007", tuoi: 19, danToc: "Kinh", sdt: "0378424525", queQuan: "Hà Nội", cccd: "036200011555", nhipTim: "82 bpm", huyetAp: "110/70 mmHg", chuanDoan: "Viêm Da" }
];
// 2. Hiển thị thông tin bệnh nhân
function hienThiBenhNhan() {
  var viTri = document.getElementById("patientSelect").value;
  var bn = danhSachBenhNhan[viTri];
  // Gán giá tri =fieldMap
  var fieldMap = {
  "txtTen": "ten", "txtGioiTinh": "gioiTinh", "txtNgaySinh": "ngaySinh",
  "txtTuoi": "tuoi", "txtDanToc": "danToc", "txtSDT": "sdt",
  "txtQueQuan": "queQuan", "txtCCCD": "cccd", "txtNhipTim": "nhipTim",
  "txtHuyetAp": "huyetAp", "txtChuanDoan": "chuanDoan"
};
for (var id in fieldMap) {
  document.getElementById(id).innerText = bn[fieldMap[id]];
}
  
  document.getElementById("tableBody").innerHTML = "";
  document.getElementById("tongVienPhi").innerText = "0";
  document.getElementById("saveMessage").innerText = "";
  
  themDong(); 
}
// 3. Tính tiền
function tinhTong(oNhapLieu) {
  if (oNhapLieu.value < 0) {
      alert("Cảnh báo: Không được nhập số âm!");
      oNhapLieu.value = 0; 
  }
  var tongTien = 0;
  var cacDong = document.getElementById("tableBody").getElementsByTagName("tr");
  
  // Dùng vòng lặp for duyệt qua các dòng thuốc
  for (var i = 0; i < cacDong.length; i++) {
      var dong = cacDong[i];
      var donGia = Number(dong.querySelector(".don-gia").value) || 0;
      var soLuong = Number(dong.querySelector(".so-luong").value) || 0;
      var thanhTien = donGia * soLuong;
      
      dong.querySelector(".thanh-tien").innerText = thanhTien.toLocaleString();
      tongTien += thanhTien;
  }
  
  document.getElementById("tongVienPhi").innerText = tongTien.toLocaleString();
}

// 4. Thêm dòng thuốc
function themDong() {
  var dongMoi = document.createElement("tr");
  dongMoi.innerHTML = 
      '<td><input type="text" placeholder="Nhập tên thuốc"></td>' +
      '<td><input type="number" class="don-gia" value="0" min="0" oninput="tinhTong(this)"></td>' +
      '<td><input type="number" class="so-luong" value="0" min="0" oninput="tinhTong(this)"></td>' +
      '<td class="thanh-tien">0</td>';
  
  document.getElementById("tableBody").appendChild(dongMoi);
}

// 5. Kiểm tra Tên bác sĩ 
function kiemTraTenBacSi(oNhapLieu) {
  var chuoi = oNhapLieu.value;
  
  for (var i = 0; i < chuoi.length; i++) {
      if (chuoi[i] >= '0' && chuoi[i] <= '9') {
          alert("Cảnh báo: Tên bác sĩ không được chứa số!");
          oNhapLieu.value = ""; 
          return;
      }
  }
}

// 6. Kiểm tra Số điện thoại bác sĩ 
function kiemTraSDTBacSi(oNhapLieu) {
  var giaTri = oNhapLieu.value.trim();
  
  if (giaTri !== "") {
      if (isNaN(giaTri) || giaTri.length !== 10) {
          alert("Cảnh báo: Số điện thoại không hợp lệ (phải bao gồm đúng 10 chữ số)!");
          oNhapLieu.value = ""; 
      }
  }
}

// 7. Lưu đơn thuốc
function luuDonThuoc() {
  var tenBS = document.getElementById("tenBacSi").value.trim();
  var sdtBS = document.getElementById("sdtBacSi").value.trim();

  // Kiểm tra nếu chưa nhập thông tin
  if (tenBS === "" || sdtBS === "") {
      alert("Vui lòng điền đầy đủ thông tin Tên và SĐT của Bác sĩ!");
      return; 
  }
  
  // Kiểm tra lại tên bác sĩ có chứa số hay không
  var tenCoSo = false;
  for (var i = 0; i < tenBS.length; i++) {
      if (tenBS[i] >= '0' && tenBS[i] <= '9') {
          tenCoSo = true;
          break;
      }
  }

  // Kiểm tra lại toàn bộ điều kiện trước khi lưu
  if (tenCoSo || isNaN(sdtBS) || sdtBS.length !== 10) {
      alert("Thông tin bác sĩ chưa hợp lệ, vui lòng kiểm tra lại!");
      return;
  }

  document.getElementById("saveMessage").innerText = " Lưu đơn thuốc thành công!";
}
