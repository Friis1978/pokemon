export type Pokemon = {
    id: string;
    name: string;
    abilities: [
        {
            ability: {
                name: string,
                url: string,
            }
            is_hidden: boolean,
            slot: number,
        }
    ]
    sprites: {
      back_default?: string;
      back_female?: string;
      back_shiny?: string;
      back_shiny_female?: string;
      front_default?: string;
      front_female?: string;
      front_shiny?: string;
      front_shiny_female?: string;
    };
    height: string;
    weight: string;
    base_experience: string;
    held_items: [];
    forms: [
      {
        name: string;
        url: string;
      }
    ];
    game_indices: [
      {
        game_index: number;
        version: {
          name: string;
          url: string;
        };
      }
    ];
    species: {
      name: string;
      url: string;
    };
    types: [
      {
        slot: number;
        type: {
          name: string;
          url: string;
        };
      }
    ];
    stats: [
      {
        base_stats: number;
        effort: number;
        stat: {
          name: string;
          url: string;
        };
      }
    ];
  };