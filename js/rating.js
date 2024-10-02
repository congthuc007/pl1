document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các phần tử đánh giá
    const ratings = document.querySelectorAll('.product-detail__rating, .review__rating');
    
    ratings.forEach(rating => {
        // Lấy điểm số từ thuộc tính dữ liệu
        const score = parseFloat(rating.getAttribute('data-rating'));
        
        // Xóa tất cả các sao cũ
        rating.innerHTML = '';
        
        // Thêm các sao đầy đủ
        const fullStars = Math.floor(score);
        for (let i = 0; i < fullStars; i++) {
            const star = document.createElement('i');
            star.className = 'fa-solid fa-star';
            rating.appendChild(star);
        }
        
        // Thêm sao nửa nếu có
        if (score % 1 >= 0.5) {
            const halfStar = document.createElement('i');
            halfStar.className = 'fa-solid fa-star-half';
            rating.appendChild(halfStar);
        }
        
        // Thêm sao rỗng cho phần còn lại
        const totalStars = 5;
        const starsDisplayed = fullStars + (score % 1 >= 0.5 ? 1 : 0);
        const emptyStars = totalStars - starsDisplayed;
        for (let i = 0; i < emptyStars; i++) {
            const star = document.createElement('i');
            star.className = 'fa-regular fa-star';
            rating.appendChild(star);
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các phần tử đánh giá
    const ratings = document.querySelectorAll('.product__rating');
    
    ratings.forEach(rating => {
        // Lấy điểm số từ thuộc tính dữ liệu
        const score = parseFloat(rating.getAttribute('data-rating'));
        
        // Xóa tất cả các sao cũ
        rating.innerHTML = '';
        
        // Thêm các sao đầy đủ
        const fullStars = Math.floor(score);
        for (let i = 0; i < fullStars; i++) {
            const star = document.createElement('i');
            star.className = 'fa-solid fa-star';
            rating.appendChild(star);
        }
        
        // Thêm sao nửa nếu có
        if (score % 1 >= 0.5) {
            const halfStar = document.createElement('i');
            halfStar.className = 'fa-solid fa-star-half';
            rating.appendChild(halfStar);
        }
        
        // Thêm sao rỗng cho phần còn lại
        const totalStars = 5;
        const starsDisplayed = fullStars + (score % 1 >= 0.5 ? 1 : 0);
        const emptyStars = totalStars - starsDisplayed;
        for (let i = 0; i < emptyStars; i++) {
            const star = document.createElement('i');
            star.className = 'fa-solid fa-star empty';
            rating.appendChild(star);
        }
    });
});