'use client';
import { formatMinutes } from '@/lib/utils/date';
import { pointer, select } from 'd3';
import { useEffect, useRef } from 'react';

export default function BarGraph({ walking }: { walking: DashboardWalking }) {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const dataset = walking;
    const maxData = Math.max(...dataset.map((d) => d.time));
    const width = 175;
    const height = 560;
    const barHeight = 46;
    const barSpacing = 16;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    const rect = svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (_, i) => i * (barHeight + barSpacing))
      .attr('width', 0)
      .attr('height', barHeight)
      .attr('fill', 'var(--color-primary-300)')
      .attr('rx', 16);

    const tooltipGroup = svg.append('g').style('display', 'none');

    const tooltipBox = tooltipGroup
      .append('rect')
      .attr('rx', 6)
      .attr('fill', 'var(--color-black)');

    const tooltipText = tooltipGroup
      .append('text')
      .attr('x', 0)
      .attr('y', 18)
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--color-background)');

    rect
      .on('mousemove', (evt, d) => {
        const [mx, my] = pointer(evt);
        const texts = [d.date, formatMinutes(d.time)];
        const boxWidth = String(d).length * 7;
        const boxHeight = texts.length * 23;

        tooltipGroup
          .style('display', 'block')
          .attr('transform', `translate(${mx + 10}, ${my - 15})`);

        tooltipBox.attr('width', boxWidth).attr('height', boxHeight);

        tooltipText.selectAll('tspan').remove();

        tooltipText
          .selectAll('tspan')
          .data(texts)
          .enter()
          .append('tspan')
          .attr('x', boxWidth / 2)
          .attr('dy', (_, i) => (i === 0 ? 0 : '1.5em'))
          .text((d) => d);
      })
      .on('mouseleave', () => {
        tooltipGroup.style('display', 'none');
      })
      .transition()
      .duration(1000)
      .attr('width', (d) => (d.time === 0 ? 2 : (d.time / maxData) * width));
  }, [walking]);

  return (
    <div>
      <svg className="select-none" ref={svgRef}></svg>
    </div>
  );
}
