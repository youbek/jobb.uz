import React, { useState, useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import microtip from "microtip/microtip.css";

import Button from "../Buttons/Button";

import { Modal, ModalBody, ModalHeader } from "reactstrap";

function JobApplication({ job }) {
  const { authenticatedUser } = useContext(AuthContext);

  // CONTACT MODEL STATE
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  // VALIDATING WHETHER JOB EXPIRED OR NOT
  const date = new Date(Number(job.date)).toString();
  const dateFrom = moment()
    .subtract(30, "d")
    .format("YYYY-MM-DD");
  const isJobActive = new Date(date) > new Date(dateFrom);

  if (authenticatedUser && authenticatedUser.isHr) {
    return (
      <div className="job-page-action-buttons mt-4">
        <Button
          id="userIsHr"
          disabled
          className="mr-2"
          aria-label="Only job seekers can apply for jobs. You are signed in as an employer."
          data-microtip-position="up"
          role="tooltip"
        >
          Apply
        </Button>

        {job.contactPhone && (
          <Button
            secondary
            id="userIsHr"
            data-microtip-position="up"
            role="tooltip"
            aria-label="Only job seekers can see recruiter's contact phone."
            disabled
          >
            Show Contact
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      {isJobActive ? (
        <Button className="mr-2">Apply</Button>
      ) : (
        <Button className="mr-2" disabled>
          Expired Vacancy
        </Button>
      )}
      {job.contactPhone && (
        <React.Fragment>
          <Button onClick={toggleModal} secondary>
            Show Contact
          </Button>

          {
            // CONTACT PHONE MODAL
          }

          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader
              toggle={toggleModal}
            >{`${job.title} at ${job.companyName}`}</ModalHeader>
            <ModalBody>
              {`${job.author.firstName} ${job.author.lastName}`}
              <div>{job.contactPhone}</div>
            </ModalBody>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
          </Modal>
        </React.Fragment>
      )}
    </div>
  );
}

export default JobApplication;
