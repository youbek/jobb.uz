import React, { useState } from 'react';
import { Button, Tooltip, Modal, ModalBody, ModalHeader } from 'reactstrap';
import moment from 'moment';

function JobApplication({ job, user }) {
  // TOOLTIP STATE
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  // CONTACT MODEL STATE
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  // VALIDATING WHETHER JOB EXPIRED OR NOT
  const dateFrom = moment()
    .subtract(30, 'd')
    .format('YYYY-MM-DD');
  const isJobActive = new Date(job.date) > new Date(dateFrom);

  if (user.isUserHr) {
    return (
      <div className="job-page-action-buttons mt-4">
        <Button id="userIsHr" className="mr-2" color="primary">
          Apply
        </Button>

        <Tooltip
          placement="top"
          target="userIsHr"
          isOpen={tooltipOpen}
          toggle={toggleTooltip}
        >
          Only job seekers can apply for jobs. You are signed in as an employer.
        </Tooltip>

        {job.contactPhone && (
          <Button color="warning" outline disabled>
            Show Contact
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="job-page-action-buttons mt-4">
      {isJobActive ? (
        <Button color="primary" className="mr-2">
          Apply
        </Button>
      ) : (
        <Button color="primary" className="mr-2" disabled>
          Expired Vacancy
        </Button>
      )}
      {job.contactPhone && (
        <React.Fragment>
          <Button onClick={toggleModal} outline color="secondary">
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
              {job.recruiter.firstName + job.recruiter.lastName}
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
