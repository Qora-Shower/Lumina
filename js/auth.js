// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // This is the placeholder Client ID.
    // The user can replace '1234' with their real Roblox Client ID later.
    const clientID = '1234';

    const loginButton = document.getElementById('login-btn');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            if (clientID === '1234') {
                // --- DUMMY LOGIN ---
                // This is the placeholder logic. It simulates a successful login
                // without any actual authentication.
                console.log('Using dummy login for placeholder Client ID.');
                localStorage.setItem('isLoggedIn', 'true');
                // You can also store dummy user data
                const dummyUser = {
                    name: 'Guest User',
                    avatarUrl: 'https://via.placeholder.com/150' // Placeholder avatar
                };
                localStorage.setItem('robloxUser', JSON.stringify(dummyUser));
                window.location.href = 'home.html';
            } else {
                // --- REAL OAUTH FLOW ---
                // This is where the real Roblox OAuth2 flow would be initiated.
                // This requires a backend and the real client ID.
                // For now, it will just log to the console.
                console.log('Initiating real Roblox OAuth flow with Client ID:', clientID);
                // Example of what the redirect URL might look like:
                // const redirectUri = window.location.origin + '/callback.html';
                // const scope = 'openid profile';
                // window.location.href = `https://apis.roblox.com/oauth/v1/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
                alert('Real OAuth flow is not implemented in this frontend-only version. Please use the placeholder Client ID "1234".');
            }
        });
    }
});
