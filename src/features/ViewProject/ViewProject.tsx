import { createContext, useRef, useState } from "react"
import Budget from "./budget/Budget"
import ProjectDetails from "./project_details/ProjectDetails"
import Resources from "./resources/Resources"
import { useAppSelector } from "../../app/hooks"
import { selectAllProjects, selectCompleteProjects, selectWorkingProjects, ViewProjectProps } from "./ViewProjectSlice"
import Footer from "../../utils/footer"
import DesktopNav from "../../utils/DesktopNav"
import MediaQuery from "react-responsive"
import MobileNav from "../../utils/mobile_nav"


export const IdContext = createContext('')

function ViewProjects() {

   const [id, setId] = useState('')
   const [search, setSearch] = useState(false)
   const [searchResult, setSearchResult] = useState<ViewProjectProps[]>()
   // ref to get checkbox
   const checkRefs = useRef<(HTMLInputElement | null)[]>([])

   // get all projects; complete or not
   const allProjects = useAppSelector((state) => selectAllProjects(state))

   // get only complete projects
   const completeProjects = useAppSelector((state) => selectCompleteProjects(state));

   // get only working projects
   const workingProjects = useAppSelector((state) => selectWorkingProjects(state));

   // set initial state to all projects before selection starts
   const [projects, setProjects] = useState(allProjects)

   // state to hide the project display till user chooses a project
   const [show, setShow] = useState(false)

   const handleCheckbox = (index:number, next:number) => {

      // logic to ensure user selects either one checkbox or none.
      if (checkRefs.current[index])
         if (!checkRefs.current[next]?.checked) {
            if (checkRefs.current[index].checked) checkRefs.current[index].checked = true; else checkRefs.current[index].checked = false
         }
      else
         checkRefs.current[index].checked = false

      // check to get correct list of projects from store whether they're complete, in progress and set to correct one

      if (checkRefs.current[0]?.checked && !checkRefs.current[1]?.checked) setProjects(completeProjects)
      else if (!checkRefs.current[0]?.checked && checkRefs.current[1]?.checked) setProjects(workingProjects)
      else setProjects(allProjects)
   }

   const handleOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value !== '') {
         setId(event.target.value)
         setShow(true)
      }
      else setShow(false)
   }

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== '') {
         setSearchResult(allProjects.filter(project => (project.projectDetails.name.toLowerCase()).startsWith((event.target.value).toLowerCase())))
         setSearch(true)
      }
      else setSearch(false)
   }

   const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => event.target.value = ''

   const handleClick = (name:string) => {
      setId(name)
      setShow(true)
      setSearch(false)
   }

   return (
      <main className="bg-white min-h-[100vh] flex flex-col gap-6 font-main">
         <MediaQuery maxWidth={786}>
            <MobileNav />
         </MediaQuery>
         <MediaQuery minWidth={787}>
            <DesktopNav />
         </MediaQuery>
         <form className="bg-white w-[100%] pb-4 shadow-lg flex gap-6 lg:gap-0 justify-normal md:justify-between flex-wrap px-4" >
            <div className="flex gap-4 flex-wrap">
               <select onChange={handleOption} name="project" id="project" className="appearance-none p-2 border bg-white text-sm font-main tracking-tight text-gray-500 border-gray-200 outline-none focus:shadow-lg rounded-md w-[100%] md:w-fit">
                  <option value="">
                     Select project
                  </option>
                  {
                     projects.map(project => (
                        <option value={project.id} key={project.projectDetails.name}>
                           {project.projectDetails.name}
                        </option>
                     ))
                  }
               </select>
               <div className="flex gap-0 md:gap-3 justify-between w-[100%] md:w-fit md:justify-normal">
                  <label htmlFor="complete" className="text-[11px] flex items-center gap-1">
                     <input type="checkbox" ref={(el) => (checkRefs.current[0] = el)} name="complete" id="complete" onChange= {() => handleCheckbox(0 ,1)} />
                     Completed Projects
                  </label>
                  <label htmlFor="in-progress" className="text-[11px] flex items-center gap-1">
                     <input type="checkbox" name="in-progress" id="in-progress"  ref={(el) => (checkRefs.current[1] = el)} onChange= {() => handleCheckbox(1, 0)}/>
                     Under construction
                  </label>
               </div>
            </div>
            <div className="w-[100%] lg:w-fit relative">
               <input type="text" onChange={handleSearch} autoComplete="off" name="search" id="search" placeholder="Search for project by name" autoFocus className="px-4 py-2 border border-gray-300 rounded-md w-[100%] lg:w-[400px] outline-none focus:shadow-md placeholder:text-xs placeholder:uppercase capitalize text-[16px]" onBlur={handleBlur} />
               {
                  search && <div className="flex flex-col px-2 rounded-md shadow-md border-b border-b-gray-500 mt-2 w-[100%] lg:w-[400px] bg-black text-white pb-0 absolute">
                     {
                        searchResult?.map(search => (
                           <button onClick={() => handleClick(search.id)} key={search.projectDetails.name} name={search.id} type="button" className="text-xs border-t border-t-gray-500 py-2 outline-none">
                              {search.projectDetails.name}
                           </button>
                        ))
                     }
                  </div>
               }
            </div>
         </form>
         {
            show ? <IdContext.Provider value={id}>
               <ProjectDetails />
               <section className="flex w-[100%] gap-4 justify-normal md:justify-between flex-wrap px-2 md:px-4 lg:px-8">
                  <Resources />
                  <Budget />
               </section>
            </IdContext.Provider> :
               <div className="w-[100%] flex justify-center items-center min-h-[50vh]">
                  <h1 className="text-xl font-semibold text-blue-900">
                     Select a project to view...
                  </h1>
               </div>
         }
         <Footer />
      </main>
   )
}

export default ViewProjects
