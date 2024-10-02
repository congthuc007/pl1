const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');
const noResults = document.getElementById('no-results');
const suggestionItems = suggestionsList.querySelectorAll('.suggestion-item');
const suggestionContainer = document.querySelector('.suggestions-list');


searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    let hasResults = false;

    suggestionItems.forEach(item => {
        const itemName = item.querySelector('span').textContent.toLowerCase();
        if (itemName.includes(query)) {
            item.style.display = 'flex'; // Hiển thị mục gợi ý nếu khớp với truy vấn
            hasResults = true;
        } else {
            item.style.display = 'none'; // Ẩn mục gợi ý nếu không khớp với truy vấn
        }
    });

    if (query === '') {
        suggestionsList.style.display = 'none'; // Ẩn danh sách gợi ý khi không có truy vấn
        noResults.style.display = 'none'; // Ẩn thông báo không có kết quả khi không có truy vấn
    } else {
        suggestionsList.style.display = hasResults ? 'block' : 'none'; // Hiển thị hoặc ẩn danh sách gợi ý
        noResults.style.display = hasResults ? 'none' : 'block'; // Hiển thị hoặc ẩn thông báo không có kết quả
    }
});

// Thêm sự kiện click cho tài liệu
document.addEventListener('click', (event) => {
    if (!suggestionContainer.contains(event.target)) {
        // Nếu nhấp chuột bên ngoài phần tử tìm kiếm
        suggestionsList.style.display = 'none'; // Ẩn danh sách gợi ý
        noResults.style.display = 'none'; // Ẩn thông báo không có kết quả
    }
});
