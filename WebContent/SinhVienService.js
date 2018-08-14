// class SinhVienService, property LayDanhSachSinhVien.
function SinhVienService(){
	this.LayDanhSachSinhVien = function LayDuLieuSinhVien(){
		
		//url API
		var urlAPI = 'http://sv.myclass.vn/api/sinhvien/laydanhsachsinhvien';
		$.ajax({
			type:'GET',
			url: urlAPI,
			cache:'false',
			//dataType:'json', // data send to server
			success: function(ketqua){
				console.log(ketqua);
				var DSSV = JSON.stringify(ketqua);
				localStorage.setItem("DanhSachSV",DSSV);
			},
			error:function(error){
				console.log(error);
			}						
		});
	}
}

