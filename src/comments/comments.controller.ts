import {
  Controller,
  Get,
  Post,
  Body,
  //UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from './dto/create-comment.request';
//import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { COMMENT_IMAGES, COMMENT_TEXT_FILES } from './comment-files';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.commentsService.create(createCommentDto, user.userId);
  }

  @Post(':commentId/file')
  //@UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const destination =
            file.mimetype === 'text/plain'
              ? COMMENT_TEXT_FILES
              : COMMENT_IMAGES;
          callback(null, destination);
        },
        filename: (req, file, callback) => {
          callback(
            null,
            `${req.params.commentId}-${uuidv4()}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (req, file, callback) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/gif' ||
          file.mimetype === 'text/plain'
        ) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Valid file formats are JPG, PNG, GIF, or TXT',
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadCommentFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
          }) as any,
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return {
      success: true,
      message: file.mimetype.startsWith('image/')
        ? 'Image uploaded successfully'
        : 'Text file loaded successfully',
      filename: file.filename,
      path: file.path,
    };
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  async findAll() {
    return this.commentsService.findAll();
  }
}
