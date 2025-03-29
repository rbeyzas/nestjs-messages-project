import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return 'hi there!';
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return 'hi there!';
  }
  // eğer dto eklemişsek dto ya ne kural eklediysek returnde o kuralı uyguluyoruz. dto ya string girmişsek string değer göndermeliyiz yoksa hata alırız

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log(id);
    return `hi there! ${id}`;
  }
}
