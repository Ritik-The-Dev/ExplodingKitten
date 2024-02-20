import React from "react";
import { reducerCases, useStateProvider } from "../context/StateContext";

const LeaderBoard = ({setShowLeaderBoard ,playersArray}) => {
  const [{ userInfo}] = useStateProvider();

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold m-5">
          {" "}
          😼 Exploding Kitten LeaderBoard{" "}
        </h1>
      </div>
      <div className="w-full">
        <div className="text-2xl font-bold flex items-center justify-end pr-5">
          <h1 className="text-2xl font-bold mb-2 pr-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
            {userInfo?.userName}
          </h1>
        </div>
        <div className="text-2xl font-bold flex items-center justify-end pr-5">
          <span>Total Players : {playersArray.length}</span>
        </div>
        <div className="text-2xl font-bold flex items-center justify-end pr-5">
          <button
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mt-5 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-white font-semibold shadow-md border border-transparent hover:border-gray-300 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 "
            onClick={() => setShowLeaderBoard(false)}
          >
            Back to Home
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex items-center w-[70%] border-2 mt-5">
            <div className="w-full flex-col flex items-center justify-center font-extrabold">
              <div className="m-2 w-[50%] flex items-center justify-between">
                <span>Position</span>
                <span>UserName</span>
                <span>Score</span>
              </div>
              {/* Add Map to Update Score */}
              {playersArray &&
                playersArray
                  .slice() // Make a copy of the array to avoid mutating the original array
                  .sort((a, b) => b.score - a.score) // Sort the array based on score in descending order
                  .map((e, index) => {
                    return (
                        <React.Fragment key={index}>
                    {   
                        e._id === userInfo._id ? 
                        <>
                        <div
                        className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 border-t-2 font-bold w-[50%] flex items-center justify-between"
                        key={index}
                        >
                        <div className="mt-2 flex items-center justify-between w-full">
                        <span>{index + 1}</span>
                        <span>{e.userName}</span>
                        <span>{e.score}</span>
                        </div>
                        </div>
                        </>
                        :
                        <div
                        className="border-t-2 font-normal w-[50%] flex items-center justify-between"
                        key={index}
                        >
                        <div className="mt-2 flex items-center justify-between w-full">
                        <span>{index + 1}</span>
                        <span>{e.userName}</span>
                        <span>{e.score}</span>
                        </div>
                        </div>
                    }
                    </React.Fragment>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
