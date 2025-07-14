import ContributionCalendar from "../components/ContributionCalendar";
import { Donut } from "../components/animations/Donut";
import SocialLinks from "../components/SocialLinks";
import { useUser } from "../hooks";

import {
  dummyAllSubmission,
  dummyDonutData,
  dummyPieData,
  dummyUserData,
} from "../constants";
import { MyPie } from "../components/animations/Pie";

const Dashboard = () => {
  let { data: userData } = useUser();
  console.log(userData);
  if (!userData) {
    userData = dummyUserData;
  }
  const totalProblems = 33;

  return (
    <div className="min-h-screen overflow-hidden flex justify-center bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6]  ">
      <div className="min-h-screen flex flex-col items-center px-4 py-3  ">
        <div className="grid text-center w-full max-w-6xl  auto-rows-[202px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={` bg-gradient-to-bl  row-span-1 rounded-xl border-1 border-slate-400/10 bg-white  p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]
              ${i === 0 ? "lg:col-span-1 lg:row-span-6  " : ""} 
              ${i === 1 ? "lg:col-span-2 lg:row-span-2 lg:block hidden " : ""} 
              ${i === 2 ? "lg:col-span-1" : ""} 
              ${i === 3 ? "lg:col-span-1 lg:block hidden " : ""} 
              ${i === 4 ? "lg:col-span-3" : ""} 
              ${i === 5 ? "lg:col-span-3 lg:row-span-3 " : ""} 
              `}
            >
              {i == 0 && (
                <div className="min-w-[18vw]  cursor-pointer relative overflow-hidden rounded-xl  hover:scale-101 ease-in-out duration-100  text-left ">
                  <div className="flex pt-1 pb-8 ">
                    <img src={userData?.data.avatar!} width={80} alt="" />
                    <div className="px-3 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-violet-950 ">
                          {userData?.data.fullname}
                        </h2>
                        <p className="max-w-[10vw] overflow-x-hidden text-xs px-[2px] ">
                          {userData?.data.email.split("@")[0]}{" "}
                        </p>
                      </div>
                      <div>
                        <span className="text-neutral-700 text-xs pr-2">
                          Problems Solved {"  "}
                        </span>
                        <span className="font-bold text-xl text-violet-950">
                          {userData?.data.problemSolvedCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:block hidden">
                    <SocialLinks userData={userData} />
                  </div>

                  <div></div>

                  <div className=" flex flex-col justify-center items-center py-7 hover:scale-101 ">
                    {userData?.data.problemSolvedCount! >= 20 ? (
                      <div>
                        <img
                          src="/badges/gold.png"
                          alt=""
                          className="max-w-[7vw]  "
                        />
                        
                      </div>
                    ) : userData?.data.problemSolvedCount! >= 10 ? (
                      <img
                        src="/badges/silver.png"
                        alt=""
                        className="max-w-[7vw]  "
                      />
                    ) : (
                      <img
                        src="/badges/silver.png"
                        alt=""
                        className="max-w-[7vw]  "
                      />
                    )}
                  </div>
                </div>
              )}

              {i == 1 && (
                <div className=" hidden lg:block cursor-pointer relative overflow-hidden rounded-xl  hover:scale-103 ease-in-out p-6  pl-10 duration-100  text-left ">
                  <div className="  size-100 py-5 ">
                    <Donut data={dummyDonutData} />
                  </div>
                </div>
              )}

              {i == 2 && (
                <div className="cursor-pointer overflow-hidden rounded-xl hover:scale-103 ease-in-out duration-100 p-6 text-left h-full w-full">
                  <div className="bg-transparent   drop-shadow-lg  text-violet-950 p-6 rounded-2xl flex flex-col items-center justify-center w-full h-full  transition duration-300 ease-in-out">
                    <h2 className="text-xl font-semibold mb-2">
                      🔥Daily Streak
                    </h2>

                    <div className="text-5xl font-bold text-violet-600 animate-pulse">
                      {userData?.data.dailyProblemStreak}
                    </div>
                    <p className="mt-1 text-gray-400 text-sm">Days in a row</p>

                    <div className="flex gap-1 mt-4">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded ${
                            i < (userData?.data.dailyProblemStreak ?? 0) % 7
                              ? "bg-green-400"
                              : "bg-neutral-500"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {i == 3 && (
                <div className=" hidden lg:block cursor-pointer relative overflow-hidden rounded-xl  hover:scale-103 ease-in-out duration-100 text-left ">
                  <div className=" inset-0 size-70 py-1 ">
                    <MyPie data={dummyPieData} />
                  </div>
                </div>
              )}

              {i == 4 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl  hover:scale-103 ease-in-out duration-100 p-1 text-left ">
                  <ContributionCalendar submissions={dummyAllSubmission} />
                </div>
              )}

              {i == 5 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl  hover:scale-102 ease-in-out duration-100 p-6 text-left "></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
