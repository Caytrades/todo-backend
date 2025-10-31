import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../entities/tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    async createTask(title: string, description?: string): Promise<Task> {
        const task = new Task();
        task.title = title;
        task.description = description || '';  
        task.isCompleted = false;
        
        return this.taskRepository.save(task);
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return task;
    }
}
