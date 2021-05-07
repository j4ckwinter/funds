import { Holding } from "./holding";

export interface Fund {
  name: string;
  holdings: Holding[];
}
