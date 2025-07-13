import { ResponsivePie } from "@nivo/pie";

export const Donut = ({ data }: any) => (
  <ResponsivePie /* or Pie for fixed dimensions */
    data={data}
    margin={{ top: 0, right: 90, bottom: 100, left: 80 }}
    innerRadius={0.5}
    padAngle={0.6}
    cornerRadius={2}
    activeOuterRadiusOffset={8}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        translateY: 26,
        itemWidth: 50,
        itemHeight: 18,
        itemsSpacing: 20,
        symbolShape: "circle",
      },
    ]}
  />
);
