'use client';
import { useEffect, useRef } from 'react';
import { scaleBand, scaleLinear, select } from 'd3';

export default function GroupedBarChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const dataset = [
      { name: '3월', value1: 100, value2: 40 },
      { name: '4월', value1: 80, value2: 50 },
      { name: '5월', value1: 90, value2: 30 },
      { name: '6월', value1: 60, value2: 20 },
      { name: '7월', value1: 70, value2: 10 },
    ];

    const maxData = dataset.reduce((max, d) => {
      return Math.max(max, d.value1, d.value2);
    }, -1);

    const width = 620;
    const height = 180;
    // const barWidth = 46;
    // const groupSpacing = 40;
    // const groupCount = dataset.length;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);

    // 그룹별 위치
    const fx = scaleBand()
      .domain(dataset.map((d) => d.name))
      .rangeRound([0, width])
      .paddingInner(0.29) // 그룹간 간격(%)
      .paddingOuter(0); // 그룹 양끝 여백

    // 그룹안에서 value1, value2 위치
    const x = scaleBand()
      .domain(['value1', 'value2'])
      .rangeRound([0, fx.bandwidth()])
      .padding(0); // 막대 사이 간격

    const y = scaleLinear()
      .domain([0, maxData])
      .range([height - margin.bottom, margin.top]);

    const group = svg
      .selectAll('g.bar-group')
      .data(dataset)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (d) => `translate(${fx(d.name)}, 0)`);

    // 신규 가입
    group
      .append('rect')
      .attr('x', x('value1')!)
      .attr('y', y(0))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'var(--color-blue-300)')
      .attr('rx', 16)
      .transition()
      .duration(1000)
      .attr('y', (d) => y(d.value1))
      .attr('height', (d) => y(0) - y(d.value1));

    // 탈퇴
    group
      .append('rect')
      .attr('x', x('value2')!)
      .attr('y', y(0))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', 'var(--color-red-300)')
      .attr('rx', 16)
      .transition()
      .duration(1000)
      .attr('y', (d) => y(d.value2))
      .attr('height', (d) => y(0) - y(d.value2));
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
