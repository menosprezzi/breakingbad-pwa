/***
 * Characters Domain's API contract.
 */
export interface CharacterDTO {
  char_id: number;
  name: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: string;
  appearance: number[];
  nickname: string;
  portrayed: string;
}

/***
 * Quote API contract.
 */
export interface QuoteDTO {
  quote_id: number;
  quote: string;
  author: string;
}
