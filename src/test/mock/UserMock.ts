import { UserDto } from 'src/dtos';

export const mockUserData = (): UserDto => ({
  id: '64c7abadcfd56eedb032fdd7',
  name: 'Jordão Qualho',
  password: 'jordaoqualho',
  email: 'jordaoqualho@gmail.com',
  avatarUrl: 'https://example.com/avatar.jpg',
  totalGamesPlayed: 0,
  quests: [],
  inspiration: 0,
});
