// Base de datos simulada con localStorage
document.addEventListener('DOMContentLoaded', function () {
    initializeDatabase();
    loadServices();
    setupEventListeners();
    startSlider();
});

// Inicializar la base de datos si no existe
function initializeDatabase() {
    if (!localStorage.getItem('services')) {
        const services = [
            {
                id: 1,
                name: "Desarrollo Web",
                price: 1200000,
                image: "https://via.placeholder.com/300x200?text=Desarrollo+Web",
                stock: 15,
                description: "Desarrollo de sitios web responsivos y aplicaciones web modernas utilizando las últimas tecnologías.",
                promotion: false
            },
            {
                id: 2,
                name: "Aplicaciones Móviles",
                price: 2500000,
                image: "https://via.placeholder.com/300x200?text=Apps+Móviles",
                stock: 10,
                description: "Desarrollo de aplicaciones nativas e híbridas para iOS y Android.",
                promotion: false
            },
            {
                id: 3,
                name: "Consultoría IT",
                price: 800000,
                image: "https://via.placeholder.com/300x200?text=Consultoría+IT",
                stock: 20,
                description: "Asesoramiento especializado en tecnología para optimizar tus procesos empresariales.",
                promotion: false
            },
            {
                id: 4,
                name: "Diseño UX/UI",
                price: 900000,
                image: "https://via.placeholder.com/300x200?text=Diseño+UX/UI",
                stock: 12,
                description: "Diseño de interfaces de usuario centradas en la experiencia del cliente.",
                promotion: true
            },
            {
                id: 5,
                name: "E-commerce",
                price: 1800000,
                image: "https://via.placeholder.com/300x200?text=E-commerce",
                stock: 8,
                description: "Desarrollo de tiendas online con pasarelas de pago integradas.",
                promotion: false
            },
            {
                id: 6,
                name: "SEO y Marketing Digital",
                price: 600000,
                image: "https://via.placeholder.com/300x200?text=SEO+Marketing",
                stock: 25,
                description: "Estrategias de posicionamiento web y marketing digital para aumentar tu visibilidad.",
                promotion: true
            },
            {
                id: 7,
                name: "Hosting y Dominio",
                price: 150000,
                image: "https://via.placeholder.com/300x200?text=Hosting+Dominio",
                stock: 50,
                description: "Servicios de hosting confiable y registro de dominios para tu presencia online.",
                promotion: false
            },
            {
                id: 8,
                name: "Mantenimiento Web",
                price: 300000,
                image: "https://via.placeholder.com/300x200?text=Mantenimiento+Web",
                stock: 18,
                description: "Mantenimiento preventivo y correctivo para asegurar el funcionamiento óptimo de tu sitio web.",
                promotion: false
            },
            {
                id: 9,
                name: "Sistemas CRM",
                price: 3000000,
                image: "https://via.placeholder.com/300x200?text=Sistemas+CRM",
                stock: 5,
                description: "Implementación de sistemas de gestión de relaciones con clientes personalizados.",
                promotion: true
            },
            {
                id: 10,
                name: "Seguridad Informática",
                price: 1500000,
                image: "https://via.placeholder.com/300x200?text=Seguridad+Informática",
                stock: 7,
                description: "Soluciones de seguridad para proteger tus datos y sistemas de posibles amenazas.",
                promotion: false
            }
        ];
        localStorage.setItem('services', JSON.stringify(services));
    }

    if (!localStorage.getItem('users')) {
        const users = [
            {
                id: 1,
                username: "admin",
                password: "admin123" // En una aplicación real, esto debería estar encriptado
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Cargar servicios en la página principal
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = '';
    const services = JSON.parse(localStorage.getItem('services'));

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.dataset.id = service.id;

        serviceCard.innerHTML = `
            <div class="service-image">${service.name}</div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <div class="service-price">$${service.price.toLocaleString()}</div>
                ${service.promotion ? '<div class="promotion-badge">⭐ PROMOCIÓN</div>' : ''}
            </div>
        `;

        serviceCard.addEventListener('click', () => showServiceDetail(service.id));
        servicesGrid.appendChild(serviceCard);
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Login modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }

    // Service detail modal
    const serviceModal = document.getElementById('service-modal');

    // Close modals
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (authenticateUser(username, password)) {
                // Guardar sesión en localStorage
                localStorage.setItem('isLoggedIn', 'true');
                // Redirigir a admin.html
                window.location.href = 'admin.html';
            } else {
                alert('Credenciales incorrectas. Intente nuevamente.');
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            document.getElementById('admin-panel').classList.add('hidden');
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Autenticar usuario
function authenticateUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username && u.password === password);
    return user !== undefined;
}

// Mostrar detalle del servicio
function showServiceDetail(serviceId) {
    const services = JSON.parse(localStorage.getItem('services'));
    const service = services.find(s => s.id === serviceId);

    if (!service) return;

    const serviceDetail = document.getElementById('service-detail');
    serviceDetail.innerHTML = `
        <h3>${service.name}</h3>
        <div class="service-image">${service.name}</div>
        <div class="service-detail-price">Precio: $${service.price.toLocaleString()}</div>
        <div class="service-detail-stock">Disponibles: ${service.stock}</div>
        <div class="service-detail-description">${service.description}</div>
        ${service.promotion ? '<div class="promotion-badge">⭐ EN PROMOCIÓN</div>' : ''}
    `;

    document.getElementById('service-modal').style.display = 'flex';
}

// Slider functionality
function startSlider() {
    const slides = document.querySelectorAll('.slide');
    const buttons = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        buttons.forEach(button => button.classList.remove('active'));

        slides[index].classList.add('active');
        buttons[index].classList.add('active');
    }

    // Add click events to slider buttons
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Funciones para el panel de administración
function loadAdminServices() {
    const tableBody = document.querySelector('#admin-services-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const services = JSON.parse(localStorage.getItem('services'));

    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.name}</td>
            <td>$${service.price.toLocaleString()}</td>
            <td>${service.stock}</td>
            <td>${service.promotion ? 'Sí' : 'No'}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${service.id}">Editar</button>
                <button class="action-btn delete-btn" data-id="${service.id}">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceId = parseInt(e.target.dataset.id);
            editService(serviceId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceId = parseInt(e.target.dataset.id);
            deleteService(serviceId);
        });
    });
}

