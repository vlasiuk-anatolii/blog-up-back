import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.request';
import { sanitizeInputHtml } from './utils/sanitize-html';
import { CommentsGateway } from './comments.gateway';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly commentsGateway: CommentsGateway,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const commentData = {
      ...createCommentDto,
      text: sanitizeInputHtml(createCommentDto.text),
      author: { id: userId },
      post: { id: createCommentDto.postId },
    };
    const comment = this.commentRepository.create(commentData);
    const savedComment = await this.commentRepository.save(comment);
    this.commentsGateway.handleCommentsUpdated();

    return savedComment;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['author'] });
  }
}
