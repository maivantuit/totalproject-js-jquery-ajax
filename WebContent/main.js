// new obj DanhSachSinhVien.
var danhSachSinhVien = new DanhSachSinhVien();

var validate = new Validation();
function ThemSinhVien(){
	// Lấy dữ liệu từ user nhập vào.
	var masv = document.getElementById("masv").value;
	var hoten = document.getElementById("hoten").value;
	var cmnd = document.getElementById("cmnd").value;
	var email = document.getElementById("email").value;
	var sdt = document.getElementById("sdt").value;
	
	// Kiểm tra validation.
	if(validate.KiemTraRong(masv)){
		document.getElementById("masv").style.borderColor='red';
		return;
	}else{
		document.getElementById("masv").style.borderColor='green';
	}
	if(validate.KiemTraRong(hoten)){
		document.getElementById("hoten").style.borderColor='red';
		return;
	}else{
		document.getElementById("hoten").style.borderColor='green';
	}
	if(validate.KiemTraRong(cmnd)){
		document.getElementById("cmnd").style.borderColor='red';
		return;
	}else{
		document.getElementById("cmnd").style.borderColor='green';
	}
	if(validate.KiemTraEmail(email)){
		document.getElementById("email").style.borderColor='green';
	}else{
		document.getElementById("email").style.borderColor='red';
		return;
	}
	if(validate.KiemTraSoDT(sdt)){
		document.getElementById("sdt").style.borderColor='green';
	}else{
		document.getElementById("sdt").style.borderColor='red';
		return;
	}
	
	// thêm sinh viên:
	var sinhVien = new SinhVien(masv, hoten, email, sdt,cmnd);
	danhSachSinhVien.ThemSinhVien(sinhVien);
	CapNhatDanhSachSV(danhSachSinhVien);
	console.log(danhSachSinhVien);
	
}
function CapNhatDanhSachSV(DanhSachSinhVien){
	var listTableSV = document.getElementById("tbodySinhVien");
	listTableSV.innerHTML="";
	for(var i=0; i<DanhSachSinhVien.DSSV.length;i++){
		// lấy thông tin sinh viên:
		var sv = danhSachSinhVien.DSSV[i];
		// tạo thẻ tr
		var trSinhVien = document.createElement("tr");
		// tạo thẻ td
		var tdCheckBox = document.createElement("td");
		var tdMaSV = TaoTheTD("MaSV", sv.MaSV);
		var tdHoTen = TaoTheTD("HoTen", sv.HoTen);
		var tdCMND = TaoTheTD("CMND", sv.CMND);
		var tdEmail = TaoTheTD("Email", sv.Email);
		var tdSDT = TaoTheTD("SoDT", sv.SoDT);
		
		// Append các td vào tr
		trSinhVien.appendChild(tdCheckBox);
		trSinhVien.appendChild(tdMaSV);
		trSinhVien.appendChild(tdHoTen);
		trSinhVien.appendChild(tdEmail);
		trSinhVien.appendChild(tdCMND);			
		trSinhVien.appendChild(tdSDT);
		// Append tr vào tbodySinhVien
		listTableSV.appendChild(trSinhVien);
	}
}
function TaoTheTD(className, value){
	var tdSinhVien = document.createElement("td");
	tdSinhVien.className=className;
	tdSinhVien.innerHTML=value;
	return tdSinhVien;
	
}