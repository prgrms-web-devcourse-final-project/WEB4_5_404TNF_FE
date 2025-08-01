import { modifyPetProfile, registPetProfile } from '@/api/pet';
import { Toast } from '@/components/common/Toast';
import { petProfileSchema } from '@/lib/utils/petProfile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import { useForm } from 'react-hook-form';

export const usePetForm = (profile?: PetProfile) => {
  const { handleSubmit, register, watch, reset, setValue, control } =
    useForm<PetFormValues>({
      resolver: zodResolver(petProfileSchema),
      defaultValues: profile
        ? {
            image: null,
            name: profile.name,
            breed: profile.breed,
            metday: profile.metday,
            birthday: profile.birthday,
            size: profile.size,
            isNeutered: profile.isNeutered ? 'true' : 'false',
            sex: profile.sex ? 'true' : 'false',
            registNumber:
              profile.registNumber === null ? '' : profile.registNumber,
            weight: profile.weight === null ? '' : String(profile.weight),
          }
        : {
            image: null,
            name: '',
            breed: 'GREAT_DANE',
            metday: formatDate(new Date(), 'yyyy-MM-dd'),
            birthday: formatDate(new Date(), 'yyyy-MM-dd'),
            size: undefined,
            isNeutered: undefined,
            sex: undefined,
            registNumber: '',
            weight: '',
          },
    });
  return { handleSubmit, register, watch, reset, setValue, control };
};

export const useRegistMutation = (
  userInfo: User | null,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
      image,
    }: {
      payload: PetPayload;
      image: File | null;
    }) =>
      registPetProfile({ ...payload, userId: String(userInfo?.userId) }, image),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['pets', String(userInfo?.userId)],
      });
      Toast.success('반려견이 등록되었습니다!');
      onClose();
    },
    onError: (err) => {
      if (err instanceof Error) {
        Toast.error(err.message);
      } else {
        Toast.error('반려견 등록에 실패했습니다');
      }
    },
  });
};

export const useModifyMutation = (
  userInfo: User | null,
  petId: number,
  onClose: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
      image,
      petId,
    }: {
      payload: PetPayload;
      image: File | null;
      petId: number;
    }) => modifyPetProfile(payload, image, petId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['pets', String(userInfo?.userId)],
      });
      await queryClient.invalidateQueries({
        queryKey: ['pet', petId],
      });
      onClose();
      Toast.success('반려견 정보가 수정되었습니다!');
    },
    onError: (err) => {
      if (err instanceof Error) {
        Toast.error(err.message);
      } else {
        Toast.error('반려견 정보 수정에 실패했습니다');
      }
    },
  });
};
