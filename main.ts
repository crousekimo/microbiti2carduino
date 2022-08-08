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
    export function setdigital1(pin: digitalpin, XY: value):void {
        sendi2cmessage("digitalWrite="+pin.toString()+","+XY.toString())    
    }
    
    //% blockId=setdigital2 block="set arduino digital pin  %pin | PWM value to %XY"
    //% weight=100
    export function setdigital2(pin: digitalpin1, XY: number):void {
        sendi2cmessage("analogWrite="+pin.toString()+","+XY.toString())    
    }
	
    function sendi2cmessage(command: string):void {
        for (let index = 0; index <= command.length; index++) {
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
}
