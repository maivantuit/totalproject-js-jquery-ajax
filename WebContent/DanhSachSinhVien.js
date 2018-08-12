// Create class DanhSachSinhVien(thông qua method) gồm các thuộc tính và function sau:
function DanhSachSinhVien(){
	this.DSSV =[];
	this.ThemSinhVien = function(svThem){
		this.DSSV.push(svThem);
	}
	this.XoaSinhVien = function(listSvXoa){
		for(var i =0; i< listSvXoa.length;i++){
			for(var j=0; j< this.DSSV.length;j++){
				var sinhVien = this.DSSV[j];
				if(listSvXoa[i]==sinhVien.MaSV){
					// use delete method in js
					this.DSSV.splice(j,1);
				}
			}
		}
	}
	this.SuaSinhVien = function(svCapNhat){
		
	}
	this.TimKiemSinhVien= function(keyword){
		var listResult = new DanhSachSinhVien();
		for(var i=0 ; i< this.DSSV.length;i++){
			var sinhVien = this.DSSV[i];
			// js support method search()
			if(sinhVien.HoTen.search(keyword.trim()) != -1){
				listResult.ThemSinhVien(sinhVien);
			}
		}
		return listResult;
	}
}