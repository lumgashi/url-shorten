import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Response } from 'express';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('shorten')
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.create(createUrlDto);
  }

  @Get()
  findAll() {
    return this.urlsService.findAll();
  }

  @Get(':urlId')
  findOne(@Param('urlId') urlId: string, @Res() response: Response) {
    return this.urlsService.findOne(urlId, response);
  }

  @Delete(':urlId')
  remove(@Param('urlId') urlId: string) {
    return this.urlsService.remove(urlId);
  }
}
