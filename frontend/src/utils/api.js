
export default {
    get: function (url, data) {
        return fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },
    post: function (url, data) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },
    put: function (url, data) {
        return fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },
    delete: function (url, data) {
        return fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
}