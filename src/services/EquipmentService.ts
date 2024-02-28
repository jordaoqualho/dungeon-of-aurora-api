import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from 'src/repositories';
import { EquipmentDto } from '../dtos/EquipmentDto';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentRepository: EquipmentRepository) {}

  async createEquipment(equipmentData: EquipmentDto) {
    return await this.equipmentRepository.create(equipmentData);
  }

  async findEquipmentById(equipmentId: string): Promise<EquipmentDto> {
    return await this.equipmentRepository.findById(equipmentId);
  }

  async findAllEquipment(): Promise<EquipmentDto[]> {
    return await this.equipmentRepository.findAll();
  }

  // async function translate() {
  //   const obj = unFormatedEquipments;
  //   const setting = {};

  //   obj.forEach((o) => {
  //     Object.entries(o).forEach(([key, value]) => {
  //       if (
  //         typeof value === 'object' &&
  //         value !== null &&
  //         !Array.isArray(value)
  //       ) {
  //         Object.entries(value).forEach(([nestedKey, nestedValue]) => {
  //           setting[nestedKey] = typeof nestedValue;
  //         });
  //       } else {
  //         setting[key] = typeof value;
  //       }
  //     });
  //   });

  //   return setting;
  // }

  // async translateObjects(obj: any, objIndex: number): Promise<any> {
  //   if (typeof obj !== 'object' || obj === null) {
  //     return obj;
  //   }

  //   const isArray = Array.isArray(obj);
  //   const translatedObj: any = isArray ? [] : {};
  //   const promises: Promise<any>[] = [];

  //   for (const key of Object.keys(obj)) {
  //     const value = obj[key];
  //     const isArray = Array.isArray(value);
  //     const isObject =
  //       typeof value === 'object' && value !== null && !value?.length;

  //     if (isObject) {
  //       if (key === 'cost') {
  //         promises.push(
  //           Promise.resolve({ ...value, unit: convertPieces(value.unit) }),
  //         );
  //       } else {
  //         promises.push(this.translateObjects(value, objIndex));
  //       }
  //     } else if (isArray) {
  //       const translatedArray: any[] = [];
  //       for (let i = 0; i < value.length; i++) {
  //         const isObject =
  //           typeof value === 'object' && value[i] !== null && !value[i]?.length;

  //         let translatedValue;
  //         if (isObject) {
  //           translatedValue = {
  //             item: await sendToTranslator(value[i].item),
  //             quantity: value[i].quantity,
  //           };
  //         } else {
  //           translatedValue = await sendToTranslator(value[i]);
  //         }
  //         translatedArray.push(translatedValue);
  //       }
  //       promises.push(Promise.resolve([...translatedArray]));
  //     } else if (typeof value === 'string') {
  //       promises.push(sendToTranslator(value));
  //     } else {
  //       promises.push(Promise.resolve(value));
  //     }

  //     const translatedValue = await promises[promises.length - 1];
  //     translatedObj[key] = translatedValue;
  //   }

  //   await Promise.all(promises);
  //   return translatedObj;
  // }

  // async callIt() {
  //   const formatedData = formatEquipment(unFormatedEquipments);
  //   const promises: Promise<any>[] = [];
  //   let objIndex = 0;
  //   const totalTimeStart = performance.now();
  //   for (const equipment of formatedData) {
  //     const startTime = performance.now();
  //     promises.push(this.translateObjects(equipment, objIndex));
  //     objIndex++;
  //     await promises[promises.length - 1];
  //     const endTime = performance.now();
  //     const elapsedTime = (endTime - startTime) / 1000;
  //     console.log(
  //       `🈂️ ${equipment.name} was translated in ${elapsedTime.toFixed(2)}s`,
  //     );
  //   }
  //   const translated = await Promise.all(promises);
  //   const totalTimeEnd = performance.now();
  //   const totalTime = (totalTimeEnd - totalTimeStart) / 1000;
  //   const averageTimePerItem =
  //     translated.length > 0 ? totalTime / translated.length : 0;
  //   console.log(
  //     `\n⏲️  ${translated.length} itens was translated in ${totalTime.toFixed(
  //       2,
  //     )}s`,
  //   );
  //   console.log(`🕒 Average time per item: ${averageTimePerItem.toFixed(2)}s`);
  //   writeOnFile(translated, 'equipmentTranslated');
  //   return translated;
  // }

  async updateEquipment(
    equipmentId: string,
    updateEquipmentData: EquipmentDto,
  ): Promise<EquipmentDto> {
    return await this.equipmentRepository.update(
      equipmentId,
      updateEquipmentData,
    );
  }

  async deleteEquipment(equipmentId: string): Promise<void> {
    return await this.equipmentRepository.delete(equipmentId);
  }

  async deleteAllEquipments(): Promise<void> {
    return await this.equipmentRepository.deleteAll();
  }
}
