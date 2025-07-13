import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ContributionCalendar = ({ submissions }: any) => {
  const dateMap = submissions.reduce(
    (acc: { [key: string]: number }, submission: any) => {
      const date = new Date(submission?.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const heatmapData = Object.entries(dateMap).map(([date, count]) => ({
    date,
    count: Number(count),
  }));

  const endDate = new Date();
  const rawStartDate = new Date(
    new Date().setFullYear(endDate.getFullYear() - 1)
  );
  const startDate = new Date(rawStartDate);
  startDate.setDate(startDate.getDate() + ((6 - startDate.getDay()) % 7));

  return (
    <div className="px-4">
      {/* Add inline style block here */}
      <style>
        {`
          .color-scale-0 { fill: #E6E6FA; }  /* light gray */
          .color-scale-1 { fill: #E0B0FF; }
          .color-scale-2 { fill: #CF9FFF; }
          .color-scale-3 { fill: #DA70D6; }
          .color-scale-4 { fill: #7F00FF; }
        `}
      </style>

      <h2 className="text-md font-bold text-center pb-2 text-violet-950">
        Your Submission Activity
      </h2>

      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value: any) => {
          if (!value || value.count === 0) return "color-scale-0";
          if (value.count >= 5) return "color-scale-4";
          if (value.count >= 3) return "color-scale-3";
          if (value.count >= 1) return "color-scale-2";
          return "color-scale-1";
        }}
        tooltipDataAttrs={(value: any) => {
          if (value && value.date) {
            return {
              "data-tooltip-id": "tooltip",
              "data-tooltip-content": `${value.date}: ${value.count} submission(s)`,
            } as { [key: string]: string };
          }
          return {};
        }}
        showWeekdayLabels={false}
      />
      <ReactTooltip id="tooltip" />
    </div>
  );
};

export default ContributionCalendar;
