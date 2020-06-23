import { Deserializable } from '@app/utils/structure/deseraliazable';
import { CharacterDTO } from './characters.types';

export class Character implements Deserializable<CharacterDTO> {
  id: number;
  name: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: string;
  appearance: number[];
  nickname: string;
  portrayed: string;

  deserialize(input: CharacterDTO) {
    const { char_id, ...rest } = input;
    return Object.assign({ id: char_id, ...rest }, this);
  }
}
