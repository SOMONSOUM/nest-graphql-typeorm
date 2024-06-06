import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum UserRole {
  Admin = 'admin',
  Partner = 'partner',
  User = 'user',
}

export enum Status {
  Pending = 'pending',
  Registered = 'registered',
}

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field()
  public id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public name: string;

  @Column()
  @Field()
  public email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public otp: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  public isActive: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public otpExpiry: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public invite: string;

  @Column({ type: 'enum', enum: [Status.Pending, Status.Registered], default: Status.Pending })
  @Field()
  public status: string;

  @Column({ type: 'enum', enum: [UserRole.Admin, UserRole.Partner, UserRole.User] })
  @Field()
  public role: UserRole;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public walletAddress: string;

  // RELATIONS
}
