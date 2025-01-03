import React from "react";
import Chart from "react-apexcharts";
import { Box, Typography } from "@mui/material";
import { renderToStaticMarkup } from "react-dom/server";
import CustomTooltip from "components/Tooltip";
import TooltipIcon from "commonComponents/TooltipIcon";

const AreaChart = ({
  series = [],
  categories = [],
  colors = ["#1E90FF", "#28a745", "#d7b21a", "#cf5021"],
  tooltipIcons,
  title,
  directionsIcon = [],
  tooltip
}) => {
  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      height: "400px",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      enabled: true,
      theme: false,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        const iconUrl = tooltipIcons;
        return `
          <div style="background: ${
            colors[seriesIndex] || "transparent"
          }; color: white; padding: 8px; border-radius: 15px; display: flex; align-items: center;">
            <img src="${iconUrl}" alt="icon" style="width: 24px; height: 24px; margin-right: 8px;" />
            <strong style="font-size: 16px;">${value}</strong>
          </div>`;
      },
    },
    markers: {
      colors: colors,
      strokeColors: "transparent",
      hover: {
        size: 8,
        strokeWidth: 0,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      markers: {
        size: 0,
      },
      formatter: (seriesName, opts) => {
        const icon = directionsIcon[opts.seriesIndex];
        const fallbackCircle = `<div style="width: 10px; height: 10px; background: ${
          colors[opts.seriesIndex]
        }; border-radius: 50%; display: inline-block;"></div>`;

        return `
          <div style="display: inline-flex; align-items: center; font-size: 12px;">
            <span style="margin-right: 5px;">${
              React.isValidElement(icon)
                ? renderToStaticMarkup(icon)
                : fallbackCircle
            }</span>
            ${seriesName}
          </div>`;
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 4,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: colors,
  };

  return (
    <div id="chart">
      <Box display="flex" alignItems="center" columnGap="5px">
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
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
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height={"400px"}
      />
    </div>
  );
};

export default AreaChart;
