// ==========================================
// 1. KHỞI TẠO DỮ LIỆU & ĐỒNG BỘ GIAO DIỆN
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    updateCartCountIcon();
    initAddToCart();
});

// Hàm cập nhật số lượng trên Icon giỏ hàng ở Header
function updateCartCountIcon() {
    const cartList = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cartList.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) cartIcon.innerText = count;
}

// ==========================================
// 2. XỬ LÝ THÊM VÀO GIỎ HÀNG (LẤY CẢ MÔ TẢ)
// ==========================================
function initAddToCart() {
    const addButtons = document.querySelectorAll('.card button');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            
            // Trích xuất dữ liệu sản phẩm
            const product = {
                name: card.querySelector('h3').innerText,
                price: card.querySelector('.price').innerText,
                img: card.querySelector('img').getAttribute('src'),
                // Lấy toàn bộ nội dung trong thẻ div thông số
                specs: card.querySelector('.product-specs-dropdown') 
                       ? card.querySelector('.product-specs-dropdown').innerHTML 
                       : "Không có thông số",
                quantity: 1
            };
            
            // Lưu vào LocalStorage
            let cartList = JSON.parse(localStorage.getItem('cart')) || [];
            const existingIndex = cartList.findIndex(item => item.name === product.name);
            
            if (existingIndex !== -1) {
                cartList[existingIndex].quantity += 1;
            } else {
                cartList.push(product);
            }
            
            localStorage.setItem('cart', JSON.stringify(cartList));
            updateCartCountIcon();
            alert("Đã thêm " + product.name + " vào giỏ hàng!");
        });
    });
}

// ==========================================
// 3. ĐIỀU HƯỚNG TRANG GIỎ HÀNG
// ==========================================
const cartIcon = document.querySelector('.cart');
if (cartIcon) {
    cartIcon.style.cursor = 'pointer';
    cartIcon.onclick = function() {
        window.location.href = 'giohang.html';
    };
}
document.querySelectorAll(".toggle-specs-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const specs = this.nextElementSibling;
        specs.classList.toggle("active");
    });
});
