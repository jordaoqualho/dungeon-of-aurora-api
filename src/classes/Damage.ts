import { DamageTypes } from 'src/types';
import { DiceRolls } from './DiceRolls';

export class DamageAtLevel {
  [level: string]: DiceRolls;
}

export class Damage {
  type: DamageTypes;
  characterLevel: DamageAtLevel;
  slotLevel: DamageAtLevel;
}
