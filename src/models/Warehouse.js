export class Warehouse {
    constructor() {
        this.id = '';
        this.name = '';
        this.phone = '';
        this.address = '';
        this.description = '';
        this.is_active = false;
    }
    Initialise(initialiser) {
        const warehouse = new Warehouse();
        warehouse.id = initialiser.id ? initialiser.id : ''
        warehouse.name = initialiser.name ? initialiser.name : ''
        warehouse.phone = initialiser.phone ? initialiser.phone:''
        warehouse.address = initialiser.address ? initialiser.address : ''
        warehouse.description = initialiser.description ? initialiser.description : ''
        return warehouse
    }
    MapData(warehouses) {
        
        if (warehouses && warehouses.length > 0) {
            warehouses.forEach((warehouse, index, arr) => {
                arr[index] = new Warehouse().Initialise(warehouse);
            });
        }

        
        return warehouses;
    }
   
    }
