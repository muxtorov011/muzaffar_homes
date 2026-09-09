const houses = [
    {
        id: 1,
        title: '4 xonali uy',
        location: 'Chilonzor tumani, Kamolon mahallasi',
        rooms: '4 xona',
        area: '120 kv.m',
        price: '450 000 000 so\'m',
        phone: '+998970748888',
        telegram: 'https://t.me/muzaffarhomes',
        images: [
            'images/uy1-1.jpg',
            'images/uy1-2.jpg',
            'images/uy1-3.jpg'
        ]
    },
    {
        id: 2,
        title: '5 xonali uy',
        location: 'Yunusobod tumani, Bobur mahallasi',
        rooms: '5 xona',
        area: '150 kv.m',
        price: '580 000 000 so\'m',
        phone: '+998970748888',
        telegram: 'https://t.me/muzaffarhomes',
        images: [
            'images/uy2-1.jpg',
            'images/uy2-2.jpg',
            'images/uy2-3.jpg'
        ]
    },
    {
        id: 3,
        title: '3 xonali uy',
        location: 'Sergeli tumani, Yangi hayot mahallasi',
        rooms: '3 xona',
        area: '95 kv.m',
        price: '350 000 000 so\'m',
        phone: '+998970748888',
        telegram: 'https://t.me/muzaffarhomes',
        images: [
            'images/uy3-1.jpg',
            'images/uy3-2.jpg',
            'images/uy3-3.jpg'
        ]
    },
    {
        id: 4,
        title: '6 xonali uy',
        location: 'Mirzo Ulug\'bek tumani, Ziyo mahallasi',
        rooms: '6 xona',
        area: '180 kv.m',
        price: '750 000 000 so\'m',
        phone: '+998970748888',
        telegram: 'https://t.me/muzaffarhomes',
        images: [
            'images/uy4-1.jpg',
            'images/uy4-2.jpg',
            'images/uy4-3.jpg'
        ]
    },
    {
        id: 5,
        title: '4 xonali uy',
        location: 'Yashnobod tumani, Farovon mahallasi',
        rooms: '4 xona',
        area: '130 kv.m',
        price: '520 000 000 so\'m',
        phone: '+998970748888',
        telegram: 'https://t.me/muzaffarhomes',
        images: [
            'images/uy5-1.jpg',
            'images/uy5-2.jpg',
            'images/uy5-3.jpg'
        ]
    }
];

let currentSlide = 0;
let currentImages = [];

function createHouseCard(house) {
    return `
        <div class="house-card" onclick="openHouseModal(${house.id})">
            <img src="${house.images[0]}" alt="${house.title}" class="house-card-img">
            <div class="house-card-body">
                <h3 class="house-card-title">${house.title}</h3>
                <div class="house-card-info">
                    <span><i class="uil uil-location-point"></i> ${house.location}</span>
                    <span><i class="uil uil-home"></i> ${house.rooms}</span>
                    <span><i class="uil uil-constructor"></i> ${house.area}</span>
                </div>
                <p class="house-card-price">${house.price}</p>
                <button class="house-card-btn" onclick="event.stopPropagation(); openContactModal('${house.phone}', '${house.telegram}')">
                    <i class="uil uil-phone"></i> Bog'lanish
                </button>
            </div>
        </div>
    `;
}

function displayHouses() {
    const grid = document.getElementById('housesGrid');
    grid.innerHTML = houses.map(house => createHouseCard(house)).join('');
}

function openHouseModal(id) {
    const house = houses.find(h => h.id === id);
    currentImages = house.images;
    currentSlide = 0;

    const modal = document.getElementById('houseModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-carousel">
            ${house.images.map((img, index) => `
                <img src="${img}" class="${index === 0 ? 'active' : ''}" alt="${house.title}">
            `).join('')}
            <button class="carousel-btn carousel-prev" onclick="changeSlide(-1)">
                <i class="uil uil-angle-left"></i>
            </button>
            <button class="carousel-btn carousel-next" onclick="changeSlide(1)">
                <i class="uil uil-angle-right"></i>
            </button>
            <div class="carousel-dots">
                ${house.images.map((_, index) => `
                    <button class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></button>
                `).join('')}
            </div>
        </div>
        <div class="modal-info">
            <h2 class="modal-title">${house.title}</h2>
            <div class="modal-details">
                <span><i class="uil uil-location-point"></i> ${house.location}</span>
                <span><i class="uil uil-home"></i> ${house.rooms}</span>
                <span><i class="uil uil-constructor"></i> ${house.area}</span>
            </div>
            <p class="modal-price">${house.price}</p>
            <div class="modal-buttons">
                <button class="modal-call-btn" onclick="openContactModal('${house.phone}', '${house.telegram}')">
                    <i class="uil uil-phone"></i> Qo'ng'iroq qilish
                </button>
                <a href="${house.telegram}" target="_blank" class="modal-tg-btn">
                    <i class="uil uil-telegram"></i> Telegram
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('houseModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    const images = document.querySelectorAll('.modal-carousel img');
    const dots = document.querySelectorAll('.carousel-dot');

    images[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + images.length) % images.length;

    images[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const images = document.querySelectorAll('.modal-carousel img');
    const dots = document.querySelectorAll('.carousel-dot');

    images[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    images[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function openContactModal(phone, telegram) {
    const contactModal = document.createElement('div');
    contactModal.className = 'contact-modal';
    contactModal.id = 'contactModal';
    contactModal.innerHTML = `
        <div class="contact-modal-overlay" onclick="closeContactModal()"></div>
        <div class="contact-modal-content">
            <button class="contact-modal-close" onclick="closeContactModal()">
                <i class="uil uil-times"></i>
            </button>
            <div class="contact-modal-icon">
                <i class="uil uil-phone-volume"></i>
            </div>
            <h3>Bog'lanish</h3>
            <p class="contact-modal-number">${phone}</p>
            <div class="contact-modal-buttons">
                <a href="tel:${phone}" class="contact-modal-call">
                    <i class="uil uil-phone"></i>
                    Qo'ng'iroq qilish
                </a>
                <a href="${telegram}" target="_blank" class="contact-modal-tg">
                    <i class="uil uil-telegram"></i>
                    Telegram
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(contactModal);
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.remove();
        if (!document.getElementById('houseModal').classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
    }
}

function toggleFaq(element) {
    const faqItem = element.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
    
    faqItem.classList.toggle('active');
}

document.getElementById('houseModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeContactModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    displayHouses();
});