'use client';

import { adminLogin, getUserProfile } from '@/api/auth';
import Icon from '@/components/common/Icon';
import { useAuthStore } from '@/stores/authStoe';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginForm() {
  const route = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const setLogin = useAuthStore((state) => state.setLogin);

  const adminLoginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      adminLogin(email, password),
  });

  const profileMutation = useMutation({
    mutationFn: getUserProfile,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('이메일을 입력해주세요');
      return;
    }
    if (!password) {
      setError('비밀번호를 입력해주세요');
      return;
    }

    try {
      const { data: user } = await adminLoginMutation.mutateAsync({
        email,
        password,
      });
      const data = await profileMutation.mutateAsync(user.userId);

      const userInfo: User = {
        userId: data.userId,
        email: data.email,
        name: data.name,
        nickname: data.nickname,
        role: data.role,
        provider: data.provider,
        imgUrl: data.userImg,
      };
      setLogin(userInfo);
      sessionStorage.setItem('userId', user.userId);
      sessionStorage.setItem('role', data.role);
      route.push('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.',
      );
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

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="mt-12 flex flex-col justify-center gap-5 p-6 sm:mt-14 sm:px-[20vw]"
      >
        <input
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          className="auth__input focus:!border-[#FCC389]"
          value={email}
          onChange={(e) => handleChange(e, 'email')}
        />

        <div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="auth__input w-full focus:!border-[#FCC389]"
            value={password}
            onChange={(e) => handleChange(e, 'password')}
          />
          {error && <p className="auth__error">{error}</p>}
        </div>

        <button className="mt-4 h-[40px] cursor-pointer rounded-[12px] bg-[#FFDBAB] py-[10px] sm:mt-6 sm:h-[56px]">
          <div className="flex items-center justify-center gap-2">
            <Icon
              className="dark:bg-[url('/images/sprite.svg')]"
              width="20px"
              height="18px"
              left="-297px"
              top="-312px"
            />
            <p className="text-[14px] font-medium text-[#2B2926] sm:text-[18px]">
              멍멍일지 관리자 로그인
            </p>
          </div>
        </button>
      </form>
    </>
  );
}
