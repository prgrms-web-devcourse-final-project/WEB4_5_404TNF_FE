import { deletePetProfile } from '@/api/pet';
import {
  petBreedData,
  petNeutering,
  petSex,
  petSizeData,
} from '@/assets/data/pet';
import dog from '@/assets/images/default-dog-profile.svg';
import MobileTitle from '@/components/common/MobileTitle';
import SelectBox from '@/components/common/SelectBox';
import {
  useModifyMutation,
  usePetForm,
  useRegistMutation,
} from '@/lib/hooks/profile/usePetForm';
import { usePetProfile } from '@/lib/hooks/profile/useProfiles';
import { handleError } from '@/lib/utils/handleError';
import { useAuthStore } from '@/stores/authStoe';
import { useProfileStore } from '@/stores/profileStore';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { Controller } from 'react-hook-form';
import DateField from '../DateField';
import ImageField from '../ImageField';
import InputField from '../InputField';
import RadioGroupField from '../RadioGroupField';

export default function DogProfileEditMobile() {
  const params = useParams();
  const userId = params?.userId as string;
  const userInfo = useAuthStore((state) => state.userInfo);
  const isMyProfile = userInfo?.userId === Number(userId);

  const selectPet = useProfileStore((state) => state.selectPet);
  const selectedPet = useProfileStore((state) => state.selectedPet);
  const toggleEditingPetProfile = useProfileStore(
    (state) => state.toggleEditingPetProfile,
  );
  const { data: profile } = usePetProfile(selectedPet ?? 0, isMyProfile);
  const { handleSubmit, register, watch, setValue, control } =
    usePetForm(profile);
  const [imageUrl, setImageUrl] = useState(profile?.imgUrl || dog);

  const queryClient = useQueryClient();
  const { mutate: registMutate } = useRegistMutation(
    userInfo,
    toggleEditingPetProfile,
  );
  const { mutate: modifyMutate } = useModifyMutation(
    userInfo,
    selectedPet!,
    toggleEditingPetProfile,
  );

  const onSubmit = async (data: PetFormValues) => {
    const payload = {
      ...data,
      sex: data.sex === 'true' ? true : false,
      isNeutered: data.isNeutered === 'true' ? true : false,
      weight: data.weight ? Number(data.weight) : null,
      registNumber: data.registNumber ? data.registNumber : null,
    };

    if (profile && selectedPet) {
      modifyMutate({ payload, image: data.image, petId: selectedPet });
    } else {
      registMutate({ payload, image: data.image });
    }
    selectPet(null);
  };

  const handleDeletePet = async () => {
    if (!profile) return;

    await deletePetProfile(profile.petId);

    await queryClient.invalidateQueries({
      queryKey: ['pets', String(userInfo?.userId)],
    });
    selectPet(null);
    toggleEditingPetProfile();
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue('image', e.target.files[0]);
      setImageUrl(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <main className="w-screen">
      <div className="relative h-full bg-[var(--color-background)] px-6 py-9 text-sm dark:bg-[var(--color-black)]">
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit, handleError)}
        >
          <MobileTitle
            title="반려견 등록"
            onClick={() => {
              console.log('hi');
              handleSubmit(onSubmit, handleError);
            }}
            closePage={() => {
              toggleEditingPetProfile();
              selectPet(null);
            }}
            isSubmit
          />
          <ImageField
            alt="강아지 프로필"
            image={imageUrl}
            handleImage={handleImage}
            isMobile
          />
          <div className="flex flex-col justify-between gap-20 pb-3">
            <div className="w-full">
              <InputField
                id="name"
                label="이름"
                className="w-full"
                required
                placeholder="이름을 적어주세요 (1~10자 이내)"
                register={register}
              />
              <Controller
                name="breed"
                control={control}
                render={({ field }) => (
                  <div className="mb-7">
                    <label className="mb-2 block" htmlFor="breed">
                      견종<span className="text-[var(--color-red)]"> *</span>
                    </label>
                    <SelectBox
                      options={petBreedData}
                      width="50%"
                      hasBorder
                      setValue={(value) => field.onChange(value)}
                      value={field.value}
                    />
                  </div>
                )}
              />
              <RadioGroupField
                className="grow"
                id="size"
                label="크기"
                options={petSizeData}
                register={register}
                watch={watch}
                required
              />
              <DateField
                control={control}
                id="birthday"
                label="태어난 날"
                required
              />
              <DateField
                control={control}
                id="metday"
                label="처음 만난 날"
                required
              />
              <RadioGroupField
                className="basis-[calc(50%-6px)]"
                id="sex"
                label="성별"
                options={petSex}
                register={register}
                watch={watch}
                required
              />
              <RadioGroupField
                className="basis-[calc(50%-6px)]"
                id="isNeutered"
                label="중성화"
                options={petNeutering}
                register={register}
                watch={watch}
                required
              />
              <InputField
                className="mr-2 w-[calc(50%-6px)]"
                id="weight"
                label="몸무게"
                placeholder="몸무게를 적어주세요"
                type="number"
                register={register}
              />
              <InputField
                className="mr-2 w-full"
                id="registNumber"
                label="등록번호"
                placeholder="등록번호를 적어주세요"
                type="number"
                register={register}
              />
            </div>
          </div>
        </form>
        {profile && (
          <span
            className="absolute right-6 bottom-6 cursor-pointer text-[var(--color-grey)] hover:text-[var(--color-black)]"
            onClick={handleDeletePet}
          >
            반려동물 정보 삭제
          </span>
        )}
      </div>
    </main>
  );
}
