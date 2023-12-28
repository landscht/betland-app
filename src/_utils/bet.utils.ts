import {BetStatus} from "@/_models/Bet";

export default class BetUtils {

    static getTextByBet(status: BetStatus): string {
        switch (status) {
            case BetStatus.PENDING: return '✓ Pari placé';
            case BetStatus.WON: return 'Gagné';
            case BetStatus.LOST: return 'Perdu';
            case BetStatus.SUPER_WON: return 'Super victoire!';
            default: return 'Placer un pari';
        }
    }

    static getColorByBet(status: BetStatus): string {
        switch (status) {
            case BetStatus.PENDING: return '#7d33ff';
            case BetStatus.WON: return 'rgb(255, 186, 0)';
            case BetStatus.LOST: return 'rgb(255,71,87)';
            case BetStatus.SUPER_WON: return 'rgb(70,201,58)';
            default: return '#7d33ff';
        }
    }

}