import React, { FunctionComponent, useState } from "react";
import { BsHandIndex } from "react-icons/bs";

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
    <div className="flex mt-6 flex-col pb-9">
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
        <p className="text-lg text-slate-600">
          Hi! I&apos;m Stefanos. I&apos;m the father of a sweet boy called Leo
          and I&apos;m currently working as a Senior frontend developer at
          Zivver where we try to make our online communications more secure. I
          love talking about frontend architecture, state machines, reactive
          programming and Angular.
        </p>
      ) : (
        <>
          <p className="text-lg text-slate-600">
            Hi! Since you&apos;re here it means you want to learn more things
            about me. That&apos;s a little bit akward to be honest but it&apos;s
            fine. Feel free to check my Github/Medium accounts (links{" "}
            <BsHandIndex className="inline-block text-red-500" />
            ). There you can find what mostly interests me on programming!
          </p>
          <br />
          <p className="text-lg text-slate-600">
            Still here? Well, not a lot more I can share, I&apos;m the father of a
            very sweet little boy with whom I have the best pair programming
            sessions so far (he doesn&apos;t talk yet!). I studied computer
            engineering and I have 7 years of professional experience.
          </p>
          <br />
          <p className="text-lg text-slate-600">
            Most of my experience is around Angular and all the relevant tools
            around it (NgRx, RxJS, tailwind, storybook, nrwl/nx, etc). I started
            working with the new version of Angular back in 2016 (beta.6) and I
            haven&apos;t stoped using it until now. However, I wouldn&apos;t say no to
            other frameworks. I really enjoy React and its simplicity, compared
            to Angular of course ;-) This blog is actually built with React and
            Next.js.
          </p>

          <p className="text-lg text-slate-600">Feel free to reach out to me for any questions!</p>
        </>
      )}
    </div>
  );
};

export default LongStoryShort;
