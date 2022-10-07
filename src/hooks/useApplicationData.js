// Custom Hook that help us manage the Appointments.

import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  // Helper function for updateStops.
  function spotCounter(day, appointments) {

    let counter = 0;
    for (const id of day.appointments) {

      if (appointments[id].interview === null) {
        counter += 1;
      }
    }
    return counter;
  }

  // Function to UPDATE the stops after booking or deleting an interview.
  function updateSpots(appointments) {

    const days = state.days.map(day => {
      return {
        ...day,
        spots: spotCounter(day, appointments)
      }
    })

    return days;

  }

  // Function to BOOK a interview.
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(appointments)

    return axios.put(`/api/appointments/${id}`, { interview })

      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  // Function to CANCEL a interview.
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(appointments)

    return axios.delete(`/api/appointments/${id}`)

      .then(() => {
        setState({ ...state, appointments, days });
      });
  }


  return { state, cancelInterview, bookInterview, setDay }

}