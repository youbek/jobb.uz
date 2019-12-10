import React from 'react';
import styled from 'styled-components';
import { Badge } from 'reactstrap';

const BadgeWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const JobBadge = styled.span`
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #6c757d;
  box-sizing: border-box;
  padding: 4px 10px;
  display: inline-flex;
  align-items: center;
  margin: 4px 4px 0;
  border: 1px solid #6c757d;
`;

function JobCardBadges({ noExperience, partTime, teen, accessible }) {
  return (
    <BadgeWrapper>
      {noExperience && <Badge className="purple mr-2">No Experience</Badge>}
      {partTime && <Badge className="blue-chill mr-2">Part-time</Badge>}
      {teen && <Badge className="orange mr-2">Teen</Badge>}
      {accessible && <Badge className="green">Accessible</Badge>}
    </BadgeWrapper>
  );
}

export default JobCardBadges;
