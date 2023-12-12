import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { SpellRepository } from 'src/repositories';
import { SpellDto } from '../dtos/SpellDto';

export type DiceRolls = {
  quantity: number;
  dice: string;
};

export type Damage = {
  type: string;
  characterLevel: DamageAtLevel;
  slotLevel: DamageAtLevel;
};

export type DamageAtLevel = {
  [level: number]: DiceRolls;
};

export type Skill = {
  name: string;
  attribute: string;
};

@Injectable()
export class SpellService {
  constructor(private readonly spellRepository: SpellRepository) {}

  async createSpell(spellData: SpellDto) {
    return await this.spellRepository.create(spellData);
  }

  async findSpellById(spellId: string): Promise<SpellDto> {
    return await this.spellRepository.findById(spellId);
  }

  async findAllSpell(): Promise<SpellDto[]> {
    return await this.spellRepository.findAll();
  }

  async searchSpells(filters: {
    name?: string;
    level?: number;
    school?: string;
    classes?: string;
  }): Promise<SpellDto[]> {
    const query: any = {};

    if (filters.name) {
      query.name = { $regex: new RegExp(`^${filters.name}`, 'i') };
    }
    if (filters.level) {
      query.level = filters.level;
    }
    if (filters.school) {
      query.school = filters.school;
    }
    if (filters.classes) {
      const classesArray = filters.classes
        .split(',')
        .map((cls: string) => cls.trim());
      const regexPattern = classesArray
        .map((cls: string) => `(?=.*\\b${cls}\\b)`)
        .join('');
      query.classes = { $regex: new RegExp(regexPattern, 'i') };
    }

    return await this.spellRepository.findByQuery(query);
  }

  async updateSpell(
    spellId: string,
    updateSpellData: SpellDto,
  ): Promise<SpellDto> {
    return await this.spellRepository.update(spellId, updateSpellData);
  }

  async deleteSpell(spellId: string): Promise<void> {
    return await this.spellRepository.delete(spellId);
  }

  async deleteAllSpells(): Promise<void> {
    return await this.spellRepository.deleteAll();
  }

  async fetchSpellDetails(spellIndex: string): Promise<any> {
    const response = await fetch(`https://www.dnd5eapi.co${spellIndex}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch spell details for ${spellIndex}`);
    }

