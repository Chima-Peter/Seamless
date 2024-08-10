import { useContext } from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectProjectById } from "../ViewProjectSlice"
import ViewProjectChart from "./ViewProjectChart"
import { IdContext } from "../ViewProject"


function ProjectDetails() {
   const id = useContext(IdContext)
   const ProjectDetailsSelector = useAppSelector((state) => selectProjectById(state, id))

   return (
      <section className="flex gap-4 px-2 md:px-4 lg:px-8 flex-wrap w-[100%] justify-normal lg:justify-between">
         <div className="py-4 self-center px-8 bg-white border border-white items-center rounded-sm shadow-lg w-[100%] lg:w-[48%] h-[290px] flex flex-col gap-3 lg:gap-0">
            <h1 className="text-lg font-semibold self-start">
               Overview
            </h1>
            <ViewProjectChart />
            <ul className="flex translate-y-[-110px] self-start items-start gap-4 flex-wrap">
               <li className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-blue-700"></div>
                  <p className="text-[10px] font-medium tracking-wider">
                     Percentage completed
                  </p>
               </li>
               <li className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400"></div>
                  <p className="text-[10px] font-medium tracking-wider">
                     Percentage remaining
                  </p>
               </li>
            </ul>
         </div>
         <div className="p-4 bg-white border border-white rounded-sm shadow-lg w-[100%] lg:w-[48%] flex flex-col gap-3 lg:gap-0">
            <h1 className="text-lg font-semibold">
               Project Details
            </h1>
            <div className="flex gap-2 mb-4">
               <div>
                  <h2 className="text-xs font-light">
                     Project Name:
                  </h2>
                  <h2 className="text-xs font-light">
                     Project Manager:
                  </h2>
               </div>
               <div>
                  <h2 className="text-xs font-semibold tracking-wider">
                     {ProjectDetailsSelector?.projectDetails.name}
                  </h2>
                  <h2 className="text-xs font-semibold tracking-wider">
                  {ProjectDetailsSelector?.projectDetails.manager}
                  </h2>
               </div>
            </div>
            <div className="flex gap-6 lg:gap-0 flex-wrap justify-normal lg:justify-between">
               <ul className="flex flex-col gap-1 list-inside list-disc w-[100%] md:w-[48%] md:pr-[2%] md:border-r md:border-r-gray-400">
                  <h2 className="text-[lg] font-semibold self-start border-b p-1 border-b-gray-400 w-[100%]">
                     Milestones
                  </h2>
                  {
                     ProjectDetailsSelector?.projectDetails.milestones.map(item => (
                        <li className="font-medium text-xs" key={item}>
                           {item}
                        </li>
                     ))
                  }
               </ul>
               <ul className="flex flex-col gap-1 list-inside list-disc  w-[100%] md:w-[48%]">
                  <h2 className="text-[lg] font-semibold self-start border-b p-1 border-b-gray-400 w-[100%]">
                     Key Details
                  </h2>
                  {
                     ProjectDetailsSelector?.projectDetails.keyDetails.map(item => (
                        <li className="font-medium text-xs" key={item}>
                           {item}
                        </li>
                     ))
                  }
               </ul>
            </div>
         </div>
      </section>
   )
}

export default ProjectDetails
