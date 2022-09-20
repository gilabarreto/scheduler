import React from "react";
import { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import Empty from "./Empty";

export default function Form(props) {

  const { onSave, onCancel, interviewers } = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => (setStudent(""), setInterviewer(null));

  const cancel = () => (onCancel(), reset());

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="student"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
};