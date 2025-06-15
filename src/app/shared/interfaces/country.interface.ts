export interface Country {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      aym: {
        official: string;
        common: string;
      };
      que: {
        official: string;
        common: string;
      };
      spa: {
        official: string;
        common: string;
      };
    };
  };
}
