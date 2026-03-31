import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";


export const ScatterPlot = ({_width=860, _height=400}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const margin = { top: 10, right: 30, bottom: 30, left: 60 };
        const width = _width - margin.left - margin.right;
        const height = _height - margin.top - margin.bottom;

        // clear previous chart
        d3.select(containerRef.current).selectAll("*").remove();

        const svg = d3.select(containerRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        d3.csv("/data/reddit_dead_internet_analysis.csv", d => ({
            ...d,
            avg_word_length: +d.avg_word_length,
            user_karma: +d.user_karma
        }))
            .then(data => {
                // optional: remove invalid rows
                const cleanData = data.filter(
                    d => !isNaN(d.avg_word_length) && !isNaN(d.user_karma)
                );

                // start collapsed for animation
                const x = d3.scaleLinear()
                    .domain([0, 0])
                    .range([0, width]);

                const y = d3.scaleLinear()
                    .domain([0, 0])
                    .range([height, 0]);

                // colour stuff
                var color = d3.scaleOrdinal()
                    .domain(["true", "false"])
                    .range(["#00BA38", "#619CFF"])

                // Axis Labels
                svg.append("g")
                    .attr("class", "myXaxis")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x))
                    .attr("opacity", 0);

                svg.append("g")
                    .attr("class", "myYaxis")
                    .call(d3.axisLeft(y))
                    .attr("opacity", 0);

                // Circles
                svg.append("g")
                    .selectAll("circle")
                    .data(cleanData)
                    .enter()
                    .append("circle")
                    .attr("cx", d => x(d.avg_word_length))
                    .attr("cy", d => y(d.user_karma))
                    .attr("r", 1.5)
                    .style("fill", (d) => color(d.is_bot_flag));

                // animate x axis in
                x.domain([0, 8]);

                svg.select(".myXaxis")
                    .transition()
                    .duration(2000)
                    .attr("opacity", 1)
                    .call(d3.axisBottom(x));
                
                // animate y axis in
                y.domain([0, 50000]);

                svg.select(".myYaxis")
                    .transition()
                    .duration(2000)
                    .attr("opacity", 1)
                    .call(d3.axisLeft(y));

                // animate circles to their final positions
                svg.selectAll("circle")
                    .transition()
                    .delay((d, i) => i * 3)
                    .duration(2000)
                    .attr("cx", d => x(d.avg_word_length))
                    .attr("cy", d => y(d.user_karma));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>ScatterPlot Component</h2>
            <div ref={containerRef}></div>
        </div>
    );
};