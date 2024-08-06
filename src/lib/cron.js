const cron = require('node-cron');

// Schedule a job to run at midnight every day
cron.schedule('30 * * * * *', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/dailyUpdates', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to update status: ${response.statusText}`);
    }

    console.log('Status updated successfully for all users');
  } catch (error) {
    console.error('Error updating status:', error);
  }
});
