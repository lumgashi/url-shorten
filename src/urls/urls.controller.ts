import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

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
  findOne(@Param('urlId') urlId: string) {
    return this.urlsService.findOne(urlId);
  }

  @Delete(':urlId')
  remove(@Param('urlId') urlId: string) {
    return this.urlsService.remove(urlId);
  }
}
