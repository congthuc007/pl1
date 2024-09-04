create database PL2024
go
use PL2024
go

CREATE TABLE LoaiSanPham (
    id INT IDENTITY(1,1) PRIMARY KEY,
    maloai VARCHAR(10) UNIQUE,
    tenloai NVARCHAR(100) not null,
    isdel BIT DEFAULT 0
);
GO

CREATE TABLE ChiTietLoaiSanPham (
    id INT IDENTITY(1,1) PRIMARY KEY,
    machitiet VARCHAR(10) UNIQUE,
    tenchitiet NVARCHAR(100) not null,
    maloai VARCHAR(10) not null,
    isdel BIT DEFAULT 0,
);
GO

CREATE TABLE SanPham (
    id INT IDENTITY(1,1) PRIMARY KEY,
    machitiet VARCHAR(10) not null,
    masp VARCHAR(10) UNIQUE,
    tensp NVARCHAR(100) not null,
    gia DECIMAL not null,
    mausac NVARCHAR(50),
    xuatxu NVARCHAR(50),
    mota TEXT,
    hinhanh VARCHAR(255),
    tonkho DECIMAL,
    isdel BIT DEFAULT 0,
	diemtb float 
);
GO

CREATE TABLE ChiTietDonHang (
    id INT IDENTITY(1,1) PRIMARY KEY,
    macthd VARCHAR(10)not null,
    masp VARCHAR(10) not null,
    madh VARCHAR(10) not null,
    sl INT not null,
    isdel BIT DEFAULT 0,
);
GO

CREATE TABLE Donhang (
    id INT IDENTITY(1,1) PRIMARY KEY,
    madh VARCHAR(10) UNIQUE,
    ngaytao DATE,
    ngaygiaohang DATE,
    tongtien DECIMAL(10, 2),
    ghichu TEXT,
    makh VARCHAR(10),
    tenkh NVARCHAR(100) ,
    sdtkh VARCHAR(20) ,
    noinhan TEXT ,
    magiamgia VARCHAR(10),
    tt_online BIT,
    tt_cod BIT,
	    CHECK (
        (tt_online IS NULL OR tt_online = 0) OR 
        (tt_cod IS NULL OR tt_cod = 0)
    ),
    CHECK (
        (tt_online IS NOT NULL AND tt_online = 1 AND (tt_cod IS NULL OR tt_cod = 0)) OR 
        (tt_cod IS NOT NULL AND tt_cod = 1 AND (tt_online IS NULL OR tt_online = 0))
    ),
    isdel BIT DEFAULT 0,
);
GO

CREATE TABLE KhachHang (
    id INT IDENTITY(1,1) PRIMARY KEY,
    makh VARCHAR(10) UNIQUE,
    hoten NVARCHAR(100),
    gmail VARCHAR(100),
    sdt VARCHAR(10),
    diachi TEXT,
    magiamgia VARCHAR(10),
    madh VARCHAR(10),
    matkhau VARCHAR(100),
    isdel BIT DEFAULT 0,
);
GO

CREATE TABLE GiamGia (
    id INT IDENTITY(1,1) PRIMARY KEY,
    magiamgia VARCHAR(10) UNIQUE,
    tengiamgia NVARCHAR(100),
    ngaybatdau DATE,
    ngayketthuc DATE,
    giamgia DECIMAL(5, 2),
    isdel BIT DEFAULT 0
);
GO

CREATE TABLE QTV (
    id INT IDENTITY(1,1) PRIMARY KEY,
	tentk VARCHAR(20) not null ,
    manv VARCHAR(10) UNIQUE,
    hoten NVARCHAR(100),
    ngaysinh DATE,
    gioitinh BIT,
    sdt VARCHAR(20),
    matkhau VARCHAR(100),
    cmnd VARCHAR(20),
    maquyen VARCHAR(10),
    isdel BIT DEFAULT 0,
);
GO



