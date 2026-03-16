// import { useEffect, useRef, useState } from 'react';
// import Button from 'react-bootstrap/Button'
// import { useNavigate } from 'react-router';
// import stateData from '../../data/liststate';
// import hospitalData from '../../data/listhospital';
// export default function HospitalSearch() {
//     const [showDropdown, setShowDropdown] = useState(false)
//     const [selectedstate, setSelectedState] = useState("")
//     const [selectedHospital, setSelectedHospital] = useState("")
//     const [letterSearch, setLetterSearch] = useState("")
//     const searchSection = useRef(null)
//     const navigate = useNavigate()
//     const hospitalThai = "โรงพยาบาล"


//     function handleSelect(state){
//         setSelectedState(state)
//         navigate("/hospitals", { state: { selectedstate: state, showDropdown: false } })
//     }
//     function handleHospital(hospital){
//         setSelectedHospital(hospital.name)
//         navigate("/queue1", { state: { selectedHospital: hospital.name, showDropdown: false } })
//     }

//     const filteredStates = stateData.filter(state =>
//       state.toLowerCase().includes(letterSearch.toLowerCase())
//     )

//     const filteredHospitals = hospitalData.filter(hospital =>
//       hospital.name.toLowerCase().includes(letterSearch.toLowerCase()) ||
//       hospitalThai.includes(letterSearch)
//     )

//     useEffect(() => {
//       function closedropdown(){
//         if (searchSection.current && !searchSection.current.contains(event.target)){
//           setShowDropdown(false)
//         }
//       }
//       document.addEventListener("mousedown", closedropdown)
//         return () => {
//             document.removeEventListener("mousedown", closedropdown)
//         }
//     },[])
    
//     return (
// <div>
//     <section className="pt-32 pb-50 bg-gradient-to-br from-blue-50 to-white">
//         <div className="max-w-4xl mx-auto px-8 text-center mr-130">
//             <h2 className="text-4xl font-bold text-black m-10 mb-15 text-center ml-27">ค้นหาโรงพยาบาล</h2>
//             <p className="text-xl text-blue-100 mb-8"></p>

//             <div className="flex gap-4 justify-center mt-10">
//                 <div ref={searchSection} className='d-flex border-1 border-primary rounded-3 position-relative' style={{width : "100%", boxSizing: "border-box"}}>
//                     <i className="bi bi-search" 
//                         style={{
//                             padding: "10px",
//                             background: "dodgerblue",
//                             color: "white",
//                             minWidth: "50px",
//                             textAlign: "center"
//                         }}></i>

//                     <input 
//                         type="text" 
//                         placeholder="ค้นหาจากชื่อ หรือ จังหวัด" 
//                         name="hospital" 
//                         onFocus={() => setShowDropdown(true)} 
//                         onChange={(e)=> setLetterSearch(e.target.value)}
//                         style={{ width: "100%", padding: "10px", outline: "5px" }}
//                     />

//                     {showDropdown && (
//                         <ul 
//                           className="absolute bg-white border border-gray-300 mt-5 rounded-xl max-h-48 overflow-y-auto shadow-lg text-left"
//                           style={{ width: "100%", zIndex: 10 }}
//                         >
//                           {letterSearch ? (
//                             <>
//                               {filteredHospitals.length > 0 && filteredHospitals.map((hospital, index) => {
//                                 const name = hospital.name
//                                 const search = letterSearch.toLowerCase()
//                                 const startIndex = name.toLowerCase().indexOf(search)

//                                 let before = name
//                                 let match = ""
//                                 let after = ""
//                                 if (startIndex !== -1) {
//                                   before = name.slice(0, startIndex)
//                                   match = name.slice(startIndex, startIndex + search.length)
//                                   after = name.slice(startIndex + search.length)
//                                 }

//                                 return (
//                                   <li
//                                     key={`hospital-${index}`}
//                                     onClick={() => handleHospital(hospital)}
//                                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                                   >
//                                     โรงพยาบาล{before}
//                                     {match && <span className="text-blue-500 font-bold">{match}</span>}
//                                     {after} <span className="text-gray-500">({hospital.state})</span>
//                                   </li>
//                                 )
//                               })}
//                               {filteredStates.map((state, index) => {
//                                 const search = letterSearch.toLowerCase()
//                                 const startIndex = state.toLowerCase().indexOf(search)

//                                 let before = state
//                                 let match = ""
//                                 let after = ""
//                                 if (startIndex !== -1) {
//                                   before = state.slice(0, startIndex)
//                                   match = state.slice(startIndex, startIndex + search.length)
//                                   after = state.slice(startIndex + search.length)
//                                 }

//                                 return (
//                                   <li
//                                     key={`state-${index}`}
//                                     onClick={() => handleSelect(state)}
//                                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                                   >
//                                     {before}
//                                     {match && <span className="text-blue-500 font-bold">{match}</span>}
//                                     {after}
//                                   </li>
//                                 )
//                               })}
//                             </>
//                           ) : (
//                             filteredStates.map((state, index) => (
//                               <li
//                                 key={`state-${index}`}
//                                 onClick={() => handleSelect(state)}
//                                 className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                               >
//                                 {state}
//                               </li>
//                             ))
//                           )}

//                         </ul>
//                       )}


//                 </div>

//                 <Button variant="primary" onClick={()=>handleSelect(letterSearch)}>ค้นหา</Button>
//             </div>
//         </div>
//     </section>
// </div>
//   )
// }
