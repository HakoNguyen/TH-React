import { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import MemberTable from '../../components/MemberTable/index';
import { mockMembers } from '../../data/member/mockdata';
import { Member, TeamOption, RoleOption } from '../../models/member/index';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function MembersPage() {

  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem('members');
    return savedMembers ? JSON.parse(savedMembers) : mockMembers;
  });

  useEffect(() => { 
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const handleTeamChange = (id: number, team: TeamOption) => {
    const newRole = team === 'Team Dev' ? 'Developer' :
    team === 'Team Design' ? 'Designer' :
    'Media Editor';
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, team, role: newRole } : member
      )
    );
  };
  const handleRoleChange = (id: number, role: RoleOption) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, role } : member
      )
    );
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#ff4d4f', padding: '0 24px' }}>
        <Title level={2} style={{ color: '#fff', margin: '16px 0' }}>
          Quản lý thành viên
        </Title>
      </Header>
      <Content style={{ padding: '24px', backgroundColor: '#fff' }}>
        <MemberTable members={members} onTeamChange={handleTeamChange} onRoleChange={handleRoleChange}/>
      </Content>
    </Layout>
  );
}