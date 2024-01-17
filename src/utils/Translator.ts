import * as fs from 'fs';
import { DiceRolls } from 'src/services';

export const writeOnFile = (data: any, name: string) => {
  const dataToWrite = JSON.stringify(data, null, 2);
  const fileName = `unFormated${name}`;

  fs.writeFile(`./backup/${fileName}.json`, dataToWrite, 'utf-8', (err) => {
    if (err) {
      console.error('Error saving data details:', err.message);
      throw err;
    }
    console.log(`\n----------------------------------------`);
    console.log(`💾 ${name} was saved on backup folder!`);
  });
};

export const isArrayEmpty = (arr: any[]): boolean => {
  return !arr || arr.length === 0;
};

export async function sendToTranslator(
  text: string,
  sourceLanguage = 'en',
  targetLanguage = 'pt',
): Promise<string | string[]> {
  const requestBody = {
    q: text,
    source: sourceLanguage,
    target: targetLanguage,
  };

  const isAnArray = Array.isArray(text);

  try {
    const response = await fetch('http://127.0.0.1:5000/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log('☹️  erro aqui → ', JSON.stringify(requestBody));
    }

    const translatedData = await response.json();

    if (isAnArray) {
      const transformedData = translatedData.translatedText.map((item: any) => {
        const transformedDescription: string[] = Object.values(
          item.description,
        );
        return { ...item, description: transformedDescription };
      });
      return transformedData;
    }
    return translatedData.translatedText;
  } catch (error) {
    console.log('📌  error → ', error);
  }
}

export const convertPieces = (unit: string) => {
  switch (unit) {
    case 'gp':
      return 'po';
    case 'sp':
      return 'pp';
    case 'cp':
      return 'pc';
    case 'ep':
      return 'pe';
    case 'pp':
      return 'pl';
    default:
      return unit;
  }
};

export function formatEquipment(dataArray: any[]) {
  return dataArray.map((data) => {
    const {
      name,
      equipment_category,
      desc,
      cost,
      special,
      properties,
      weight,
      contents,
      quantity,
      str_minimum,
      damage,
      two_handed_damage,
      range,
      throw_range,
      speed,
      armor_class,
      capacity,
      tool_category,
      vehicle_category,
      weapon_category,
      weapon_range,
      category_range,
      stealth_disadvantage,
      armor_category,
    } = data;

    const getDescription = () => (isArrayEmpty(desc) ? undefined : desc);
    const getSpecial = () => (isArrayEmpty(special) ? undefined : special);
    const getProperties = () =>
      isArrayEmpty(properties)
        ? undefined
        : properties.map((prop) => prop.name);
    const getContents = () =>
      isArrayEmpty(contents)
        ? undefined
        : contents.map((content) => {
            return { item: content.item.name, quantity: content.quantity };
          });

    return {
      name,
      category: equipment_category.name,
      description: getDescription(),
      cost,
      special: getSpecial(),
      properties: getProperties(),
      weight: weight || undefined,
      contents: getContents(),
      quantity: quantity || undefined,
      minimumStrength: str_minimum || undefined,
      damage: convertDamage(damage),
      twoHandedDamage: convertDamage(two_handed_damage),
      range: range || undefined,
      throwRange: throw_range || undefined,
      speed: speed || undefined,
      armorClass: armor_class || undefined,
      capacity: capacity || undefined,
      toolCategory: tool_category || undefined,
      vehicleCategory: vehicle_category || undefined,
      weaponCategory: weapon_category || undefined,
      weaponRange: weapon_range || undefined,
      categoryRange: category_range || undefined,
      armorCategory: armor_category || undefined,
      stealthDisadvantage: stealth_disadvantage || undefined,
    };
  });
}

const convertDamage = (damage: any) => {
  if (!damage?.damage_dice || !damage?.damage_type) return undefined;

  const { damage_dice, damage_type } = damage;

  return {
    dice: convertStringToDiceRolls(damage_dice) || undefined,
    type: damage_type?.name || undefined,
  };
};

export function convertStringToDiceRolls(str: string): DiceRolls {
  const [quantityStr, diceType] = str.split('d');

  if (!quantityStr || !diceType) {
    return { quantity: 0, type: '0' };
  }

  const quantity = parseInt(quantityStr);
  const type = `d${diceType}`;
  return { quantity, type };
}

export function convertRange(range: string): string {
  const [value, unit] = range.split(' ');

  if (!unit) return range;

  if (unit.toLowerCase() === 'feet' && !isNaN(+value)) {
    const convertedValue = (+value / 5).toString();
    return `${convertedValue} quadrados`;
  }

  return range;
}
