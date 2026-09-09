const ADMIN_PASSWORD = '1111';

let houses = JSON.parse(localStorage.getItem('muzaffarHouses')) || [
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

function saveHouses() {
    localStorage.setItem('muzaffarHouses', JSON.stringify(houses));
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    const error = document.getElementById('loginError');
    
    if (password === ADMIN_PASSWORD) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        displayAdminHouses();
    } else {
        error.style.display = 'block';
        error.textContent = 'Noto\'g\'ri parol!';
        document.getElementById('passwordInput').value = '';
    }
}

function logout() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').style.display = 'none';
}

function showSection(section) {
    const buttons = document.querySelectorAll('.sidebar-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (section === 'houses') {
        document.getElementById('housesSection').style.display = 'block';
        document.getElementById('addHouseSection').style.display = 'none';
        buttons[0].classList.add('active');
        displayAdminHouses();
    } else if (section === 'addHouse') {
        document.getElementById('housesSection').style.display = 'none';
        document.getElementById('addHouseSection').style.display = 'block';
        buttons[1].classList.add('active');
    }
}

function displayAdminHouses() {
    const grid = document.getElementById('adminHousesGrid');
    
    if (houses.length === 0) {
        grid.innerHTML = '<p style="color:#888;">Hozircha uylar yo\'q</p>';
        return;
    }
    
    grid.innerHTML = houses.map(house => `
        <div class="admin-house-card">
            <img src="${house.images[0]}" alt="${house.title}">
            <div class="admin-house-body">
                <h3 class="admin-house-title">${house.title}</h3>
                <p class="admin-house-info">${house.location}</p>
                <p class="admin-house-info">${house.rooms} | ${house.area}</p>
                <p class="admin-house-price">${house.price}</p>
                <div class="admin-house-actions">
                    <button class="delete-btn" onclick="deleteHouse(${house.id})">
                        <i class="uil uil-trash-alt"></i>
                        O'chirish
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteHouse(id) {
    if (confirm('Bu uyni o\'chirmoqchimisiz?')) {
        houses = houses.filter(house => house.id !== id);
        saveHouses();
        displayAdminHouses();
    }
}

document.getElementById('addHouseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newHouse = {
        id: Date.now(),
        title: document.getElementById('houseTitle').value,
        location: document.getElementById('houseLocation').value,
        rooms: document.getElementById('houseRooms').value,
        area: document.getElementById('houseArea').value,
        price: document.getElementById('housePrice').value,
        phone: document.getElementById('housePhone').value,
        telegram: document.getElementById('houseTelegram').value,
        images: [
            document.getElementById('houseImage1').value,
            document.getElementById('houseImage2').value,
            document.getElementById('houseImage3').value
        ]
    };
    
    houses.push(newHouse);
    saveHouses();
    
    this.reset();
    alert('Uy muvaffaqiyatli qo\'shildi!');
    showSection('houses');
});