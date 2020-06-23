import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  Input
} from '@angular/core';


import { Character } from '../../characters.models';

/***
 * A custom card to preview a Character.
 * @example ```html
 * <app-character-card [character]="character"></app-character-card>
 * ```
 */
@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnInit {
  @HostBinding('class.app-character-card--dead')
  get isDead() { return this.character.status === 'Deceased'; }

  /***
   * The character to render in the card.
   */
  @Input() character: Character;

  constructor() { }

  ngOnInit(): void { }

}
