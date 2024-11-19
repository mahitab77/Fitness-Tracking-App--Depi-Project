import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProgressPreview from "./ProgressPreview";
import { useEffect, useState } from "react";
import { FaCircleNotch } from "react-icons/fa6";
import { aggregateLogsByPeriod, calculateDateRange } from "../../../lib/utils";
import moment from "moment";
import api from "../../../authContext/api";
import { useAuth } from "../../../hooks/use-auth";

const ProgressCard = ({ card, period }) => {
  const { session } = useAuth();

  // ! this needs to be in context api
  const [fetchedData, setFetchedData] = useState({
    workouts: [],
    burn: [],
    intake: [],
    water: [],
    sleep: [],
    steps: [],
    weight: [],
  });

  // ! this needs to be in context api
  const [dataSets, setDataSets] = useState({
    workouts: [],
    burn: [],
    intake: [],
    water: [],
    sleep: [],
    steps: [],
    weight: [],
  });

  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  // ! this needs to be in context api
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // calculating range
  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    const newDateRange = calculateDateRange(period, 0, today);
    setDateRange(newDateRange);
    // console.log(newDateRange);
  }, [period]);

  // fetching the data
  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) {
      return;
    }
    const fetchData = () => {
      setLoading(true);

      const urlMap = {
        workouts: `/workoutslogs/date-range`,
        burn: `/logs/date-range/type/burn`,
        intake: `/logs/date-range/type/intake`,
        water: `/logs/date-range/type/water`,
        sleep: `/logs/date-range/type/sleep`,
        steps: `/logs/date-range/type/steps`,
        weight: `/logs/date-range/type/weight`,
      };

      const url = urlMap[card.id] || urlMap.default;

      api
        .get(url, {
          params: {
            userId: session.id,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
        })
        .then((response) => {
          const data = response.data;

          // Update state based on card.id
          setFetchedData((prevState) => ({
            ...prevState,
            [card.id]: data, // Set the fetched data for the specific card.id
          }));

          // console.log(card.id, data);
        })
        .catch((err) => {
          // Handle error
          if (err.response) {
            console.log("Error response:", err.response.data.message);
          } else if (err.request) {
            console.log("Error request:", err.request);
          } else {
            console.log("Error message:", err.message);
          }

          setError(err); // Store the error in state
        })
        .finally(() => {
          setLoading(false); // Stop loading regardless of success or failure
        });
    };

    fetchData(); // Call the fetch function when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id, dateRange]);

  // calculate datasets
  useEffect(() => {
    // Update state based on card.id
    setDataSets((prevState) => ({
      ...prevState,
      [card.id]: aggregateLogsByPeriod(period, dateRange, fetchedData[card.id]), // Set the fetched data for the specific card.id
    }));
  }, [period, fetchedData, dateRange, card.id]);

  const renderCardContent = () => {
    if (loading) {
      return <FaCircleNotch className="animate-spin text-primary/50" />;
    }

    const isWorkouts = card.id === "workouts";
    const isWeight = card.id === "weight";
    const nonZeroValues = dataSets[card.id].filter((num) => num !== 0);

    if (isWorkouts) {
      return fetchedData[card.id].length;
    }

    if (isWeight) {
      const total = nonZeroValues.reduce((acc, curr) => acc + curr, 0);
      const average = total / (nonZeroValues.length || 1);
      return average.toFixed();
    }

    const sum = dataSets[card.id].reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    function formatNumber(num) {
      if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(0) + "m";
      } else if (num >= 1_000) {
        return (num / 1_000).toFixed(0) + "k";
      } else {
        return num.toString();
      }
    }

    return formatNumber(sum);
  };

  return (
    <Card className="relative mx-auto w-full max-w-[290px] transition-all hover:-translate-y-1">
      <CardHeader className="mt-10 py-2 text-center">
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.desc}</CardDescription>
        <span className="absolute -top-[38px] end-1/2 translate-x-1/2 rounded-full border-4 border-background bg-primary p-3 shadow-sm outline outline-1 outline-border">
          <span className="text-4xl text-background">{card.icon}</span>
        </span>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 text-sm">
        <span className="text-5xl font-extrabold text-muted-foreground/50">
          {renderCardContent()}
        </span>

        <span>
          {card.title.toLowerCase() === "weight" && period !== "daily"
            ? `Avg. ${card.unit}`
            : card.unit}{" "}
          /{" "}
          {
            {
              daily: "Today",
              weekly: "Week",
              monthly: "Month",
              yearly: "Year",
            }[period]
          }
        </span>
      </CardContent>

      {period !== "daily" && (
        <ProgressPreview
          period={period}
          id={card.id}
          dateRange={dateRange}
          dataSets={dataSets}
        />
      )}
    </Card>
  );
};
export default ProgressCard;