    return response.json();
  }

  writeOnFile = (data: any, name: string) => {
    const dataToWrite = JSON.stringify(data, null, 2);
    const fileName = `unFormated${name}`;

    fs.writeFile(`./backup/${fileName}.json`, dataToWrite, 'utf-8', (err) => {
      if (err) {
        console.error('Error saving data details:', err.message);
        throw err;
      }
      console.log(`\n----------------------------------------`);
      console.log(`💾${name} was saved on backup folder!`);
    });
  };

  // convertStringToDiceRolls(str: string): DiceRolls {
  //   const [quantityStr, diceType] = str.split('d');

  //   if (!quantityStr || !diceType) {
  //     return { quantity: 0, dice: '0' };
  //   }

  //   const quantity = parseInt(quantityStr);
  //   const dice = `d${diceType}`;
  //   return { quantity, dice };
  // }

  // formatSpell(spell: any) {
  //   const { damage } = spell ?? {};

  //   const slotDamage: DamageAtLevel = {};
  //   const characterDamage: DamageAtLevel = {};

  //   const processDamageAtLevel = (
  //     damageAtLevel: Record<string, string>,
  //     target: DamageAtLevel,
  //   ) => {
  //     Object.entries(damageAtLevel).forEach(([level, diceRollStr]) => {
  //       const slotLevel = parseInt(level);
  //       const diceRolls = this.convertStringToDiceRolls(diceRollStr);
  //       target[slotLevel] = diceRolls;
  //     });
  //   };

  //   if (damage?.damage_at_slot_level) {
  //     processDamageAtLevel(damage.damage_at_slot_level, slotDamage);
  //   }

  //   if (damage?.damage_at_character_level) {
  //     processDamageAtLevel(damage.damage_at_character_level, characterDamage);
  //   }

  //   const classes = spell.classes.map((c) => c.name).join(', ');
  //   const formatedSpell = {
  //     name: spell.name,
  //     level: spell.level,
  //     description: spell.desc,
  //     upgrade: spell.higher_level,
  //     school: spell.school.name,
  //     castingTime: spell.casting_time,
  //     range: spell.range,
  //     duration: spell.duration,
  //     ritual: spell.ritual,
  //     concentration: spell.concentration,
  //     classes,
  //     damage: damage
  //       ? {
  //           type: damage?.damage_type?.name,
  //           characterLevel: characterDamage,
  //           slotLevel: slotDamage,
  //         }
  //       : undefined,
  //   };

  //   return formatedSpell;
  // }

  // translateClasses(classString: string): string {
  //   const translations: Record<string, string> = {
  //     Barbarian: 'Bárbaro',
  //     Bard: 'Bardo',
  //     Cleric: 'Clérigo',
  //     Druid: 'Druida',
  //     Fighter: 'Guerreiro',
  //     Monk: 'Monge',
  //     Paladin: 'Paladino',
  //     Ranger: 'Ranger',
  //     Rogue: 'Ladino',
  //     Sorcerer: 'Feiticeiro',
  //     Warlock: 'Bruxo',
  //     Wizard: 'Mago',
  //   };

  //   const classesArray = classString.split(',').map((className) => {
  //     const trimmedClassName = className.trim();
  //     return translations[trimmedClassName] || trimmedClassName;
  //   });

  //   return classesArray.join(', ');
  // }

  // convertRange(range: string): string {
  //   const [value, unit] = range.split(' ');

  //   if (!unit) return range;

  //   if (unit.toLowerCase() === 'feet' && !isNaN(+value)) {
  //     const convertedValue = (+value / 5).toString();
  //     return `${convertedValue} quadrados`;
  //   }

  //   return range;
  // }

  // async translateObjectValues(obj: any, objIndex: number): Promise<any> {
  //   if (typeof obj !== 'object' || obj === null) {
  //     return obj;
  //   }

  //   const translatedObj: any = {};
  //   const promises: Promise<any>[] = [];

  //   for (const key of Object.keys(obj)) {
  //     let value = obj[key];

  //     if (typeof value === 'object' && value !== null) {
  //       promises.push(this.translateObjectValues(value, objIndex));
  //     } else if (typeof value === 'string') {
  //       if (key === 'range') {
  //         value = this.convertRange(value);
  //         if (typeof key === 'string' && obj?.name) {
  //           console.log(`✍️  Translating ${key} of ${obj.name}`);
  //         }
  //         promises.push(this.translate(value));
  //       } else if (key === 'classes') {
  //         value = this.translateClasses(value);
  //         promises.push(Promise.resolve(value));
  //       } else if (key === 'name') {
  //         value = ptSpellsName[objIndex];
  //         promises.push(Promise.resolve(value));
  //       } else {
  //         if (typeof key === 'string' && obj?.name) {
  //           console.log(`✍️  Translating ${key} of ${obj.name}`);
  //         }
  //         promises.push(this.translate(value));
  //       }
  //     } else {
  //       promises.push(Promise.resolve(value));
  //     }

  //     const translatedValue = await promises[promises.length - 1];
  //     translatedObj[key] = translatedValue;
  //   }

  //   await Promise.all(promises);
  //   return translatedObj;
  // }

  // async translate(text: string): Promise<string> {
  //   const requestBody = {
  //     q: text,
  //     source: 'en',
  //     target: 'pt',
  //   };

  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/translate', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Translation request failed');
  //     }

  //     const translatedData = await response.json();
  //     return translatedData.translatedText;
  //   } catch (error) {
  //     console.log('📌  error → ', error);
  //   }
  // }

  // async callIt() {
  //   const list = translatedSpell;
  //   const promises: Promise<any>[] = [];
  //   let objIndex = 0;

  //   for (const spell of list) {
  //     const startTime = performance.now();
  //     promises.push(this.translateObjectValues(spell, objIndex));
  //     objIndex++;

  //     await promises[promises.length - 1];

  //     const endTime = performance.now();
  //     const elapsedTime = (endTime - startTime) / 1000;
  //     console.log(
  //       `🈂️ ${spell.name} was translated in ${elapsedTime.toFixed(2)}s`,
  //     );
  //   }

  //   const res = await Promise.all(promises);
  //   this.writeOnFile(res, 'spellTranslated');
  // }

  async callIt() {
    console.log('called');
  }
}
