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
        e.preventDefault();
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

        // Nếu thông tin hợp lệ, kiểm tra số điện thoại có tồn tại
        if (isValid) {
            var phoneNumber = phoneInput.value.trim();

            // Giả lập kiểm tra số điện thoại tồn tại
            var existingPhones = ['0123456789', '0987654321']; // Danh sách số điện thoại giả lập

            if (existingPhones.includes(phoneNumber)) {
                phoneError.textContent = 'Số điện thoại đã tồn tại. Vui lòng chọn số khác.';
            } else {
                // Nếu số điện thoại không tồn tại, chuyển hướng sang trang OTP
                window.location.href = 'account-register-OTP.html';
            }
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


// register-otp
document.addEventListener('DOMContentLoaded', function () {
    // Xử lý xác nhận OTP
    document.getElementById('verifyOtp').addEventListener('click', function () {
        var otpInput = document.getElementById('otp').value;

        // Kiểm tra mã OTP (thay đổi '123456' thành mã OTP thực tế)
        if (otpInput === '123456') {
            // Thông báo thành công
            alert('Bạn đã đăng ký thành công.');

            // Gửi thông tin tài khoản đến máy chủ để lưu vào cơ sở dữ liệu
            var phone = localStorage.getItem('phone');
            var password = localStorage.getItem('password');
            var name = localStorage.getItem('name');
            var email = localStorage.getItem('email');

            // Thay đổi URL API và phương thức yêu cầu nếu cần
            // fetch('https://example.com/api/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         phone: phone,
            //         password: password,
            //         name: name,
            //         email: email
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Xử lý phản hồi từ máy chủ nếu cần
            //     if (data.success) {
            //         // Chuyển hướng đến trang đăng nhập
            //         window.location.href = 'account-login.html';
            //     } else {
            //         alert('Đã xảy ra lỗi khi lưu thông tin tài khoản. Vui lòng thử lại.');
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('Đã xảy ra lỗi khi lưu thông tin tài khoản. Vui lòng thử lại.');
            // });

        } else {
            alert('Mã OTP không chính xác. Vui lòng thử lại.');
        }
    });

    // Xử lý gửi lại mã OTP
    document.getElementById('resendSMS').addEventListener('click', function () {
        alert('Mã OTP mới đã được gửi lại.');
        // Thêm mã để gửi lại OTP ở đây nếu có
    });

    // Xử lý Modal
    var modal = document.getElementById("contactModal");
    var btn = document.getElementById("contactButton");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function (event) {
        event.preventDefault();
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


//login
document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');
    
    // Lấy các phần tử input và phần tử hiển thị lỗi
    var phoneInput = document.getElementById('sdt');
    var phoneError = document.getElementById('usernameError');
    
    var passwordInput = document.getElementById('password');
    var passwordError = document.getElementById('passwordError');
    
    var rememberMeCheckbox = document.getElementById('remember');

    // Khi form được nạp, kiểm tra nếu có thông tin lưu trữ sẵn
    if (localStorage.getItem('rememberMe') === 'true') {
        phoneInput.value = localStorage.getItem('phone');
        passwordInput.value = localStorage.getItem('password');
        rememberMeCheckbox.checked = true;
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var isValid = true;

        // Làm sạch các thông báo lỗi trước đó
        phoneError.textContent = '';
        passwordError.textContent = '';

        // Kiểm tra số điện thoại
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Số điện thoại không được để trống.';
            isValid = false;
        } else if (!/^\d{10}$/.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Số điện thoại phải có 10 chữ số.';
            isValid = false;
        }

        // Kiểm tra mật khẩu
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Mật khẩu không được để trống.';
            isValid = false;
        }

        // Nếu thông tin hợp lệ, xử lý đăng nhập
        if (isValid) {
            var correctPhone = '0123456789'; // Số điện thoại chính xác
            var correctPassword = 'password123'; // Mật khẩu chính xác

            if (phoneInput.value.trim() === correctPhone && passwordInput.value.trim() === correctPassword) {
                // Lưu thông tin đăng nhập nếu checkbox được chọn
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('phone', phoneInput.value.trim());
                    localStorage.setItem('password', passwordInput.value.trim());
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('phone');
                    localStorage.removeItem('password');
                }

                // Chuyển hướng đến trang chính sau 1 giây
                setTimeout(function() {
                    window.location.href = 'index.html'; // Chuyển đến trang chính
                }, 1000);
            } else {
                // Hiển thị thông báo lỗi
                if (phoneInput.value.trim() !== correctPhone) {
                    phoneError.textContent = 'Số điện thoại không chính xác. Vui lòng thử lại.';
                }
                if (passwordInput.value.trim() !== correctPassword) {
                    passwordError.textContent = 'Mật khẩu không chính xác. Vui lòng thử lại.';
                }
            }
        }
    });
});

