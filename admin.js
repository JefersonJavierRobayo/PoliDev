document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadAdminServices();
    setupEventListeners();
});

// Verificar autenticación
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
    }
}

// Cargar servicios en la tabla de administración
function loadAdminServices() {
    const tableBody = document.querySelector('#admin-services-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    const services = JSON.parse(localStorage.getItem('services')) || [];
    
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

// Configurar event listeners
function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Add service button
    const addServiceBtn = document.getElementById('add-service-btn');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', addService);
    }
}

function editService(serviceId) {
    // Implementar lógica de edición
    alert(`Editar servicio con ID: ${serviceId}`);
}

function deleteService(serviceId) {
    if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
        let services = JSON.parse(localStorage.getItem('services')) || [];
        services = services.filter(service => service.id !== serviceId);
        localStorage.setItem('services', JSON.stringify(services));
        loadAdminServices();
    }
}

function addService() {
    // Implementar lógica para agregar servicio
    alert('Agregar nuevo servicio');
}