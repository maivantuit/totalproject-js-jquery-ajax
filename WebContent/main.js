// new obj DanhSachSinhVien.
var danhSachSinhVien = new DanhSachSinhVien();

var validate = new Validation();
function ThemSinhVien(){
	// get data user input.
	var masv = document.getElementById("masv").value;
	var hoten = document.getElementById("hoten").value;
	var cmnd = document.getElementById("cmnd").value;
	var email = document.getElementById("email").value;
	var sdt = document.getElementById("sdt").value;
	
	// check validation.
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
	
	// insert student
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
		
		var checkBoxMaSV = document.createElement("input");
		
		checkBoxMaSV.setAttribute("class", 'checkBoxMaSVClass');
		checkBoxMaSV.setAttribute("type", 'checkbox');
		checkBoxMaSV.setAttribute("value", sv.MaSV);
		
		tdCheckBox.appendChild(checkBoxMaSV);
		
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
function XoaSinhVien(){
	var listMaSV = document.getElementsByClassName("checkBoxMaSVClass");
	var listMaSVDuocChon =[];
	for(var i=0; i< listMaSV.length; i++){
		if(listMaSV[i].checked){			
			listMaSVDuocChon.push(listMaSV[i].value);
		}
	}
	danhSachSinhVien.XoaSinhVien(listMaSVDuocChon);
	CapNhatDanhSachSV(danhSachSinhVien);
}
function TimKiemSinhVien(){
	var keyword = document.getElementById("tukhoa").value;
	var listDSSVTimKiem = danhSachSinhVien.TimKiemSinhVien(keyword);
	CapNhatDanhSachSV(listDSSVTimKiem);
}