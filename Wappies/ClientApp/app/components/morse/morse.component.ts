import { Component } from '@angular/core';

@Component({
    selector: 'morse',
    templateUrl: './morse.component.html',
    styleUrls: ['./morse.component.css']
})
export class MorseComponent {
    private DASH: string = '-';
    private DOT: string = '.';
    private CHAR_BREAK: string = ' ';
    private WORD_BREAK: string = '/';

    private CLEAR_TIME: number = 5000;
    private SPACE_TIME: number = 500;
    private DOT_DASH_BREAKPOINT: number = 300;

    private morseStartTime: number = 0;
    private morseEndTime: number = 0;
    public morseText: string = '';
    
    public startMorse() {
        let timeSinceLast: number = this.morseStartTime - this.morseEndTime;

        this.morseStartTime = Date.now();

        if (timeSinceLast > this.CLEAR_TIME) {
            this.morseText = '';
        } else if (timeSinceLast > this.SPACE_TIME) {
            this.morseText = this.morseText + this.CHAR_BREAK;
        }
    }

    public endMorse() {
        let length: number = this.morseEndTime - this.morseStartTime;

        this.morseEndTime = Date.now()

        if (length > this.DOT_DASH_BREAKPOINT) {
            this.morseText = this.morseText + this.DASH;
        } else {
            this.morseText = this.morseText + this.DASH;
        }
    }
}
