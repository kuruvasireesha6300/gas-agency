// Admin Authentication
const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error');

loginButton.addEventListener('click',(e) => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            loginForm.style.display = 'none';
            // show other sections after login
            document.getElementById('customer-section').style.display = 'block';
            document.getElementById('booking-section').style.display = 'block';
            document.getElementById('inventory-section').style.display = 'block';
        })
        .catch(err => {
            loginError.textContent = err.message;
        });
});

// customer management
const customerForm = document.getElementById('customer-form');
const customerList = document.getElementById('customer-list');
const selectCustomer = document.getElementById('select-customer');

customerForm.addEventListener('submit',async (e) => {
    e.preventDefault();
    
    const customerForm = document.getElementById('customer-form').value;
    const customerAddress = document.getElementById('customer-address').value;

    await db.collection('customers').add({
        name: customerName,
        address: customerAddress
    });
    customerForm.reset();
});
db.collection('customers').onSnapshot(snapshot => {
    customerList.innerHTML ='';
    selectCustomer.innerHTML ='';
    snapshot.forEach(doc => {
        const customer = doc.data();
        const li = document.createElement('li');
        li.textContent = `${customer.name} - ${customer.address}`;
        customerList.appendChild(li);

        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = customer.name;
        selectCustomer.appendChild(option);
    });
});

// Gas Booking
const bookingForm = document.getElementById('booking-form');
const bookingList = document.getElementById('booking-list');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const customerId = selectCustomer.value;

    await db.collection('booking').add({
        customerId: customerId,
        status: 'Pending'
    });
});

db.collection('bookings').onSnapshot(snapshot => {
    bookingList.innerHTML = '';
    snapshot.forEach(doc => {
        const booking = doc.data();
        const li = document.createElement('li');
        li.textContent = `Booking for customer ${booking.customerId} is ${booking.status}`;
        bookingList.appendChild(li);
    });
});

// Inventory Management
const addStockButton = document.getElementById('add-stock');
const inventoryCount = document.getElementById('inventory-count');

addStockButton.addEventListener('click', async () => {
    const inventoryRef = db.collection('inventory').doc('cylinders');
    const doc = await inventoryRef.get();

    if (doc.exists) {
        const currentStock = doc.data().count;
        await inventoryRef.update({count: currentStock + 1 });
    }else {
        await inventoryRef.set({count: 1 });
    }
});

db.collection('inventory').doc('cylinders').onSnapshot(doc => {
    inventoryCount.textContent = doc.exists ? doc.data().count : 0;
});

