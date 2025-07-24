import { CronJob } from 'cron';
import { container } from '../config/container';

// Amount to decrease for each stat every 30 minutes
const DECREASE_AMOUNTS = {
  happiness: 5,  // Decrease happiness by 5 points
  health: 3      // Decrease health by 3 points
};

export function setupPetMaintenanceCron() {
  // Runs every 30 minutes
  const job = new CronJob(
    '*/30 * * * *', // Every 30 minutes
    async () => {
      try {
        console.log('Running pet maintenance cron job...');
        const result = await container.petMaintenanceService.decreaseAllPetsStats(DECREASE_AMOUNTS);
        console.log(`Pet maintenance completed. Updated ${result.updatedCount} pets.`);
      } catch (error) {
        console.error('Error in pet maintenance cron job:', error);
      }
    },
    null, // onComplete
    true, // start
    'America/Mexico_City' // timezone
  );

  return job;
}
