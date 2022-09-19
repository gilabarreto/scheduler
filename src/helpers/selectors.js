export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.find(filteredDay => filteredDay.name === day);

  if (state.days.length === 0 || filteredDays === undefined) {
    return [];
  }
  return filteredDays.appointments.map((id) => {
    return state.appointments[id];
  })

}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  return {
    student: interview.student, 
    interviewer: state.interviewers[interview.interviewer] 
  }

}