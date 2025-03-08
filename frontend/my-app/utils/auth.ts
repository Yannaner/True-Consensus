export async function registerWithBackend(firebaseToken: string) {
    try {
        const response = await fetch('https://tcbackend.backendboosterbeast.com/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${firebaseToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to register with backend');
        }

        return await response.json();
    } catch (error) {
        console.error('Backend registration error:', error);
        throw error;
    }
}