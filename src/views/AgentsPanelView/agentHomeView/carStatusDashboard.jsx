import React from "react";
import BaseCard from "../../../components/card"; // Assuming BaseCard is in the same folder
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Booked", value: 60 },
  { name: "Not Booked", value: 40 },
];

const COLORS = ["#000000", "#5F38F3"]; // Black, Purple

function CarStatusDashboard() {
  return (
    <BaseCard width="w-full" height="h-[250px]" bgColor="bg-white" className="border">
      <div className="flex items-center  h-full">
        {/* Legend */}
        <div className="flex flex-col justify-center pl-4 pr-8 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-black" />
            <span className="text-sm font-medium">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-[#5F38F3]" />
            <span className="text-sm font-medium">Not Booked</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="flex-1">
          <h2 className="text-center text-xl font-bold mb-2">Car Status</h2>
          <div className="flex justify-center items-center">
            <PieChart width={150} height={150}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}

export default CarStatusDashboard;