CREATE TABLE Quyen (
    id INT IDENTITY(1,1) PRIMARY KEY,
    maquyen VARCHAR(10) UNIQUE,
    tenquyen VARCHAR(100),
    isdel BIT DEFAULT 0
);
GO

CREATE TABLE Danhgia (
    id INT IDENTITY(1,1) PRIMARY KEY,
    maph VARCHAR(10),
    makh VARCHAR(10),
	manv VARCHAR(10),
    noidung TEXT,
    traloi TEXT,
	diem float 
);
GO

CREATE TABLE TinTuc (
    id INT IDENTITY(1,1) PRIMARY KEY,
    matintuc VARCHAR(10),
    chude VARCHAR(100),
    noidung TEXT,
    tomtat TEXT,
    ngaydang DATE,
    hinhanh VARCHAR(255),
    manhanvien VARCHAR(10),
    isdel BIT DEFAULT 0,
);
GO

-- Thêm khóa ngoại vào bảng ChiTietLoaiSanPham
ALTER TABLE ChiTietLoaiSanPham
ADD CONSTRAINT FK_ChiTietLoaiSanPham_LoaiSanPham FOREIGN KEY (maloai) REFERENCES LoaiSanPham(maloai);
GO

-- Thêm khóa ngoại vào bảng SanPham
ALTER TABLE SanPham
ADD CONSTRAINT FK_SanPham_ChiTietLoaiSanPham FOREIGN KEY (machitiet) REFERENCES ChiTietLoaiSanPham(machitiet);
GO

-- Thêm khóa ngoại vào bảng ChiTietHoaDon
ALTER TABLE ChiTietDonHang
ADD CONSTRAINT FK_ChiTietDonHang_SanPham FOREIGN KEY (masp) REFERENCES SanPham(masp);
GO

ALTER TABLE ChiTietDonHang
ADD CONSTRAINT FK_ChiTietDonHang_DonHang FOREIGN KEY (madh) REFERENCES Donhang(madh);
go

ALTER TABLE Donhang
ADD CONSTRAINT FK_giamgia_DonHang FOREIGN KEY (magiamgia) REFERENCES GiamGia(magiamgia);
GO

ALTER TABLE Donhang
ADD CONSTRAINT FK_Khachhang_DonHang FOREIGN KEY (makh) REFERENCES Khachhang(makh);
GO

-- Thêm khóa ngoại vào bảng KhachHang
ALTER TABLE KhachHang
ADD CONSTRAINT FK_KhachHang_GiamGia FOREIGN KEY (magiamgia) REFERENCES GiamGia(magiamgia);
GO

-- Thêm khóa ngoại vào bảng NhanVien
ALTER TABLE QTV
ADD CONSTRAINT FK_NhanVien_Quyen FOREIGN KEY (maquyen) REFERENCES Quyen(maquyen);
GO

-- Thêm khóa ngoại vào bảng PhanHoi
ALTER TABLE Danhgia
ADD CONSTRAINT FK_PhanHoi_KhachHang FOREIGN KEY (makh) REFERENCES KhachHang(makh);
GO

ALTER TABLE Danhgia
ADD CONSTRAINT FK_PhanHoi_QTV FOREIGN KEY (manv) REFERENCES QTV(manv);
GO

-- Thêm khóa ngoại vào bảng TinTuc
ALTER TABLE TinTuc
ADD CONSTRAINT FK_TinTuc_NhanVien FOREIGN KEY (manhanvien) REFERENCES QTV(manv);
GO

