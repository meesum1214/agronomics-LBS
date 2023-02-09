import React from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';



export default ({ data, index }) => {

    console.log('>>>> ', data)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={500}
                height={400}
                data={data?.Date?.map((d, i) => ({
                    date: d?.slice(0, 10),
                    Max: data?.[index]?.Max[i],
                    Min: data?.[index]?.Min[i],
                    Mean: data?.[index]?.Mean[i],

                    Sum: data?.[index]?.Sum[i],
                    StdDev: data?.[index]?.StdDev[i],
                }))}
                margin={{
                    top: 5,
                    right: 5,
                    bottom: 5,
                    left: -15,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <XAxis dataKey="date" scale="band" tick={{
                    fontSize: 8,
                    angle: -45,
                    textAnchor: 'end',
                }} />
                <YAxis
                    color='silver'
                    tick={{
                        fontSize: 10,
                        min: -1,
                        max: 1,
                    }} />
                <Tooltip />
                <Legend />



                {/* <Bar dataKey="Sum" barSize={20} fill="silver" /> */}

                <Line type="monotone" dataKey="Min" stroke="red" />
                <Area type="monotone" dataKey="Mean" fill="orange" stroke="orange" />
                <Line type="monotone" dataKey="Max" stroke="green" />

                <Bar dataKey="StdDev" barSize={20} fill="#413ea0" />

            </ComposedChart>
        </ResponsiveContainer>
    );
}

