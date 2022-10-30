export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
}

export type TRole = typeof Role[keyof typeof Role];