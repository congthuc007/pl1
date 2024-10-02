// contact
document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("contactModal");
    var btns = document.querySelectorAll("#contactButton, .contact-seller-button"); // Chọn tất cả các nút liên hệ
    var span = document.getElementsByClassName("close")[0];

    // Khi nhấp vào nút Liên hệ, hiện modal
    btns.forEach(function(btn) {
        btn.onclick = function (event) {
            event.preventDefault();
            modal.style.display = "block";
        }
    });

    // Khi nhấp vào dấu X, ẩn modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Khi nhấp vào bất kỳ đâu bên ngoài modal, ẩn modal
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});



// register
document.addEventListener('DOMContentLoaded', function () {
    var registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (e) {
        var isValid = true;

        // Lấy các phần tử input và phần tử hiển thị lỗi
        var phoneInput = document.getElementById('sdt');
        var phoneError = document.getElementById('phone-error');

        var nameInput = document.getElementById('name');
        var nameError = document.getElementById('name-error');

        var passwordInput = document.getElementById('password');
        var passwordError = document.getElementById('password-error');

        var confirmPasswordInput = document.getElementById('confirm-password');
        var confirmPasswordError = document.getElementById('confirm-password-error');

        var emailInput = document.getElementById('email');
        var emailError = document.getElementById('email-error');

        // Kiểm tra số điện thoại
        if (!/^\d{10}$/.test(phoneInput.value)) {
            phoneError.textContent = 'Số điện thoại phải là 10 chữ số.';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        // Kiểm tra họ và tên
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Họ và tên không được để trống.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Kiểm tra mật khẩu
        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        // Kiểm tra xác nhận mật khẩu
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Mật khẩu xác nhận không khớp.';
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
        }

        // Kiểm tra email
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Địa chỉ email không hợp lệ.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
    });

    // Giới hạn ký tự cho số điện thoại
    document.getElementById('sdt').addEventListener('input', function (e) {
        var input = e.target;
        input.value = input.value.replace(/\D/g, '');
        if (input.value.length > 10) {
            input.value = input.value.slice(0, 10);
        }
    });
});


//fg-pass-change
document.addEventListener('DOMContentLoaded', function () {
    var forgotPasswordForm = document.getElementById('forgot-passwordForm');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');
    var passwordError = document.getElementById('password-error');
    var confirmPasswordError = document.getElementById('confirm-password-error');

    forgotPasswordForm.addEventListener('submit', function (e) {
        var isValid = true;
        var passwordValue = passwordInput.value.trim();
        var confirmPasswordValue = confirmPasswordInput.value.trim();

        // Làm sạch thông báo lỗi trước khi kiểm tra
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        // Kiểm tra mật khẩu
        if (passwordValue === '') {
            passwordError.textContent = 'Mật khẩu không được để trống.';
            isValid = false;
            e.preventDefault(); // Ngăn việc gửi form mặc định
        } else if (passwordValue.length < 6) {
            passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            isValid = false;
            e.preventDefault(); // Ngăn việc gửi form mặc định
        }

        // Kiểm tra xác nhận mật khẩu
        if (confirmPasswordValue === '') {
            confirmPasswordError.textContent = 'Vui lòng xác nhận mật khẩu.';
            isValid = false;
            e.preventDefault(); // Ngăn việc gửi form mặc định
        } else if (passwordValue !== confirmPasswordValue) {
            confirmPasswordError.textContent = 'Mật khẩu xác nhận không khớp.';
            isValid = false;
            e.preventDefault(); // Ngăn việc gửi form mặc định
        }
    });
});







