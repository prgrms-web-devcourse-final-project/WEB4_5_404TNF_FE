'use client';

import { login } from '@/api/api';
import Icon from '@/components/common/Icon';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const route = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => await login(email, password),
    onSuccess({ accessToken }) {
      localStorage.setItem('accessToken', accessToken);
      route.push('/');
    },
    onError(err) {
      if (err) {
        alert('로그인 실패');
      }
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    mutation.mutate({ email, password });
  };

  return (
    <>
      <form
        className="mt-12 flex flex-col justify-center gap-5 p-6 sm:mt-14 sm:px-[20vw]"
        onSubmit={handleLogin}
      >
        <input
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          className="auth__input focus:!border-[#FCC389]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="auth__input focus:!border-[#FCC389]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-4 h-[40px] cursor-pointer rounded-[12px] bg-[#FFDBAB] py-[10px] sm:mt-6 sm:h-[56px]">
          <div className="flex items-center justify-center gap-2">
            <Icon width="20px" height="18px" left="-297px" top="-312px" />
            <p className="text-[14px] font-medium text-[#2B2926] sm:text-[18px]">
              멍멍일지 로그인
            </p>
          </div>
        </button>

        <div className="-mt-1 flex justify-end gap-1.5 text-[14px] font-medium sm:text-[16px]">
          <p>계졍이 없으신가요? </p>
          <p
            className="cursor-pointer border-b text-[#FF9526]"
            onClick={() => route.push('signup')}
          >
            회원가입
          </p>
        </div>

        <div className="mt-[3.5vh] flex items-center">
          <div className="h-px flex-1 bg-[#2B2926]" />
          <span className="px-4 text-[14px] font-medium text-[#2B2926] sm:px-10 sm:text-[18px]">
            또는
          </span>
          <div className="h-px flex-1 bg-[#2B2926]" />
        </div>

        <div className="flex items-center justify-center sm:mt-7 sm:gap-14">
          <Icon
            width="60px"
            height="60px"
            left="-16px"
            top="-361px"
            className="scale-54 cursor-pointer sm:scale-100"
          />
          <Icon
            width="54px"
            height="55px"
            left="-94px"
            top="-361px"
            className="scale-60 cursor-pointer sm:scale-100"
          />
        </div>
      </form>
    </>
  );
}
