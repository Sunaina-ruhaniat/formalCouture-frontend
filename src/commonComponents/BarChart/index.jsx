import React from "react";
import Chart from "react-apexcharts";

import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import CustomTooltip from "components/Tooltip";
import TooltipIcon from "commonComponents/TooltipIcon";

import getStyles from "./Style";

const BarChart = ({
  title,
  dataLabels = "top",
  formaterString,
  data,
  gradientColors = "#52c3aa",
  color = "#554feb",
  tooltip = "",
}) => {
  const classes = getStyles();
  const categories = [
    "Phase 1",
    "Phase 2",
    "Phase 3",
    "Phase 4",
    "Phase 5",
    "Phase 6",
  ];

  const correlationOptions = {
    chart: {
      toolbar: { show: false },
      type: "bar",
      height: 350,
      dropShadow: {
        enabled: true,
        top: 5,
        left: 0,
        blur: 6,
        opacity: 0.2,
        color: "#000",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "32px",
        borderRadius: "8",
        borderRadiusApplication: "top",
        endingShape: "flat",
        dataLabels: {
          position: dataLabels, // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: dataLabels === "top" ? -20 : 0,
      formatter: function (val) {
        return formaterString ? val + formaterString : val;
      },
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      max: 100,
      tickAmount: 5,
      axisBorder: { show: false },
      axisTicks: { show: true },
      labels: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        const directions = ["North", "East", "West", "South"];
        return `
                <div style="display: inline-flex; align-items: center; font-size: 12px;">
                  <span style="margin-right: 5px;">${
                    directions[opts.seriesIndex]
                  }</span>
                </div>`;
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    grid: {
      yaxis: {
        lines: { show: true },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: gradientColors ? [gradientColors] : [color],
        inverseColors: false,
        stops: [0, 100],
      },
    },

    tooltip: {
      enabled: true,
      theme: "light",
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        return `
                <div style="padding: 10px; 
                border-radius: 8px; 
                background: white; 
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); 
                text-align: center; 
                display: flex;
                align-items: center;
                justify-content: center; gap: 2px">
                <img src="/fork_left.png" alt="icon" style="width: 24px; height: 24px; margin-right: 8px;" />
                  <strong style="font-size: 14px; color: #172B4D">Phase ${
                    dataPointIndex + 1
                  }: ${value}%</strong>
                </div>`;
      },
    },
    colors: [color],
  };

  return (
    <Box sx={classes.wrapper}>
      <Box display="flex" alignItems="center" columnGap="5px">
        <Typography sx={{ fontSize: 18, fontWeight: 700}}>
          {title}
        </Typography>
        {tooltip && (
          <CustomTooltip
            placement="bottom"
            title={tooltip}
            arrow
            className="tooltipIcon"
          >
            <TooltipIcon />
          </CustomTooltip>
        )}
      </Box>
      <Box className="innerbox">
        <Chart options={correlationOptions} series={data} type="bar" />
      </Box>
    </Box>
  );
};

export default BarChart;
