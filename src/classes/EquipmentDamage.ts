import { DamageTypes } from 'src/types';
import { DiceRolls } from './DiceRolls';

export class EquipmentDamage {
  type: DamageTypes;
  dice: DiceRolls;
}
