import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @OneToOne(() => ProfileEntity, (profileEntity) => profileEntity.user)
  profile: ProfileEntity;

  @OneToMany(() => PostEntity, (postEntity) => postEntity.user, {
    cascade: true,
  })
  posts: PostEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
