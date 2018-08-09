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
	if(validate.checkEmpty(masv)){
		document.getElementById("masv").style.borderColor='red';
		return;
	}else{
		document.getElementById("masv").style.borderColor='green';
	}
	if(validate.checkEmpty(hoten)){
		document.getElementById("hoten").style.borderColor='red';
		return;
	}else{
		document.getElementById("hoten").style.borderColor='green';
	}
	if(validate.checkEmpty(cmnd)){
		document.getElementById("cmnd").style.borderColor='red';
		return;
	}else{
		document.getElementById("cmnd").style.borderColor='green';
	}
	if(validate.checkEmail(email)){
		document.getElementById("email").style.borderColor='green';
	}else{
		document.getElementById("email").style.borderColor='red';
		return;
	}
	if(validate.checkNumberPhone(sdt)){
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
		var tdMaSV = createTagTd("MaSV", sv.MaSV);
		var tdHoTen = createTagTd("HoTen", sv.HoTen);
		var tdCMND = createTagTd("CMND", sv.CMND);
		var tdEmail = createTagTd("Email", sv.Email);
		var tdSDT = createTagTd("SoDT", sv.SoDT);
		
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
function createTagTd(className, value){
	var tdSinhVien = document.createElement("td");
	tdSinhVien.className=className;
	tdSinhVien.innerHTML=value;
	return tdSinhVien;
	
}
// Lưu trữ dữ liệu, được HTML5 hổ trợ. (giống như cookie)
function SetStorage(){
	// Convert obj thành chuổi json.
	var jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
	// Json được lưu vào storage với key là DanhSachSV.
	localStorage.setItem("DanhSachSV",jsonDanhSachSinhVien);
	
}
function GetStorage(){
	// Lấy ra chuỗi json là mảng DSSV.
	var jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
	var mangDSSV = JSON.parse(jsonDanhSachSinhVien);
	danhSachSinhVien.DSSV= mangDSSV;
	CapNhatDanhSachSV(danhSachSinhVien);
}