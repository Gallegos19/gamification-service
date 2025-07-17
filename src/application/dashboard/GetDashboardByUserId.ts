import { DashboardRepository } from '../../domain/repositories/DashboardRepository';
import { Dashboard } from '../../domain/entities/Dashboard';

export class GetDashboardByUserId {
  constructor(private readonly repo: DashboardRepository) {}

  async execute(userId: string): Promise<Dashboard | null> {
    return this.repo.getByUserId(userId);
  }
}
