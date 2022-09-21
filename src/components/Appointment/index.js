import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { time, interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    transition(SHOW)
  }

  return (
    <article className="appointment">
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        >
        </Show>
      }
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        ></Form>}
    </article>
  )
}