const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const login = async (email: string, password: string) => {
  const res = await fetch(`${baseURL}/api/auth/v1/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  return data;
};

export const adminLogin = async (email: string, password: string) => {
  const res = await fetch(`${baseURL}/api/auth/v1/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  return data;
};

export const logout = async () => {
  const res = await fetch(`${baseURL}/api/auth/v1/logout`, {
    method: 'POST',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '로그인 실패');
  }

  return data;
};

export const getUserProfile = async (userId: string) => {
  try {
    const response = await fetch(
      `https://mungdiary-172598302113.asia-northeast3.run.app/api/profile/v1/users/${userId}`,
      {
        credentials: 'include',
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const checkEmailDuplicate = async (email: string) => {
  const res = await fetch(
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v1/check-email?email=${email}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '이메일 중복 확인 실패');
  }

  const text = await res.text();
  if (text === '사용 가능한 이메일입니다.') {
    return true;
  }
  return false;
};

export const sendEmailVerification = async (email: string) => {
  const res = await fetch(
    'https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v1/email-verifications',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    },
  );
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '이메일 인증코드 보내기 실패');
  }

  const text = await res.text();
  if (text === '인증 코드가 발송되었습니다.') {
    return true;
  }
  return false;
};

export const verifyEmailCode = async (
  email: string,
  verificationCode: string,
) => {
  const res = await fetch(
    'https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v1/email-verifications/verify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, verificationCode }),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '이메일 인증코드 확인 실패');
  }
};

export const checkNicknameDuplicate = async (nickname: string) => {
  const res = await fetch(
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v1/check-nickname?nickname=${nickname}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '닉네임 중복 확인 실패');
  }
};

export const register = async (formData: {
  name: string;
  nickname: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(
    'https://mungdiary-172598302113.asia-northeast3.run.app/api/auth/v2/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '회원가입 실패');
  }
};

export const socialLogin = async (provider: string) => {
  if (provider !== 'google' && provider !== 'kakao') {
    throw new Error('지원하지 않는 소셜 로그인 방식입니다.');
  }

  const res = await fetch(`${baseURL}/api/auth/v1/social-auth/${provider}`);

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '소셜 로그인 실패');
  }

  return res.text();
};
