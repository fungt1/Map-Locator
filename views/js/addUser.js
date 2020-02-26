const regForm = document.getElementById('reg-form');
const name = document.getElementById('name');
const password = document.getElementById('password');

//send POST to API yo add store
async function addUser(e) {
    e.preventDefault();

    if (name.value === '' || password.value === '') {
        alert('Please fill in fields');
    }

    const sendBody = {
        name: name.value,
        password: password.value
    }

    try {
        const res = await fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });

        if (res.status === 400) {
            throw Error('User already exists')
        }

        alert('User added!');
        window.location.href = '/';

    } catch (err) {
        alert(err);
        return;
    }
}

regForm.addEventListener('submit', addUser);