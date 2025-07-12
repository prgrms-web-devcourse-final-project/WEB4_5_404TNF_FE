import Card from '../common/Card';
import BarChart from './BarChart';
import GroupedBarChart from './GroupedBarChart';

export default function StatusGraph({ option }: { option: 'user' | 'post' }) {
  const month = ['3월', '4월', '5월', '6월', '7월'];

  return (
    <>
      <div className="flex flex-col gap-6 text-2xl">
        {option === 'user' ? (
          <>
            <h1>신규 가입 / 탈퇴 추이</h1>
            <div>
              <Card className="w-175 sm:px-10 sm:py-4">
                <GroupedBarChart />
              </Card>
              <div className="mt-4 flex justify-center gap-24 text-xl">
                {month.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>게시글 작성 추이</h1>
            <div>
              <Card className="w-175 sm:px-16 sm:py-4">
                <BarChart />
              </Card>
              <div className="mt-4 flex justify-center gap-25 text-xl">
                {month.map((m) => (
                  <p key={m}>{m}</p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
