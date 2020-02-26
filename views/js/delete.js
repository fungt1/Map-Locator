const deleteForm = document.getElementById('delete-form');
const deleteId = document.getElementById('delete-id');


//send POST to API yo add store
async function deleteStore(e) {
    e.preventDefault();

    if (deleteId.value === '') {
        alert('Please fill in fields');
    }

    const sendBody = {
        deleteId: deleteId.value
    }

    try {
        const res = await fetch('/api/v1/stores', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });

        if (res.status === 400) {
            throw Error('Store already exists')
        }

        alert('Store Deleted!');
        window.location.href = '/index.html';

    } catch (err) {
        alert(err);
        return;
    }

}

deleteForm.addEventListener('submit', deleteStore);