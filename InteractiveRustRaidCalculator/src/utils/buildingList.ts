
type Building = {
  id: string;
  name: string;
  amount: number;
};

class BuildingList {
  private buildings: Building[] = [];

  // Add a new building
  addBuilding(building: Building): void {
    const exists = this.buildings.find(b => b.id === building.id);
    if (exists) {
      throw new Error(`Building with id ${building.id} already exists.`);
    }
    this.buildings.push(building);
  }

  // Remove a building by its ID
  removeBuilding(id: string): void {
    this.buildings = this.buildings.filter(building => building.id !== id);
  }

  // Update the amount of a building by its ID
  updateBuildingAmount(id: string, newAmount: number): void {
    const building = this.buildings.find(b => b.id === id);
    if (!building) {
      throw new Error(`Building with id ${id} not found.`);
    }
    building.amount = newAmount;
  }

  // Get the list of buildings
  getBuildings(): Building[] {
    return this.buildings;
  }
}

export default BuildingList;