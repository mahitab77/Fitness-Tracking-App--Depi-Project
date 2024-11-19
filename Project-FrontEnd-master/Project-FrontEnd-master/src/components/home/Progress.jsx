import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import GoalsTab from "./GoalsTab";
import ProgressCard from "./progress/ProgressCard";
import { progressData } from "../../../fakeData";

const ProgressPage = () => {
  // ! this needs to be in context api
  const [period, setPeriod] = useState("daily");

  return (
    <Tabs defaultValue="progress" className="w-full flex-1">
      <TabsList className="mx-auto grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="progress">Progress</TabsTrigger>
        <TabsTrigger value="goals">Goals</TabsTrigger>
      </TabsList>
      <TabsContent value="goals" className="flex w-full">
        <GoalsTab />
      </TabsContent>
      <TabsContent
        value="progress"
        className="flex w-full flex-1 flex-col gap-6"
      >
        <div className="flex w-full items-center justify-between">
          <h2 className="text-3xl font-medium capitalize text-primary">
            {period}
          </h2>

          <Select onValueChange={(e) => setPeriod(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid max-h-[calc(100dvh_-_177px)] grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] items-center justify-center gap-y-10 overflow-y-auto px-3 pb-6 pt-10">
          {progressData.map((card) => (
            <ProgressCard
              key={card.title}
              card={card}
              period={period}
              // input={card.input}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default ProgressPage;
