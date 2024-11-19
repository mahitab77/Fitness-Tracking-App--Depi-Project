import { FaRegEye } from "react-icons/fa6";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import BarChart from "./BarChart";
import LineChart from "./LineChart";

const ProgressPreview = ({ period, id, dateRange, dataSets }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group absolute bottom-1 end-1"
          variant="gost"
          size="icon"
        >
          <FaRegEye className="text-lg text-muted-foreground group-hover:text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="capitalize">{`${period} ${id} progress`}</DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>What gets measured gets improved</span>
            <span>
              ({dateRange.startDate} __ {dateRange.endDate})
            </span>
          </DialogDescription>
        </DialogHeader>

        <BarChart period={period} id={id} dataSets={dataSets} />

        <LineChart
          period={period}
          id={id}
          dataSets={dataSets}
        />
      </DialogContent>
    </Dialog>
  );
};
export default ProgressPreview;
