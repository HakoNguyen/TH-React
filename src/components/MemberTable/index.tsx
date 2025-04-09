import { DownloadOutlined } from '@ant-design/icons';
import { Button, Select, Table } from 'antd';
import { Member, RoleOption, TeamOption } from '../../models/member/index';
import { exportToExcel } from '../../utils/exportExcel';

const { Option } = Select;

interface MemberTableProps {
	members: Member[];
	onTeamChange: (id: number, team: TeamOption) => void;
	onRoleChange: (id: number, role: RoleOption) => void;
}

const MemberTable = ({ members, onTeamChange }: MemberTableProps) => {
	const columns = [
		{
			title: 'Họ tên',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Vai trò',
			dataIndex: 'role',
			key: 'role',
		},
		{
			title: 'Nhóm',
			dataIndex: 'team',
			key: 'team',
			render: (team: TeamOption, record: Member) => (
				<Select value={team} onChange={(value: TeamOption) => onTeamChange(record.id, value)} style={{ width: 120 }}>
					<Option value='Team Design'>Team Design</Option>
					<Option value='Team Dev'>Team Dev</Option>
					<Option value='Team Media'>Team Media</Option>
				</Select>
			),
		},
	];

	return (
		<div>
			<Button
				type='primary'
				icon={<DownloadOutlined />}
				onClick={() => exportToExcel(members, 'danh_sach_thanh_vien')}
				style={{ marginBottom: 16, backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
			>
				Xuất file XLSX
			</Button>
			<Table dataSource={members} columns={columns} rowKey='id' pagination={{ pageSize: 5, showSizeChanger: false }} />
		</div>
	);
};

export default MemberTable;
