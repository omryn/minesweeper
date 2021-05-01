import { GameBoard } from "lib/minesweeper.types";

declare module "*.svg" {
    const content: any;
    export default content;
  }

  declare global {
    namespace jest {
      interface Matchers<R extends GameBoard> {
        toHaveValues(expectedString:string, showHidden=false): R;
      }
    }
  }