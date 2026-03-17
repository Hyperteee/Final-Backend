import React, { useContext } from "react";
import { UserAppointment } from "../../data/context/appointment";


const Testdata = () => {
    const { appointments } = useContext(UserAppointment)
    return ( <>
    {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((app, idx) => (
            <li key={idx}>
              Hospital: {app.hospitalID},Department : {app.departmentID}, Doctor: {app.doctorID}, Date: {app.date}, Time: {app.time}
            </li>
          ))}
        </ul>
      )}
    
    </> );
}
 
export default Testdata