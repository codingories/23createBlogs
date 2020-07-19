import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  constructor(
    @Column('varchar') public title:string,
    @Column('text') public content: string
  ){}
}
