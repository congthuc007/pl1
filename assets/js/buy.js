// document.querySelector('.discount').addEventListener('click', function() {
//     var voucherTable = document.getElementById('voucherTable');
//     voucherTable.style.display = voucherTable.style.display === 'none' ? 'block' : 'none';
// });

// document.querySelectorAll('.select-voucher').forEach(function(button) {
//     button.addEventListener('click', function() {
//         var voucherCode = this.getAttribute('data-code');
//         alert('Bạn đã chọn mã: ' + voucherCode);
//         // Bạn có thể thêm logic để áp dụng mã giảm giá tại đây
//     });
// });


document.querySelector('.discount').addEventListener('click', function() {
    var voucherTable = document.getElementById('voucherTable');
    voucherTable.style.display = voucherTable.style.display === 'none' ? 'block' : 'none';
});

document.querySelector('.apply-discount').addEventListener('click', function() {
    var discountCode = document.getElementById('discount-code').value;
    if (discountCode) {
        alert('Mã giảm giá bạn nhập là: ' + discountCode);
        // Thêm logic áp dụng mã giảm giá tại đây
    } else {
        alert('Vui lòng nhập mã giảm giá.');
    }
});

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


