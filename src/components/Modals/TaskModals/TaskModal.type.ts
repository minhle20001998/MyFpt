export enum DIFFICULTY {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export type DifficultyType = DIFFICULTY.EASY | DIFFICULTY.MEDIUM | DIFFICULTY.HARD;

export interface TaskType {
  name: string,
  deadline: string,
  notes: string,
  difficulty: DifficultyType | string
}