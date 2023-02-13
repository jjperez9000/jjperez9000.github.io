/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";

export function MenuBar({ currentState = 3 }) {
  const [coolState, setCoolState] = useState(currentState);
  console.log(currentState);
  return (
    <>
      <div className="w-full bg-yellow-200 flex flex-row">
        <div className=" bg-yellow-200 basis-3/4 py-2 pl-4 ">
          <p className="">John Perez</p>
        </div>
        <div className=" bg-yellow-200 basis-1/4">
          <div className="flex flex-row justify-end">
            <div>
              <Link to="/">
                <button
                  onClick={() => setCoolState(3)}
                  className={
                    coolState === 3
                      ? "bg-sky-200 py-2 px-8"
                      : " hover:bg-sky-200 transition duration-300 ease-in-out py-2 px-8"
                  }
                >
                  Home
                </button>
              </Link>
            </div>
            <div>
              <Link to="/companion">
                <button
                  onClick={() => setCoolState(0)}
                  className={
                    coolState === 0
                      ? "bg-sky-200 py-2 px-8"
                      : " hover:bg-sky-200 transition duration-300 ease-in-out py-2 px-8"
                  }
                >
                  Companion
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
