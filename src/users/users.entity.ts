import {
  AfterInsert,
  AfterRemove,
  BeforeInsert,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @AfterInsert()
  loggingAfterInsert() {
    console.log('Insered with id', this.id);
  }
  @BeforeInsert()
  loggingBeforeInsert() {
    console.log('need to insert with id');
  }
  @AfterRemove()
  loggingAferremove() {
    console.log(' instances is deleted');
  }
}
