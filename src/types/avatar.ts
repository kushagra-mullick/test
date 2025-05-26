export interface Avatar {
  id: string;
  name: string;
  image: string; // URL or asset name
  evolutions: AvatarEvolution[];
}

export interface AvatarEvolution {
  level: number;
  avatarId: string;
}

export interface UserAvatar {
  userId: string;
  avatarId: string;
  level: number;
} 