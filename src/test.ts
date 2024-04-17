import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

// 스웨거 메타데이터 키
const DECORATORS_PREFIX = 'swagger';
const API_MODEL_PROPERTIES = `${DECORATORS_PREFIX}/apiModelProperties`;
const API_MODEL_PROPERTIES_ARRAY = `${DECORATORS_PREFIX}/apiModelPropertiesArray`;

// Helper function to generate an example object from class metadata
export function generateExampleDto(ClassRef: any): object {
  // 디티오로 생성자를 만들지 않고 해당 타입만 가져옴.
  // 생성자에 인자가 들어간경우 에러가 남.
  const mappingDto: Record<string, unknown> = {};

  // metadata 에서 apiProperty로 저장했던 필드명들을 불러옴
  const propertiesArray: string[] = Reflect.getMetadata(API_MODEL_PROPERTIES_ARRAY, ClassRef) || [];

  console.log(propertiesArray);
  const properties: any[] = propertiesArray.map(field => {
    // :fieldName 형식이라서 앞에 : 를 짤라줌
    const fieldName = field.substring(1);
    // 각 필드마다 메타데이터를 가져옴
    const obj = Reflect.getMetadata(API_MODEL_PROPERTIES, ClassRef, fieldName);
    obj.fieldName = fieldName;
    return obj;
  });

  console.log(properties);

  for (const property of properties) {
    const propertyType = property.type;

    mappingDto[property.fieldName] = property.example;
    console.log(mappingDto);
  }
  const exampleInstance: Record<string, unknown> = plainToClass(ClassRef, {});
  const properties1 = Object.getOwnPropertyNames(exampleInstance);
  properties1.forEach(property => {
    const metadata = Reflect.getMetadata('swagger/apiModelPropertiesArray', ClassRef.prototype);
    const propertyMetadata = metadata.find((meta: any) => meta.name === property);
    if (propertyMetadata) {
      // You might want to customize this part to use your own logic for generating example values based on type, etc.
      exampleInstance[property] = `Example ${propertyMetadata.type || 'value'}`;
    }
  });

  return exampleInstance as object;
}
