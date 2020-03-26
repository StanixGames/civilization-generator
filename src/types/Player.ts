export interface Player {
  name: string;
  color: string;
  nations: Array<{
    nation: string;
    coef: number
  }>;
}