document.addEventListener('DOMContentLoaded', function () {
    updateCartCountIcon();
    
    // Nếu đang ở trang có nút "Thêm vào giỏ"
    const addButtons = document.querySelectorAll('.card button');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card');
            const product = {
                name: card.querySelector('h3').innerText,
                price: card.querySelector('.price').innerText,
                img: card.querySelector('img').getAttribute('src'),
                quantity: 1
            };
            
            let cartList = JSON.parse(localStorage.getItem('cart')) || [];
            const index = cartList.findIndex(item => item.name === product.name);
            
            if (index !== -1) cartList[index].quantity += 1;
            else cartList.push(product);
            
            localStorage.setItem('cart', JSON.stringify(cartList));
            updateCartCountIcon();
            alert("Đã thêm " + product.name + " vào giỏ!");
        });
    });
});

function updateCartCountIcon() {
    const cartList = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cartList.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) cartIcon.innerText = count;
}
// Gắn sự kiện click vào icon giỏ hàng
const cartIcon = document.querySelector('.cart');
if (cartIcon) {
    cartIcon.style.cursor = 'pointer'; // Hiển thị con trỏ tay khi rê vào
    cartIcon.onclick = function() {
        // Kiểm tra xem đã nhấp được chưa bằng cách bỏ comment dòng dưới
        // alert("Đang chuyển hướng..."); 
        window.location.href = 'giohang.html';
    };
}