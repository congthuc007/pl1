document.addEventListener('DOMContentLoaded', () => {
    // Lặp qua tất cả các sản phẩm có đánh giá
    const productRatings = document.querySelectorAll('.product-rating');

    productRatings.forEach((productRating) => {
        const stars = productRating.querySelectorAll('.rating-star');
        const ratingButton = productRating.querySelector('.received-button');
        const ratingComment = productRating.querySelector('.rating-comment');
        const ratingDisplay = productRating.querySelector('.rating-display');
        
        let ratingValue = parseInt(productRating.getAttribute('data-rating')) || 0;
        let hasRated = ratingValue > 0;

        // Hiển thị các sao theo giá trị mặc định
        stars.forEach((star, index) => {
            if (index < ratingValue) {
                star.classList.add('selected');
            }
        });

        // Ẩn nút Đánh Giá và ô ghi chú nếu đã có điểm đánh giá
        if (hasRated) {
            ratingButton.style.display = 'none';
            ratingComment.style.display = 'none';
        }

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
                    ratingValue = index + 1; // Vì index bắt đầu từ 0 nên cần +1
                    console.log("Giá trị đánh giá: " + ratingValue);

                    // Cập nhật thuộc tính data-rating
                    productRating.setAttribute('data-rating', ratingValue);

                    // Cập nhật trạng thái các sao
                    stars.forEach((s, i) => {
                        s.classList.toggle('selected', i <= index);
                    });

                    // Hiện ô ghi chú và nút đánh giá sau khi chọn sao
                    ratingComment.style.display = 'block';
                    ratingButton.style.display = 'block';
                }
            });
        });

        // Xử lý sự kiện khi rời chuột khỏi khu vực sao
        productRating.querySelector('.star-rating').addEventListener('mouseleave', () => {
            stars.forEach(star => star.classList.remove('hover'));
        });

        // Xử lý khi nhấn nút Đánh Giá
        ratingButton.addEventListener('click', () => {
            // Chỉ kiểm tra đánh giá sao, bình luận không bắt buộc
            if (ratingValue === 0) {
                alert('Vui lòng chọn số sao để đánh giá!');
            } else {
                // Cập nhật phần tử hiển thị nội dung đánh giá
                const comment = ratingComment.value.trim();
                ratingDisplay.innerHTML = `
                    <span>${comment ? `${comment}` : 'Bạn không thêm bình luận nào.'}</span>
                `;
                ratingDisplay.style.display = 'block';

                alert('Cảm ơn bạn đã đánh giá!');

                // Đánh dấu là đã đánh giá
                hasRated = true;

                // Ẩn nút Đánh Giá và ô ghi chú sau khi đánh giá thành công
                ratingButton.style.display = 'none';
                ratingComment.style.display = 'none';
            }
        });
    });
});



//tab order
//js order
// Lấy tất cả các tab và phần hiển thị đơn hàng
const tabs = document.querySelectorAll('.tab');
const orders = document.querySelectorAll('.orders');

// Hàm xử lý khi nhấp vào tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Lấy giá trị của data-type từ tab được nhấp
        const type = tab.getAttribute('data-type');

        // Loại bỏ lớp 'active' khỏi tất cả các tab và phần hiển thị đơn hàng
        tabs.forEach(t => t.classList.remove('active'));
        orders.forEach(order => order.classList.remove('active'));

        // Thêm lớp 'active' vào tab và phần hiển thị đơn hàng được chọn
        tab.classList.add('active');
        document.getElementById('orders-' + type).classList.add('active');
    });
});

// Hàm lấy giá trị của tham số URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Lấy giá trị của tham số 'type' từ URL và hiển thị phần tương ứng
const type = getUrlParameter('type');
if (type) {
    tabs.forEach(tab => {
        if (tab.getAttribute('data-type') === type) {
            tab.click();
        }
    });
}
