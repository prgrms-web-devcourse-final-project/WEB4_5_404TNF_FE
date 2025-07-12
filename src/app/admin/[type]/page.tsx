import AdminTableContainer from '@/components/admin/AdminTableContainer';
import StatusGraph from '@/components/admin/StatusGraph';
import SelectBox from '@/components/common/SelectBox';

export default async function Admin() {
  const period = [
    { value: 'month', label: '월간' },
    { value: 'year', label: '연간' },
  ];

  return (
    <main className="h-full w-screen rounded-[50px] bg-[var(--color-background)] px-[26px] py-6 sm:h-200 sm:w-full sm:px-12 sm:py-7">
      {/* 가입자 수 */}
      <div className="flex justify-center gap-10 text-[28px]">
        <h1>가입자 수</h1>
        <h1 className="mr-14 font-bold">43,434</h1>
      </div>

      {/* 그래프 기간 선택(월간 / 연간) */}
      <div className="flex justify-end text-xl">
        <SelectBox options={period} width="80px" isCenter />
      </div>

      {/* 신규 가입/탈퇴 추이 그래프, 게시글 작성 추이 그래프 */}
      <div className="flex justify-center gap-12">
        <StatusGraph option="user" />
        <StatusGraph option="post" />
      </div>

      {/* 관리자 보드 */}
      <AdminTableContainer />
    </main>
  );
}
