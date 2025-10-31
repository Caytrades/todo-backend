import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../entities/tasks.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async createTask(
        @Body('title') title: string,
        @Body('description') description?: string,
    ): Promise<Task> {
        return this.tasksService.createTask(title, description);
    }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }
}
