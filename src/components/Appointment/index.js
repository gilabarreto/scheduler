import React from "react";
import { Fragment } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  const { time, interview } = props;

  return (
    <article className="appointment">
      <Header time={time}></Header>
      {interview ?
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        >
        </Show> : <Empty></Empty>}
    </article>
  )
}