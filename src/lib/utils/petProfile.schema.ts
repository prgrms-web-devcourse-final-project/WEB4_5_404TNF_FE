import z from 'zod/v3';

export const petProfileSchema = z
  .object({
    image: z.nullable(z.instanceof(File)),
    name: z
      .string()
      .trim()
      .min(1, '이름은 최소 1자 이상이어야 합니다!')
      .max(10, '이름은 10자리 이하이어야 합니다!')
      .regex(/^[a-zA-Z가-힣]+$/, '이름은 한글/영문만 입력 가능합니다!'),
    breed: z.enum([
      'BEAGLE',
      'BICHON_FRISE',
      'BORDER_COLLIE',
      'BOXER',
      'BULLDOG',
      'CHIHUAHUA',
      'COCKER_SPANIEL',
      'DACHSHUND',
      'DOBERMAN',
      'FRENCH_BULLDOG',
      'GERMAN_SHEPHERD',
      'GOLDEN_RETRIEVER',
      'GREAT_DANE',
      'HUSKY',
      'JACK_RUSSELL',
      'LABRADOR',
      'MALTESE',
      'PAPILLON',
      'POMERANIAN',
      'POODLE',
      'PUG',
      'SAMOYED',
      'SHIBA_INU',
      'SHIH_TZU',
      'WELSH_CORGI',
      'YORKSHIRE_TERRIER',
      'MIX',
    ]),
    metday: z.string(),
    birthday: z.string(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    isNeutered: z.enum(['true', 'false']),
    sex: z.enum(['true', 'false']),
    registNumber: z.string().trim().optional().nullable(),
    weight: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      const birthday = new Date(data.birthday);
      const metday = new Date(data.metday);
      return birthday <= metday;
    },
    {
      message: '태어난 날은 처음 만난 날보다 반드시 이전이어야 합니다!',
      path: ['birthday'],
    },
  )
  .refine(
    (data) => {
      if (!data.registNumber) {
        return true;
      }
      return data.registNumber.length === 15;
    },
    {
      message: '등록번호는 15자 이어야 합니다!',
      path: ['registNumber'],
    },
  )
  .refine(
    (data) => {
      if (!data.weight) {
        return true;
      }
      const weight = Number(data.weight);
      if (!data.weight && isNaN(weight)) {
        return true;
      }
      return weight >= 0;
    },
    {
      message: '몸무게는 0kg보다 커야 합니다!',
      path: ['weight'],
    },
  )
  .refine(
    (data) => {
      if (!data.weight) {
        return true;
      }
      const weight = Number(data.weight);
      return weight <= 200;
    },
    {
      message: '몸무게는 200kg 이하 이어야 합니다!',
      path: ['weight'],
    },
  );
