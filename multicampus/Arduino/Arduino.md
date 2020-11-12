## Arduino

> 마이크로컨트롤러를 사용하여 만들어진 개발 보드



#### 마이크로컨트롤러

하나의칩으로 이루어진 소형 컴퓨터 (cpu, 메모리, 롬 등)

iot 장치들에 각각 붙어있다.



#### 통합개발환경 세팅

아두이노 IDE 다운로드

포트와 보드세팅 (드라이버 업데이트 필요)



#### 프로그래밍 기초

```c++
/*
전처리 : 변수처리, include, define 등
*/

void setup() { //데이터 초기화, 처음 한번 실행
    data = "a";
    
}

void loop() { //무한 반복 코드
    Serial.println("Result: " + data);
    delay(1000);
}
```



#### 시리얼 모니터

아두이노와 컴퓨터간에 메시지를 주고받는 장치

```c++
void setup() { 
    Serial.begin(9600);    		// 시작
}

void loop() { 
    Serial.println("Ready");  	// 출력 (\n 추가)
    if (Serial.available() > 0) { // 데이터를 받았는지 확인 0 or 데이터 갯수
        String cmd = "";
        cmd = Serial.readString(); // 수신
        Serial.print(cmd);		// 출력
    }
    delay(1000);
}
```



#### 센서 연결

> 라떼판다는 전부 모듈화가 되어있어 간편하게 연결이 가능하다.



#### LED

```c++
const int ledPin = A2;

void setup(){
    Serial.begin(9600);
    pinMode(ledPin,OUTPUT);
}

void loop(){
    delay(2000);
    digitalWrite(ledPin,HIGH);
    delay(2000);
    digitalWrite(ledPin,LOW);    
}
```



#### TEMP

```c++
const int tempPin = A0;

void setup(){
    ananlogReference(INTERNAL)
}

void loop(){
    delay(2000);
    int data = analogRead(tempPin);
    float temp = ((5.0*data*100.0)/1024.0); // 변환공식 (맞는지 모름)
    Serial.println(data);
}
```



