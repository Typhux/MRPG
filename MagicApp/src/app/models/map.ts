export class LocationMap {
    column: number; // Column located to place on the map
    row: number; // Row located to place on the map

    constructor(
        column: number,
        row: number
    ) {
        this.column = column;
        this.row = row;
    }

    /**
     * Return a JSON representation of the lands
     * which is compatible with our backend.
     */
    getJson() {
        return {
            column: this.column,
            row: this.row
        }
    };
}