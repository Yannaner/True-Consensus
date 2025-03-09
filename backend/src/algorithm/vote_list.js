async function getVotingList() {
    const url = 'https://tcbackend.backendboosterbeast.com/voting-list';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_FIREBASE_ID_TOKEN' // Replace with your Firebase ID token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Voting List:', data);
        return data;
    } catch (error) {
        console.error('Error fetching voting list:', error);
    }
}

getVotingList();