let numberOfLetters: number, answerArray: string[];

const { CronJob } = require('cron');

const dailyUpdates = async () => {
    try {
        // Set game status for all users as PENDING
        const response = await fetch('http://localhost:3000/api/dailyUpdates', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to update status: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Status updated successfully for all users');
        console.log('Number of Letters:', data.numberOfLetters);
        console.log('Answer Array:', data.answerArray);

        numberOfLetters = data.numberOfLetters;
        answerArray = data.answerArray;

    } catch (error) {
        console.error('Error updating status:', error);
    }
};

const job = new CronJob('26 23 * * *', dailyUpdates);

job.start()

export { numberOfLetters, answerArray }

