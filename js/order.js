document.addEventListener('DOMContentLoaded', () => {
    const productRatings = document.querySelectorAll('.product-rating');

    productRatings.forEach((productRating) => {
        const stars = productRating.querySelectorAll('.rating-star');
        const ratingButton = productRating.querySelector('.received-button');
        const ratingComment = productRating.querySelector('.rating-comment');
        const noteRating = productRating.querySelector('#note-rating');

        let ratingValue = parseInt(productRating.getAttribute('data-rating')) || 0;
        let hasRated = ratingValue > 0;

        // Hiển thị các sao theo giá trị mặc định
        stars.forEach((star, index) => {
            if (index < ratingValue) star.classList.add('selected');
        });

        // Xử lý sự kiện khi di chuột và nhấn vào các sao
        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                stars.forEach((s, i) => {
                    s.classList.toggle('hover', i <= index);
                });
            });

            star.addEventListener('click', () => {
                if (!hasRated) {
                    // Chọn sao và trả về giá trị điểm
                    ratingValue = index + 1;

                    // Cập nhật thuộc tính data-rating
                    productRating.setAttribute('data-rating', ratingValue);

                    // Cập nhật trạng thái các sao
                    stars.forEach((s, i) => {
                        s.classList.toggle('selected', i <= index);
                    });

                    // Hiện nút đánh giá
                    ratingButton.style.display = 'block';
                }
            });
        });

        // Xử lý khi rời chuột khỏi khu vực sao
        productRating.querySelector('.star-rating').addEventListener('mouseleave', () => {
            stars.forEach(star => star.classList.remove('hover'));
        });

        // Xử lý khi nhấn nút Đánh Giá
        ratingButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (ratingValue === 0) {
                alert('Vui lòng chọn số sao để đánh giá!');
            } else {
                alert('Cảm ơn bạn đã đánh giá!');

                // Đánh dấu là đã đánh giá
                hasRated = true;

                // Hiện lại ô ghi chú
                noteRating.style.display = 'flex'; // Hiện phần hiển thị nội dung đánh giá

                // Ẩn nút Đánh Giá và ô ghi chú sau khi đánh giá thành công
                ratingButton.style.display = 'none';
                ratingComment.style.display = 'none';

                // Ẩn các sao sau khi đã đánh giá
                stars.forEach(star => star.style.pointerEvents = 'none'); // Ngăn không cho người dùng chọn lại

                // Gửi form đánh giá
                productRating.querySelector('form').submit();
            }
        });
    });

    // Tab switching logic
    const tabs = document.querySelectorAll('.tab');
    const orders = document.querySelectorAll('.orders');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.getAttribute('data-type');

            // Remove 'active' class from all tabs and order lists
            tabs.forEach(t => t.classList.remove('active'));
            orders.forEach(order => order.classList.remove('active'));

            // Add 'active' class to the selected tab and its corresponding order list
            tab.classList.add('active');
            document.getElementById('orders-' + type).classList.add('active');
        });
    });

    // Get the 'type' parameter from the URL and select the corresponding tab
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const type = getUrlParameter('type');
    if (type) {
        tabs.forEach(tab => {
            if (tab.getAttribute('data-type') === type) {
                tab.click();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Lặp qua các phần tử `orders`
    const orderTabs = document.querySelectorAll(".orders");
    
    orderTabs.forEach(orderTab => {
        // Kiểm tra nếu không có đơn hàng (order-item)
        if (!orderTab.querySelector(".order-item")) {
            // Tạo phần tử thông báo
            const emptyMessage = document.createElement("div");
            emptyMessage.classList.add("empty-order-message");
            emptyMessage.innerHTML = '<p>Không có đơn hàng nào.</p>';
            
            // Thêm thông báo vào trong tab
            orderTab.appendChild(emptyMessage);
        }
    });
});
