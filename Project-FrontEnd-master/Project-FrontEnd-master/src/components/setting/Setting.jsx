import { useState } from "react";
import UploadImg from "./UploadImg";
import { useAuth } from "../../hooks/use-auth";
import BirthDayInput from "./BirthDayInput";

const Setting = () => {
  const { session } = useAuth();
  const [fileBath, setFileBath] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="flex flex-col-reverse items-start justify-between gap-4 md:flex-row">
      <div className="flex-1 space-y-6">
        <div>
          <p className="mb-2 font-semibold">Your BirthDay</p>
          <BirthDayInput />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <img
          src={
            session.avatar
              ? `${backendUrl}${fileBath || session.avatar}`
              : "https://github.com/shadcn.png"
          }
          alt=""
          className="mx-auto size-36"
        />
        <UploadImg setFileBath={setFileBath} />
      </div>
    </div>
  );
};
export default Setting;
