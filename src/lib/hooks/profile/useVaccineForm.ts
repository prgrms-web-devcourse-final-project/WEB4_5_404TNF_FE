import { createVaccineSchedule, modifyVaccineData } from '@/api/pet';
import { Toast } from '@/components/common/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export const useVaccineForm = (vaccineData?: Vaccination[]) => {
  const info: VaccineInfo = useMemo(
    () => ({
      vaccineAt: undefined,
      vaccineType: 'FIRST',
      count: undefined,
    }),
    [],
  );
  const defaultValues: VaccineFormValues = {
    DHPPL: info,
    CORONAVIRUS: info,
    KENNEL_COUGH: info,
    INFLUENZA: info,
    RABIES: info,
  };

  const fetchData: VaccineFormValues | Record<string, unknown> = {};
  vaccineData?.forEach((data) => {
    fetchData[data.vaccine.name] = {
      vaccineAt: data.vaccineAt,
      vaccineType: data.vaccineType,
      count: data.count,
    };
  });

  const methods = useForm<VaccineFormValues>({
    defaultValues: vaccineData
      ? { ...defaultValues, ...fetchData }
      : defaultValues,
  });

  const reset = useCallback(
    (data: Vaccination[]) => {
      methods.setValue(
        'DHPPL',
        data.find((d) => d.vaccine.name === 'DHPPL') ?? info,
      );
      methods.setValue(
        'CORONAVIRUS',
        data.find((d) => d.vaccine.name === 'CORONAVIRUS') ?? info,
      );
      methods.setValue(
        'KENNEL_COUGH',
        data.find((d) => d.vaccine.name === 'KENNEL_COUGH') ?? info,
      );
      methods.setValue(
        'INFLUENZA',
        data.find((d) => d.vaccine.name === 'INFLUENZA') ?? info,
      );
      methods.setValue(
        'RABIES',
        data.find((d) => d.vaccine.name === 'RABIES') ?? info,
      );
    },
    [info, methods],
  );

  return { methods, reset };
};

export const useVaccineMutation = (petId: number, onClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
      petId,
    }: {
      payload: VaccinePayload[];
      petId: number;
    }) => modifyVaccineData(payload, petId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['vaccine', petId] });
      try {
        await createVaccineSchedule(petId);
      } catch (err) {
        Toast.error('백신 일정 생성에 실패했습니다');
        console.error(err);
      }
      onClose();
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
