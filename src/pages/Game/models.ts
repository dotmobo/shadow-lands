export interface Sft {
  collection: string;
  nonce: number;
  identifier?: string;
  url?: string;
  name?: string;
  metadata?: any;
}

export type WidgetsType = {
  title: string;
  widget: (props: any) => JSX.Element;
  description?: string;
  props?: {
    receiver?: string;
    sfts?: number[];
    rewardPerDay?: number;
    outputTaverns?: any;
    outputBanks?: any;
    outputHauntedHouses?: any;
    outputCrypts?: any;
    outputLabos?: any;
    outputTavernsR1?: any;
    outputBanksR1?: any;
    outputHauntedHousesR1?: any;
  };
};

export interface Token {
  name: string;
  balance: number;
  decimals: number;
}
