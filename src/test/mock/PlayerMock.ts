import { PlayerDto } from 'src/dtos';

export const mockPlayerData = (): PlayerDto => ({
  name: 'Jordão Qualho',
  password: 'jordaoqualho',
  email: 'jordaoqualho@gmail.com',
  avatarUrl: 'https://example.com/avatar.jpg',
  totalGamesPlayed: 0,
  quests: [],
  inspiration: 0,
});
