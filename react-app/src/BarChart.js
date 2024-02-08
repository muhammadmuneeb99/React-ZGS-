import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

const duration = 500;
function BarChart({ width, height, data, yAxisTitle }) {
  const margin = {
    top: 60,
    bottom: 100,
    left: 80,
    right: 40,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    draw();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const draw = () => {
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.batsManName))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.rating)])
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(ref.current);
    const chart = svg.select("g");

    chart
      .selectAll(".bar")
      .data(data)
      .join((enter) =>
        enter
          .append("rect")
          .classed("bar", true)
          .attr("y", (d) => yScale(0))
          .attr("height", 0)
      )
      .attr("x", (d) => xScale(d.batsManName))
      .style("fill", (d, i) => colorScale(i))
      .attr("width", (d) => xScale.bandwidth())
      .transition()
      .duration(duration)
      .delay((d, i) => (i * duration) / 10)
      .attr("height", (d) => innerHeight - yScale(d.rating))
      .attr("y", (d) => yScale(d.rating));

    chart
      .selectAll(".bar-label")
      .data(data)
      .join((enter) =>
        enter
          .append("text")
          .classed("bar-label", true)
          .attr("text-anchor", "middle")
          .attr("dx", 0)
          .attr("y", yScale(0))
          .attr("dy", -6)
          .attr("opacity", 0)
      )
      .attr("x", (d) => xScale(d.batsManName) + xScale.bandwidth() / 2)
      .text((d) => d.rating)
      .transition()
      .duration(duration)
      .delay((d, i) => (i * duration) / 10)
      .attr("opacity", 1)
      .attr("y", (d) => yScale(d.rating));

    const xAxis = d3.axisBottom().scale(xScale);

    chart
      .selectAll(".x.axis")
      .data([null])
      .join("g")
      .classed("x axis", true)
      .attr("transform", `translate(0,${innerHeight})`)
      .transition()
      .duration(duration)
      .call(xAxis);

    const yAxis = d3.axisLeft().ticks(5).scale(yScale);

    chart
      .selectAll(".y.axis")
      .data([null])
      .join("g")
      .classed("y axis", true)
      .attr("transform", "translate(0,0)")
      .transition()
      .duration(duration)
      .call(yAxis);

    chart
      .selectAll(".x-axis-title")
      .data(["Batsman Name"])
      .join("text")
      .classed("x-axis-title", true)
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 60)
      .attr("fill", "#000")
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text((d) => d);

    chart
      .selectAll(".y-axis-title")
      .data([yAxisTitle])
      .join("text")
      .classed("y-axis-title", true)
      .attr("x", 0)
      .attr("y", 0)
      .attr("transform", `translate(-50, ${innerHeight / 2}) rotate(-90)`)
      .attr("fill", "#000")
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text((d) => d);
  };

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default BarChart;