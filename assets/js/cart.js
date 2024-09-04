document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('select-all-footer');
    const itemCheckboxes = document.querySelectorAll('.select-item');
    const totalPriceElement = document.querySelector('.cart-footer__total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartFooter = document.querySelector('.cart-footer');
    const deleteButtons = document.querySelectorAll('.delete-button');

    function updateCart() {
        let total = 0;

        const cartItems = document.querySelectorAll('.cart-item');
        let hasItems = false;

        cartItems.forEach(cartItem => {
            const checkbox = cartItem.querySelector('.select-item');
            const priceElement = cartItem.querySelector('.price');
            const price = parseFloat(priceElement.textContent.replace('đ', '').replace('.', '').replace(',', '.'));
            const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
            const isChecked = checkbox.checked;

            if (isChecked) {
                hasItems = true;
                total += price * quantity;
            }
        });

        totalPriceElement.textContent = total.toLocaleString('vi-VN');

        // Hiển thị hoặc ẩn thông báo giỏ hàng trống và phần footer
        if (cartItems.length > 0) {
            emptyCartMessage.style.display = 'none';
            cartFooter.style.display = 'flex';
        } else {
            emptyCartMessage.style.display = 'block';
            cartFooter.style.display = 'none';
        }

        // Cập nhật trạng thái checkbox chọn tất cả
        const allChecked = Array.from(itemCheckboxes).every(checkbox => checkbox.checked);
        selectAllCheckbox.checked = allChecked;
    }

    // Xử lý sự kiện khi checkbox "Chọn Tất Cả" thay đổi
    selectAllCheckbox.addEventListener('change', function() {
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateCart();
    });

    // Xử lý sự kiện khi checkbox của từng mục thay đổi
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateCart();
        });
    });

    // Xử lý sự kiện khi nhấn nút xóa sản phẩm
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const confirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
            if (confirmed) {
                const cartItem = button.closest('.cart-item');
                cartItem.remove(); // Xóa sản phẩm khỏi DOM

                // Cập nhật lại giỏ hàng
                updateCart();
            }
            else{
                event.preventDefault();
            }
        });
    });

    // Khởi tạo trạng thái giỏ hàng ban đầu
    updateCart();
});
