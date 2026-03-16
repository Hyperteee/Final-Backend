const pad = (value) => String(value).padStart(2, "0");

export const createHospitalData = (definition, options = {}) => {
  const hospitalId = definition.id ?? options.hospitalId ?? "";
  const safeDepartments = definition.departments ?? [];

  const info = {
    ...definition,
    id: hospitalId,
    departments: safeDepartments.map(({ doctors = [], ...department }, deptIndex) => {
      const departmentId = department.id ?? `${hospitalId}-D${pad(deptIndex + 1)}`;
      return {
        ...department,
        id: departmentId,
        doctors: doctors.map(({ schedule, ...doctor }, doctorIndex) => ({
          ...doctor,
          id: doctor.id ?? `${departmentId}-DR${pad(doctorIndex + 1)}`,
        })),
      };
    }),
  };

  const schedule = safeDepartments.map(({ id, doctors = [] }, deptIndex) => {
    const departmentId = id ?? `${hospitalId}-D${pad(deptIndex + 1)}`;
    return {
      departmentId,
      doctors: doctors.map(({ id: doctorId, schedule = [] }, doctorIndex) => {
        const resolvedDoctorId = doctorId ?? `${departmentId}-DR${pad(doctorIndex + 1)}`;
        const workingDays = Array.from(new Set(schedule.map(({ day }) => day).filter(Boolean)));
        const timeSlots = Array.from(new Set(schedule.map(({ time }) => time).filter(Boolean)));
        const bookings = schedule.reduce((acc, slot) => {
          if (!slot?.day || !slot?.time) {
            return acc;
          }
          if (!acc[slot.day]) {
            acc[slot.day] = {};
          }
          if (!acc[slot.day][slot.time]) {
            acc[slot.day][slot.time] = [];
          }
          return acc;
        }, {});

        return {
          doctorId: resolvedDoctorId,
          workingDays,
          timeSlots,
          bookings,
        };
      }),
    };
  });

  return { info, schedule };
};

export default createHospitalData;
