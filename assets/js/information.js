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
