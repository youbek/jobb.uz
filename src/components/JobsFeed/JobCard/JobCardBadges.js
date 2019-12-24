import React from "react";
import styled from "styled-components";

const BadgeWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
`;

const JobBadge = styled.span`
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: ${props => {
    if (props.green) return "#468A74";
    if (props.blue) return "#148C96";
    return "#CC3D86";
  }};
  box-sizing: border-box;
  padding: 4px 10px;
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
  border: 1px solid
    ${props => {
      if (props.green) return "#468A74";
      if (props.blue) return "#148C96";
      return "#CC3D86";
    }};
`;

function JobCardBadges({ noExperience, partTime, teen }) {
  return (
    <BadgeWrapper>
      {noExperience && <JobBadge blue>No Experience</JobBadge>}
      {partTime && <JobBadge>Part-time</JobBadge>}
      {teen && <JobBadge green>Teen</JobBadge>}
    </BadgeWrapper>
  );
}

export default JobCardBadges;