function editService(serviceId) {
    // Implementar lógica de edición
    alert(`Editar servicio con ID: ${serviceId}`);
}

function deleteService(serviceId) {
    if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
        let services = JSON.parse(localStorage.getItem('services'));
        services = services.filter(service => service.id !== serviceId);
        localStorage.setItem('services', JSON.stringify(services));
        loadAdminServices();
        loadServices(); // Actualizar también en la página principal
    }
}

// Cargar servicios en la página principal con filtro y ordenamiento
function loadServices(filter = '', promoOnly = false, sortBy = '') {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = '';
    let services = JSON.parse(localStorage.getItem('services'));

    // Filtrar por búsqueda
    let filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(filter.toLowerCase()) ||
        service.description.toLowerCase().includes(filter.toLowerCase())
    );

    // Filtrar por promoción
    if (promoOnly) {
        filteredServices = filteredServices.filter(service => service.promotion === true);
    }

    // Ordenar según criterio
    if (sortBy === 'name') {
        filteredServices.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
        filteredServices.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'stock') {
        filteredServices.sort((a, b) => a.stock - b.stock);
    }

    // Mostrar mensaje si no hay resultados
    if (filteredServices.length === 0) {
        servicesGrid.innerHTML = `<p>No se encontraron servicios.</p>`;
        return;
    }

    // Renderizar servicios
    filteredServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.dataset.id = service.id;

        serviceCard.innerHTML = `
            <div class="service-image">${service.name}</div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <div class="service-price">$${service.price.toLocaleString()}</div>
                ${service.promotion ? '<div class="promotion-badge">⭐ PROMOCIÓN</div>' : ''}
                <div class="service-stock">Disponibles: ${service.stock}</div>
            </div>
        `;

        serviceCard.addEventListener('click', () => showServiceDetail(service.id));
        servicesGrid.appendChild(serviceCard);
    });
}

// Vincular buscador, checkbox y select al cargar página
document.addEventListener('DOMContentLoaded', function () {
    initializeDatabase();
    loadServices();
    setupEventListeners();
    startSlider();

    const searchInput = document.getElementById('search-input');
    const promoFilter = document.getElementById('promo-filter');
    const sortSelect = document.getElementById('sort-select');

    function applyFilters() {
        const filterText = searchInput ? searchInput.value : '';
        const promoOnly = promoFilter ? promoFilter.checked : false;
        const sortBy = sortSelect ? sortSelect.value : '';
        loadServices(filterText, promoOnly, sortBy);
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (promoFilter) promoFilter.addEventListener('change', applyFilters);
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
});


