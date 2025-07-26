'use client';
import Card from '@/components/common/Card';
import {
  curveBasis,
  extent,
  line,
  max,
  min,
  scaleLinear,
  scaleTime,
  select,
} from 'd3';
import { formatDate } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function LineGraphCard({
  title,
  dataset,
}: {
  title: string;
  dataset: { date: string; weight?: number; sleep?: number }[];
}) {
  const router = useRouter();

  const [flip, setFlip] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  //마진, 가로 길이, 세로 길이 설정
  const margin = { top: 20, bottom: 30 };
  const width = dimensions.width;
  const height = dimensions.height - margin.top - margin.bottom;

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!width || !height || !dataset) return;
    const filteredDataset = [...dataset]
      ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-6, dataset.length);
    //x축(날짜)과 y축(선형)의 범위 설정
    const x = scaleTime().range([0, width]);
    const y = scaleLinear().range([height, 0]);

    //그래프 초기화
    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    const isWeight = title === '몸무게';

    //x축, y축 도메인값 정의
    const domainX = extent(filteredDataset, (d) => new Date(d.date));
    x.domain(domainX as [Date, Date]);

    const yValues = filteredDataset
      .map((d) => (isWeight ? d.weight : d.sleep))
      .filter((v): v is number => typeof v === 'number');

    const domainY: [number, number] = [
      (min(yValues) ?? 0) - 0.2,
      (max(yValues) ?? 1) + 0.2,
    ];
    y.domain(domainY as number[]);

    const lineGenerator = line<{
      date: string;
      weight?: number;
      sleep?: number;
    }>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(isWeight ? d.weight! : d.sleep!))
      .curve(curveBasis);

    svg
      .append('path')
      .datum(filteredDataset)
      .attr('fill', 'none')
      .attr(
        'stroke',
        title === '몸무게'
          ? 'var(--color-primary-300)'
          : 'var(--color-blue-300)',
      )
      .attr('stroke-width', 6)
      .attr('stroke-dashoffset', width)
      .attr('stroke-dasharray', width)
      .transition()
      .duration(1000)
      .attr('stroke-dashoffset', 0)
      .attr('d', lineGenerator);
  }, [title, dataset, height, width, margin.bottom]);

  return (
    <motion.div
      className="relative h-40 w-full max-w-[558px] sm:h-[200px]"
      animate={{ rotateY: flip ? 0 : 180 }}
      transition={{ duration: 0.7 }}
      onClick={() => dataset?.length && setFlip(!flip)}
    >
      <motion.div
        className="absolute w-full backface-hidden"
        animate={{ rotateY: flip ? 0 : 180 }}
        transition={{ duration: 0.7 }}
      >
        {/* 앞면 */}
        <Card
          className={`${dataset?.length ? 'card__hover' : 'bg-[#fafafa]'} h-40 w-full sm:h-[200px]`}
        >
          <h2 className="mb-5 text-xs font-medium text-[var(--color-grey)] sm:text-base sm:text-[var(--color-black)]">
            {title}
          </h2>
          <div className="h-[100px]" ref={containerRef}>
            {dataset && dataset.length ? (
              dataset.length === 1 ? (
                <div className="flex h-full items-center justify-center">
                  <span className="text-[var(--color-grey)]">
                    데이터가 충분하지 않아 그래프를 표시할 수 없습니다
                  </span>
                </div>
              ) : (
                <svg
                  className="mt-12"
                  ref={svgRef}
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                  preserveAspectRatio="none"
                />
              )
            ) : (
              <div className="flex w-full flex-col items-center gap-3">
                <span className="text-center">
                  등록된 {title}
                  {title === '몸무게' ? '가' : '이'} 없어요
                </span>
                <button
                  className="cursor-pointer rounded-full bg-[var(--color-primary-200)] px-4 py-2 transition-all hover:bg-[var(--color-primary-300)]"
                  onClick={() => router.push('/diary/write')}
                >
                  지금 기록하기
                </button>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
      <motion.div
        className="absolute w-full -scale-x-100 backface-hidden"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* 뒷면 */}
        <Card className="card__hover h-40 w-full max-w-[558px] overflow-hidden py-4 sm:h-[200px]">
          <table className="w-full">
            <thead>
              <tr className="flex w-full border-b border-[var(--color-primary-300)] pb-3 text-sm sm:pb-2 sm:text-base">
                <th className="basis-2/5 font-medium">날짜</th>
                <th className="basis-2/5 font-medium">{title}</th>
              </tr>
            </thead>
            <tbody className="scrollbar-hidden block h-23 overflow-y-scroll text-sm sm:h-[115px] sm:text-base">
              {dataset &&
                dataset.map((data, index) => (
                  <tr
                    key={index}
                    className="flex w-full border-b border-[var(--color-primary-100)] py-[6px] text-center last:border-0"
                  >
                    <td className="basis-2/5">
                      {formatDate(data.date, 'yyyy. M. d')}
                    </td>
                    <td className="basis-2/5">
                      {title === '몸무게'
                        ? `${data.weight ?? '-'} kg`
                        : `${data.sleep ?? '-'} 시간`}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
    </motion.div>
  );
}
