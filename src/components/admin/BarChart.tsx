'use client';
import { scaleBand, scaleLinear, select } from 'd3';
import { useEffect, useRef } from 'react';

export default function BarChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const dataset = [
      { name: '3월', value1: 100 },
      { name: '4월', value1: 80 },
      { name: '5월', value1: 90 },
      { name: '6월', value1: 60 },
      { name: '7월', value1: 70 },
    ];

    const maxData = Math.max(...dataset.map((d) => d.value1));

    const width = 574;
    const height = 180;
    // const barWidth = 46;
    //   const barSpacing = 86;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    // 위치
    const x = scaleBand()
      .domain(dataset.map((d) => d.name))
      .rangeRound([0, width])
      .paddingInner(0.6) // bar간 간격(%)
      .paddingOuter(0); // bar 양끝 여백

    const y = scaleLinear()
      .domain([0, maxData])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name)!)
      .attr('y', y(0))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'var(--color-blue-300)')
      .attr('rx', 16)
      .transition()
      .duration(1000)
      .attr('y', (d) => y(d.value1))
      .attr('height', (d) => y(0) - y(d.value1));
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
