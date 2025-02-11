import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}