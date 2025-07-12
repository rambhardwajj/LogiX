import { useUser } from "../hooks";

const Dashboard = () => {
  const { data: userData, isSuccess } = useUser();
  console.log(userData);
  return (
    <div className="min-h-screen overflow-hidden flex justify-center bg-gradient-to-b from-[#f8f9fb] via-[#edf1f9] to-[#c4bdf6]  ">
      <div className="min-h-screen flex flex-col items-center px-4 py-3  ">
        <div className="grid text-center w-full max-w-6xl  auto-rows-[204px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={` bg-gradient-to-bl  row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-2 
              ${i === 0 ? "lg:col-span-1 lg:row-span-6  " : ""} 
              ${i === 1 ? "lg:col-span-2 lg:row-span-2 " : ""} 
              ${i === 2 ? "lg:col-span-1" : ""} 
              ${i === 3 ? "lg:col-span-1" : ""} 
              ${i === 4 ? "lg:col-span-3" : ""} 
              ${i === 5 ? "lg:col-span-3 lg:row-span-3 " : ""} 
              `}
            >
              {i == 0 && (
                <div className="min-w-[18vw]  cursor-pointer relative overflow-hidden rounded-xl  hover:scale-103 ease-in-out duration-100  text-left ">
                  <div className="flex" >
                    <img src={userData?.data.avatar!} width={80} alt="" />
                    <div className="px-3">
                      <h2 className="text-xl font-bold">{userData?.data.fullname}</h2>
                      <p className="max-w-[10vw] overflow-x-hidden text-xs px-[2px] " >{userData?.data.email} </p>
                    </div>
                  </div>
                </div>
              )}

              {i == 1 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl  hover:scale-103 ease-in-out duration-100 p-6 text-left "></div>
              )}

              {i == 2 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl hover:scale-103 ease-in-out duration-100 p-6 text-left "></div>
              )}

              {i == 3 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl  hover:scale-103 ease-in-out duration-100 p-6 text-left "></div>
              )}

              {i == 4 && (
                <div className=" cursor-pointer relative overflow-hidden rounded-xl  hover:scale-103 ease-in-out duration-100 p-6 text-left "></div>
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
