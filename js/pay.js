document.addEventListener('DOMContentLoaded', function() {
    var paymentForm = document.getElementById('payment-form');
    var paymentSuccessMessage = document.getElementById('payment-success-message');
    var nextBtn = document.querySelector('.next-btn');
    var paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    var descriptions = {
        cod: document.getElementById('cod-description'),
        "bank-transfer": document.getElementById('bank-transfer-description'),
    };

    function hideAllDescriptions() {
        for (var key in descriptions) {
            if (descriptions.hasOwnProperty(key)) {
                descriptions[key].style.display = 'none';
            }
        }
    }

    function showDescription(selectedMethod) {
        hideAllDescriptions();
        if (descriptions[selectedMethod]) {
            descriptions[selectedMethod].style.display = 'block';
        }
    }

    paymentOptions.forEach(function(option) {
        option.addEventListener('change', function() {
            showDescription(this.value);
        });
    });

    // Hiển thị mô tả của phương thức mặc định
    showDescription(document.querySelector('input[name="payment-method"]:checked').value);

    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi gửi biểu mẫu mặc định
        var selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        var confirmation = confirm('Bạn có chắc chắn muốn hoàn tất đơn hàng không?');

        if (confirmation) {
            // Xử lý thông báo thành công
            if (selectedPaymentMethod === 'cod') {
                paymentSuccessMessage.textContent = 'Bạn đã chọn Thanh toán khi nhận hàng. Đơn hàng sẽ được xử lý!';
            } else if (selectedPaymentMethod === 'bank-transfer') {
                paymentSuccessMessage.textContent = 'Bạn đã chọn Thanh toán chuyển khoản ngân hàng. Vui lòng thực hiện chuyển khoản!';
            } else {
                paymentSuccessMessage.textContent = 'Vui lòng chọn phương thức thanh toán!';
            }

            // Thêm thông báo xác nhận hoàn tất đơn hàng
            var confirmationMessage = document.createElement('div');
            confirmationMessage.textContent = 'Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ sớm liên hệ với bạn.';
            confirmationMessage.style.color = 'green';
            confirmationMessage.style.fontWeight = 'bold';
            confirmationMessage.style.marginTop = '10px';
            paymentSuccessMessage.appendChild(confirmationMessage);

            // Ẩn các nút radio sau khi hoàn tất đơn hàng
            paymentOptions.forEach(function(option) {
                option.style.display = 'none';
            });

            // Ẩn nút hoàn tất đơn hàng sau khi xác nhận
            var submitButton = document.querySelector('.btn-submit-payment');
            if (submitButton) {
                submitButton.style.display = 'none';
            }

            // Hiển thị nút tiếp tục mua hàng và xem đơn hàng
            nextBtn.style.display = 'flex';
        } else {
            // Nếu người dùng không xác nhận, không làm gì cả
            return;
        }
    });
});
