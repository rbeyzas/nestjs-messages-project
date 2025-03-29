/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return messages[id];
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    messages[Math.random().toString()] = {
      id: Math.random().toString(),
      content,
    };
    await writeFile('messages.json', JSON.stringify(messages, null, 2));
  }
}

// Repository'nin amacı veri erişimini sağlamaktır.
