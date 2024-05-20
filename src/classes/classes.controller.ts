import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('classes')
@ApiTags('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classesService.create(createClassDto);
  }

  @Post('/fakedata/create')
  async createFakeData() {
    return await this.classesService.createFakeData();
  }

  @Get()
  async findAll() {
    return await this.classesService.findAll();
  }

  @Get('/:id/students')
  async getAllStudentsOfClass(@Param('id') id: string) {
    return await this.classesService.getAllStudentsOfClass(id);
  }
}
