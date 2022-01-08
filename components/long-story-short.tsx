import React, { FunctionComponent, useState } from "react";

const enum LongStoryShortEnum {
  LONG = "LONG",
  SHORT = "SHORT",
}

const LongStoryShort: FunctionComponent = () => {
  const [type, setStoryType] = useState<LongStoryShortEnum>(
    LongStoryShortEnum.SHORT
  );

  const activateShort = () => {
    setStoryType(LongStoryShortEnum.SHORT);
  };

  const activateLong = () => {
    setStoryType(LongStoryShortEnum.LONG);
  };

  return (
    <div className="flex mt-6 flex-col">
      <div className="flex my-6">
        <button
          onClick={activateLong}
          className={`${
            type === LongStoryShortEnum.LONG
              ? "border-sky-500 text-sky-500"
              : "border-slate-400 text-slate-400"
          } 	 border-2 text-lg rounded-lg py-1 px-8 hover:bg-slate-100`}
        >
          long
        </button>
        <div className="text-lg text-slate-600  py-2 px-8 mr-2">story</div>
        <button
          onClick={activateShort}
          className={`${
            type === LongStoryShortEnum.SHORT
              ? "border-sky-500 text-sky-500"
              : "border-slate-400 text-slate-400"
          } border-2 text-lg rounded-lg py-1 px-8 hover:bg-slate-100`}
        >
          short
        </button>
      </div>

      {type === LongStoryShortEnum.SHORT ? (
        <p>This id my short story</p>
      ) : (
        <p>This id my long story</p>
      )}
    </div>
  );
};

export default LongStoryShort;
