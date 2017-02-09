import {LocationMap} from './map';

export class LandBase {
    id: number;  // id of the Land 
    name: string; // name of the Land
    colors: string[]; // Array of color of the Land
    image: string; // Image of the Land
    landSpecials: LandSpecial[]; // Array of Special Land is the LandBase isSpecial=true

    constructor(options: {
        id: number,
        name: string,
        colors: string[],
        image: string,
        landSpecials?: LandSpecial[]
    }) {
        this.id = options.id;
        this.name = options.name;
        this.colors = options.colors;
        this.image = options.image;
        this.landSpecials = options.landSpecials || null;
    }

    /**
     * Return a JSON representation of the lands
     * which is compatible with our backend.
     */
    getJson() {
        return {
            id: this.id,
            name: this.name,
            colors: this.colors,
            image: this.image,
            landSpecials: this.landSpecials
        };
    }
}

export class LandSpecial extends LandBase {
    description: string; // Description of the Land 
    mech: string; // Mechanism of the Land
    editionId: number; // Id of the edition of the Land
    rarityId: number; // Id of the rarity of the Land

    constructor(options: {
        id: number,
        name: string,
        colors: string[],
        image: string,
        landSpecials?: LandSpecial[],
        description: string,
        mech: string,
        editionId: number,
        rarityId: number
    }) {
        super(options);
        this.description = options.description;
        this.mech = options.mech;
        this.editionId = options.editionId;
        this.rarityId = options.rarityId;
    }


    /**
     * Return a JSON representation of the lands
     * which is compatible with our backend.
     */
    getJson() {
        return {
            id: this.id,
            name: this.name,
            colors: this.colors,
            image: this.image,
            landSpecials: this.landSpecials,
            description: this.description,
            mech: this.mech,
            editionId: this.editionId,
            rarityId: this.rarityId
        };
    }
}

export class UserLand {
    land: LandBase; // Id of the Land to place
    location: LocationMap; // Location where the Land must be place
    isCurrent: boolean;

    constructor(
        land: LandBase,
        location: LocationMap,
        isCurrent: boolean
    ) {
            this.land = land;
            this.location = location;
            this.isCurrent = isCurrent;
    }

    /**
     * Return a JSON representation of the lands
     * which is compatible with our backend.
     */
    getJson() {
        return {
            land: this.land,
            location: this.location
        }
    };
}