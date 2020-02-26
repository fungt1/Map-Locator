const loginForm = document.getElementById('login-form');
const loginName = document.getElementById('loginName');
const loginPass = document.getElementById('loginPass');

//send POST to API yo add store
async function loginUser(e) {
    e.preventDefault();

    if (loginName.value === '' || loginPass.value === '') {
        alert('Please fill in fields');
    }

    const sendBody = {
        loginName: loginName.value,
        loginPass: loginPass.value
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

        alert('User logged in!');
        window.location.href = '/';

    } catch (err) {
        alert(err);
        return;
    }
}

loginForm.addEventListener('submit', loginUser);