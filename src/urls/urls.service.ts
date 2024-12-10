import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  GoneException,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { PrismaService } from 'src/prisma/prisma.service';
//import { nanoid } from 'nanoid';
import { customAlphabet } from 'nanoid';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { isLinkExpired } from 'src/utils/functions';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UrlsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async create(createUrlDto: CreateUrlDto) {
    const { original_url, ttl } = createUrlDto;
    const nanoid = customAlphabet('1234567890abcdef', 6);
    const urlID = nanoid();
    try {
      const existingUrl = await this.prisma.url.findUnique({
        where: {
          original_url,
        },
      });

      if (existingUrl) return existingUrl;

      let updateTTL: bigint;
      const currentTime = new Date(Date.now());
      const currentTimeinMiliseconds = currentTime.getTime();

      if (ttl) updateTTL = BigInt(ttl) + BigInt(currentTimeinMiliseconds);
      else updateTTL = BigInt(currentTimeinMiliseconds) + BigInt(60000);

      const url = await this.prisma.url.create({
        data: {
          urlID: urlID,
          original_url,
          short_url: `${this.configService.get('CLIENT_BASE_URL')}/${urlID}`,
          ttl: updateTTL,
        },
      });

      return url;
    } catch (error) {
      throw new InternalServerErrorException('Could not shorten url', {
        description: error.message,
      });
    }
  }

  async findAll() {
    try {
      const urls = await this.prisma.url.findMany({});
      return urls;
    } catch (error) {
      throw new InternalServerErrorException('Could not find urls', {
        description: error.message,
      });
    }
  }

  async findOne(urlId: string, response: Response): Promise<void> {
    const url = await this.prisma.url.findUnique({
      where: {
        urlID: urlId,
      },
    });

    if (!url) {
      throw new NotFoundException('Could not find url');
    }

    const isExpired = await isLinkExpired(url.ttl);

    if (isExpired) throw new GoneException('Link has expired');

    await this.prisma.url.update({
      where: {
        urlID: urlId,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    response.redirect(url.original_url);
  }

  async remove(urlID: string) {
    try {
      await this.prisma.url.delete({
        where: {
          urlID: urlID,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not delete url', {
        description: error,
      });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async deleteExpiredFiles() {
    const currentTime = new Date(Date.now());
    const currentTimeinMiliseconds = currentTime.getTime();
    const deletedUrls = await this.prisma.url.deleteMany({
      where: {
        ttl: { lt: currentTimeinMiliseconds },
      },
    });

    return deletedUrls;
  }
}
