'use client';

import { getUserProfile, login, socialLogin } from '@/api/auth';
import Icon from '@/components/common/Icon';
import { useAuthStore } from '@/stores/authStoe';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PasswordToggleButton from '../ShowPasswordButton';
import { getNotifications, getNotificationSetting } from '@/api/notification';
import { useNotificationStore } from '@/stores/Notification';
import { Toast } from '@/components/common/Toast';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const setLogin = useAuthStore((state) => state.setLogin);
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications,
  );

  const loginError = searchParams.get('error');

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });

  const socialLoginMutation = useMutation({
    mutationFn: socialLogin,
  });

  const profileMutation = useMutation({
    mutationFn: getUserProfile,
  });

  const notiSettingMutation = useMutation({
    mutationFn: getNotificationSetting,
  });

  const getNotiMutation = useMutation({
    mutationFn: getNotifications,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginMutation.isPending || profileMutation.isPending) return;

    if (!email) {
      setError('이메일을 입력해주세요');
      return;
    }
    if (!password) {
      setError('비밀번호를 입력해주세요');
      return;
    }

    try {
      const { data: user } = await loginMutation.mutateAsync({
        email,
        password,
      });
      const data = await profileMutation.mutateAsync(user.userId);

      const notiSetting = await notiSettingMutation.mutateAsync();

      const notiList = await getNotiMutation.mutateAsync();

      const userInfo: User = {
        userId: data.userId,
        email: data.email,
        name: data.name,
        nickname: data.nickname,
        role: data.role,
        provider: data.provider,
        imgUrl: data.imgUrl,
      };

      setLogin(userInfo);
      setNotifications(notiList);
      sessionStorage.setItem('userId', user.userId);
      sessionStorage.setItem('isNotiAll', notiSetting?.isNotiAll);
      sessionStorage.setItem('isNotiSchedule', notiSetting?.isNotiSchedule);
      sessionStorage.setItem('isNotiService', notiSetting?.isNotiService);
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.',
      );
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (socialLoginMutation.isPending) return;

    try {
      const res = await socialLoginMutation.mutateAsync(provider);
      window.location.href = res;
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'email' | 'password',
  ) => {
    if (type === 'email') {
      setEmail(e.target.value.trim());
    }
    if (type === 'password') {
      setPassword(e.target.value.trim());
    }

    setError('');
  };

  useEffect(() => {
    if (loginError) {
      Toast.error(decodeURIComponent(loginError), true);
    }
  }, [loginError]);

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="mt-12 flex flex-col justify-center gap-5 p-6 sm:mt-14 sm:px-[25vw]"
      >
        <input
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          className="auth__input focus:!border-[#FCC389]"
          value={email}
          onChange={(e) => handleChange(e, 'email')}
        />

        <div className="relative">
          <input
            name="password"
            type={isShowPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            className="auth__input focus:!border-[#FCC389]"
            value={password}
            onChange={(e) => handleChange(e, 'password')}
            autoComplete="current-password"
          />
          {password.length > 0 && (
            <PasswordToggleButton
              isVisible={isShowPassword}
              onClick={() => setIsShowPassword((prev) => !prev)}
            />
          )}
          {error && <p className="auth__error">{error}</p>}
        </div>

        <button className="mt-4 h-[40px] cursor-pointer rounded-[12px] bg-[#FFDBAB] py-[10px] hover:bg-[var(--color-primary-300)] sm:mt-6 sm:h-[56px]">
          <div className="flex items-center justify-center gap-2">
            <Icon
              className="dark:bg-[url('/images/sprite.svg')]"
              width="20px"
              height="18px"
              left="-297px"
              top="-312px"
            />
            <p className="text-[14px] font-medium text-[#2B2926] sm:text-[18px]">
              멍멍일지 로그인
            </p>
          </div>
        </button>

        <div className="-mt-1 flex justify-end gap-1.5 text-[14px] font-medium sm:text-[16px]">
          <p>계정이 없으신가요? </p>
          <p
            className="cursor-pointer border-b text-[#FF9526]"
            onClick={() => router.push('/terms')}
          >
            회원가입
          </p>
        </div>

        <div className="mt-[3.5vh] flex items-center">
          <div className="h-px flex-1 bg-[#2B2926] dark:bg-[var(--color-background)]" />
          <span className="px-4 text-[14px] font-medium text-[#2B2926] sm:px-10 sm:text-[18px] dark:text-[var(--color-background)]">
            또는
          </span>
          <div className="h-px flex-1 bg-[#2B2926] dark:bg-[var(--color-background)]" />
        </div>

        <div className="flex items-center justify-center sm:mt-7 sm:gap-14">
          <Icon
            width="60px"
            height="60px"
            left="-16px"
            top="-361px"
            className="scale-54 cursor-pointer sm:scale-100"
            onClick={() => handleSocialLogin('kakao')}
          />
          <Icon
            width="54px"
            height="55px"
            left="-94px"
            top="-361px"
            className="scale-60 cursor-pointer sm:scale-100"
            onClick={() => handleSocialLogin('google')}
          />
        </div>
      </form>
    </>
  );
}
