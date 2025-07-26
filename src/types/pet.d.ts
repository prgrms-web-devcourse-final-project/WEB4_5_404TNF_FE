type PetPayload = {
  registNumber: string | null;
  birthday: string;
  metday: string;
  name: string;
  breed: PetBreed;
  size: PetSize;
  weight: number | null;
  sex: boolean;
  isNeutered: boolean;
  userId?: string;
};

type PetProfile = {
  petId: number;
  registNumber: string;
  age: string;
  metday: string;
  name: string;
  breed: PetBreed;
  size: PetSize;
  sex: boolean;
  isNeutered: boolean;
  imgUrl: string;
  birthday?: string;
  weight?: number;
  days?: number;
};

type PetFormValues = {
  registNumber?: string | null;
  birthday: string;
  metday: string;
  name: string;
  breed: PetBreed;
  size: PetSize;
  weight?: string | null;
  sex: 'true' | 'false';
  isNeutered: 'true' | 'false';
  image: File | null;
};

type PetBreed =
  | 'BEAGLE'
  | 'BICHON_FRISE'
  | 'BORDER_COLLIE'
  | 'BOXER'
  | 'BULLDOG'
  | 'CHIHUAHUA'
  | 'COCKER_SPANIEL'
  | 'DACHSHUND'
  | 'DOBERMAN'
  | 'FRENCH_BULLDOG'
  | 'GERMAN_SHEPHERD'
  | 'GOLDEN_RETRIEVER'
  | 'GREAT_DANE'
  | 'HUSKY'
  | 'JACK_RUSSELL'
  | 'LABRADOR'
  | 'MALTESE'
  | 'PAPILLON'
  | 'POMERANIAN'
  | 'POODLE'
  | 'PUG'
  | 'SAMOYED'
  | 'SHIBA_INU'
  | 'SHIH_TZU'
  | 'WELSH_CORGI'
  | 'YORKSHIRE_TERRIER'
  | 'MIX';

type PetSize = 'SMALL' | 'MEDIUM' | 'LARGE';

type Vaccination = {
  count: number;
  pet: number;
  vaccinationId: number;
  vaccine: {
    vaccineId: number;
    name: VaccineName;
    period: number;
    additionalCycle: number;
    boosterCount: number;
    boosterCycle: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  vaccineAt: string;
  vaccineType: VaccineType;
};

type VaccinePayload = {
  name: VaccineName;
  vaccineAt: string;
  vaccineType: VaccineType;
  count: number;
};

type VaccineFormValues = {
  DHPPL: VaccineInfo;
  CORONAVIRUS: VaccineInfo;
  KENNEL_COUGH: VaccineInfo;
  RABIES: VaccineInfo;
  INFLUENZA: VaccineInfo;
};

type VaccineInfo = {
  vaccineAt?: string;
  vaccineType: VaccineType;
  count?: number | null;
};

type VaccineName =
  | 'DHPPL'
  | 'CORONAVIRUS'
  | 'KENNEL_COUGH'
  | 'RABIES'
  | 'INFLUENZA';

type VaccineType = 'FIRST' | 'BOOSTER' | 'ADDITIONAL';
