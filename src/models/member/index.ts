export interface Member {
    id: number;
    fullName: string;
    email: string;
    role: RoleOption; // Thay đổi từ string thành RoleOption
    team: TeamOption;
  }
  
  export type TeamOption = 'Team Design' | 'Team Dev' | 'Team Media';
  export type RoleOption = 'Developer' | 'Designer' | 'Media Editor'; // Các vai trò có thể chọn