import React, { FunctionComponent } from "react"; // importing FunctionComponent

type LongStoryShortProps = {
  mode: "long" | "short";
};

const LongStoryShort: FunctionComponent<LongStoryShortProps> = ({ mode }) => {
  const activateShort = () => {
    mode = "short";
  };

  const activateLong = () => {
    mode = "long";
  };

  return (
    <div className="flex mt-6 flex-col">
      <div className="flex my-6">
      <button
          onClick={activateLong}
          className={`${
            mode === "long" ? "bg-emerald-100" : "bg-white"
          } border-orange-500 border-2 text-lg rounded-lg py-2 px-8`}
        >
          long
        </button>
        <div className="text-orange-500	text-lg  py-2 px-8 mr-2">story</div>
        <button
          onClick={activateShort}
          className={`${
            mode === "short" ? "bg-emerald-100" : "bg-white"
          } border-orange-500 border-2 text-lg rounded-lg py-2 px-8`}
        >
          short
        </button>
      </div>

      {mode === "short" ? (
        <p>This id my short story</p>
      ) : (
        <p>This id my long story</p>
      )}
    </div>
  );
};

export default LongStoryShort;
