import { Request, Response } from "express";
import { container } from "../../config/container";

export async function getChallengePointsByUserId(req: Request, res: Response) {
  try {
    const points = await container.getChallengePointsByUserIdUseCase.execute(
      req.params.userId
    );
    if (!points) {
      return res
        .status(404)
        .json({ message: "User challenge points not found" });
    }
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getChallengeHistory(req: Request, res: Response) {
  try {
    const history = await container.getChallengeHistoryUseCase.execute(
      req.params.userId
    );
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getChallengeRankings(req: Request, res: Response) {
  try {
    const rankings = await container.getChallengeRankingsUseCase.execute();
    res.json(rankings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getEnvironmentalImpactRankings(
  req: Request,
  res: Response
) {
  try {
    const rankings =
      await container.getEnvironmentalImpactRankingsUseCase.execute();
    res.json(rankings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
