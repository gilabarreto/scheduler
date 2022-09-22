import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE"

  const { time, interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => transition(SHOW))

  }

  function onDelete() {
    transition(DELETE)
    props.cancelInterview(props.id).then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview &&
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
        >
        </Show>
      }
      {mode === CREATE &&
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        ></Form>}
      {mode === SAVING && <Status></Status>}
      {mode === DELETE && <Status></Status>}
    </article>
  )
}