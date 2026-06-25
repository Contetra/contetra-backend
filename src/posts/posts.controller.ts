import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/common/decorators/user.decorator';
import { JwtPayload } from 'src/types/auth';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create-post')
  create(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @User() user: JwtPayload,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @Patch('update-post')
  updateBlog(@Body(ValidationPipe) updatePostDto: UpdatePostDto) {
    return this.postsService.updateBlog(updatePostDto);
  }

  @Get('all-posts-admin')
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
  ) {
    return this.postsService.findAll(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      search ? search : '',
      sortOrder ? sortOrder : 'desc',
    );
  }

  @Get('all-posts')
  @Public()
  findAllPosts(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
    @Query('authors') authors?: string | string[],
    @Query('categories') categories?: string | string[],
  ) {
    const normalizedAuthors = Array.isArray(authors)
      ? authors
      : authors
        ? [authors]
        : [];

    const normalizedCategories = Array.isArray(categories)
      ? categories
      : categories
        ? [categories]
        : [];

    return this.postsService.findAllPosts(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      search ?? '',
      sortOrder ?? 'desc',
      normalizedAuthors,
      normalizedCategories,
    );
  }

  @Get('posts-content')
  getBlogContent(@Query('id') id: string) {
    return this.postsService.getBlogContent(id ? id : '');
  }

  @Get('posts-data')
  @Public()
  getBlogData(@Query('slug') slug: string) {
    return this.postsService.getBlogData(slug ? slug : '');
  }

  @Get('latest-blog')
  @Public()
  getLatestBlog() {
    return this.postsService.getLatestBlog();
  }

  @Get('blog-all')
  @Public()
  getAllBlogsForSitemap() {
    return this.postsService.getAllBlogsForSitemap();
  }
}
