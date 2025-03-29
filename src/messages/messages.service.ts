/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor() {
    // service içinde repository oluşturuyoruz
    // bu sayede service içinde repository'yi kullanabiliriz
    // service is creating its own dependencies
    // bir repo olmada servis doğru çalışmaz
    // DONT DO THIS IN REAL APPS
    this.messagesRepo = new MessagesRepository();
  }
  //Dependency Injection: MessagesService sınıfı, MessagesRepository'ye bağımlıdır. Constructor sayesinde NestJS framework'ü otomatik olarak MessagesRepository'nin bir örneğini oluşturup MessagesService'e enjekte eder.

  async findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  async findAll() {
    return this.messagesRepo.findAll();
  }

  async create(content: string) {
    return this.messagesRepo.create(content);
  }
}
