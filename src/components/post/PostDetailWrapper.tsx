'use client';

import { useState } from 'react';
import PostDetailCard from './PostDetailCard';
import CommentInput from './comment/CommentInput';
import CommentList from './comment/CommentList';
import ReportModal from './ReportModal';
import PostEditModal from './PostEditModal';
import MobilePostEditModal from './MobilePostEditModal';
import MobileTitle from '../common/MobileTitle';
import { useMutation } from '@tanstack/react-query';
import { removePost } from '@/api/post';
import { usePathname, useRouter } from 'next/navigation';

export default function PostDetailWrapper({
  postDetail,
}: {
  postDetail: CommunityPostDeatail;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split('/').slice(0, -1).join('/');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reportType, setReportType] = useState<'BOARD' | 'REPLY'>('BOARD');
  const [reportedId, setReportedId] = useState(0);
  const [contentId, setContentId] = useState(0);

  const removePostMutation = useMutation({
    mutationFn: removePost,
    onSuccess: () => {
      router.push(path);
    },
  });

  const handleRemoveClick = () => {
    if (removePostMutation.isPending) return;
    removePostMutation.mutate({ postId: postDetail.articleId });
  };

  return (
    <div
      className={`scrollbar-hidden relative flex w-screen flex-col bg-[var(--color-background)] sm:mt-5 sm:w-full sm:rounded-[50px] sm:px-[6.28vw] dark:bg-[#2B2926] ${
        isReportModalOpen ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
    >
      {isReportModalOpen && (
        <div
          className="fixed inset-0 z-250 flex items-center justify-center bg-[#2B2926]/50"
          onClick={() => setIsReportModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ReportModal
              reportedName={postDetail.nickname}
              reportedId={reportedId}
              reportType={reportType}
              contentId={contentId}
              onClose={() => setIsReportModalOpen(false)}
            />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <>
          <div
            className="fixed inset-0 z-250 hidden items-center justify-center bg-[#2B2926]/50 sm:flex"
            onClick={() => setIsEditModalOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <PostEditModal
                postDetail={postDetail}
                onClose={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
          <div className="fixed z-[120] sm:hidden">
            <MobilePostEditModal
              postDetail={postDetail}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </>
      )}

      <div className="flex w-full flex-col gap-2 sm:w-full sm:gap-8 sm:pt-8">
        <MobileTitle
          title="게시글"
          closePage={() => {
            router.push(path);
          }}
        />
        <PostDetailCard
          postDetail={postDetail}
          onReportClick={() => {
            setReportType('BOARD');
            setReportedId(postDetail.userId);
            setContentId(postDetail.articleId);
            setIsReportModalOpen(true);
          }}
          onEditClick={() => setIsEditModalOpen(true)}
          onRemoveClick={handleRemoveClick}
        />
        <div className="flex flex-col-reverse sm:block">
          <CommentInput postId={postDetail.articleId} />
          <CommentList
            postId={postDetail.articleId}
            totalComment={postDetail.replies}
            onReportClick={() => {
              setReportType('REPLY');
              setIsReportModalOpen(true);
            }}
            setReportedId={setReportedId}
            setContentId={setContentId}
          />
        </div>
      </div>
    </div>
  );
}
