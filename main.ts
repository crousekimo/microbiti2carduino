//% weight=0 color=#EC7505 icon="\uf0ad" block="microbiti2carduino"
namespace microbiti2carduino {
      export enum analogpin {
        A0 = 0,
        A1 = 1,
        A2 = 2,
        A3 = 3,
        A4 = 4,
        A5 = 5
     }
     
      export enum digitalpin {
        D0 = 0,
        D1 = 1,
        D2 = 2,
        D3 = 3,
        D4 = 4,
        D5 = 5,
        D6 = 6,
        D7 = 7,
        D8 = 8,
        D9 = 9,
        D10 = 10,
        D11 = 11,
        D12 = 12,
        D13 = 13
     }
      
      export enum digitalpin1 {
        D3 = 3,
        D5 = 5,
        D6 = 6,
        D9 = 9,
        D10 = 10,
        D11 = 11
     }
      
      export enum type {
        INPUT = 2,
        OUTPUT = 1
     }
     export enum value {
        HIGH = 1,
        LOW = 0
     }
      
    //% blockId=setpinmode1 block="set arduino digital pin %pin | for %XY"
    //% weight=101
    export function setpinmode1(pin: digitalpin, XY: type):void {
       sendi2cmessage("pinMode="+pin.toString()+","+XY.toString())    
    }
     
     
    //% blockId=setdigital1 block="set arduino digital pin  %pin | value to %XY"
    //% weight=100
    //% XY.min=0 XY.max=1
    export function setdigital1(pin: digitalpin, XY: value):void {
        sendi2cmessage("digitalWrite="+pin.toString()+","+XY.toString())    
    }
    
    //% blockId=setdigital2 block="set arduino digital pin  %pin | PWM value to %XY"
    //% weight=99
    //% XY.min=0 XY.max=255
    export function setdigital2(pin: digitalpin1, XY: number):void {
        sendi2cmessage("analogWrite="+pin.toString()+","+XY.toString())    
    }

	
    //% blockId=setdigital3 block="read arduino digital pin  %pin value"
    //% weight=98
    export function setdigital3(pin: digitalpin):number {
        return parseFloat(receivei2cmessage("digitalRead="+pin.toString()))
    }

    //% blockId=setdigital4 block="read arduino analog pin  %pin value"
    //% weight=97 
    export function setdigital4(pin: analogpin):number {
        return parseFloat(receivei2cmessage("analogRead="+pin.toString()))
    }   

    
    //% blockId=setcarpin block="arduino car setpin|pin1  %pin1 pin2 %pin2|pin3 %pin3 pin4 %pin4"
    //% weight=96
    export function setcarpin(pin1: digitalpin1, pin2: digitalpin1, pin3: digitalpin1, pin4: digitalpin1):void {
        sendi2cmessage("cars="+pin1.toString()+","+pin2.toString()+","+pin3.toString()+","+pin4.toString())    
    }

    //% blockId=setcarpower block="arduino car power|value1  %value1 value2 %value2|value3 %value3 pin4 %value4"
    //% weight=95
    //% value1.min=0 value1.max=255
    //% value2.min=0 value2.max=255
    //% value3.min=0 value3.max=255
    //% value4.min=0 value4.max=255
    export function setcarpower(value1: number, value2: number, value3: number, value4: number):void {
        sendi2cmessage("carp="+value1.toString()+","+value2.toString()+","+value3.toString()+","+value4.toString())    
    }
	
    //% blockId=setcarpin1 block="arduino car setpin|pin1  %pin1 pin2 %pin2|pin3 %pin3 pin4 %pin4"
    //% weight=94
    export function setcarpin1(pin1: digitalpin, pin2: digitalpin1, pin3: digitalpin, pin4: digitalpin1):void {
        sendi2cmessage("cars="+pin1.toString()+","+pin2.toString()+","+pin3.toString()+","+pin4.toString())    
    }
    //% blockId=setcarpower1 block="arduino car power|value1  %value1 value2 %value2|value3 %value3 pin4 %value4"
    //% weight=93
    //% value1.min=0 value1.max=1
    //% value2.min=0 value2.max=255
    //% value3.min=0 value3.max=1
    //% value4.min=0 value4.max=255
    export function setcarpower1(value1: number, value2: number, value3: number, value4: number):void {
        sendi2cmessage("carp1="+value1.toString()+","+value2.toString()+","+value3.toString()+","+value4.toString())    
    }
    //% blockId=setcarpower2 block="arduino car power|value1 %value1 value2 %value2|value3 %value3 pin4 %value4"
    //% weight=92
    //% value1.min=0 value1.max=1
    //% value2.min=0 value2.max=255
    //% value3.min=0 value3.max=1
    //% value4.min=0 value4.max=255
    export function setcarpower2(value1: number, value2: number, value3: number, value4: number):void {
        sendi2cmessage("carp2="+value1.toString()+","+value2.toString()+","+value3.toString()+","+value4.toString())    
    }
    function sendi2cmessage(command: string):void {
        for (let index = 0; index <= command.length-1; index++) {
        	pins.i2cWriteNumber(
        	8,
        	command.charCodeAt(index),
        	NumberFormat.Int8LE,
        	false
        	)
        }
        pins.i2cWriteNumber(
	8,
	10,
	NumberFormat.Int8LE,
	false
	)
    }   
    function receivei2cmessage(command: string):string {
    let i2cmessage2 = ""
    let aa: number[] = []
    for (let index2 = 0; index2 <= command.length-1; index2++) {
        pins.i2cWriteNumber(
        8,
        command.charCodeAt(index2),
        NumberFormat.Int8LE,
        false
        )
    }
    pins.i2cWriteNumber(
    8,
    10,
    NumberFormat.Int8LE,
    false
    )
    i2cmessage2=""
    for (let index = 0; index <= 118; index++) {
        let dd = pins.i2cReadBuffer(8,952,false)
        let messagecheck2 = dd.getNumber(NumberFormat.Int8LE, index)
        if (messagecheck2 == -1) {
            break;
        }else {
            i2cmessage2 = i2cmessage2 + String.fromCharCode(messagecheck2)
	}
    }
    return i2cmessage2	    
    }
	
}