INSERT INTO LoaiSanPham (maloai, tenloai) VALUES 
('LSP001', N'Điện thoại'),
('LSP002', N'Laptop');
GO
INSERT INTO ChiTietLoaiSanPham (machitiet, tenchitiet, maloai) VALUES 
('CT01', N'Điện thoại thông minh', 'LSP001'),
('CT02', N'Laptop gaming', 'LSP002');
GO
INSERT INTO SanPham (masp, tensp, gia, mausac, xuatxu, mota, hinhanh, tonkho, machitiet) VALUES 
('SP001', N'iPhone 14', 24990000, N'Đen', N'USA', N'Điện thoại thông minh', N'iphone14.jpg', 100, 'CT01'),
('SP002', N'Dell XPS 15', 39990000, N'Bạc', N'USA', N'Laptop cao cấp', N'dellxps15.jpg', 50, 'CT02');
GO
INSERT INTO GiamGia(magiamgia, tengiamgia, ngaybatdau, ngayketthuc, giamgia) VALUES 
('GG001', N'Giảm giá mùa hè', '2024-07-01', '2024-07-31', 10.00),
('GG002', N'Khuyến mãi cuối năm', '2024-12-01', '2024-12-31', 15.00);
GO
INSERT INTO Quyen (maquyen, tenquyen) VALUES 
('Q001', N'Quản lý'),
('Q002', N'Nhân viên bán hàng');
GO
INSERT INTO QTV(manv,tentk, hoten, ngaysinh, gioitinh, sdt, matkhau, cmnd, maquyen) VALUES 
('NV001','admin', N'Hoàng Văn C', '1990-01-01', 1, '0123456789', N'123', '123456789', 'Q001'),
('NV002','admin1', N'Nguyễn Thị D', '1985-05-15', 0,'0987654321', N'456', '987654321', 'Q002');
GO
INSERT INTO TinTuc (matintuc, chude, noidung, tomtat, ngaydang, hinhanh, manhanvien) VALUES 
('TT001', N'Khuyến mãi mùa hè', N'Chúng tôi đang có chương trình khuyến mãi mùa hè lớn.', N'Khuyến mãi lớn nhất trong năm', '2024-07-15', N'khuyenmai.jpg', 'NV001'),
('TT002', N'Giới thiệu sản phẩm mới', N'Chúng tôi giới thiệu sản phẩm mới với nhiều tính năng hấp dẫn.', N'Sản phẩm mới với công nghệ tiên tiến', '2024-07-20', N'sanphammoitinhte.jpg', 'NV002');
GO
INSERT INTO KhachHang (makh, hoten, gmail, sdt, diachi, magiamgia, madh, matkhau) VALUES 
('KH001', N'Nguyễn Văn A', N'nguyenvana@gmail.com', '0123456789', N'123 Đường ABC, Q1', 'GG001', 'DH001', N'password123'),
('KH002', N'Trần Thị B', N'tranthib@gmail.com', '0987654321', N'456 Đường DEF, Q2', 'GG002', 'DH002', N'password456');
GO
INSERT INTO Donhang (madh, ngaytao, ngaygiaohang, tongtien, ghichu, makh, tenkh, sdtkh, noinhan, magiamgia, tt_online, tt_cod) VALUES 
('DH001', '2024-07-22', '2024-07-30', 24990000, N'Giao hàng nhanh', 'KH001', N'Nguyễn Văn A', '0123456789', N'123 Đường ABC, Q1', 'GG001', 1, 0),
('DH002', '2024-07-22', '2024-07-31', 39990000, N'Giao hàng tận nơi', 'KH002', N'Trần Thị B', '0987654321', N'456 Đường DEF, Q2', 'GG002', 0, 1);
GO
INSERT INTO ChiTietDonHang (macthd, masp, madh, sl) VALUES 
('CTDH001', 'SP001', 'DH001', 1),
('CTDH002', 'SP002', 'DH002', 2);
GO
INSERT INTO Danhgia (maph, makh,manv, noidung, traloi,diem) VALUES 
('PH001', 'KH001','NV001', N'Tôi không hài lòng với sản phẩm', N'Chúng tôi xin lỗi và sẽ xem xét lại',1),
('PH002', 'KH002','NV002', N'Giao hàng nhanh chóng, cảm ơn', N'Cảm ơn phản hồi của bạn',5);
GO

