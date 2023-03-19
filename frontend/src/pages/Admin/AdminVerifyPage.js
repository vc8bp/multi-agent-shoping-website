import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { userRequest } from "../../axiosInstance";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AgentList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const AgentItem = styled.li`
  display: flex;
  gap: 1rem;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;

  @media all and (max-width: 1000px) {
    flex-direction: column;
  }
`;
const AgentImgContainer = styled.div`
  flex: 2;
`

const Img = styled.img`
  width: 100%;
`

const TextBold = styled.span`
  font-weight: bold;
`;

const TextLight = styled.span`
  color: #555;
`;

const AgentInfo = styled.div`
  flex: 10;
  >* {
    margin: 1rem 0;
  }
`

const AgentAction = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Btn = styled.button` 
  background-color: ${p => p.color ? "rgb(182 225 255)" : "#ffcccb"};
  border: 1px solid ${p => p.color ? "#00b2f1" : "red"};
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 15px 8px ${p => p.color ? "rgba(0, 178, 241, 0.1)" : "rgba(255, 99, 71, 0.1)"};
  }
`;

const AdminVerifyPage = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const res = await userRequest.get("/agent", { isVerified: true })
      setAgents(res.data);
    };
    fetchAgents();
  }, []);

  const handleVerify = async (id) => {
    await axios.put(`/api/agents/${id}`, { isVerified: true });
    setAgents(agents.filter((agent) => agent._id !== id));
  };

  return (
    <Container>
      <Header>Verify Agents</Header>
      {agents.length > 0 ? (
        <AgentList>
          {agents.map((agent) => (
            <AgentItem key={agent._id}>
              <AgentImgContainer>
                <Img src={agent.logo} />
              </AgentImgContainer>
              <AgentInfo>
                <TextBold>{agent.name}</TextBold> | <TextLight>{agent.number}</TextLight> | <TextLight>{agent.email}</TextLight><br/><br/>

                <TextLight>Employe No. : </TextLight><TextBold>2000</TextBold><br/>
                <TextLight>Monthly turnover : </TextLight><TextBold>2000</TextBold><br/>
                <TextLight>GST : </TextLight><TextBold>27AABCU9603R1ZN</TextBold><br/> <br/>

                <TextLight>{agent.desc}</TextLight>
              </AgentInfo>
              <AgentAction>
                <Btn onClick={() => handleVerify(agent._id)}>Reject</Btn>
                <Btn onClick={() => handleVerify(agent._id)} color="true">Accept</Btn>
              </AgentAction>
            </AgentItem>
          ))}
        </AgentList>
      ) : (
        <div>No agents to verify</div>
      )}
    </Container>
  );
};

export default AdminVerifyPage;
