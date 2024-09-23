import * as d3 from "d3";
import { useEffect, useState } from "react";

function LineChart(props) {
  const { width, height } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      generateData();
    }
  }, [data]);

  // generate random data and set it to the data element
  const generateData = () => {
    const chartData = [];
    for (let i = 0; i < 20; i++) {
      const value = Math.floor(Math.random() * i + 3);
      chartData.push({
        label: i,
        value,
      });
    }
    setData(chartData);
  };

  const drawChart = () => {
    // Establish margins
    const margin = { top: 10, right: 50, bottom: 50, left: 50 };

    // establish x and y max values
    const yMinValue = d3.min(data, (d) => d.value);
    const yMaxValue = d3.max(data, (d) => d.value);
    const xMinValue = d3.min(data, (d) => d.label);
    const xMaxValue = d3.max(data, (d) => d.label);

    // create chart area
    const svg = d3
      .select("#line-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .style("color", "#fff");

    // create scale for the x axis
    const xScale = d3
      .scaleUtc()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);

    // create scale for y axis
    const yScale = d3.scaleLinear().domain([0, yMaxValue]).range([height, 0]);

    // Create x grid
    svg
      .append("g")
      .attr("class", "grid")
      .attr("stroke", "#5b46b2")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""))
      .style("color", "#dcdcdc")
      .style("opacity", "0.2");

    // create y grid
    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
      .style("color", "#dcdcdc")
      .style("opacity", "0.2");

    // create the x axis on the bottom
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickSize(15))
      .style("color", "#fff");

    // create the y axis on the left
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    // create a line with x and y coordinates scaled to the data
    const line = d3
      .line()
      .x((d) => xScale(d.label))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // draw the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#5b46b2")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line);
  };

  return (
    <>
      <h3>Line Chart</h3>
      <div id="line-chart" />
    </>
  );
}

export default LineChart;
