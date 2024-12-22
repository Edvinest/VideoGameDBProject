import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PUSER')
export class User {
  @PrimaryGeneratedColumn({name: 'USERID'})
  userID!: number;

  @Column({ type: 'varchar', length: 25, name: 'USERNICKNAME' })
  userNickname!: string;

  @Column({ type: 'date' , name: 'USERACCOUNTCREATED'})
  userAccountCreated!: Date;
}