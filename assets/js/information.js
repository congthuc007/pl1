document.addEventListener('DOMContentLoaded', (event) => {
    const logoutLink = document.getElementById('logout-link');

    logoutLink.addEventListener('click', (event) => {
        // Ngăn không cho liên kết mặc định được thực hiện ngay lập tức
        event.preventDefault();

        // Hiển thị hộp thoại xác nhận
        const isConfirmed = confirm('Bạn có chắc chắn muốn thoát tài khoản không?');

        // Nếu người dùng chọn "OK", thực hiện hành động thoát
        if (isConfirmed) {
            // Chuyển hướng đến trang đăng nhập
            window.location.href = logoutLink.href;
        }
        else{
            event.preventDefault();
        }
    });
});
function confirmDelete(event) {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = confirm("Bạn có chắc chắn muốn xóa tài khoản này không?");
    
    // Nếu người dùng xác nhận
    if (isConfirmed) {
        // Thực hiện hành động xóa tài khoản ở đây, ví dụ gửi yêu cầu đến server
        alert("Tài khoản của bạn đã được xóa.");
        // window.location.href = 'url xử lý xóa tài khoản';
    } else {
        // Ngăn chặn hành động nếu người dùng từ chối
        event.preventDefault();
        alert("Tài khoản chưa được xóa.");
    }
}