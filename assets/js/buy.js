/// Biến lưu trữ voucher đã chọn
let selectedVoucherButton = null;

// Cập nhật trạng thái nút chọn voucher
function updateVoucherButtonState(button, isDisabled) {
    if (isDisabled) {
        button.classList.add('disabled-voucher'); // Thêm lớp xám
        button.disabled = true; // Không cho phép nhấn nút
    } else {
        button.classList.remove('disabled-voucher'); // Bỏ lớp xám
        button.disabled = false; // Cho phép nhấn nút
    }
}

// Tính toán và cập nhật trạng thái cho từng nút voucher
function updateVoucherButtons() {
    const totalPrice = calculateTotalPrice();

    document.querySelectorAll('.select-voucher').forEach(button => {
        const requiredAmount = parseInt(button.getAttribute('data-minimum')); // Lấy số tiền tối thiểu từ thuộc tính data-minimum

        // Kiểm tra điều kiện và cập nhật trạng thái nút
        const isDisabled = totalPrice < requiredAmount; // Kiểm tra điều kiện
        updateVoucherButtonState(button, isDisabled); // Cập nhật trạng thái nút
    });
}

// Hàm tính tổng giá trị sản phẩm
function calculateTotalPrice() {
    let total = 0;
    const productElements = document.querySelectorAll('.product-info');

    productElements.forEach(product => {
        const price = parseInt(product.getAttribute('data-price')); // Lấy giá
        const quantity = parseInt(product.getAttribute('data-quantity')); // Lấy số lượng
        total += price * quantity; // Tính tổng
    });

    return total;
}

// Hàm áp dụng giảm giá
function applyDiscount(discountType, discountValue) {
    const originalPriceElement = document.querySelector('.original-price');
    const finalPriceElement = document.querySelector('.final-price');

    const totalPrice = calculateTotalPrice();
    let discount = 0;

    // Xử lý theo loại giảm giá
    if (discountType === 'percent') {
        discount = totalPrice * (parseInt(discountValue) / 100); // Giảm theo %
    } else if (discountType === 'amount') {
        discount = parseInt(discountValue); // Giảm theo số tiền trực tiếp
    }

    // Cập nhật hiển thị giá sau khi giảm
    let finalPrice = totalPrice - discount;
    originalPriceElement.textContent = totalPrice.toLocaleString() + '₫'; // Hiển thị giá gốc
    originalPriceElement.style.display = 'inline'; // Hiển thị giá gốc có gạch ngang
    finalPriceElement.textContent = finalPrice.toLocaleString() + '₫'; // Cập nhật giá sau khi giảm
}

// Hàm xóa giảm giá
function removeDiscount() {
    const finalPriceElement = document.querySelector('.final-price');

    const totalPrice = calculateTotalPrice(); // Tính lại tổng giá trị sản phẩm
    finalPriceElement.textContent = totalPrice.toLocaleString() + '₫'; // Cập nhật giá cuối cùng về tổng
    document.querySelector('.original-price').style.display = 'none'; // Ẩn giá gốc
}

// Cập nhật trạng thái nút voucher khi giá trị tổng thay đổi
function updatePrices() {
    const totalPrice = calculateTotalPrice();

    // Cập nhật giá hiển thị
    document.querySelector('.original-price').textContent = totalPrice.toLocaleString() + '₫'; // Giá gốc
    document.querySelector('.final-price').textContent = totalPrice.toLocaleString() + '₫'; // Giá cuối

    // Cập nhật trạng thái nút voucher
    updateVoucherButtons();
}

// Sự kiện nhấn vào tiêu đề giảm giá để hiển thị bảng voucher
document.querySelector('.discount').addEventListener('click', function() {
    const voucherTable = document.getElementById('voucherTable');
    voucherTable.style.display = voucherTable.style.display === 'none' ? 'block' : 'none';
});

// Xử lý sự kiện cho các nút chọn voucher
document.querySelectorAll('.select-voucher').forEach(button => {
    button.addEventListener('click', function() {
        const discountCode = this.getAttribute('data-code');
        const discountType = this.getAttribute('data-type');
        const discountValue = this.getAttribute('data-value');

        // Nếu đã có voucher được chọn, bỏ chọn nó
        if (selectedVoucherButton && selectedVoucherButton !== this) {
            selectedVoucherButton.classList.remove('selected-voucher'); // Bỏ lớp cho voucher trước đó
            selectedVoucherButton.textContent = "Chọn"; // Đặt lại nút "Chọn" cho voucher trước đó
        }

        // Kiểm tra nếu voucher đã được chọn
        const requiredAmount = parseInt(this.getAttribute('data-minimum')); // Lấy số tiền tối thiểu từ thuộc tính data-minimum
        const totalPrice = calculateTotalPrice(); // Lấy tổng giá

        // Kiểm tra điều kiện áp dụng voucher
        if (totalPrice < requiredAmount) {
            alert('Đơn hàng chưa đủ điều kiện để áp dụng voucher này!'); // Thông báo nếu không đủ điều kiện
            return; // Dừng lại nếu không đủ điều kiện
        }

        // Nếu voucher được chọn
        if (this.textContent === "Chọn") {
            applyDiscount(discountType, discountValue);
            this.textContent = "Bỏ chọn"; // Thay đổi nút thành "Bỏ chọn"
            this.classList.add('selected-voucher');
            selectedVoucherButton = this; // Lưu voucher đã chọn
        } else {
            removeDiscount();
            this.classList.remove('selected-voucher'); // Bỏ lớp cho nút
            this.textContent = "Chọn"; // Đặt lại nút về "Chọn"
            selectedVoucherButton = null; // Reset biến
        }

        // Cập nhật trạng thái các nút voucher
        updateVoucherButtons();
    });
});

// Gọi hàm để cập nhật giá khi trang tải
updatePrices();



//diachi
document.addEventListener('DOMContentLoaded', function() {
    var changeAddressSection = document.querySelector('.change-address');
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    var changeAddressLink = document.querySelector('.change-address-link');
    var changeSection = document.querySelector('.change');
    var closeBtn = document.querySelector('.close-btn');

    // Hiện bảng đổi địa chỉ và overlay khi nhấn vào liên kết "Thay đổi"
    changeAddressLink.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
        changeAddressSection.style.display = 'block'; // Hiện bảng đổi địa chỉ
        overlay.style.display = 'block'; // Hiện overlay
        changeSection.style.display = 'none'; // Ẩn phần tử chứa địa chỉ hiện tại
    });

    // Ẩn bảng đổi địa chỉ và overlay khi nhấn vào overlay hoặc nút "X"
    function closeAddressSection() {
        changeAddressSection.style.display = 'none'; // Ẩn bảng đổi địa chỉ
        overlay.style.display = 'none'; // Ẩn overlay
        changeSection.style.display = 'block'; // Hiện lại phần tử chứa địa chỉ hiện tại
    }

    overlay.addEventListener('click', closeAddressSection);
    closeBtn.addEventListener('click', closeAddressSection);
});


