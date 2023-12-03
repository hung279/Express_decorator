import {
  Delete,
  Get,
  Patch,
  Post,
} from '../common/decorators/request-http.decorator';
import { Body, Param } from '../common/decorators/route-params.decorator';

export class BookController {
  @Get('book')
  async getBooks() {
    console.log('get books');

    return;
  }
}
