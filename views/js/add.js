const placeForm = document.getElementById('place-form');
const placeId = document.getElementById('place-id');
const placeAddress = document.getElementById('place-address');
const place = document.getElementById('place');
const description = document.getElementById('description');
const marker = document.getElementById('marker');

//send POST to API yo add store
async function addPlace(e) {
    e.preventDefault();

    if (placeId.value === '' || placeAddress.value === '' || place.value === '' || description.value === '' || marker.value === '') {
        alert('Please fill in fields');
    }

    const sendBody = {
        placeId: placeId.value,
        address: placeAddress.value,
        place: place.value,
        description: description.value,
        marker: marker.value
    }

    try {
        const res = await fetch('/api/v1/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });

        if (res.status === 400) {
            throw Error('Store already exists')
        }

        alert('Store added!');
        window.location.href = '/index.html';

    } catch (err) {
        alert(err);
        return;
    }
}

placeForm.addEventListener('submit', addPlace);
