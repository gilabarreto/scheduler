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

  const { time, interview, onCancel } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
          interviewers={[]}
          onCancel={back}
        ></Form>}
    </article>
  )
}