//forget pass
document.addEventListener('DOMContentLoaded', function () {
    var forgotPasswordForm = document.getElementById('forgot-passwordForm');
    var sdtInput = document.getElementById('sdt');
    var usernameError = document.getElementById('username-error');

    // Danh sách số điện thoại giả lập
    var existingPhones = ['0123456789', '0987654321'];

    forgotPasswordForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn việc gửi form mặc định

        var isValid = true;
        var sdtValue = sdtInput.value.trim();

        // Làm sạch thông báo lỗi trước khi kiểm tra
        usernameError.textContent = '';

        // Kiểm tra số điện thoại
        if (sdtValue === '') {
            usernameError.textContent = 'Số điện thoại không được để trống.';
            isValid = false;
        } else if (!/^\d{10}$/.test(sdtValue)) {
            usernameError.textContent = 'Số điện thoại phải có đúng 10 chữ số.';
            isValid = false;
        }

        // Nếu thông tin hợp lệ, kiểm tra tồn tại trong danh sách số điện thoại giả lập
        if (isValid) {
            var exists = existingPhones.includes(sdtValue);

            if (exists) {
                // Số điện thoại tồn tại, chuyển hướng đến trang OTP
                window.location.href = 'account-forgot_password-OTP.html';
            } else {
                // Hiển thị thông báo lỗi nếu số điện thoại không tồn tại
                usernameError.textContent = 'Số điện thoại chưa được đăng ký.';
            }
        }
    });
});

//fg-pass-otp
document.addEventListener('DOMContentLoaded', function () {
    var verifyOtpButton = document.getElementById('verifyOtp');
    var otpInput = document.getElementById('otp-fg');
    var otpError = document.getElementById('otp-error');

    // Mã OTP giả lập
    var correctOtp = '123456'; // Thay đổi theo mã OTP thực tế

    verifyOtpButton.addEventListener('click', function () {
        var otpValue = otpInput.value.trim();

        // Làm sạch thông báo lỗi trước khi kiểm tra
        otpError.textContent = '';

        // Kiểm tra mã OTP
        if (otpValue === '') {
            otpError.textContent = 'Mã OTP không được để trống.';
        } else if (otpValue === correctOtp) {
            // Mã OTP đúng, chuyển hướng đến trang đổi mật khẩu
            window.location.href = 'account-change_password.html';
        } else {
            // Mã OTP không chính xác
            otpError.textContent = 'Mã OTP không chính xác. Vui lòng thử lại.';
        }
    });

    // Gửi lại mã OTP
    document.getElementById('resendSMS').addEventListener('click', function () {
        alert('Mã OTP mới đã được gửi lại.');
        // Thêm mã để gửi lại OTP ở đây nếu có
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
        e.preventDefault(); // Ngăn việc gửi form mặc định

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
        } else if (passwordValue.length < 6) {
            passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            isValid = false;
        }

        // Kiểm tra xác nhận mật khẩu
        if (confirmPasswordValue === '') {
            confirmPasswordError.textContent = 'Vui lòng xác nhận mật khẩu.';
            isValid = false;
        } else if (passwordValue !== confirmPasswordValue) {
            confirmPasswordError.textContent = 'Mật khẩu xác nhận không khớp.';
            isValid = false;
        }

        // Nếu thông tin hợp lệ, thực hiện cập nhật mật khẩu
        if (isValid) {
            // Gửi mật khẩu mới đến server (giả lập ở đây)
            var phoneNumber = '0123456789'; // Số điện thoại từ trước, nên lấy từ thông tin đã xác thực

            // Thực hiện gọi API để cập nhật mật khẩu mới cho số điện thoại
            // Đây là phần giả lập. Trong thực tế, bạn sẽ thay thế bằng gọi API thực tế.
            console.log('Đang gửi mật khẩu mới cho số điện thoại: ' + phoneNumber);
            console.log('Mật khẩu mới: ' + passwordValue);

            // Hiển thị thông báo thành công và chuyển hướng
            alert('Mật khẩu đã được cập nhật thành công.');
            window.location.href = 'account-login.html'; // Chuyển đến trang đăng nhập
        }
    });
});







