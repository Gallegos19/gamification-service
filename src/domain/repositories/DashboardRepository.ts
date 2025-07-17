import { Dashboard } from '../entities/Dashboard';

export interface DashboardRepository {
  getByUserId(userId: string): Promise<Dashboard | null>;
}
