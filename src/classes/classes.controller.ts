import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

@Controller('classes')
@ApiTags('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  // @Post()
  // async create(@Body() createClassDto: CreateClassDto) {
  //   return await this.classesService.create(createClassDto);
  // }

  // @Post('/fakedata/create')
  // async createFakeData() {
  //   return await this.classesService.createFakeData();
  // }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.classesService.findAll();
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/:id/students')
  async getAllStudentsOfClass(@Param('id') id: string) {
    return await this.classesService.getAllStudentsOfClass(id);
  }
}
