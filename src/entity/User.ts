import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm'
import {Post} from './Post'
import {Comment} from './Comment'
import {getDatabaseConnection} from '../../lib/getDatabaseConnection'

@Entity('users')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  username: string;
  @Column('varchar')
  passwordDigest: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(type => Post, post => post.author)
  posts: Post[];
  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[]
  errors = {
    username: [] as string[], password: [] as string[],
    passwordConfirmation: [] as string[]
  }
  password: string;
  passwordConfirmation: string; // 这两个字段不是数据库，但是是这个类上

  async validate(){
    if(this.username.trim()===''){
      this.errors.username.push('不能为空')
    }
    if(!/[a-zA-Z0-9]/.test(this.username.trim())){
      this.errors.username.push('格式不合法')
    }
    if(this.username.trim().length>42){
      this.errors.username.push('太长')
    }
    if(this.username.trim().length<=3){
      this.errors.username.push('太短')
    }
    const found = (await getDatabaseConnection()).manager
      .find(User, {username:this.username})

    if(found){
      this.errors.username.push('已经存在,不能重复注册')
    }
    if(this.password ===''){
      this.errors.passwordConfirmation.push('不能为空')
    }
    if(this.password !== this.passwordConfirmation){
      this.errors.passwordConfirmation.push('两次密码不一致')
    }
  }

  hasErrors(){
    return !!Object.values(this.errors).find(v => v.length > 0)
  }

}
