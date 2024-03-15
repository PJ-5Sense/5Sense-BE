import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setVersion('Development')
    .addBearerAuth({ type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' }, 'accessToken')
    .addBearerAuth({ type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' }, 'refreshToken')
    .setTitle('Oh Sense')
    .setDescription(
      `## 사용방법
      
<details>
### 1. swagger 사용 방법

1. 해당 API를 클릭한다.
2. Try it out을 누른다.
3. Execute를 누른다.
4. 결과를 본다.

### 2. JWT Token 얻는 방법

1. __소셜로그인으로 인가 코드를 발급 받는다.__   
2. __발급받은 인가코드와 사용한 state를 가지고 해당 소셜로그인을 진행한다.__   

##### 인가 코드 발급 받는 방법 -> 하단의 URL을 완성 시켜서 URL에 입력하고 로그인에 성공하면 됨  

__{SOCIAL_URL}?response_type=code&state=swagger&client_id={SOCIAL_CLIENT_ID}&redirect_uri={SOSICAL_REDIRECT_URI}__   

__Example kakao)__ https://kauth.kakao.com/oauth/authorize?response_type=code&state=swagger&client_id={SOCIAL_CLIENT_ID}&redirect_uri={SOSICAL_REDIRECT_URI}   
__Example google)__ https://accounts.google.com/o/oauth2/v2/auth?response_type=code&state=swagger&client_id={SOCIAL_CLIENT_ID}&redirect_uri={SOSICAL_REDIRECT_URI}   
__Example naver)__ https://nid.naver.com/oauth2.0/authorize?response_type=code&state=swagger&client_id={SOCIAL_CLIENT_ID}&redirect_uri={SOSICAL_REDIRECT_URI}   

#### 로그인 결과에 나온 토큰을 우상단의 녹색 버튼 Authorize을 클릭해서 value를 채워놓으면 됨
</details>

## 공통 사항

<details>

    - API 호출 공통적으로 아래 결과가 첨부되어 보내진다. (statusCode는 확인 후 삭제 예정, HTTP Response로 대체)

    | 변수명 | 타입 | 설명 |
    | - | - | - |
    | statusCode | string | 상태 정보
    | error | string | 상세 에러 코드 ( 에러 시에만 리턴 됨)
    | message | string | 실행 관련 메시지

</details>
    `,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
