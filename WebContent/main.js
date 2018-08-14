// new obj DanhSachSinhVien.
var danhSachSinhVien = new DanhSachSinhVien();

var validate = new Validation();

SinhVien.prototype.DiemToan='';
SinhVien.prototype.DiemLy='';
SinhVien.prototype.DiemHoa='';
SinhVien.prototype.DTB='';
SinhVien.prototype.Loai='';
// Method
SinhVien.prototype.TinhDTB= function(){
	this.DTB = (Number(this.DiemToan) + Number(this.DiemLy) + Number(this.DiemHoa)) / 3;	
}

SinhVien.prototype.XepLoai = function(){
	if(this.DTB <= 10 && this.DTB>=8){
		this.Loai = "Xếp Lọai Giỏi";		
	}else if(this.DTB <= 8 && this.DTB>=6.5){
		this.Loai = "Xếp Lọai Khá";
	}else if(this.DTB <= 6.5 && this.DTB>=5){
		this.Loai = "Xếp Lọai Trung Bình";
	}else{
		this.Loai = "Xếp Lọai Yếu";
	}
}

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
	sinhVien.DiemToan = document.getElementById("Toan").value;
	sinhVien.DiemLy = document.getElementById("Ly").value;
	sinhVien.DiemHoa = document.getElementById("Hoa").value;
	sinhVien.TinhDTB();
	sinhVien.XepLoai();
	danhSachSinhVien.ThemSinhVien(sinhVien);
	CapNhatDanhSachSV(danhSachSinhVien);
	console.log(danhSachSinhVien);
	
}

function CapNhatDanhSachSV(DanhSachSinhVien){
	var listTableSV = document.getElementById("tbodySinhVien");
	listTableSV.innerHTML="";
	for(var i=0; i<DanhSachSinhVien.DSSV.length;i++){
		// lấy thông tin sinh viên:
		var sv = DanhSachSinhVien.DSSV[i];
		// tạo thẻ tr
		var trSinhVien = document.createElement("tr");
		trSinhVien.id = sv.MaSV;
		trSinhVien.className ="trSinhVien";
		trSinhVien.setAttribute("onclick","ChinhSuaSinhVien('"+sv.MaSV+"')");
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
		//Tạo td  DTB và  xếp loại 
        var tdDTB = createTagTd("DTB",sv.DTB);
        var tdXepLoai = createTagTd ("XepLoai",sv.Loai);
		// Append các td vào tr		
		trSinhVien.appendChild(tdCheckBox);
		trSinhVien.appendChild(tdMaSV);
		trSinhVien.appendChild(tdHoTen);
		trSinhVien.appendChild(tdEmail);
		trSinhVien.appendChild(tdCMND);			
		trSinhVien.appendChild(tdSDT);
		trSinhVien.appendChild(tdDTB);
        trSinhVien.appendChild(tdXepLoai);
        
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

function ChinhSuaSinhVien(masv){
	var sinhVien = danhSachSinhVien.TimSVTheoMa(masv.trim());
	if(sinhVien!=null){
		document.getElementById("masv").value = sinhVien.MaSV;
		document.getElementById("hoten").value = sinhVien.HoTen;
		document.getElementById("cmnd").value = sinhVien.CMND;
		document.getElementById("email").value = sinhVien.Email;
		document.getElementById("sdt").value = sinhVien.SoDT;		
	}
}
function LuuThongTin()
{
    //Lấy dữ liệu từ người dùng nhập vào
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

    //Thêm sinh viên
    var sinhvien = new SinhVien(masv,hoten,email,sdt,cmnd);
    sinhvien.Toan = document.getElementById("Toan").value;
    sinhvien.DiemLy = document.getElementById("Ly").value;
    sinhvien.DiemHoa = document.getElementById("Hoa").value;
    sinhvien.TinhDTB();
    sinhvien.XepLoai();
    danhSachSinhVien.SuaSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
}