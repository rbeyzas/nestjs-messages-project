Important Command
npx @nestjs/cli generate module messages
npx @nestjs/cli generate controller messages/messages --flat

- bizim için gerekli dosyaları oluşturacak ve aynı zamanda birbirine bağlayacak
- messages/messages yapma sebebimiz hangi dizine ekleyeceğini belirtiyoruz.
- --flat ise src/messages içerisine yeni bir folder oluşturup bu yeni dosyaları ekleyecekti. öyle yapmasın diye ekledik. yani src/messages/controller klasörüne ekleme yapardı

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
