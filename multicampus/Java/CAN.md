CAN 통신

#### serial 통신 준비

[jar 다운](http://fizzed.com/oss/rxtx-for-java)

Copy RXTXcomm.jar ---> <JAVA_HOME>\jre\lib
Copy rxtxSerial.dll ---> <JAVA_HOME>\jre\bin
Copy rxtxParallel.dll ---> <JAVA_HOME>\jre\bin



#### CAN 통신 준비
Test.java

``` java
package com.can;

import gnu.io.CommPortIdentifier;

public class SerialTest {

	private CommPortIdentifier portIdentifier;
	

	public Test(String portName, boolean mode) {

		try {
			if (mode == true) {
				portIdentifier = CommPortIdentifier.getPortIdentifier(portName);
				System.out.printf("Port Connect : %s\n", portName);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	public static void main(String args[]) throws IOException {
		Test ss = new Test("COM3", true); // 포트 지정
	}
}
```

연결되는지 확인한다.



