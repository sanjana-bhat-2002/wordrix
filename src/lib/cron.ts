// const { generate } = require("random-words");
// import { CronJob } from 'cron';

// let numberOfLetters = 0;
// let answerArray = [''];

// const dailyUpdates = async () => {
//     try {
//         // Set game status for all users as PENDING
//         const response = await fetch('https://wordrix.vercel.app/api/dailyUpdates', {
//             method: 'GET',
//         });

//         if (!response.ok) {
//             throw new Error(`Failed to update status: ${response.statusText}`);
//         }
//         console.log('Status updated successfully for all users');

//         // Generate the word of the day
//         let answer = generate({ minLength: 5, maxLength: 5 }).toString().toUpperCase();
//         numberOfLetters = answer.length;
//         answerArray = answer.split("");

//         console.log('Generated word:', answer);
//     } catch (error) {
//         console.error('Error updating status:', error);
//     }
// };

// const job = new CronJob('30 * * * * *', dailyUpdates);

// // Export the variables
// export { numberOfLetters, answerArray };
