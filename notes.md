# Important Command

npx @nestjs/cli generate module messages
npx @nestjs/cli generate controller messages/messages --flat

- bizim için gerekli dosyaları oluşturacak ve aynı zamanda birbirine bağlayacak
- messages/messages yapma sebebimiz hangi dizine ekleyeceğini belirtiyoruz.
- --flat ise src/messages içerisine yeni bir folder oluşturup bu yeni dosyaları ekleyecekti. öyle yapmasın diye ekledik. yani src/messages/controller klasörüne ekleme yapardı

# Request Decorators

POST /messages/5/validate=true
buradaki 5'i almak için @Param("id")
validate/true için @Query()
Host: localhost:3000 burası için @Headers
{"content": "hi there"} burası için @Body() decoratoru

- Pipe ile validasyon yapıyoruz. yani string bekliyorsak string geldiğinden emin oluyoruz. Bunun için ValidationPipe kullancağız

# Setting up automatic validation

- Tell nest use global validation. (main.ts'e ekledik)
- create a class that describes the different properties that the request body should have data transfer object (DTO)
- add validation rules to the class
- apply that class to the request handler

Class transformator: https://github.com/typestack/class-transformer
Class Validator: https://github.com/typestack/class-validator burada decorator listesi var

# Validation Pipe

- Sunucumuza bir istek gelir. bu istek validation pipe'a gider.
- class-transformers paketi kullanılır. use class-transformers to turn the body into an instance of the dto class. request body alınır burada
- use class-validator to validate the instance. body'nin içeriğini doğrulamaktan sorumludur
- if there are validation errors, respond immediately, otherwise provide body to request handler

### Services and Repositories

**Services**

- it is a class
- 1st place to put any business logic
- uses one or more repositories to find or store data
- amacı mesajlara erişmektir.
- buranın amacı repo'dan bilgi almaktır

  **Repositories**

- it is a class
- 1st place to put storage-related logic
- Usualy ends up being a TypeORM entitiy, a Mongoose schema, or similar

- Servisin amacı repository'i kullanmak ve verilere erişim sağlamak
- Repository ve servislerin metotları çok benzerdir.
  Dosyadan verileri okuyacak ve veri yazacak. mesajlar burada saklanır.

# Notes

- Controller services'a, services repository'e bağımlı

**Nest DI Container/Injector**

```
export class MessagesService {
    messagesRepo: MessagesRepository;
    constructor() {
        this.messagesRepo = new MessagesRepository();
    }
}
```

List of classes and their dependencies
MessagesService class'ı MessagesRepository'e bağımlı
MessagesRepository class'ında bir bağımlılık yok

List of instances that I have created
messagesRepo ve messagesService -> messagesController instance

Container şöyle diyecek: MessagesService'ı oluşturmadan önce MessagesRepository'i oluşturmak gerekiyor. Sonra MessagesRepository'e bakacak ve tamam bunu herhangi bir bağımlılığı yok. böylece doğrudan repoyu oluşturabiliriz. sonra bunu service'ı oluşturmak için kullanabiliriz. sonra bunu kullanarak depoyu oluşturabiliriz.

Bunları DI COntainer hallediyor.

DI Container Flow

1. At startup, register all classes with the container
2. Container will figure out what each dependency each class has
3. We then ask the container to create an instance of a class for us
4. Container creates all required dependencies and gives us the instance
5. Container will hold onto the created dependency instances and reuse them if needed

1 ve 2. maddede her sınıfta Injectable kullan ve bunları modules içerisine ekle
3 ve 4. madde otomatik oalrak gerçekleşiyor. nest bizim için controller instance yaratıyor.

@Injectable() decorator'ü, bir sınıfın NestJS'in dependency injection sistemine dahil edilebileceğini belirtir.
Bu sayede NestJS, bu sınıfın instance'ını otomatik olarak oluşturabilir ve diğer sınıflara enjekte edebilir.
Controller'lara @Injectable() EKLENMEZ. Onlar için @Controller() decorator'ü kullanılır.
Module'lere @Injectable() EKLENMEZ. Onlar için @Module() decorator'ü kullanılır.
@Injectable() sadece dependency injection sistemine dahil edilmesi gereken sınıflara eklenir.
Genellikle bir sınıf başka bir servisi inject ediyorsa, kendisi de @Injectable() olmalıdır.
