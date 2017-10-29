import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
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
    private ITS_NO_TIME_WORD: string = 'END';

    private CLEAR_TIME: number = 5000;
    private SPACE_TIME: number = 300;
    private DOT_DASH_BREAKPOINT: number = 150;
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

    public mobile: boolean = false;

    public startMorse() {
        let timeSinceLast: number;

        this.morseStartTime = Date.now();

        clearTimeout(this.spaceTimeoutID);
        clearTimeout(this.clearTimeoutID);
    }

    public mobileCheck () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
        return check;
    };

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
            } else if (this.translatedText.trim().slice(-this.ITS_NO_TIME_WORD.length).toUpperCase() === this.ITS_NO_TIME_WORD.toUpperCase()) {
                this.ceaseTransmission();
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

    public ceaseTransmission() {
        //TODO: This too
        this.locationStuffEnabled = false;
        console.log('%cLET\'S NO', 'color: red; font-size: 216pt; text-align: center;');
    }

    public ngOnInit() {
        let currentTime: Date = new Date();

        this.mobile = this.mobileCheck()

        this.hours = currentTime.getHours();
        this.minutes = currentTime.getMinutes();
        setInterval(() => {
            let currentTime: Date = new Date();

            this.hours = currentTime.getHours();
            this.minutes = currentTime.getMinutes();
            this.showColon = !this.locationStuffEnabled || !this.showColon;
        }, this.CLOCK_INTERVAL);
    }
}
