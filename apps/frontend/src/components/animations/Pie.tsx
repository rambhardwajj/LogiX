import { ResponsivePie } from '@nivo/pie'

export const MyPie = ({ data /* see data tab */ }:any) => (
    <ResponsivePie /* or Pie for fixed dimensions */
        data={data}
        margin={{ top: 30, right: 80, bottom: 160, left: 60 }}
        innerRadius={0.05}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 46,
                itemWidth: 60,
                itemHeight: 5,
                symbolShape: 'circle'
            }
        ]}
    />
)