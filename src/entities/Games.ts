import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('GAMES')
export class Games {
  @PrimaryGeneratedColumn({type: 'int', name: 'GID'})
  gID!: number;

  @Column({ type: 'varchar', length: 100, name: 'GNAME' })
  gName!: string;

  @Column({type: 'int', name: 'GGENRE'})
  gGenre!: number;

  @Column({type: 'int', name: 'GDEVELOPER'})
  gDeveloper!: number;

  @Column({type: 'int', name: 'GPUBLISHER'})
  gPublisher!: number;

  @Column({ type: 'date' , name: 'GRELEASEDATE'})
  gReleaseDate!: Date;

  @Column({type: 'varchar', length: 50, name: 'GHOURSTOCOMPLETE'})
  gHoursToComplete!: string;

  @Column({type: 'int', default: 0, name: 'GRETAILPRICE'})
  gRetailPrice!: number;
}