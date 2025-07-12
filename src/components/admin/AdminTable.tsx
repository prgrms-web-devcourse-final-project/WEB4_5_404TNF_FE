import { useState } from 'react';
import Icon from '../common/Icon';
import SortArrow from './SortArrow';

export default function AdminTable({ type }: { type: string }) {
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const status = '활성';

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  return (
    <>
      <table>
        <thead>
          {type === 'user' ? (
            <tr className="h-10 border-b border-[var(--color-black)]">
              <th className="w-15">No</th>
              <th onClick={() => handleSort('email')} className="w-80">
                <div className="admin-th-div">
                  이메일
                  <SortArrow active={sortKey === 'email'} order={sortOrder} />
                </div>
              </th>
              <th onClick={() => handleSort('nickname')} className="w-55">
                <div className="admin-th-div">
                  닉네임
                  <SortArrow
                    active={sortKey === 'nickname'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('post')} className="w-25">
                <div className="admin-th-div justify-center">
                  게시글
                  <SortArrow active={sortKey === 'post'} order={sortOrder} />
                </div>
              </th>
              <th onClick={() => handleSort('comment')} className="w-25">
                <div className="admin-th-div justify-center">
                  댓글
                  <SortArrow active={sortKey === 'comment'} order={sortOrder} />
                </div>
              </th>
              <th onClick={() => handleSort('accessDate')} className="w-46">
                <div className="admin-th-div">
                  최근 접속일
                  <SortArrow
                    active={sortKey === 'accessDate'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('joinDate')} className="w-46">
                <div className="admin-th-div">
                  가입일
                  <SortArrow
                    active={sortKey === 'joinDate'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('state')} className="w-28.5">
                <div className="admin-th-div justify-center">
                  상태
                  <SortArrow active={sortKey === 'state'} order={sortOrder} />
                </div>
              </th>
              <th onClick={() => handleSort('endDate')} className="w-46">
                <div className="admin-th-div">
                  정지 종료일
                  <SortArrow active={sortKey === 'endDate'} order={sortOrder} />
                </div>
              </th>
            </tr>
          ) : (
            <tr className="h-10 border-b border-[var(--color-black)]">
              <th className="w-15">No</th>
              <th onClick={() => handleSort('reporter')} className="w-55">
                <div className="admin-th-div">
                  신고자
                  <SortArrow
                    active={sortKey === 'reporter'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('contentType')} className="w-34">
                <div className="admin-th-div">
                  컨텐츠
                  <SortArrow
                    active={sortKey === 'contentType'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('subject')} className="w-55">
                <div className="admin-th-div">
                  대상자
                  <SortArrow active={sortKey === 'subject'} order={sortOrder} />
                </div>
              </th>
              <th onClick={() => handleSort('reportedAt')} className="w-46">
                <div className="admin-th-div">
                  접수일
                  <SortArrow
                    active={sortKey === 'reportedAt'}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('reason')} className="w-34">
                <div className="admin-th-div">
                  사유
                  <SortArrow active={sortKey === 'reason'} order={sortOrder} />
                </div>
              </th>
              <th onClick={() => handleSort('isDone')} className="w-34.5">
                <div className="admin-th-div justify-center">
                  처리여부
                  <SortArrow active={sortKey === 'isDone'} order={sortOrder} />
                </div>
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) =>
            type === 'user' ? (
              <tr
                key={`user-${index}`}
                className="h-10 border-b border-[var(--color-black)]"
              >
                <td className="text-center">{index + 1}</td>
                <td>user1@naver.com</td>
                <td>유저닉네임최대열글자</td>
                <td className="text-center">11</td>
                <td className="text-center">10</td>
                <td>2025.04.29</td>
                <td>2025.04.29</td>
                <td
                  className={`text-center ${status === '활성' ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'}`}
                >
                  {status}
                </td>
                <td>2025.05.06</td>
              </tr>
            ) : (
              <tr
                key={`report-${index}`}
                className="h-10 border-b border-[var(--color-black)]"
              >
                <td className="text-center">{index + 1}</td>
                <td>유저1</td>
                <td>게시물</td>
                <td>유저6</td>
                <td>2025.04.29</td>
                <td>욕설</td>
                <td>
                  <div className="flex justify-center">
                    <Icon
                      width="22px"
                      height="22px"
                      left="-101px"
                      top="-255px"
                    />
                  </div>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </>
  );
}
