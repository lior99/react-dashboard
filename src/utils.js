import 'whatwg-fetch';

const isLoggedIn = () => {
    const token = window.localStorage.getItem('token');
    return token !== null;
}

const checkCredentials = async (userName, password) => {
    let url = '';

    // if debugging mode than set to local url
    const debug = true;
    if (debug) {
        url = 'http://localhost:777/credentials'
    } else {
        url = '';
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = `user=${userName}&password=${password}`;

    const response = await fetch(url, {
        method: 'POST',
        // mode: 'cors',
        headers,
        body: params
    })

    if (!response.ok) {
        return false;
    }

    const result = await response.json();
    return !result.hasError;
}

export {
    isLoggedIn,
    checkCredentials
}
