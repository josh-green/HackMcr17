import { Component, OnInit } from '@angular/core';
import * as MorseNode from 'morse-node';

@Component({
    selector: 'morse',
    templateUrl: './morse.component.html',
    styleUrls: ['./morse.component.css']
})
export class MorseComponent implements OnInit {
    private DASH: string = '-';
    private DOT: string = '.';
    private CHAR_BREAK: string = ' ';
    private WORD_BREAK: string = '/';
    private ITS_GO_TIME_WORD: string = 'SOS';

    private CLEAR_TIME: number = 5000;
    private SPACE_TIME: number = 300;
    private DOT_DASH_BREAKPOINT: number = 300;
    private CLOCK_INTERVAL: number = 1000;
    
    private morse: any = MorseNode.create();

    private morseStartTime: number = 0;
    private morseEndTime: number = 0;
    private spaceTimeoutID: number;
    private clearTimeoutID: number;

    public morseText: string = '';
    public translatedText: string = '';

    public showColon: boolean = true;
    public locationStuffEnabled: boolean = false;

    public hours: number = 0;
    public minutes: number = 0;

    public startMorse() {
        let timeSinceLast: number;

        this.morseStartTime = Date.now();

        clearTimeout(this.spaceTimeoutID);
        clearTimeout(this.clearTimeoutID);
    }

    public endMorse() {
        let length: number;

        this.morseEndTime = Date.now();

        length = this.morseEndTime - this.morseStartTime;

        if (length > this.DOT_DASH_BREAKPOINT) {
            this.morseText = this.morseText + this.DASH;
        } else {
            this.morseText = this.morseText + this.DOT;
        }

        this.spaceTimeoutID = setTimeout(() => {
            this.morseText = this.morseText + this.CHAR_BREAK;
            this.translatedText = this.morse.decode(this.morseText);
            if (this.translatedText.trim().slice(-this.ITS_GO_TIME_WORD.length).toUpperCase() === this.ITS_GO_TIME_WORD.toUpperCase()) {
                this.beginTransmission();
            }
        }, this.SPACE_TIME);

        this.clearTimeoutID = setTimeout(() => {
            this.morseText = '';
            this.translatedText = '';
        }, this.CLEAR_TIME)
    }

    public beginTransmission() {
        //TODO: This
        this.locationStuffEnabled = true;
        console.log('%cLET\'S GO', 'color: red; font-size: 216pt; text-align: center;');
    }

    public ngOnInit() {
        let currentTime: Date = new Date();

        this.hours = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        setInterval(() => {
            let currentTime: Date = new Date();

            this.hours = currentTime.getHours();
            this.minutes = currentTime.getMinutes();
            this.showColon = !this.locationStuffEnabled || !this.showColon;
        }, this.CLOCK_INTERVAL)
    }
}
